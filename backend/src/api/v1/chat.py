from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel

from ...services.chat_service import ChatService
from ...services.retrieval_service import RetrievalService
from ...services.vector_store_service import VectorStoreService
from ...services.embedding_service import EmbeddingService
from ...api.deps import get_chat_service, get_retrieval_service, get_vector_store_service, get_embedding_service
from ...models.chat import ChatSession, Message
from ...models.document import Chunk


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str
    session_id: Optional[str] = None
    temperature: float = 0.7
    max_tokens: int = 1000


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    response: str
    session_id: str
    retrieved_context: Optional[list] = []


router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service),
    retrieval_service: RetrievalService = Depends(get_retrieval_service),
):
    """
    Process user query through RAG flow: retrieve relevant chunks and generate AI response using Gemini.
    """
    try:
        # Retrieve relevant chunks based on the user's message
        relevant_chunks = retrieval_service.retrieve_relevant_chunks(request.message, top_k=5)

        # Generate response using the chat service with context
        response_text = chat_service.generate_response(
            query=request.message,
            context_chunks=relevant_chunks,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )

        # Create a mock session ID if not provided (in a real implementation, you'd manage sessions properly)
        session_id = request.session_id or "mock-session-id"

        # Format retrieved context for response
        retrieved_context = [
            {
                "id": chunk.id,
                "content": chunk.content,
                "score": getattr(chunk, 'score', 0.0)  # Add score if available
            }
            for chunk in relevant_chunks
        ]

        return ChatResponse(
            response=response_text,
            session_id=session_id,
            retrieved_context=retrieved_context
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")