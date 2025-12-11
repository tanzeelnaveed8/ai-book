from typing import Generator
from ..services.vector_store_service import VectorStoreService
from ..services.embedding_service import EmbeddingService
from ..services.chat_service import ChatService


def get_vector_store_service() -> Generator[VectorStoreService, None, None]:
    """Dependency for vector store service."""
    yield VectorStoreService()


def get_embedding_service() -> Generator[EmbeddingService, None, None]:
    """Dependency for embedding service."""
    yield EmbeddingService()


def get_chat_service() -> Generator[ChatService, None, None]:
    """Dependency for chat service."""
    yield ChatService()