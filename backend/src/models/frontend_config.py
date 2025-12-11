from typing import Optional
from pydantic import BaseModel


class FrontendConfig(BaseModel):
    """Configuration parameters for the floating chat widget."""

    widget_position: str = "bottom-right"  # Position of the widget on screen
    initial_state: str = "closed"  # Initial visibility state ("open", "closed")
    theme: str = "auto"  # Color theme ("light", "dark", "auto")
    title: str = "Book Assistant"  # Title text displayed in the widget header
    welcome_message: str = "Ask me anything about this book!"  # Message displayed when widget is opened