import sys
import os

# Add the backend/src directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend', 'src'))

import uvicorn
from backend.src.main import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)