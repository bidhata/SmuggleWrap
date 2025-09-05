# StealthDrop by @Bidhata

**Version:** 1.0.0  
**License:** MIT  
**Category:** Security Research Tool 

StealthDrop is a professional HTML payload generator designed for authorized security testing and red team operations. It allows security researchers to encode files into various formats and generate self-extracting HTML payloads that can bypass content filters and demonstrate browser-based security vulnerabilities.

## 🛡️ Security Notice

**⚠️ IMPORTANT:** This tool is designed exclusively for authorized security testing, penetration testing, and red team operations. Use only in controlled environments with proper authorization. Unauthorized use may violate laws and regulations.

- ✅ Obtain proper authorization before testing
- ✅ Use only in isolated test environments  
- ✅ Follow responsible disclosure practices
- ❌ Do not use against systems you don't own or have permission to test

## 🚀 Features

### Core Functionality
- **Multi-format encoding**: Support for CSS, XOR, AES-GCM, Base64, and Hex encoding
- **Self-extracting payloads**: Generated HTML files automatically extract and download embedded files
- **Stealth mode**: Hide payload data in CSS variables for enhanced concealment
- **Auto-download**: Configurable automatic file extraction with random delays (1-4 seconds)
- **File type agnostic**: Support for any file type and size

### Encoding Methods

| Method | Description | Security Level | Use Case |
|--------|-------------|----------------|----------|
| **CSS Encoding** | Hides data in CSS variables | Medium | Bypass basic content filters |
| **XOR Encryption** | Simple XOR cipher with custom key | Low-Medium | Quick obfuscation |
| **AES-GCM** | Strong encryption with authentication | High | Maximum security (recommended) |
| **Base64** | Standard base64 encoding | Low | Simple encoding |
| **Hex** | Hexadecimal representation | Low | Alternative encoding |

### Advanced Features
- **Drag & drop file upload** with visual feedback
- **Real-time payload preview** with syntax highlighting
- **Progress indicators** during payload generation
- **Responsive dark theme** interface optimized for security professionals
- **Random download delays** to simulate realistic user behavior
- **Chunked encoding** for large file support (no size limits)

## 🏗️ Architecture

### Frontend Stack
- **React 18+** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** with custom dark theme
- **Radix UI** components for accessibility
- **TanStack Query** for state management

### Backend Stack
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **Session management** with secure storage
- **RESTful API** architecture

### Security Implementation
- **Client-side encoding** - No sensitive data leaves the browser
- **Chunked processing** - Handles large files without memory issues
- **Secure key generation** - Cryptographically secure random keys
- **Input validation** - Comprehensive validation and error handling

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/bidhata/StealthDrop
   cd stealthdrop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   ```
   http://localhost:5000
   ```

## 🎯 Usage Guide

### Basic Workflow

1. **Upload File**
   - Drag and drop any file into the upload area
   - Or click to browse and select a file
   - Supported: All file types and sizes

2. **Select Encoding Method**
   - Choose from 5 encoding methods
   - AES-GCM recommended for maximum security
   - Each method has different bypass capabilities

3. **Configure Settings**
   - **Encryption Key**: Custom key or auto-generated
   - **Auto-download**: Enable/disable automatic extraction
   - **Stealth Mode**: Hide payload in CSS variables

4. **Generate Payload**
   - Click "Generate HTML Payload"
   - Monitor progress with real-time indicator
   - Preview generated code with syntax highlighting

5. **Deploy Payload**
   - Download the generated HTML file
   - Deploy to target environment
   - File automatically extracts when opened in browser

### Advanced Configuration

#### Custom Encryption Keys
```javascript
// Strong password-based key
const customKey = "MySecurePassword123!";

// Cryptographically secure random key (recommended)
const randomKey = generateRandomKey(32);
```

#### Stealth Mode Configuration
When enabled, payload data is hidden in CSS custom properties:

```css
:root {
  --payload-data: 'eyJkYXRhIjoidGVzdCJ9...';
  --payload-name: 'document.pdf';
  --payload-type: 'application/pdf';
}
```

#### Random Download Delays
Configurable delay ranges to simulate realistic user behavior:
- **Minimum delay**: 1 second
- **Maximum delay**: 4 seconds  
- **Purpose**: Evade automated detection systems

## 🔧 API Reference

### Core Functions

#### `generatePayload(fileData, config)`
Generates HTML payload with embedded file data.

**Parameters:**
- `fileData`: Object containing file and content
- `config`: Configuration object with encoding settings

**Returns:** Promise\<string> - Generated HTML payload

#### `encodeFile(data, method, key?)`
Encodes file data using specified method.

**Parameters:**
- `data`: ArrayBuffer of file content
- `method`: Encoding method ('css', 'xor', 'aes', 'base64', 'hex')
- `key`: Optional encryption key

**Returns:** Encoded data string

### Configuration Schema

```typescript
interface Config {
  method: 'css' | 'xor' | 'aes' | 'base64' | 'hex';
  encryptionKey: string;
  autoDownload: boolean;
  stealthMode: boolean;
}
```

## 🛠️ Development

### Project Structure
```
stealthdrop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/           # Utility functions and encoders
│   │   ├── pages/         # Application pages
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage interface
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
└── package.json
```

### Key Components

- **FileUpload**: Drag & drop file upload with validation
- **MethodSelection**: Encoding method selection interface  
- **ConfigurationPanel**: Settings and options configuration
- **GenerationPanel**: Payload generation and download
- **PayloadPreview**: Real-time code preview with highlighting

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Database migrations
npm run db:migrate
```

## 🧪 Testing

### Security Testing Scenarios

1. **Content Filter Bypass**
   - Test CSS variable hiding against content scanners
   - Verify encoding methods against signature detection

2. **Payload Extraction**
   - Confirm reliable file extraction across browsers
   - Test large file handling and memory usage

3. **Stealth Capabilities**
   - Validate CSS hiding effectiveness
   - Test random delay timing variations

### Browser Compatibility

| Browser | Version | Support | Notes |
|---------|---------|---------|--------|
| Chrome | 90+ | ✅ Full | Recommended |
| Firefox | 88+ | ✅ Full | Complete support |
| Safari | 14+ | ✅ Full | WebKit compatible |
| Edge | 90+ | ✅ Full | Chromium-based |

## 🔐 Security Considerations

### Payload Security
- **Client-side processing**: All encoding happens in the browser
- **No data transmission**: Files never leave the user's machine during encoding
- **Secure key generation**: Uses cryptographically secure random number generation
- **Memory cleanup**: Automatic cleanup of sensitive data

### Deployment Security
- **HTTPS required**: Always deploy over secure connections
- **Content Security Policy**: Implement appropriate CSP headers
- **Input validation**: Comprehensive file type and size validation
- **Error handling**: Secure error messages without information disclosure

## 📈 Performance

### Optimization Features
- **Chunked processing**: Handles files of any size without memory limits
- **Lazy loading**: Components load only when needed
- **Progress tracking**: Real-time feedback during generation
- **Efficient encoding**: Optimized algorithms for speed and reliability

### Benchmarks
- **Small files** (< 1MB): ~100ms generation time
- **Medium files** (1-10MB): ~500ms generation time  
- **Large files** (> 10MB): ~2-5s generation time
- **Memory usage**: Minimal overhead with chunked processing

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Use ESLint and Prettier for code formatting
3. Write comprehensive tests for new features
4. Update documentation for API changes
5. Follow security best practices

### Security Contributions
- Report vulnerabilities privately
- Include proof-of-concept when possible
- Follow responsible disclosure timeline
- Test fixes thoroughly before submission

## 📄 License

MIT License - see LICENSE file for details.

## ⚠️ Disclaimer

This tool is provided for educational and authorized security testing purposes only. The developers are not responsible for any misuse or damage caused by this tool. Users are solely responsible for ensuring they have proper authorization before using this tool against any systems.


---

**StealthDrop v1.0.0** - Professional HTML Payload Generator for Security Research
