import express from 'express';

const router = express.Router();

interface AIRequest {
  model?: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

router.post('/ai', async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return res.status(503).json({ error: 'AI service not configured' });
    }

    const aiRequest: AIRequest = req.body;
    
    // Default to Claude Haiku for cost-effectiveness
    const model = aiRequest.model || 'anthropic/claude-3-haiku';
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/bidhata/stealthdrop',
        'X-Title': 'StealthDrop AI Enhancement'
      },
      body: JSON.stringify({
        model,
        messages: aiRequest.messages,
        temperature: aiRequest.temperature || 0.7,
        max_tokens: aiRequest.max_tokens || 500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', errorText);
      return res.status(response.status).json({ error: 'AI service unavailable' });
    }

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    console.error('AI service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;