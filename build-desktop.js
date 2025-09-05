import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building StealthDrop Desktop Application...');

// Step 1: Build the web application
console.log('📦 Building web application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Web application built successfully');
} catch (error) {
  console.error('❌ Failed to build web application:', error.message);
  process.exit(1);
}

// Step 2: Verify electron configuration
console.log('⚙️  Checking Electron configuration...');
if (!fs.existsSync('electron/main.js')) {
  console.error('❌ Electron main.js not found');
  process.exit(1);
}

// Step 3: Build desktop application
console.log('🔨 Building desktop application...');
try {
  execSync('electron-builder --publish=never', { stdio: 'inherit' });
  console.log('✅ Desktop application built successfully');
  console.log('📁 Output files available in ./build/ directory');
} catch (error) {
  console.error('❌ Failed to build desktop application:', error.message);
  console.log('💡 Make sure you have all required dependencies installed');
  process.exit(1);
}

console.log('🎉 StealthDrop desktop application is ready!');
console.log('📋 Build completed successfully');