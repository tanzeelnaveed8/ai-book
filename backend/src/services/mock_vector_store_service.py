from typing import Dict, List, Optional
from ..models.document import Chunk


class MockVectorStoreService:
    """Mock service for managing vector storage operations (for testing without Qdrant)."""

    def __init__(self):
        self.storage = {}  # In-memory storage for mock data
        self.collection_name = "document_chunks"

    def upsert_chunks(self, chunks: List[Chunk]) -> bool:
        """Mock storing document chunks."""
        try:
            for chunk in chunks:
                self.storage[chunk.id] = {
                    "id": chunk.id,
                    "document_id": chunk.document_id,
                    "content": chunk.content,
                    "chunk_index": chunk.chunk_index,
                    "embedding": chunk.embedding if chunk.embedding else [0.0] * 1024,  # Mock embedding
                    "metadata": chunk.metadata,
                }
            return True
        except Exception as e:
            print(f"Error upserting chunks: {e}")
            return False

    def search_chunks(self, query_vector: List[float], top_k: int = 5) -> List[Dict]:
        """Mock retrieving relevant document chunks (returns mock results)."""
        # For demo purposes, return some mock results
        mock_results = []
        for i in range(min(top_k, len(self.storage))):
            chunk_data = list(self.storage.values())[i]
            mock_results.append({
                "id": chunk_data["id"],
                "content": chunk_data["content"],
                "score": 0.9 - (i * 0.1),  # Decreasing scores
                "document_id": chunk_data["document_id"],
                "metadata": chunk_data["metadata"],
            })
        return mock_results