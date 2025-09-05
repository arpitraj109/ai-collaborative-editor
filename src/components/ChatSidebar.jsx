import React, { useState } from "react";
import { getAIResponse, runAgent } from "../api/apiService";
import { X } from "lucide-react";

export default function ChatSidebar({ onInsertToEditor, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiReply = input.startsWith("/agent ")
      ? await runAgent(input.replace("/agent ", ""))
      : await getAIResponse(input);
    const aiMessage = { role: "assistant", content: aiReply };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
    setInput("");
  };

  return (
    <>
      <aside 
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 
          bg-gradient-to-b from-white via-gray-50/95 to-white/95 backdrop-blur-sm shadow-2xl border-l border-gray-200/50
          flex flex-col z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: window.innerWidth >= 640 ? '24rem' : '100%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 0.95) 50%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          borderLeft: '1px solid rgba(229, 231, 235, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <header 
          className="p-4 sm:p-6 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
            background: 'linear-gradient(90deg, rgba(239, 246, 255, 0.5) 0%, rgba(238, 242, 255, 0.5) 100%)'
          }}
        >
          <div 
            className="flex items-center justify-between"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div 
              className="flex items-center gap-3"
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <div 
                className="w-8 h-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  width: '2rem',
                  height: '2rem',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <span 
                  className="text-white font-bold text-sm"
                  style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}
                >
                  AI
                </span>
              </div>
              <h2 
                className="text-lg font-semibold text-gray-900"
                style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}
              >
        AI Assistant
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              style={{
                padding: '0.5rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close AI Assistant"
            >
              <X size={20} style={{ color: '#6b7280' }} />
            </button>
          </div>
          <p 
            className="text-sm text-gray-500 mt-1"
            style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}
          >
            Chat with AI or use web search
          </p>
          <div 
            className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
            style={{ 
              marginTop: '0.5rem', 
              padding: '0.75rem', 
              background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)', 
              borderRadius: '0.5rem',
              fontSize: '0.75rem',
              color: '#1e40af',
              border: '1px solid #bfdbfe'
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              💬 <strong>Chat:</strong> Ask questions, get help with writing
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              🔍 <strong>Web Search:</strong> <code>/agent search</code>
            </div>
            <div>
              ✨ <strong>Editor Tools:</strong> Select text to see AI editing options
            </div>
          </div>
      </header>

        <div 
          className="flex-1 p-3 sm:p-4 overflow-auto space-y-3 sm:space-y-4"
          style={{ 
            flex: 1, 
            padding: '0.75rem 1rem', 
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {messages.length === 0 && (
            <div 
              className="text-center py-6 sm:py-8"
              style={{ 
                textAlign: 'center', 
                padding: '2rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}
            >
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  width: '4rem',
                  height: '4rem',
                  background: 'linear-gradient(135deg, #eef2ff 0%, #f3e8ff 50%, #fce7f3 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}
              >
                <span 
                  className="text-xl sm:text-2xl"
                  style={{ fontSize: '1.5rem' }}
                >
                  🤖
                </span>
              </div>
              <p 
                className="text-gray-500 text-sm"
                style={{ color: '#6b7280', fontSize: '0.875rem' }}
              >
                Start a conversation with the AI assistant
              </p>
            </div>
          )}
          
        {messages.map((msg, i) => (
          <div
            key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
                style={{
                  boxShadow: msg.role === "user" 
                    ? '0 10px 15px -3px rgba(59, 130, 246, 0.3)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div 
                  className="prose prose-sm max-w-none"
                  style={{
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/^# (.*$)/gm, '<h1 style="font-size: 1.25rem; font-weight: 700; margin: 1rem 0 0.5rem 0; color: #1f2937;">$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2 style="font-size: 1.125rem; font-weight: 600; margin: 0.75rem 0 0.5rem 0; color: #374151;">$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3 style="font-size: 1rem; font-weight: 600; margin: 0.5rem 0 0.25rem 0; color: #4b5563;">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #1f2937;">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em style="font-style: italic; color: #4b5563;">$1</em>')
                      .replace(/^• (.*$)/gm, '<div style="margin-left: 1rem; margin-bottom: 0.25rem; display: flex; align-items: flex-start;"><span style="color: #3b82f6; margin-right: 0.5rem; margin-top: 0.1rem;">•</span><span>$1</span></div>')
                      .replace(/^- (.*$)/gm, '<div style="margin-left: 1rem; margin-bottom: 0.25rem; display: flex; align-items: flex-start;"><span style="color: #3b82f6; margin-right: 0.5rem; margin-top: 0.1rem;">-</span><span>$1</span></div>')
                      .replace(/^(\d+)\. (.*$)/gm, '<div style="margin-left: 1rem; margin-bottom: 0.25rem; display: flex; align-items: flex-start;"><span style="color: #3b82f6; margin-right: 0.5rem; font-weight: 600;">$1.</span><span>$2</span></div>')
                      .replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 1rem 0;">')
                      .replace(/🔍/g, '<span style="color: #3b82f6;">🔍</span>')
                      .replace(/❌/g, '<span style="color: #ef4444;">❌</span>')
                      .replace(/✨/g, '<span style="color: #f59e0b;">✨</span>')
                      .replace(/\n\n/g, '<div style="margin-bottom: 0.75rem;"></div>')
                  }}
                />
            {msg.role === "assistant" && (
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onInsertToEditor(msg.content)}
                      className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
                        boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        color: 'white',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #059669 0%, #0f766e 100%)';
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                >
                      ✨ Insert into Editor
              </button>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  display: 'flex', 
                  alignItems: 'center',
                  fontStyle: 'italic'
                }}>
                  Ready to insert formatted content
                </div>
              </div>
            )}
              </div>
          </div>
        ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
      </div>

        <div 
          className="border-t border-gray-200/50 bg-gradient-to-br from-slate-50/95 via-blue-50/80 to-indigo-50/95 backdrop-blur-sm"
          style={{
            borderTop: '1px solid rgba(229, 231, 235, 0.5)',
            background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(239, 246, 255, 0.8) 50%, rgba(238, 242, 255, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            padding: '1.25rem',
            position: 'relative'
          }}
        >
          <div 
            className="flex items-center justify-between mb-4"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}
          >
            <div 
              className="flex items-center gap-2"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <div 
                className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  backgroundColor: '#34d399',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}
              />
              <span 
                className="text-xs font-medium text-gray-600"
                style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: '500', 
                  color: '#4b5563' 
                }}
              >
                AI Assistant Ready
              </span>
            </div>
            <div 
              className="text-xs text-gray-500"
              style={{ fontSize: '0.75rem', color: '#6b7280' }}
            >
              {messages.length} messages
            </div>
          </div>

          <div 
            className="grid grid-cols-3 gap-3 mb-4"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr', 
              gap: '0.75rem',
              marginBottom: '1rem',
              alignItems: 'stretch'
            }}
          >
            <button
              onClick={(e) => {
                e.target.style.transform = 'scale(0.95)';
                e.target.style.backgroundColor = '#dbeafe';
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
                
                setTimeout(() => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '#f0f9ff';
                  e.target.style.borderColor = '#bae6fd';
                  e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.1)';
                }, 200);
                
                setInput("Help me improve my writing");
                setTimeout(() => {
                  const inputElement = document.querySelector('input[type="text"]');
                  if (inputElement) {
                    inputElement.focus();
                    inputElement.select();
                  }
                }, 100);
              }}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '0.875rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                backgroundColor: '#f0f9ff',
                color: '#0369a1',
                border: '1px solid #bae6fd',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '3rem',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0f2fe';
                e.target.style.borderColor = '#7dd3fc';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f0f9ff';
                e.target.style.borderColor = '#bae6fd';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.1)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>✨</span>
              <span>Writing</span>
            </button>
            <button
              onClick={(e) => {
                e.target.style.transform = 'scale(0.95)';
                e.target.style.backgroundColor = '#dcfce7';
                e.target.style.borderColor = '#10b981';
                e.target.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.3)';
                
                setTimeout(() => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '#f0fdf4';
                  e.target.style.borderColor = '#bbf7d0';
                  e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.1)';
                }, 200);
                
                setInput("/agent search ");
                setTimeout(() => {
                  const inputElement = document.querySelector('input[type="text"]');
                  if (inputElement) {
                    inputElement.focus();
                    inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
                  }
                }, 100);
              }}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '0.875rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '3rem',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dcfce7';
                e.target.style.borderColor = '#86efac';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 16px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f0fdf4';
                e.target.style.borderColor = '#bbf7d0';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(16, 185, 129, 0.1)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>🔍</span>
              <span>Search</span>
            </button>
            <button
              onClick={(e) => {
                e.target.style.transform = 'scale(0.95)';
                e.target.style.backgroundColor = '#fef08a';
                e.target.style.borderColor = '#f59e0b';
                
                setTimeout(() => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = '#fef3c7';
                  e.target.style.borderColor = '#fde68a';
                }, 150);
                
                setInput("");
                setTimeout(() => {
                  const inputElement = document.querySelector('input[type="text"]');
                  if (inputElement) inputElement.focus();
                }, 100);
              }}
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '0.875rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                border: '1px solid #fde68a',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(245, 158, 11, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '3rem',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#fef08a';
                e.target.style.borderColor = '#facc15';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 16px rgba(245, 158, 11, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fef3c7';
                e.target.style.borderColor = '#fde68a';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(245, 158, 11, 0.1)';
              }}
            >
              <span style={{ fontSize: '1rem' }}>✏️</span>
              <span>Clear</span>
            </button>
      </div>

          <div style={{ position: 'relative' }}>
            <div 
              className="relative bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm"
              style={{
                position: 'relative',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(229, 231, 235, 0.6)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
        <input
          type="text"
                placeholder="Ask me anything or use quick actions above..."
                className="w-full bg-transparent border-0 rounded-xl px-4 py-3 pr-14 focus:outline-none text-sm placeholder-gray-500"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 3.5rem 0.75rem 1rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  color: '#374151'
                }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                onFocus={(e) => {
                  e.target.parentElement.style.borderColor = '#3b82f6';
                  e.target.parentElement.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.parentElement.style.borderColor = input.trim() ? '#3b82f6' : 'rgba(229, 231, 235, 0.6)';
                  e.target.parentElement.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
              />
              
              {input.trim() && (
        <button
          onClick={sendMessage}
                  style={{
                    position: 'absolute',
                    right: '0.375rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    padding: '0.5rem 0.875rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '2rem',
                    height: '2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)';
                    e.target.style.transform = 'translateY(-50%) scale(1.05)';
                    e.target.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                    e.target.style.boxShadow = '0 2px 4px rgba(59, 130, 246, 0.3)';
                  }}
        >
          Send
        </button>
              )}
            </div>
            
            {input.trim() && (
              <div 
                className="flex items-center justify-between mt-2 px-1"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                  paddingLeft: '0.25rem',
                  paddingRight: '0.25rem'
                }}
              >
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#6b7280',
                  margin: 0
                }}>
                  Press Enter or click Send to submit
                </p>
                <div 
                  className="flex items-center gap-1"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <div 
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    style={{
                      width: '0.375rem',
                      height: '0.375rem',
                      backgroundColor: '#60a5fa',
                      borderRadius: '50%'
                    }}
                  />
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    Ready
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
    </aside>
    </>
  );
}
