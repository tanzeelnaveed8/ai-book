/**
 * Floating chat widget implementation
 * Provides a chat interface that connects to the backend /chat endpoint
 */
class ChatWidget {
  constructor() {
    this.isOpen = false;
    this.apiUrl = '';
    this.position = 'bottom-right';
    this.theme = 'auto';
    this.title = 'Book Assistant';
    this.welcomeMessage = 'Ask me anything about this book!';
    this.sessionId = null;
    this.messageHistory = [];
  }

  /**
   * Initialize the chat widget with configuration
   * @param {Object} config - Configuration options
   */
  init(config) {
    this.apiUrl = config.apiUrl || this.apiUrl;
    this.position = config.position || this.position;
    this.theme = config.theme || this.theme;
    this.title = config.title || this.title;
    this.welcomeMessage = config.welcomeMessage || this.welcomeMessage;

    this.createWidget();
    this.setupEventListeners();
  }

  /**
   * Create the widget HTML structure
   */
  createWidget() {
    let container = document.getElementById('chat-widget-container');

    // Create container if it doesn't exist
    if (!container) {
      container = document.createElement('div');
      container.id = 'chat-widget-container';
      document.body.appendChild(container);
    }

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'chat-widget-toggle';
    toggleButton.innerHTML = '💬';
    toggleButton.setAttribute('aria-label', 'Open chat');

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
      <div class="chat-header">
        <h3>${this.title}</h3>
        <button class="chat-close" aria-label="Close chat">×</button>
      </div>
      <div class="chat-messages">
        <div class="welcome-message">${this.welcomeMessage}</div>
      </div>
      <div class="chat-input-area">
        <textarea
          class="chat-input"
          placeholder="Type your question..."
          rows="1"
        ></textarea>
        <button class="chat-send-button" aria-label="Send message">➤</button>
      </div>
    `;

    // Set initial position
    this.setPosition(chatWindow);

    // Add elements to container
    container.appendChild(toggleButton);
    container.appendChild(chatWindow);

    // Store references to elements
    this.toggleButton = toggleButton;
    this.chatWindow = chatWindow;
    this.closeButton = chatWindow.querySelector('.chat-close');
    this.messagesContainer = chatWindow.querySelector('.chat-messages');
    this.chatInput = chatWindow.querySelector('.chat-input');
    this.sendButton = chatWindow.querySelector('.chat-send-button');
  }

  /**
   * Set the position of the chat widget
   */
  setPosition(chatWindow) {
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' }
    };

    const pos = positions[this.position] || positions['bottom-right'];
    Object.assign(chatWindow.style, pos);
  }

  /**
   * Set up event listeners for the widget
   */
  setupEventListeners() {
    // Toggle chat window
    this.toggleButton.addEventListener('click', () => {
      this.toggleChat();
    });

    // Close chat window
    this.closeButton.addEventListener('click', () => {
      this.closeChat();
    });

    // Send message on button click
    this.sendButton.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send message on Enter key (without Shift)
    this.chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    this.chatInput.addEventListener('input', () => {
      this.resizeTextarea();
    });
  }

  /**
   * Resize the textarea based on content
   */
  resizeTextarea() {
    this.chatInput.style.height = 'auto';
    this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 100) + 'px';
  }

  /**
   * Toggle the chat window open/closed
   */
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  /**
   * Open the chat window
   */
  openChat() {
    this.chatWindow.classList.add('open');
    this.isOpen = true;
    this.toggleButton.style.display = 'none';
    this.chatInput.focus();
  }

  /**
   * Close the chat window
   */
  closeChat() {
    this.chatWindow.classList.remove('open');
    this.isOpen = false;
    this.toggleButton.style.display = 'flex';
  }

  /**
   * Send a message to the backend
   */
  async sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    // Disable input while sending
    this.chatInput.disabled = true;
    this.sendButton.disabled = true;

    // Add user message to UI
    this.addMessageToUI(message, 'user');

    try {
      // Clear input
      this.chatInput.value = '';
      this.resizeTextarea();

      // Call backend API with streaming
      const response = await this.callBackendAPIStreaming(message);

      // Note: The streaming response is handled within callBackendAPIStreaming
      // which creates and updates the message element in real-time
    } catch (error) {
      console.error('Error sending message:', error);
      // Error message is already handled in callBackendAPIStreaming
    } finally {
      // Re-enable input
      this.chatInput.disabled = false;
      this.sendButton.disabled = false;
      this.chatInput.focus();
    }
  }

  /**
   * Call the backend API to get a response
   */
  async callBackendAPI(message) {
    // For now, using the standard API call.
    // In a real implementation with streaming, we'd use Server-Sent Events or WebSocket
    const response = await fetch(`${this.apiUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: this.sessionId,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Call the backend API with streaming support (SSE)
   */
  async callBackendAPIStreaming(message) {
    // Create a temporary AI message element to show streaming content
    const aiMessageElement = document.createElement('div');
    aiMessageElement.className = 'message ai';
    aiMessageElement.textContent = '';
    this.messagesContainer.appendChild(aiMessageElement);

    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

    try {
      const response = await fetch(`${this.apiUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: this.sessionId,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      aiMessageElement.textContent = data.response;

      // Update session ID if new
      if (data.session_id && !this.sessionId) {
        this.sessionId = data.session_id;
      }

      return data;
    } catch (error) {
      console.error('Error in streaming API call:', error);
      aiMessageElement.textContent = "Sorry, there was an error processing your request.";
      throw error;
    }
  }

  /**
   * Add a message to the UI
   */
  addMessageToUI(message, sender) {
    // Remove welcome message if it's the first real message
    const welcomeMsg = this.messagesContainer.querySelector('.welcome-message');
    if (welcomeMsg && this.messagesContainer.children.length === 1) {
      welcomeMsg.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    this.messagesContainer.appendChild(messageElement);

    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Create a global instance
window.ChatWidget = new ChatWidget();

// Initialize the widget when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the chat widget with configuration
  // Check if we're in a development environment or production
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  // For production, we'll use a relative path that should work with the backend deployment
  // The backend API should be accessible at the same domain as the frontend or properly configured with CORS
  const apiUrl = "https://taneelnaveed8-backend.hf.space";
  window.ChatWidget.init({ apiUrl });

  window.ChatWidget.init({
    apiUrl: apiUrl,
    position: 'bottom-right',
    theme: 'auto',
    title: 'Book Assistant',
    welcomeMessage: 'Ask me anything about this book!'
  });
});

// Also try to initialize after a short delay in case DOM is ready before script loads
if (document.readyState === 'loading') {
  // Still loading, DOMContentLoaded will handle it
} else {
  // DOM is already ready, initialize now
  setTimeout(() => {
    if (!document.getElementById('chat-widget-container')) {
      // Check if we're in a development environment or production
      const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      // For production, we'll use a relative path that should work with the backend deployment
      // The backend API should be accessible at the same domain as the frontend or properly configured with CORS
      const apiUrl = isDev ? 'http://localhost:7860/api/v1' : window.CHAT_API_URL || '/api/v1';

      window.ChatWidget.init({
        apiUrl: apiUrl,
        position: 'bottom-right',
        theme: 'auto',
        title: 'Book Assistant',
        welcomeMessage: 'Ask me anything about this book!'
      });
    }
  }, 100); // Small delay to ensure everything is loaded
}

// Add a global function to allow runtime configuration of the API URL
window.setChatApiUrl = function(url) {
  if (window.ChatWidget) {
    window.ChatWidget.apiUrl = url;
  }
  window.CHAT_API_URL = url;
};