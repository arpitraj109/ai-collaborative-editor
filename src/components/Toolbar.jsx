import React from "react";
import { Bold, Italic, Heading2, Trash2, Sparkles, AlignLeft, Scissors } from "lucide-react";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  const buttonClass = (isActive = false) => {
    return `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
    }`;
  };

  const handleAIAction = async (action) => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " \n");
    
    if (selectedText.trim()) {
      const { getAIEdit } = await import("../api/apiService");
      const suggestion = await getAIEdit(action, selectedText);
      editor.chain().focus().insertContentAt({ from, to }, suggestion).run();
    } else {
      const prompts = {
        improve: "Please improve the following text: ",
        summarize: "Please summarize the following text: ",
        shorten: "Please make the following text shorter: ",
      };
      editor.chain().focus().insertContent(prompts[action]).run();
    }
  };


  return (
    <div 
      className="px-4 lg:px-6 py-3 bg-white border-b border-gray-200 sticky top-16 z-40"
      style={{
        padding: '0.75rem 1.5rem',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: '4rem',
        zIndex: 40
      }}
    >
      <div 
        className="flex flex-wrap gap-3 mb-3"
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.75rem', 
          marginBottom: '0.75rem',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => handleAIAction("improve")}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e5e7eb';
            e.target.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          <Sparkles size={16} style={{ color: '#3b82f6' }} />
          Improve Writing
        </button>
        <button
          onClick={() => handleAIAction("summarize")}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e5e7eb';
            e.target.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          <AlignLeft size={16} style={{ color: '#10b981' }} />
          Summarize
        </button>
      <button
          onClick={() => handleAIAction("shorten")}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e5e7eb';
            e.target.style.borderColor = '#9ca3af';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
            e.target.style.borderColor = '#d1d5db';
          }}
        >
          <Scissors size={16} style={{ color: '#8b5cf6' }} />
          Make Shorter
        </button>
      </div>

      <div 
        className="flex flex-wrap gap-3"
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.75rem',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: editor.isActive("bold") ? '#2563eb' : '#f3f4f6',
            color: editor.isActive("bold") ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Bold size={16} />
        Bold
      </button>
              <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: editor.isActive("italic") ? '#2563eb' : '#f3f4f6',
            color: editor.isActive("italic") ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Italic size={16} />
        Italic
      </button>
              <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: editor.isActive("heading", { level: 2 }) ? '#2563eb' : '#f3f4f6',
            color: editor.isActive("heading", { level: 2 }) ? 'white' : '#374151',
            border: '1px solid #d1d5db',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Heading2 size={16} />
        H2
      </button>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all content?')) {
              editor.chain().focus().clearContent().run();
            }
          }}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            minHeight: '2.75rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fee2e2';
            e.target.style.borderColor = '#fca5a5';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#fef2f2';
            e.target.style.borderColor = '#fecaca';
          }}
          title="Clear all content"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>
    </div>
  );
}
