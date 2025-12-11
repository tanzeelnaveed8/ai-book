# Data Model: AI-Powered RAG Chatbot

## Document Entity

**Description**: Represents a book or document that can be queried by the chatbot system.

**Fields**:
- `id` (str): Unique identifier for the document
- `title` (str): Title of the document
- `content` (str): Full text content of the document
- `metadata` (dict): Additional information about the document (author, date, etc.)
- `created_at` (datetime): Timestamp when the document was indexed
- `updated_at` (datetime): Timestamp when the document was last updated

**Relationships**:
- One-to-many with `Chunk` entities (a document is split into multiple chunks)

## Chunk Entity

**Description**: Represents a segment of a document that has been processed and vectorized for retrieval.

**Fields**:
- `id` (str): Unique identifier for the chunk
- `document_id` (str): Reference to the parent document
- `content` (str): Text content of the chunk
- `chunk_index` (int): Position of this chunk within the document
- `embedding` (list[float]): Vector representation of the content
- `metadata` (dict): Additional information about the chunk
- `created_at` (datetime): Timestamp when the chunk was created

**Relationships**:
- Many-to-one with `Document` entity (belongs to a single document)

## ChatSession Entity

**Description**: Represents a conversation session between a user and the AI system.

**Fields**:
- `id` (str): Unique identifier for the chat session
- `user_id` (str): Identifier for the user (optional for anonymous sessions)
- `created_at` (datetime): Timestamp when the session started
- `updated_at` (datetime): Timestamp of last interaction
- `metadata` (dict): Additional session information

**Relationships**:
- One-to-many with `Message` entities (a session contains multiple messages)

## Message Entity

**Description**: Represents a single message in a chat conversation.

**Fields**:
- `id` (str): Unique identifier for the message
- `session_id` (str): Reference to the parent chat session
- `role` (str): Role of the message sender ("user" or "assistant")
- `content` (str): Text content of the message
- `timestamp` (datetime): When the message was created
- `retrieved_chunks` (list[str]): IDs of chunks used to generate the response

**Relationships**:
- Many-to-one with `ChatSession` entity (belongs to a single session)

## EmbeddingRequest Entity

**Description**: Represents a request for generating embeddings from text content.

**Fields**:
- `text` (str): Input text to generate embeddings for
- `model` (str): Name of the embedding model to use (default: "embed-english-v3.0")
- `input_type` (str): Type of input ("search_query" or "search_document")

## EmbeddingResponse Entity

**Description**: Represents the response from an embedding generation request.

**Fields**:
- `id` (str): Identifier for the embedding
- `embedding` (list[float]): Generated vector representation
- `text` (str): Original text that was embedded (optional)

## SearchRequest Entity

**Description**: Represents a search query for retrieving relevant document chunks.

**Fields**:
- `query` (str): Search query text
- `top_k` (int): Number of results to return (default: 5)
- `filters` (dict): Optional filters to apply to the search

## SearchResponse Entity

**Description**: Represents the results of a similarity search.

**Fields**:
- `results` (list[Chunk]): List of relevant chunks
- `scores` (list[float]): Similarity scores for each result
- `query` (str): Original search query

## ChatRequest Entity

**Description**: Represents a chat request from a user.

**Fields**:
- `message` (str): User's message/query
- `session_id` (str): Optional session identifier for context
- `temperature` (float): Temperature setting for response generation (default: 0.7)
- `max_tokens` (int): Maximum number of tokens in the response (default: 1000)

## ChatResponse Entity

**Description**: Represents a response from the AI system.

**Fields**:
- `response` (str): AI-generated response
- `retrieved_context` (list[Chunk]): Chunks used to generate the response
- `session_id` (str): Session identifier
- `timestamp` (datetime): When the response was generated

## Frontend Widget Configuration

**Description**: Configuration parameters for the floating chat widget.

**Fields**:
- `widget_position` (str): Position of the widget on screen (default: "bottom-right")
- `initial_state` (str): Initial visibility state ("open", "closed", default: "closed")
- `theme` (str): Color theme ("light", "dark", "auto", default: "auto")
- `title` (str): Title text displayed in the widget header
- `welcome_message` (str): Message displayed when widget is opened

## Frontend Message Entity

**Description**: Represents a message in the frontend chat interface.

**Fields**:
- `id` (str): Unique identifier for the message
- `sender` (str): Who sent the message ("user", "ai")
- `content` (str): Text content of the message
- `timestamp` (datetime): When the message was sent
- `status` (str): Message status ("sending", "delivered", "error")
- `is_streaming` (bool): Whether the message is currently being streamed