from typing import List
from ..models.document import Chunk
from .vector_store_service import VectorStoreService
from .embedding_service import EmbeddingService


class RetrievalService:
    """Service for document retrieval logic."""

    def __init__(self, vector_store_service: VectorStoreService, embedding_service: EmbeddingService):
        self.vector_store_service = vector_store_service
        self.embedding_service = embedding_service

    def retrieve_relevant_chunks(self, query: str, top_k: int = 5) -> List[Chunk]:
        """Retrieve relevant document chunks based on semantic similarity to the query."""
        # Generate embedding for the query
        query_embeddings = self.embedding_service.generate_embeddings([query], input_type="search_query")

        if not query_embeddings or len(query_embeddings[0]) == 0:
            return []

        query_vector = query_embeddings[0]

        # Search for relevant chunks in the vector store
        results = self.vector_store_service.search_chunks(query_vector, top_k=top_k)

        # Convert results to Chunk objects
        chunks = []
        for result in results:
            chunk = Chunk(
                id=result["id"],
                document_id=result["document_id"],
                content=result["content"],
                chunk_index=result.get("chunk_index", 0),
                metadata=result["metadata"],
                created_at=None  # This would come from the original chunk
            )
            chunks.append(chunk)

        return chunks