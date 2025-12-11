import os
import google.generativeai as genai
from typing import List, Dict
from ..models.document import Chunk


class ChatService:
    """Service for generating AI responses using Google's Gemini."""

    def __init__(self):
        # Initialize Gemini client with API key from environment
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel('gemini-pro')

    def generate_response(self, query: str, context_chunks: List[Chunk],
                         temperature: float = 0.7, max_tokens: int = 1000) -> str:
        """Generate AI response based on query and context from retrieved chunks."""
        try:
            # Combine context from retrieved chunks
            context_text = "\n\n".join([chunk.content for chunk in context_chunks])

            # Create prompt with context
            prompt = f"""
            Context information:
            {context_text}

            User query: {query}

            Please provide a helpful and accurate response based on the context information provided above.
            If the information is not in the context, please acknowledge this limitation.
            """

            response = self.model.generate_content(
                prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=temperature,
                    max_output_tokens=max_tokens
                )
            )

            return response.text if response.text else "I couldn't generate a response based on the provided context."
        except Exception as e:
            print(f"Error generating response: {e}")
            return "Sorry, I encountered an error while processing your request."