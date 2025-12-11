from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel


class Document(BaseModel):
    """Represents a book or document that can be queried by the chatbot system."""

    id: str
    title: str
    content: str
    metadata: Optional[Dict] = {}
    created_at: datetime
    updated_at: datetime


class Chunk(BaseModel):
    """Represents a segment of a document that has been processed and vectorized for retrieval."""

    id: str
    document_id: str
    content: str
    chunk_index: int
    embedding: Optional[List[float]] = None
    metadata: Optional[Dict] = {}
    created_at: datetime