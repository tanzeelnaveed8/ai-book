# ------------------ IMPORTS ------------------
import cohere
from qdrant_client import QdrantClient

# ------------------ CLIENT SETUP ------------------
COHERE_API_KEY = "eHRqT5dM3YCfsbBGKyXl7nM6soGtb6nqNc0RIMLQ"
QDRANT_URL = "https://767343a5-490d-47fd-887d-754ba6fefc7e.europe-west3-0.gcp.cloud.qdrant.io:6333"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Ww1X-PCEJ1LhizuunrRK4FUxleQHI96-pFK9NUZOhK8"

cohere_client = cohere.Client(COHERE_API_KEY)
qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

# ------------------ EMBEDDING FUNCTION ------------------
def get_embedding(text: str):
    """Get embedding vector from Cohere Embed v3"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0]

# ------------------ RETRIEVE FUNCTION ------------------
def retrieve(query: str):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="ai_book",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]

# ------------------ TEST ------------------
if __name__ == "__main__":
    test_query = "What data do you have?"
    print("Query:", test_query)
    print("Results:", retrieve(test_query))
