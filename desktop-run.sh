#!/bin/bash

echo "🚀 Starting StealthDrop in Desktop Mode..."

# Start development server in background
echo "📡 Starting development server..."
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# Launch Electron
echo "🖥️ Launching Electron application..."
npx electron .

# Kill the development server when Electron closes
echo "⏹️ Stopping development server..."
kill $SERVER_PID 2>/dev/null

echo "🔚 Desktop application closed"