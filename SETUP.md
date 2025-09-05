# AI Collaborative Editor - Setup Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up API key:**
   - Create a `.env` file in the project root
   - Add your OpenRouter API key:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```
   - Get your API key from: https://openrouter.ai/keys

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## ✨ Features Implemented

### ✅ Core Features
- **Rich Text Editor** with TipTap
- **AI Chat Sidebar** with OpenRouter integration
- **Floating AI Toolbar** on text selection
- **Preview Modal** for AI suggestions
- **Web Search Agent** with `/agent` command

### 🎯 How to Test

1. **Chat with AI:**
   - Type "Hello AI" in the chat sidebar
   - Try: `/agent search for latest news`

2. **AI Text Editing:**
   - Type some text in the editor
   - Select the text with your mouse
   - See the floating toolbar appear
   - Click "Improve", "Summarize", or "Make Shorter"

3. **Preview Modal:**
   - After selecting an AI action, see the preview modal
   - Compare original vs AI suggestion
   - Click "Apply Changes" or "Cancel"

## 🔧 Troubleshooting

- **Floating toolbar not showing?** Make sure you select text (not just click)
- **AI not responding?** Check your API key in `.env` file
- **Styling issues?** The app uses inline styles as fallback

## 📱 Responsive Design
- Desktop: Sidebar always visible
- Mobile: Sidebar slides in/out
- Touch-friendly buttons and interactions
