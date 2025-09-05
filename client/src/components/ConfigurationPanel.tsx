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
      </div>
    </div>
  );
}
