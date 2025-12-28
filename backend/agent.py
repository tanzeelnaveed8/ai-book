# ------------------ IMPORTS ------------------
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
from agents import set_tracing_disabled, function_tool
from agents import enable_verbose_stdout_logging

import cohere
from qdrant_client import QdrantClient

# ------------------ VERBOSE + TRACING ------------------
enable_verbose_stdout_logging()
set_tracing_disabled(disabled=True)

# ------------------ GEMINI SETUP ------------------
API_KEY = "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"

provider = AsyncOpenAI(
    api_key=API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

model = OpenAIChatCompletionsModel(
    model="xiaomi/mimo-v2-flash:free",
    openai_client=provider
)

# ------------------ COHERE + QDRANT ------------------
COHERE_API_KEY = "eHRqT5dM3YCfsbBGKyXl7nM6soGtb6nqNc0RIMLQ"
QDRANT_URL = "https://767343a5-490d-47fd-887d-754ba6fefc7e.europe-west3-0.gcp.cloud.qdrant.io:6333"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.Ww1X-PCEJ1LhizuunrRK4FUxleQHI96-pFK9NUZOhK8"

cohere_client = cohere.Client(COHERE_API_KEY)
qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

# ------------------ FastAPI Setup ------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Embedding Function ------------------
def get_embedding(text: str):
    """Generate vector embeddings using Cohere"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0]

# ------------------ RETRIEVE TOOL ------------------
@function_tool
def retrieve(query: str):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="ai_book",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]

# ------------------ AGENT SETUP ------------------
agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question:

1. ALWAYS first call the tool `retrieve` with the user query.
2. Use ONLY the returned content to answer the question.
3. If information is missing, reply: "I don't know".
""",
    model=model,
    tools=[retrieve],
)

# ------------------ REQUEST MODEL ------------------
class ChatRequest(BaseModel):
    message: str

# ------------------ API ENDPOINT ------------------
@app.post("/chat")
async def chat(req: ChatRequest):
    result = await Runner.run(agent, input=req.message)
    return {
        "response": result.final_output,
        "session_id": req.message
    }

# ------------------ RUN UVCORN ------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=7860)
