import os
import cohere
from typing import List
from datetime import datetime
from ..models.document import Chunk


class EmbeddingService:
    """Service for generating embeddings using Cohere."""

    def __init__(self):
        # Initialize Cohere client with API key from environment
        self.client = cohere.Client(os.getenv("COHERE_API_KEY"))

    def generate_embeddings(self, texts: List[str], input_type: str = "search_document") -> List[List[float]]:
        """Generate embeddings for input text using Cohere's embed-english-v3.0 model."""
        try:
            response = self.client.embed(
                texts=texts,
                model="embed-english-v3.0",
                input_type=input_type
            )
            return [embedding for embedding in response.embeddings]
        except Exception as e:
            print(f"Error generating embeddings: {e}")
            return []

    def chunk_text(self, text: str, chunk_size: int = 512) -> List[str]:
        """Split text into chunks of specified size."""
        words = text.split()
        chunks = []
        current_chunk = []
        current_length = 0

        for word in words:
            if current_length + len(word) <= chunk_size:
                current_chunk.append(word)
                current_length += len(word)
            else:
                if current_chunk:
                    chunks.append(" ".join(current_chunk))
                current_chunk = [word]
                current_length = len(word)

        if current_chunk:
            chunks.append(" ".join(current_chunk))

        return chunks

    def create_chunks_from_document(self, document_id: str, text: str, chunk_size: int = 512) -> List[Chunk]:
        """Create Chunk objects from a document text."""
        text_chunks = self.chunk_text(text, chunk_size)
        chunks = []

        for i, chunk_text in enumerate(text_chunks):
            chunk = Chunk(
                id=f"{document_id}_chunk_{i}",
                document_id=document_id,
                content=chunk_text,
                chunk_index=i,
                created_at=datetime.now()
            )
            chunks.append(chunk)

        return chunks