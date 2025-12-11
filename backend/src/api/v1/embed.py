from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from ...services.embedding_service import EmbeddingService
from ...api.deps import get_embedding_service


class EmbedRequest(BaseModel):
    """Request model for embed endpoint."""
    text: str
    input_type: str = "search_document"  # "search_query" or "search_document"


class EmbedResponse(BaseModel):
    """Response model for embed endpoint."""
    id: Optional[str] = None
    embedding: List[float]
    text: Optional[str] = None


router = APIRouter()


@router.post("/embed", response_model=EmbedResponse)
async def embed(
    request: EmbedRequest,
    embedding_service: EmbeddingService = Depends(get_embedding_service),
):
    """
    Generate embeddings for input text using Cohere's embed-english-v3.0 model.
    """
    try:
        embeddings = embedding_service.generate_embeddings([request.text], request.input_type)

        if not embeddings or len(embeddings) == 0:
            raise HTTPException(status_code=500, detail="Failed to generate embeddings")

        return EmbedResponse(
            embedding=embeddings[0],
            text=request.text
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating embeddings: {str(e)}")