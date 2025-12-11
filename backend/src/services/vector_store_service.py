import os
from typing import Dict, List, Optional

from ..models.document import Chunk

# Try to import Qdrant, use mock if not available
try:
    from qdrant_client import QdrantClient
    from qdrant_client.http import models
    from qdrant_client.http.models import Distance, VectorParams
    QDRANT_AVAILABLE = True
except ImportError:
    QDRANT_AVAILABLE = False
    print("Qdrant not available, using mock vector store service")


class VectorStoreService:
    """Service for managing vector storage operations with Qdrant (or mock if unavailable)."""

    def __init__(self):
        if QDRANT_AVAILABLE:
            try:
                # Initialize Qdrant client with environment variables
                self.client = QdrantClient(
                    url=os.getenv("QDRANT_URL"),
                    api_key=os.getenv("QDRANT_API_KEY"),
                )
                self.collection_name = "document_chunks"
                self._ensure_collection_exists()
                self.using_qdrant = True
            except Exception as e:
                print(f"Error connecting to Qdrant: {e}, using mock service")
                self.using_qdrant = False
                self.storage = {}  # In-memory storage for mock data
        else:
            self.using_qdrant = False
            self.storage = {}  # In-memory storage for mock data

    def _ensure_collection_exists(self):
        """Ensure the collection exists in Qdrant."""
        try:
            self.client.get_collection(self.collection_name)
        except:
            # Create collection if it doesn't exist
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(size=1024, distance=Distance.COSINE),
            )

    def upsert_chunks(self, chunks: List[Chunk]) -> bool:
        """Store document chunks in Qdrant vector database with their embeddings."""
        if self.using_qdrant and QDRANT_AVAILABLE:
            return self._upsert_chunks_qdrant(chunks)
        else:
            return self._upsert_chunks_mock(chunks)

    def _upsert_chunks_qdrant(self, chunks: List[Chunk]) -> bool:
        """Store document chunks in Qdrant."""
        try:
            points = []
            for chunk in chunks:
                points.append(
                    models.PointStruct(
                        id=chunk.id,
                        vector=chunk.embedding if chunk.embedding else [],
                        payload={
                            "document_id": chunk.document_id,
                            "content": chunk.content,
                            "chunk_index": chunk.chunk_index,
                            "metadata": chunk.metadata,
                        },
                    )
                )

            self.client.upsert(
                collection_name=self.collection_name,
                points=points,
            )
            return True
        except Exception as e:
            print(f"Error upserting chunks to Qdrant: {e}")
            return False

    def _upsert_chunks_mock(self, chunks: List[Chunk]) -> bool:
        """Store document chunks in mock storage."""
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
            print(f"Error upserting chunks to mock storage: {e}")
            return False

    def search_chunks(self, query_vector: List[float], top_k: int = 5) -> List[Dict]:
        """Retrieve relevant document chunks based on semantic similarity."""
        if self.using_qdrant and QDRANT_AVAILABLE:
            return self._search_chunks_qdrant(query_vector, top_k)
        else:
            return self._search_chunks_mock(query_vector, top_k)

    def _search_chunks_qdrant(self, query_vector: List[float], top_k: int = 5) -> List[Dict]:
        """Retrieve relevant document chunks from Qdrant based on semantic similarity."""
        try:
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=top_k,
            )

            chunks = []
            for result in results:
                chunks.append({
                    "id": result.id,
                    "content": result.payload.get("content", ""),
                    "score": result.score,
                    "document_id": result.payload.get("document_id"),
                    "metadata": result.payload.get("metadata", {}),
                })

            return chunks
        except Exception as e:
            print(f"Error searching chunks in Qdrant: {e}")
            return []

    def _search_chunks_mock(self, query_vector: List[float], top_k: int = 5) -> List[Dict]:
        """Mock retrieving relevant document chunks (returns mock results)."""
        # For demo purposes, return some mock results from storage
        mock_results = []
        for i, chunk_data in enumerate(self.storage.values()):
            if i >= top_k:
                break
            mock_results.append({
                "id": chunk_data["id"],
                "content": chunk_data["content"],
                "score": 0.9 - (i * 0.1),  # Decreasing scores
                "document_id": chunk_data["document_id"],
                "metadata": chunk_data["metadata"],
            })
        return mock_results