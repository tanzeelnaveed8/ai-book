import { useEffect } from 'react';

export default function ChatWidgetInjector() {
  useEffect(() => {
    if (document.getElementById('chat-widget-script')) return;

    const script = document.createElement('script');
    script.id = 'chat-widget-script';
    script.src = '/ai-book/chat-widget.js';
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
