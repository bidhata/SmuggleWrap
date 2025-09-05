# StealthDrop Desktop Application

## Overview
StealthDrop Desktop is the standalone desktop version of the advanced HTML payload generator. This desktop application provides all the same features as the web version but runs locally on your system without requiring a browser.

## Features
- ✅ Complete HTML payload generation capabilities
- ✅ Forensic analysis mode for security research
- ✅ AI-powered content generation and obfuscation
- ✅ Multiple encoding methods (Base64, XOR, AES-GCM, CSS)
- ✅ Advanced stealth and evasion techniques
- ✅ Secure local operation (no network dependencies)
- ✅ Professional security tool interface

## Quick Start

### Development Mode
To run the desktop application in development mode (with hot reload):
```bash
./desktop-run.sh
```
Or manually:
```bash
npm run dev &
sleep 5
npx electron .
```

### Building Desktop Application
To build a production desktop application:
```bash
./desktop-build.sh
```
Or manually:
```bash
npm run build
npx electron-builder --publish=never
```

The built application will be available in the `build/` directory.

## System Requirements
- **Node.js**: Version 18 or higher
- **Operating System**: Windows, macOS, or Linux
- **Memory**: 4GB RAM minimum (8GB recommended)
- **Storage**: 500MB free space for installation

## Supported Platforms
- **Windows**: `.exe` installer
- **macOS**: `.dmg` package  
- **Linux**: `.AppImage` portable application

## Security Features
- ✅ Sandboxed execution environment
- ✅ No external network dependencies (except AI features)
- ✅ Local file processing only
- ✅ Secure context isolation
- ✅ Protected against code injection

## Application Menu
The desktop version includes a full application menu with:
- File operations (New, Open, Save)
- Edit functions (Copy, Paste, Undo, Redo)
- View controls (Zoom, Fullscreen, Developer Tools)
- Help resources and security guidelines

## Keyboard Shortcuts
- **Ctrl/Cmd + Q**: Quit application
- **Ctrl/Cmd + R**: Reload application  
- **F11**: Toggle fullscreen mode
- **F12**: Toggle developer tools (development mode)

## Troubleshooting

### Application Won't Start
1. Ensure Node.js is installed and up to date
2. Run `npm install` to install dependencies
3. Check that port 5000 is available
4. Try running in development mode first

### Build Failures
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Ensure all dependencies are installed: `npm audit fix`
3. Check available disk space (>1GB recommended for build)
4. Update Electron Builder: `npm update electron-builder`

### Performance Issues
1. Close unnecessary applications to free memory
2. Increase Node.js memory limit: `node --max-old-space-size=4096`
3. Disable developer tools in production builds

## Author
**Krishnendu Paul**  
- Email: me@krishnendu.com
- Website: https://krishnendu.com
- GitHub: @bidhata

## License
MIT License - See LICENSE file for details

## Security Notice
⚠️ **Important**: This tool is designed for authorized security testing and research only. Use responsibly and in accordance with applicable laws and regulations.

---
*Built with Electron • Powered by Vite • Secured by Design*