'use client';

import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    setInput('');

    const userMessage: Message = {
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage,
          ].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '抱歉，AI 暫時無法回覆。',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 760,
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'system-ui',
      }}
    >
      <a href=" " style={{ textDecoration: 'none' }}>
        ← 回到朝向自由
      </a >

      <h1 style={{ marginTop: 30 }}>🤖 跟我聊聊</h1>

      <p style={{ color: '#777' }}>
        把你現在的想法說出來，我陪你換一個角度看看。
      </p >

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 18,
          padding: 20,
          minHeight: 420,
          background: '#fffdf9',
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: '#999' }}>
            例如：「我最近不知道自己想要什麼。」
          </p >
        )}

        {messages.map((message, index) => (
          <div key={index} style={{ margin: '18px 0' }}>
            <strong>
              {message.role === 'user' ? '你' : '朝向自由 AI'}
            </strong>

            <div
              style={{
                whiteSpace: 'pre-wrap',
                marginTop: 6,
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ margin: '18px 0', color: '#777' }}>
            朝向自由 AI 正在思考……
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 14,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="輸入你現在想聊的事……"
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 12,
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0 20px',
            borderRadius: 12,
            border: 0,
          }}
        >
          {loading ? '思考中' : '送出'}
        </button>
      </form>
    </main>
  );
}
