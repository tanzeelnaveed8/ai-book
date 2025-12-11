import sys
import os
from fastapi import FastAPI
from dotenv import load_dotenv

# Add the src directory to the path so we can import modules
sys.path.append(os.path.join(os.path.dirname(__file__)))

from services.cors_service import setup_cors
from api.v1.chat import router as chat_router
from api.v1.embed import router as embed_router
from api.v1.upsert import router as upsert_router
from api.v1.search import router as search_router

# Load environment variables
load_dotenv()

app = FastAPI(title="RAG Chatbot API", version="1.0.0")

# Setup CORS
setup_cors(app)

# Include API routes
app.include_router(chat_router, prefix="/api/v1", tags=["chat"])
app.include_router(embed_router, prefix="/api/v1", tags=["embed"])
app.include_router(upsert_router, prefix="/api/v1", tags=["upsert"])
app.include_router(search_router, prefix="/api/v1", tags=["search"])

@app.get("/")
def read_root():
    return {"message": "RAG Chatbot API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)