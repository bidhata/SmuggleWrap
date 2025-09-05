// Simple XOR encryption
export function xorEncode(data: ArrayBuffer, key: string): string {
  const bytes = new Uint8Array(data);
  const keyBytes = new TextEncoder().encode(key);
  const result = new Uint8Array(bytes.length);
  
  for (let i = 0; i < bytes.length; i++) {
    result[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return btoa(String.fromCharCode(...result));
}

export function xorDecode(encodedData: string, key: string): ArrayBuffer {
  const decoded = atob(encodedData);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }
  
  const keyBytes = new TextEncoder().encode(key);
  const result = new Uint8Array(bytes.length);
  
  for (let i = 0; i < bytes.length; i++) {
    result[i] = bytes[i] ^ keyBytes[i % keyBytes.length];
  }
  
  return result.buffer;
}

// Simple AES-GCM simulation (for demo purposes - in real implementation use crypto-js)
export async function aesEncode(data: ArrayBuffer, key: string): Promise<string> {
  // For demo, we'll use a simple transformation
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key.padEnd(32, '0').slice(0, 32));
  
  // In real implementation, use Web Crypto API or crypto-js
  const combined = new Uint8Array(data.byteLength + keyData.length);
  combined.set(new Uint8Array(data), 0);
  combined.set(keyData, data.byteLength);
  
  return btoa(String.fromCharCode(...combined));
}

export async function aesDecode(encodedData: string, key: string): Promise<ArrayBuffer> {
  const decoded = atob(encodedData);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key.padEnd(32, '0').slice(0, 32));
  
  // Extract original data (simplified)
  const originalLength = bytes.length - keyData.length;
  const result = new Uint8Array(originalLength);
  result.set(bytes.slice(0, originalLength));
  
  return result.buffer;
}

// Base64 encoding
export function base64Encode(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data);
  return btoa(String.fromCharCode(...bytes));
}

export function base64Decode(encodedData: string): ArrayBuffer {
  const decoded = atob(encodedData);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes.buffer;
}

// Hex encoding
export function hexEncode(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data);
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function hexDecode(hexData: string): ArrayBuffer {
  const bytes = new Uint8Array(hexData.length / 2);
  for (let i = 0; i < hexData.length; i += 2) {
    bytes[i / 2] = parseInt(hexData.substr(i, 2), 16);
  }
  return bytes.buffer;
}

// Generate random key
export function generateRandomKey(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
