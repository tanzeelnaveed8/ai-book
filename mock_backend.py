import sys
import os
# Add the backend/src directory to the Python path to handle relative imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'src'))

# Import using absolute paths for the main modules
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
import uvicorn

# Mock models instead of using relative imports
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

class EmbedRequest(BaseModel):
    """Request model for embed endpoint."""
    text: str
    input_type: str = "search_document"  # "search_query" or "search_document"

class EmbedResponse(BaseModel):
    """Response model for embed endpoint."""
    id: Optional[str] = None
    embedding: List[float]
    text: Optional[str] = None

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

# Create FastAPI app
app = FastAPI(title="Mock RAG Chatbot API", version="1.0.0")

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock endpoints
@app.get("/")
def read_root():
    return {"message": "Mock RAG Chatbot API is running"}

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Mock chat endpoint that returns a predefined response."""
    # Create a mock response based on the user's message
    mock_responses = {
        "hello": "Hello! I'm your book assistant. How can I help you with the Physical AI & Humanoid Robotics book?",
        "what": "This book covers Physical AI, Embodied Intelligence, Humanoid Robotics, ROS 2, Simulation, and real-world deployment.",
        "help": "I can answer questions about the book content. Try asking about specific topics like ROS, simulation, or humanoid control.",
        "default": f"I received your message: '{request.message}'. This is a mock response. In the full implementation, I would search the book content and provide an AI-generated answer based on relevant sections."
    }

    response_text = mock_responses.get(request.message.lower().split()[0] if request.message.split() else "default", mock_responses["default"])

    # Generate a mock session ID if not provided
    session_id = request.session_id or "mock-session-123"

    # Mock retrieved context
    retrieved_context = [
        {
            "id": "mock-chunk-1",
            "content": "This is mock context from the book about Physical AI and Embodied Intelligence.",
            "score": 0.95
        }
    ]

    return ChatResponse(
        response=response_text,
        session_id=session_id,
        retrieved_context=retrieved_context
    )

@app.post("/api/v1/search", response_model=SearchResponse)
async def search(request: SearchRequest):
    """Mock search endpoint."""
    mock_results = [
        {
            "id": f"mock-result-{i}",
            "content": f"Mock search result {i} related to: {request.query}",
            "score": 0.9 - (i * 0.1)
        }
        for i in range(min(request.top_k, 5))
    ]

    return SearchResponse(
        results=mock_results,
        query=request.query
    )

@app.post("/api/v1/embed", response_model=EmbedResponse)
async def embed(request: EmbedRequest):
    """Mock embed endpoint."""
    # Return a mock embedding (10-dimensional vector)
    mock_embedding = [0.1 * i for i in range(10)]

    return EmbedResponse(
        embedding=mock_embedding,
        text=request.text
    )

@app.post("/api/v1/upsert", response_model=UpsertResponse)
async def upsert(request: UpsertRequest):
    """Mock upsert endpoint."""
    return UpsertResponse(
        status="success",
        document_id=request.document_id,
        indexed_count=len(request.chunks)
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)