# Quickstart Guide: Physical AI & Humanoid Robotics Book

This guide provides instructions on how to set up and run the "Physical AI & Humanoid Robotics" book documentation locally.

## Prerequisites

- Node.js (v18.x LTS or higher)
- npm (Node Package Manager)
- Git

## Setup

1.  **Clone the Repository**

    ```bash
    git clone [REPOSITORY_URL]
    cd [REPOSITORY_NAME]
    ```

2.  **Install Dependencies**

    Navigate to the project root and install the DocuSaurus dependencies:

    ```bash
    npm install
    ```

## Running Locally

To start the development server and view the book locally:

```bash
npm start
```

This will open a new browser window with the book accessible at `http://localhost:3000` (or another available port).

## Building for Production

To build a static production version of the book:

```bash
npm run build
```

The generated static files will be located in the `build/` directory.

## Adding New Content

New chapters should be added as Markdown files within the `docs/` directory. Organize them into subdirectories to reflect modules. Update `sidebars.js` to include new chapters in the navigation.
