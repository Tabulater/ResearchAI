import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { realApiService } from '../services/realApiService';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const ResearchChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'system',
    content: 'You are an expert research assistant. Provide accurate, concise answers with references when possible.'
  }]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const displayMessages = useMemo(() => messages.filter(m => m.role !== 'system'), [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages.length, isSending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;
    setError(null);

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const { content } = await realApiService.chat(nextMessages);
      setMessages(prev => [...prev, { role: 'assistant', content }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <div className="card p-4 animate-fadeIn">
        <div className="max-h-[60vh] overflow-y-auto space-y-3">
          {displayMessages.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">Start the conversation with a research question. Example: "Summarize recent advances in perovskite solar cells and cite 3 key papers."</div>
          )}
          {displayMessages.map((m, idx) => (
            <div key={idx} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      <div className="card p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about methods, papers, or concepts (Ctrl/Cmd+Enter to send)"
            rows={2}
            className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleSend}
            disabled={isSending || input.trim().length === 0}
            className="btn-primary disabled:opacity-60"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
