from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

from ...services.vector_store_service import VectorStoreService
from ...services.embedding_service import EmbeddingService
from ...api.deps import get_vector_store_service, get_embedding_service
from ...models.document import Chunk


class UpsertChunk(BaseModel):
    """Model for individual chunk in upsert request."""
    id: str
    content: str
    metadata: Optional[Dict] = {}


class UpsertRequest(BaseModel):
    """Request model for upsert endpoint."""
    document_id: str
    chunks: List[UpsertChunk]


class UpsertResponse(BaseModel):
    """Response model for upsert endpoint."""
    status: str
    document_id: str
    indexed_count: int


router = APIRouter()


@router.post("/upsert", response_model=UpsertResponse)
async def upsert(
    request: UpsertRequest,
    vector_store_service: VectorStoreService = Depends(get_vector_store_service),
    embedding_service: EmbeddingService = Depends(get_embedding_service),
):
    """
    Store document chunks in Qdrant vector database with their embeddings.
    """
    try:
        # Generate embeddings for all chunk contents
        chunk_texts = [chunk.content for chunk in request.chunks]
        embeddings = embedding_service.generate_embeddings(chunk_texts, input_type="search_document")

        # Create Chunk objects with embeddings
        chunk_objects = []
        for i, (chunk_data, embedding) in enumerate(zip(request.chunks, embeddings)):
            chunk_obj = Chunk(
                id=chunk_data.id,
                document_id=request.document_id,
                content=chunk_data.content,
                chunk_index=i,
                embedding=embedding,
                metadata=chunk_data.metadata,
                created_at=datetime.now()
            )
            chunk_objects.append(chunk_obj)

        # Upsert chunks to vector store
        success = vector_store_service.upsert_chunks(chunk_objects)

        if not success:
            raise HTTPException(status_code=500, detail="Failed to upsert chunks to vector store")

        return UpsertResponse(
            status="success",
            document_id=request.document_id,
            indexed_count=len(chunk_objects)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error upserting chunks: {str(e)}")