import subprocess
import sys
import os

def install_dependencies():
    """Install backend dependencies using pip."""
    print("Installing backend dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
    print("Dependencies installed successfully!")

def start_server():
    """Start the backend server."""
    print("Starting backend server on http://localhost:8000...")
    os.chdir("backend")
    os.system("python -m src.main")

if __name__ == "__main__":
    # First, install dependencies if needed
    install_dependencies()

    # Then start the server
    start_server()