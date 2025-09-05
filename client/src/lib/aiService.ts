// AI-powered content generation and optimization service

interface AIRequest {
  model?: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface AIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class AIService {
  private apiKey: string | null = null;
  private baseUrl = '/api/ai'; // We'll proxy through our backend

  constructor() {
    // API key will be handled by backend
  }

  private async makeRequest(payload: AIRequest): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const data: AIResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.warn('AI service unavailable, using fallback');
      return '';
    }
  }

  async generateFakeDocumentContent(context: {
    fileType: string;
    fileName: string;
    targetAudience?: string;
    documentType?: string;
  }): Promise<{ title: string; content: string }> {
    const { fileType, fileName, targetAudience = 'corporate', documentType = 'business' } = context;
    
    const systemPrompt = `You are an expert at creating realistic business document content for security testing purposes. Generate professional, believable document content that would be found in a corporate environment.`;
    
    const userPrompt = `Create a realistic ${documentType} document that would justify downloading a ${fileType} file named "${fileName}". 
    Target audience: ${targetAudience}
    
    Requirements:
    - Professional tone and formatting
    - Realistic company/business context
    - Logical reason for file attachment
    - Include typical business elements (dates, names, departments)
    - 200-400 words of content
    - HTML formatted with proper styling
    
    Return JSON format: {"title": "Document Title", "content": "HTML content"}`;

    try {
      const response = await this.makeRequest({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      if (response) {
        const parsed = JSON.parse(response);
        return parsed;
      }
    } catch (error) {
      console.warn('AI content generation failed, using fallback');
    }

    // Fallback to original templates
    return this.getFallbackContent(fileType, fileName);
  }

  async generateObfuscationStrategy(codeComplexity: 'basic' | 'advanced' | 'expert'): Promise<{
    variableNaming: string;
    stringObfuscation: string;
    controlFlowPattern: string;
    antiAnalysisTechniques: string[];
  }> {
    const systemPrompt = `You are a code obfuscation expert specializing in JavaScript evasion techniques. Generate sophisticated obfuscation strategies for security testing.`;
    
    const userPrompt = `Generate a ${codeComplexity} JavaScript obfuscation strategy for HTML payload generation.
    
    Requirements:
    - Variable naming patterns that look legitimate
    - String obfuscation techniques
    - Control flow obfuscation methods
    - Anti-analysis techniques appropriate for ${codeComplexity} level
    
    Return JSON format with specific techniques and patterns.`;

    try {
      const response = await this.makeRequest({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 800
      });

      if (response) {
        const parsed = JSON.parse(response);
        return parsed;
      }
    } catch (error) {
      console.warn('AI obfuscation strategy failed, using fallback');
    }

    // Fallback strategy
    return this.getFallbackObfuscation(codeComplexity);
  }

  async optimizePayloadForTarget(targetInfo: {
    environment: string;
    securityLevel: string;
    expectedFilters: string[];
  }): Promise<{
    recommendedMethod: string;
    stealthFeatures: string[];
    customizations: Record<string, any>;
  }> {
    const systemPrompt = `You are a cybersecurity expert specializing in payload optimization and evasion techniques. Provide recommendations for bypassing specific security controls.`;
    
    const userPrompt = `Optimize HTML payload generation for this target environment:
    
    Environment: ${targetInfo.environment}
    Security Level: ${targetInfo.securityLevel}
    Expected Filters: ${targetInfo.expectedFilters.join(', ')}
    
    Provide specific recommendations for:
    - Best encoding method
    - Stealth features to enable
    - Custom configuration options
    - Timing and delivery suggestions
    
    Return JSON format with actionable recommendations.`;

    try {
      const response = await this.makeRequest({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.6,
        max_tokens: 600
      });

      if (response) {
        const parsed = JSON.parse(response);
        return parsed;
      }
    } catch (error) {
      console.warn('AI payload optimization failed, using fallback');
    }

    return this.getFallbackOptimization(targetInfo);
  }

  async generateContextualVariableNames(context: string, count: number = 10): Promise<string[]> {
    const systemPrompt = `Generate realistic variable names that would appear in legitimate ${context} code.`;
    
    const userPrompt = `Generate ${count} realistic JavaScript variable names for ${context} context. 
    Names should look legitimate and blend with normal code.
    Return as JSON array: ["name1", "name2", ...]`;

    try {
      const response = await this.makeRequest({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 200
      });

      if (response) {
        const parsed = JSON.parse(response);
        return parsed;
      }
    } catch (error) {
      console.warn('AI variable name generation failed, using fallback');
    }

    // Fallback names
    return this.generateRandomNames(count);
  }

  private getFallbackContent(fileType: string, fileName: string) {
    const templates = [
      {
        title: "Document Processing Update",
        content: `<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;"><h1>Document Processing Update</h1><p>Dear Team,</p><p>We have completed processing your ${fileType} file: <strong>${fileName}</strong></p><p>The document has been reviewed and approved for distribution. Please download and review at your earliest convenience.</p><p>Best regards,<br>Document Management Team</p></div>`
      }
    ];
    return templates[0];
  }

  private getFallbackObfuscation(complexity: string) {
    return {
      variableNaming: 'camelCase with business terms',
      stringObfuscation: 'base64 + splitting',
      controlFlowPattern: 'nested conditionals',
      antiAnalysisTechniques: ['timing checks', 'environment detection']
    };
  }

  private getFallbackOptimization(targetInfo: any) {
    return {
      recommendedMethod: 'aes',
      stealthFeatures: ['fakeContent', 'antiAnalysis', 'randomDelay'],
      customizations: { storageMethod: 'css' }
    };
  }

  private generateRandomNames(count: number): string[] {
    const prefixes = ['config', 'data', 'user', 'app', 'system', 'client', 'session'];
    const suffixes = ['Manager', 'Handler', 'Service', 'Controller', 'Helper', 'Utils'];
    const names = [];
    
    for (let i = 0; i < count; i++) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      names.push(prefix + suffix);
    }
    
    return names;
  }
}

export const aiService = new AIService();