from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional

from ...services.vector_store_service import VectorStoreService
from ...services.embedding_service import EmbeddingService
from ...api.deps import get_vector_store_service, get_embedding_service


class SearchRequest(BaseModel):
    """Request model for search endpoint."""
    query: str
    top_k: int = 5


class SearchChunk(BaseModel):
    """Model for individual chunk in search response."""
    id: str
    content: str
    score: float
    metadata: Optional[Dict] = {}


class SearchResponse(BaseModel):
    """Response model for search endpoint."""
    results: List[SearchChunk]
    query: str


router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search(
    request: SearchRequest,
    vector_store_service: VectorStoreService = Depends(get_vector_store_service),
    embedding_service: EmbeddingService = Depends(get_embedding_service),
):
    """
    Retrieve relevant document chunks from Qdrant based on semantic similarity to the query.
    """
    try:
        # Generate embedding for the query
        query_embeddings = embedding_service.generate_embeddings([request.query], input_type="search_query")

        if not query_embeddings or len(query_embeddings[0]) == 0:
            raise HTTPException(status_code=500, detail="Failed to generate query embeddings")

        query_vector = query_embeddings[0]

        # Search for relevant chunks in the vector store
        results = vector_store_service.search_chunks(query_vector, top_k=request.top_k)

        # Format results
        formatted_results = []
        for result in results:
            chunk = SearchChunk(
                id=result["id"],
                content=result["content"],
                score=result["score"],
                metadata=result["metadata"]
            )
            formatted_results.append(chunk)

        return SearchResponse(
            results=formatted_results,
            query=request.query
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching chunks: {str(e)}")