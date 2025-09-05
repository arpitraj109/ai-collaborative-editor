import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";

export default function EditorWrapper({ setEditorRef }) {
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ 
        placeholder: "Welcome to the AI Collaborative Editor! Start writing your document here...",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true
      }),
    ],
    content: "",
    autofocus: true,
    onUpdate: ({ editor }) => {
      const isEmpty = editor.isEmpty;
      setShowPlaceholder(isEmpty);
    },
    onFocus: () => {
      setShowPlaceholder(false);
    },
    onBlur: ({ editor }) => {
      setShowPlaceholder(editor.isEmpty);
    }
  });

  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (editor && setEditorRef) {
      setEditorRef(editor);
    }
  }, [editor, setEditorRef]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Toolbar editor={editor} />
      <div 
        ref={containerRef} 
        className="flex-1 overflow-auto bg-white"
        style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'white'
        }}
      >
        <div className="max-w-4xl mx-auto p-4">
          <div 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg"
            style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden'
            }}
          >
            <EditorContent 
              editor={editor} 
              className="min-h-[500px] p-6 prose prose-lg max-w-none focus:outline-none" 
              style={{
                minHeight: '500px',
                padding: '1.5rem',
                fontSize: '1.125rem',
                lineHeight: '1.75',
                outline: 'none',
                backgroundColor: 'white'
              }}
            />
            {showPlaceholder && (
              <div
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  left: '1.5rem',
                  color: '#9ca3af',
                  fontSize: '1.125rem',
                  lineHeight: '1.75',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                Welcome to the AI Collaborative Editor! Start writing your document here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
