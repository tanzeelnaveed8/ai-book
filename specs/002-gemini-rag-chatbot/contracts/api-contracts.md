# API Contracts: AI-Powered RAG Chatbot

## `/embed` Endpoint

### POST /embed

**Description**: Generate embeddings for input text using Cohere's embed-english-v3.0 model.

**Request**:
```json
{
  "text": "string",
  "input_type": "string"
}
```

**Request Parameters**:
- `text` (string, required): The text to generate embeddings for
- `input_type` (string, optional): Type of input, either "search_query" or "search_document" (default: "search_document")

**Response**:
```json
{
  "id": "string",
  "embedding": [float],
  "text": "string"
}
```

**Response Fields**:
- `id` (string): Identifier for the embedding
- `embedding` (array[float]): Vector representation of the input text
- `text` (string): Original text that was embedded

**CORS Headers**:
- `Access-Control-Allow-Origin`: "*" (or specific book website domain)
- `Access-Control-Allow-Methods`: "POST, OPTIONS"
- `Access-Control-Allow-Headers`: "Content-Type, Authorization"

**Error Responses**:
- `400 Bad Request`: Invalid input parameters
- `500 Internal Server Error`: Embedding service unavailable

---

## `/upsert` Endpoint

### POST /upsert

**Description**: Store document chunks in Qdrant vector database with their embeddings.

**Request**:
```json
{
  "document_id": "string",
  "chunks": [
    {
      "id": "string",
      "content": "string",
      "metadata": {}
    }
  ]
}
```

**Request Parameters**:
- `document_id` (string, required): Unique identifier for the document
- `chunks` (array[object], required): Array of document chunks to store
  - `id` (string): Unique identifier for the chunk
  - `content` (string): Text content of the chunk
  - `metadata` (object): Additional metadata for the chunk

**Response**:
```json
{
  "status": "success",
  "document_id": "string",
  "indexed_count": "integer"
}
```

**Response Fields**:
- `status` (string): Operation status ("success")
- `document_id` (string): ID of the document that was indexed
- `indexed_count` (integer): Number of chunks successfully indexed

**CORS Headers**:
- `Access-Control-Allow-Origin`: "*" (or specific book website domain)
- `Access-Control-Allow-Methods`: "POST, OPTIONS"
- `Access-Control-Allow-Headers`: "Content-Type, Authorization"

**Error Responses**:
- `400 Bad Request`: Invalid input parameters
- `500 Internal Server Error`: Vector database unavailable

---

## `/search` Endpoint

### POST /search

**Description**: Retrieve relevant document chunks from Qdrant based on semantic similarity to the query.

**Request**:
```json
{
  "query": "string",
  "top_k": "integer"
}
```

**Request Parameters**:
- `query` (string, required): Search query text
- `top_k` (integer, optional): Number of results to return (default: 5, max: 10)

**Response**:
```json
{
  "results": [
    {
      "id": "string",
      "content": "string",
      "score": "float",
      "metadata": {}
    }
  ],
  "query": "string"
}
```

**Response Fields**:
- `results` (array[object]): List of relevant chunks
  - `id` (string): Chunk identifier
  - `content` (string): Text content of the chunk
  - `score` (float): Similarity score
  - `metadata` (object): Chunk metadata
- `query` (string): Original search query

**CORS Headers**:
- `Access-Control-Allow-Origin`: "*" (or specific book website domain)
- `Access-Control-Allow-Methods`: "POST, OPTIONS"
- `Access-Control-Allow-Headers`: "Content-Type, Authorization"

**Error Responses**:
- `400 Bad Request`: Invalid input parameters
- `500 Internal Server Error`: Vector database unavailable

---

## `/chat` Endpoint

### POST /chat

**Description**: Process user query through RAG flow: retrieve relevant chunks and generate AI response using Gemini.

**Request**:
```json
{
  "message": "string",
  "session_id": "string",
  "temperature": "float"
}
```

**Request Parameters**:
- `message` (string, required): User's message/query
- `session_id` (string, optional): Session identifier for context (new session created if not provided)
- `temperature` (float, optional): Temperature setting for response generation (default: 0.7)

**Response**:
```json
{
  "response": "string",
  "session_id": "string",
  "retrieved_context": [
    {
      "id": "string",
      "content": "string",
      "score": "float"
    }
  ]
}
```

**Response Fields**:
- `response` (string): AI-generated response
- `session_id` (string): Session identifier (newly created if not provided)
- `retrieved_context` (array[object]): Chunks used to generate the response
  - `id` (string): Chunk identifier
  - `content` (string): Text content of the chunk
  - `score` (float): Similarity score

**CORS Headers**:
- `Access-Control-Allow-Origin`: "*" (or specific book website domain)
- `Access-Control-Allow-Methods`: "POST, OPTIONS"
- `Access-Control-Allow-Headers`: "Content-Type, Authorization"

**Streaming Response** (optional):
- The endpoint may support Server-Sent Events (SSE) for streaming responses
- Content-Type: `text/event-stream`
- Events: `data: {partial_response}`

**Error Responses**:
- `400 Bad Request`: Invalid input parameters
- `500 Internal Server Error`: AI service or vector database unavailable

---

## Frontend Integration Requirements

### Widget Script Injection
The floating chat widget should be injected into the book's root layout (index.html or template) as a self-contained script that:
- Loads asynchronously without blocking page rendering
- Initializes with default configuration parameters
- Provides a clean API for customization

### CORS Configuration
The backend must be configured with appropriate CORS headers to allow requests from the book website domain:
- Allow requests from the book website origin
- Support credentials if session management is required
- Allow POST requests for API communication
- Include custom headers if needed for authentication