# ------------------ IMPORTS ------------------
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
from agents import set_tracing_disabled, function_tool
from agents import enable_verbose_stdout_logging

import os
from dotenv import load_dotenv

import cohere
from qdrant_client import QdrantClient

# ------------------ SETUP ------------------
enable_verbose_stdout_logging()
load_dotenv()
set_tracing_disabled(disabled=True)

# Gemini Provider
gemini_api_key = os.getenv("GEMINI_API_KEY")
provider = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.5-flash",
    openai_client=provider
)

# Cohere + Qdrant setup
cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))
qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY"),
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
def get_embedding(text):
    """Generate vector embeddings using Cohere"""
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0]


# ------------------ RETRIEVE TOOL ------------------
@function_tool
def retrieve(query):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="humanoid_ai_book",
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
    result = await Runner.run(
        agent,
        input=req.message
    )

    # Change key to `response` so frontend can read it
    return {
        "response": result.final_output,
        "session_id": req.message  # optional: ya apna session logic
    }


# ------------------ TEST (only if running directly) ------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
