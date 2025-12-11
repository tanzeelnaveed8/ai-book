from typing import List
from ..models.document import Chunk
from ..services.retrieval_service import RetrievalService


class RetrievalTool:
    """
    RAG retrieval tool following agent.py pattern.
    This tool retrieves relevant document chunks based on user queries.
    """

    def __init__(self, retrieval_service: RetrievalService):
        self.retrieval_service = retrieval_service

    def run(self, query: str, top_k: int = 5) -> List[Chunk]:
        """
        Run the retrieval tool to find relevant document chunks for a query.

        Args:
            query: The user's query or question
            top_k: Number of relevant chunks to retrieve (default: 5)

        Returns:
            List of relevant document chunks
        """
        return self.retrieval_service.retrieve_relevant_chunks(query, top_k)