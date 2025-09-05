# StealthDrop 🛡️

> Advanced HTML Payload Generator for Security Research & Red Team Operations

**StealthDrop** is a sophisticated HTML smuggling payload generator designed for authorized security testing and red team engagements. It transforms any file into self-contained HTML payloads that bypass content filters and evade detection through advanced stealth techniques.

## ✨ Features

### Core Functionality
- **📁 Universal File Support** - Wrap any file type into HTML payloads
- **⚡ One-Click Generation** - Generate payloads with a single click
- **🔄 Auto-Extraction** - Payloads automatically extract and download files when opened
- **🎯 Multiple Encoding Methods** - Choose from 5 different encoding strategies

### Encoding Methods
- **🎨 CSS Encoding** - Hide data in CSS variables for maximum stealth
- **🔐 XOR Encryption** - Simple XOR cipher with custom keys
- **🛡️ AES-GCM Encryption** - Strong encryption with authentication (Recommended)
- **📋 Base64 Encoding** - Standard base64 encoding
- **🔢 Hex Encoding** - Hexadecimal representation

### Advanced Stealth Features
- **🎭 Fake Content Templates** - Realistic business document facades
- **⏰ Random Delays** - Evade timing-based sandbox detection
- **🔍 Anti-Analysis** - Detect and evade security sandboxes
- **🎲 Code Obfuscation** - Randomized variable names and string splitting
- **💾 Multiple Storage Methods** - CSS variables, localStorage, sessionStorage, IndexedDB
- **👻 DOM Manipulation** - Advanced evasion through DOM techniques
- **🖨️ Fingerprint Evasion** - Counter browser fingerprinting attempts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bidhata/stealthdrop.git
   cd stealthdrop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5000
   ```

## 📋 Usage Guide

### Basic Workflow

1. **📤 Upload File**
   - Drag & drop any file onto the upload zone
   - Or click to browse and select a file
   - All file types are supported

2. **⚙️ Select Encoding Method**
   - **CSS Encoding**: Maximum stealth with CSS variable hiding
   - **XOR Encryption**: Fast encryption with custom keys  
   - **AES-GCM**: Military-grade encryption (recommended)
   - **Base64**: Standard encoding for compatibility
   - **Hex**: Hexadecimal representation

3. **🔧 Configure Options**
   - **Encryption Key**: Custom key or auto-generated
   - **Auto-download**: Automatic file extraction on page load
   - **Stealth Mode**: Hide payload in CSS variables
   - **Fake Content**: Add realistic document templates
   - **Code Obfuscation**: Randomize code structure
   - **Random Delays**: Add execution delays
   - **Storage Method**: Choose data storage technique
   - **Anti-Analysis**: Enable sandbox detection

4. **🎯 Generate Payload**
   - Click "Generate HTML Payload"
   - Wait for processing completion
   - Download the generated HTML file

### Advanced Configuration

#### Storage Methods
- **CSS Variables**: Most stealthy, hides data in stylesheets
- **Local Storage**: Browser local storage persistence
- **Session Storage**: Session-based storage
- **IndexedDB**: For large files and complex data

#### Anti-Analysis Features
- Detects headless browsers (Selenium, Phantom.js)
- Identifies debugging environments
- Checks for automation tools
- Validates viewport dimensions
- Analyzes user agent strings

## 🛡️ Security Features

### Evasion Techniques

#### **Content Filter Bypass**
- HTML smuggling masks malicious content as legitimate documents
- Multiple encoding layers confuse static analysis
- Realistic document templates provide social engineering context

#### **Sandbox Evasion**
- Environment fingerprinting detects analysis tools
- Random execution delays bypass timing-based detection  
- DOM manipulation confuses dynamic analysis
- Canvas/WebGL fingerprint randomization

#### **Code Obfuscation**
- Variable name randomization
- String splitting and reassembly
- Function name obfuscation
- Control flow flattening

## 📊 Payload Examples

### Basic Payload Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Corporate Security Policy Update</title>
    <style>
        :root {
            --payload-data: 'U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIipRkwB0K1Y=';
            --decoy-1: 'user-tracking-data-abc123';
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Security Policy Update - Q4 2024</h1>
        <p>Dear Team Members...</p>
    </div>
    <script>/* Obfuscated extraction code */</script>
</body>
</html>
```

### Advanced Stealth Features
- **Fake Business Content**: Realistic corporate documents, financial reports, project documentation
- **Professional Styling**: Clean, business-appropriate CSS styling
- **Interactive Elements**: Loading animations, download buttons
- **Error Handling**: Graceful failures with believable error messages

## ⚠️ Responsible Use

### Legal and Ethical Guidelines

**⚠️ IMPORTANT: This tool is designed exclusively for authorized security testing and educational purposes.**

#### ✅ Authorized Use Cases
- Penetration testing with written authorization
- Red team exercises within your organization  
- Security awareness training and education
- Vulnerability research in controlled environments
- Educational demonstrations for cybersecurity training

#### ❌ Prohibited Activities
- Unauthorized access to systems or networks
- Malicious attacks against third parties
- Bypassing security controls without permission
- Distribution of malware or malicious content
- Any illegal or unethical activities

#### 📋 Best Practices
- **Always obtain written authorization** before testing
- **Use only in isolated test environments**
- **Follow responsible disclosure practices**
- **Document all testing activities**
- **Respect privacy and confidentiality**
- **Comply with applicable laws and regulations**

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18+** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom styling
- **Radix UI** components for accessibility
- **TanStack Query** for state management

### Backend Stack  
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **Neon** serverless database
- **Session-based** authentication

### Security Implementation
- **Web Crypto API** for encryption
- **CSP Headers** for content security
- **Input Validation** with Zod schemas
- **Secure Session** management

## 🔧 Development

### Project Structure
```
stealthdrop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── lib/           # Utilities and encoding logic
│   │   ├── pages/         # Application pages
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
├── shared/               # Shared types and schemas
└── README.md
```

### Key Components
- **FileUpload**: Drag & drop file selection
- **MethodSelection**: Encoding method chooser  
- **ConfigurationPanel**: Advanced options
- **GenerationPanel**: Payload generation interface
- **PayloadPreview**: Live code preview

### Core Libraries
- **encoders.ts**: File encoding implementations
- **payloadGenerator.ts**: HTML template generation
- **stealthUtils.ts**: Advanced evasion techniques

## 📈 Performance

### File Size Optimization
- Chunked processing for large files
- Efficient base64 encoding
- Minimal payload overhead
- Compressed output options

### Browser Compatibility  
- Modern browsers (Chrome 88+, Firefox 78+, Safari 14+)
- ES2020+ JavaScript features
- Web Crypto API support required

## 🤝 Contributing

We welcome contributions from security researchers and developers! Please:

1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit a pull request

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production  
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links & Resources

### Documentation
- [Installation Guide](docs/installation.md)
- [Configuration Reference](docs/configuration.md)  
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)

### Security Research
- [HTML Smuggling Techniques](https://research.checkpoint.com/2021/smuggling-hta-files-in-internet-explorer-edge/)
- [Content Security Policy Bypass](https://portswigger.net/web-security/cross-site-scripting/content-security-policy)
- [Browser Sandbox Evasion](https://blog.malwarebytes.com/threat-analysis/2020/06/evolution-of-excel-4-0-macro-weaponization/)

## 👨‍💻 Author

**Krishnendu Paul**  
*Security Researcher & Developer*

- 🌐 **Website**: [krishnendu.com](https://krishnendu.com)
- 📧 **Email**: [me@krishnendu.com](mailto:me@krishnendu.com)  
- 🐦 **Twitter**: [@bidhata](https://x.com/bidhata)
- 💼 **LinkedIn**: Connect for professional inquiries

### About the Author
Krishnendu Paul is a cybersecurity professional specializing in offensive security research, red team operations, and security tool development. With extensive experience in penetration testing and vulnerability research, he develops open-source security tools to help organizations improve their defensive capabilities.

---

⭐ **Star this repository if you find it useful!**

🐛 **Found a bug?** [Create an issue](https://github.com/bidhata/stealthdrop/issues)

💡 **Have suggestions?** We'd love to hear from you!

---

**Disclaimer**: StealthDrop is provided for educational and authorized testing purposes only. Users are responsible for complying with all applicable laws and regulations. The author assumes no responsibility for misuse of this tool.