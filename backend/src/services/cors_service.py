from fastapi.middleware.cors import CORSMiddleware


def setup_cors(app):
    """Configure CORS middleware to allow requests from book website domain."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # In production, specify exact domains
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        # Add additional headers if needed for authentication
        # expose_headers=["Access-Control-Allow-Origin"]
    )