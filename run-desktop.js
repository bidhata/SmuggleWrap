import { spawn } from 'child_process';

console.log('🚀 Starting StealthDrop in Desktop Mode...');

// Start the development server
console.log('📡 Starting development server...');
const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });

server.stdout.on('data', (data) => {
  console.log(`Server: ${data}`);
});

server.stderr.on('data', (data) => {
  console.log(`Server Error: ${data}`);
});

// Wait for server to be ready, then launch Electron
setTimeout(() => {
  console.log('🖥️  Launching Electron application...');
  
  const electron = spawn('npx', ['electron', '.'], { stdio: 'inherit' });
  
  electron.on('close', (code) => {
    console.log(`🔚 Electron application closed with code ${code}`);
    console.log('⏹️  Stopping development server...');
    server.kill();
    process.exit(code);
  });
  
  electron.on('error', (error) => {
    console.error('❌ Failed to start Electron:', error);
    server.kill();
    process.exit(1);
  });
  
}, 3000); // Give the server 3 seconds to start

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down...');
  server.kill();
  process.exit(0);
});