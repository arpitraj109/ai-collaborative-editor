import React, { useState } from "react";
import EditorWrapper from "./components/EditorWrapper";
import ChatSidebar from "./components/ChatSidebar";
import {  X, MessageSquare } from "lucide-react";

export default function App() {
  const [editorRef, setEditorRef] = React.useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div 
      className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #eef2ff 0%, #f3e8ff 50%, #fce7f3 100%)'
      }}
    >
      <div className="flex-1 flex flex-col" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header 
          className="px-4 lg:px-6 py-4 bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50"
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }}
        >
          <div className="flex items-center gap-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div 
              className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span 
                className="text-white font-bold text-sm lg:text-base"
                style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}
              >
                AI
              </span>
            </div>
            <h1 
              className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              AI Collaborative Editor
            </h1>
          </div>
          
          <div 
            className="flex items-center gap-3"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem'
            }}
          >
            <div 
              className="hidden sm:block text-sm text-gray-600"
              style={{ 
                fontSize: '0.875rem',
                color: '#6b7280'
              }}
            >
              Select text to see AI tools
            </div>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md"
              style={{
                padding: '0.5rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={isChatOpen ? "Close AI Assistant" : "Open AI Assistant"}
            >
              {isChatOpen ? <X size={20} /> : <MessageSquare size={20} />}
            </button>
          </div>
        </header>

        <EditorWrapper setEditorRef={setEditorRef} />
      </div>

      <ChatSidebar
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onInsertToEditor={(text) => {
          if (editorRef) {
            editorRef.chain().focus().clearContent().insertContent(text).run();
          }
        }}
      />
    </div>
  );
}
