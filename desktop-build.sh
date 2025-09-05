#!/bin/bash

echo "🚀 Building StealthDrop Desktop Application..."

# Build the web application
echo "📦 Building web application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Failed to build web application"
    exit 1
fi
echo "✅ Web application built successfully"

# Check Electron configuration
echo "⚙️ Checking Electron configuration..."
if [ ! -f "electron/main.js" ]; then
    echo "❌ Electron main.js not found"
    exit 1
fi

# Build desktop application
echo "🔨 Building desktop application..."
npx electron-builder --publish=never
if [ $? -ne 0 ]; then
    echo "❌ Failed to build desktop application"
    echo "💡 Make sure you have all required dependencies installed"
    exit 1
fi

echo "✅ Desktop application built successfully"
echo "📁 Output files available in ./build/ directory"
echo "🎉 StealthDrop desktop application is ready!"