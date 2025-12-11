# Quickstart Guide: AI-Powered RAG Chatbot

## Prerequisites

- Python 3.11 or higher
- pip package manager
- Git
- API keys for:
  - Cohere (embed-english-v3.0 model)
  - Qdrant vector database
  - Google Gemini

## Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables by creating a `.env` file:
```env
COHERE_API_KEY=your_cohere_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
```

## Running the Application

1. Start the backend server:
```bash
python -m backend.main
```

The API will be available at `http://localhost:8000`

## API Usage Examples

### 1. Generate Embeddings

```bash
curl -X POST http://localhost:8000/embed \
  -H "Content-Type: application/json" \
  -d '{
    "text": "What is the main theme of this book?",
    "input_type": "search_query"
  }'
```

### 2. Upsert Document Chunks

```bash
curl -X POST http://localhost:8000/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "document_id": "doc_123",
    "chunks": [
      {
        "id": "chunk_1",
        "content": "This is the first paragraph of the book...",
        "metadata": {"page": 1}
      },
      {
        "id": "chunk_2",
        "content": "This is the second paragraph of the book...",
        "metadata": {"page": 2}
      }
    ]
  }'
```

### 3. Search for Relevant Content

```bash
curl -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the main theme?",
    "top_k": 5
  }'
```

### 4. Chat with the RAG System

```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the main theme of this book?",
    "session_id": "session_456",
    "temperature": 0.7
  }'
```

## Frontend Integration

### Floating Chat Widget Installation

1. Build the frontend widget:
```bash
npm run build:widget  # if using build process
```

2. Copy the widget files to your book website:
   - `chat-widget.js` - Main widget script
   - `chat-widget.css` - Widget styling
   - `chat-icon.svg` - Widget icon (optional)

3. Inject the widget into your book's main layout file (e.g., `index.html`, `_layout.html`, or equivalent):

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Your existing head content -->
  <link rel="stylesheet" href="chat-widget.css">
</head>
<body>
  <!-- Your existing body content -->

  <!-- Floating chat widget will be injected here -->
  <div id="chat-widget-container"></div>

  <script src="chat-widget.js"></script>
  <script>
    // Initialize the chat widget
    ChatWidget.init({
      apiUrl: 'http://localhost:8000',  // Backend API URL
      position: 'bottom-right',         // Widget position
      theme: 'auto',                    // 'light', 'dark', or 'auto'
      title: 'Book Assistant',          // Widget title
      welcomeMessage: 'Ask me anything about this book!' // Welcome message
    });
  </script>
</body>
</html>
```

### Configuration Options

The chat widget supports the following configuration options:

- `apiUrl`: Base URL for the backend API (required)
- `position`: Position of the widget ('bottom-right', 'bottom-left', default: 'bottom-right')
- `theme`: Color theme ('light', 'dark', 'auto', default: 'auto')
- `title`: Title text displayed in the widget header
- `welcomeMessage`: Message shown when the widget is opened
- `initialState`: Initial visibility ('open', 'closed', default: 'closed')

## Testing the Implementation

Run the test suite:
```bash
pytest tests/
```

For integration tests specifically:
```bash
pytest tests/integration/
```

Frontend tests:
```bash
npm test  # if using npm-based frontend
```

## Development Workflow

1. Make changes to the code
2. Run unit tests: `pytest tests/unit/`
3. Run integration tests: `pytest tests/integration/`
4. Update documentation as needed
5. Commit changes with descriptive messages

## Troubleshooting

- If you get API key errors, verify your `.env` file contains the correct keys
- If Qdrant connection fails, check the URL and API key
- For slow responses, ensure your API keys have sufficient rate limits
- If embeddings are not generating, verify Cohere API access
- For frontend issues, check browser console for CORS errors
- Ensure backend CORS settings allow requests from your book website domain