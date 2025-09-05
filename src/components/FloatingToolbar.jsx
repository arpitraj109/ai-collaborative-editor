import React from "react";
import { Sparkles, Scissors, AlignLeft, Table } from "lucide-react";

export default function FloatingToolbar({ position, onAction }) {
  
  React.useEffect(() => {
    if (position) {
      console.log('Floating toolbar showing at:', position);
    } else {
      console.log('Floating toolbar hidden');
    }
  }, [position]);

  if (!position) return null;

  return (
    <div
      className="absolute bg-white shadow-lg rounded-lg border border-gray-200 p-2 flex gap-1 z-50"
      style={{
        top: position.top - 10,
        left: position.left,
        transform: "translate(-50%, -100%)",
        backgroundColor: 'white',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        padding: '0.75rem',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 50,
        minWidth: 'fit-content',
        backdropFilter: 'blur(8px)'
      }}
    >
      <button
        onClick={() => onAction("improve")}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f3f4f6';
        }}
      >
        <Sparkles size={14} style={{ color: '#3b82f6' }} />
        Improve
      </button>
      <button
        onClick={() => onAction("summarize")}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f3f4f6';
        }}
      >
        <AlignLeft size={14} style={{ color: '#10b981' }} />
        Summarize
      </button>
      <button
        onClick={() => onAction("shorten")}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f3f4f6';
        }}
      >
        <Scissors size={14} style={{ color: '#8b5cf6' }} />
        Shorten
      </button>
      <button
        onClick={() => onAction("convert to table")}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e5e7eb';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f3f4f6';
        }}
      >
        <Table size={14} style={{ color: '#f59e0b' }} />
        Table
      </button>
    </div>
  );
}
