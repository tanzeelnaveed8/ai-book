from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel
from .document import Chunk


class ChatSession(BaseModel):
    """Represents a conversation session between a user and the AI system."""

    id: str
    user_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    metadata: Optional[Dict] = {}


class Message(BaseModel):
    """Represents a single message in a chat conversation."""

    id: str
    session_id: str
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime
    retrieved_chunks: Optional[List[str]] = []  # IDs of chunks used to generate the response