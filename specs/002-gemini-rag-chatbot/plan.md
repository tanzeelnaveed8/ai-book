# Implementation Plan: AI-Powered RAG Chatbot for Book Website

**Branch**: `1-gemini-rag-chatbot` | **Date**: 2025-12-11 | **Spec**: [link](../002-gemini-rag-chatbot/spec.md)
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of a complete RAG (Retrieval-Augmented Generation) chatbot system for the book website. The system will use Cohere for embeddings, Qdrant for vector storage and retrieval, and Gemini for generating AI responses. The backend will expose four key endpoints: `/embed`, `/upsert`, `/search`, and `/chat`, following the existing `agent.py` structure with retrieval tools. The frontend will be a floating chat widget using HTML/JS/CSS that integrates seamlessly with the Claude-CLI generated book website.

## Technical Context

**Language/Version**: Python 3.11 (backend), HTML/JS/CSS (frontend)
**Primary Dependencies**: FastAPI, Cohere SDK, Qdrant client, Google Generative AI SDK, existing `agent.py` structure
**Storage**: Qdrant vector database (external)
**Testing**: pytest (backend), browser-based tests (frontend)
**Target Platform**: Linux server (web backend) + Web browsers (frontend)
**Project Type**: Web (full-stack with backend API and frontend widget)
**Performance Goals**: Response time under 5 seconds for chat queries, 95% uptime during peak usage
**Constraints**: Must integrate with existing backend without restructuring, follow existing `agent.py` patterns, maintain book website layout
**Scale/Scope**: Support multiple concurrent users querying book content

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on the project constitution (though currently using template placeholders), the implementation must:
- Follow test-first approach with TDD
- Maintain integration testing for the RAG flow
- Ensure observability through structured logging
- Keep complexity justified and minimal
- Follow existing code patterns in the repository

## Project Structure

### Documentation (this feature)

```text
specs/002-gemini-rag-chatbot/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   ├── document.py      # Document and chunk models
│   │   ├── embedding.py     # Embedding models
│   │   ├── chat.py          # Chat session models
│   │   └── frontend_config.py  # Frontend widget configuration
│   ├── services/
│   │   ├── embedding_service.py    # Cohere embedding generation
│   │   ├── vector_store_service.py # Qdrant operations
│   │   ├── retrieval_service.py    # Document retrieval logic
│   │   ├── chat_service.py         # AI response generation
│   │   └── cors_service.py         # CORS configuration
│   ├── api/
│   │   ├── v1/
│   │   │   ├── embed.py     # /embed endpoint
│   │   │   ├── upsert.py    # /upsert endpoint
│   │   │   ├── search.py    # /search endpoint
│   │   │   └── chat.py      # /chat endpoint
│   │   └── deps.py          # Dependency injection
│   └── tools/
│       └── retrieval_tool.py # RAG retrieval tool following agent.py pattern
frontend/
├── src/
│   ├── chat-widget.js     # Main widget logic
│   ├── chat-widget.css    # Widget styling (minimal, clean, dark-mode friendly)
│   └── chat-icon.svg      # Widget icon
└── dist/
    ├── chat-widget.js     # Bundled widget script
    └── chat-widget.css    # Bundled widget styles
└── tests/
    ├── unit/
    │   ├── services/
    │   └── models/
    ├── integration/
    │   └── api/
    └── contract/
        └── qdrant_client_test.py
```

**Structure Decision**: The implementation will be full-stack with a backend API and a frontend floating widget. The backend extends existing structure with RAG functionality, while the frontend is a self-contained widget that can be injected into the book website without disrupting layout.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |