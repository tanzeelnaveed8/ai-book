# Data Model: Physical AI & Humanoid Robotics Book

This document outlines the key entities and their relationships for the "Physical AI & Humanoid Robotics" textbook.

## Entities

### Book
- **Description**: The overarching academic textbook. 
- **Attributes**: Title, Author(s), Publication Date, Version, Table of Contents (derived from chapters).
- **Relationships**: Contains multiple Chapters, organized into Modules.

### Chapter
- **Description**: A primary section of the book, corresponding to a Markdown file.
- **Attributes**: Title, ID (slug), Order within Module, Learning Outcomes, Concept Explanation, Diagram Descriptions, Practical Examples.
- **Relationships**: Belongs to a Module; can contain multiple Topics.

### Module
- **Description**: A logical grouping of related chapters or sub-sections within the book.
- **Attributes**: Name, Order within Book.
- **Relationships**: Contains multiple Chapters.

### Topic
- **Description**: A specific subject or concept discussed within a Chapter.
- **Attributes**: Title, Location (within a chapter).
- **Relationships**: Belongs to a Chapter.
