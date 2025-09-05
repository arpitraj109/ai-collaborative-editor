import axios from "axios";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return "Error fetching response";
  }
};

export const getAIEdit = async (action, text) => {
  let prompt;
  
  if (action === "convert to table") {
    prompt = `Convert the following text into a well-formatted table. Use markdown table format with proper headers and rows:\n\n"${text}"`;
  } else if (action === "improve") {
    prompt = `Improve the writing quality, clarity, and flow of the following text while maintaining its original meaning:\n\n"${text}"`;
  } else if (action === "summarize") {
    prompt = `Provide a concise summary of the following text, capturing the key points:\n\n"${text}"`;
  } else if (action === "shorten") {
    prompt = `Make the following text more concise while preserving all important information:\n\n"${text}"`;
  } else {
    prompt = `Please ${action} the following text:\n\n"${text}"`;
  }
  
  return await getAIResponse(prompt);
};

export const runAgent = async (query) => {
  try {
    const searchQuery = encodeURIComponent(query);
    const ddgUrl = `https://duckduckgo.com/?q=${searchQuery}&ia=web`;

    const response = await fetch(`https://r.jina.ai/https://duckduckgo.com/html/?q=${searchQuery}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    
    const content = data
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 20 && !line.includes('<') && !line.includes('>'))
      .slice(0, 50)
      .join('\n');

    const prompt = `You are a helpful research assistant. Based on the following search results for the query "${query}", create a well-formatted article-style response that would fit well in a document editor. 

Format it as a proper article with:
- A clear title
- An introduction paragraph
- Key findings in bullet points
- A summary section
- Relevant links (if any)

Make it look like professional content that someone would want to insert into their document. Avoid raw URLs and make it editor-friendly.

Search Results:
${content}`;

    const summary = await getAIResponse(prompt);
    return summary;
  } catch (e) {
    console.error("Agent error", e);
    return `❌ **Search Error**\n\nI encountered an issue while searching for "${query}". Please try again or rephrase your search query.\n\n*Error: ${e.message}*`;
  }
};
