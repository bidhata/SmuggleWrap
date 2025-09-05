import { useState } from "react";
import { Shield, HelpCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import MethodSelection from "@/components/MethodSelection";
import ConfigurationPanel from "@/components/ConfigurationPanel";
import GenerationPanel from "@/components/GenerationPanel";
import PayloadPreview from "@/components/PayloadPreview";

export interface FileData {
  file: File;
  content: ArrayBuffer;
}

export interface Config {
  method: 'css' | 'xor' | 'aes' | 'base64' | 'hex';
  encryptionKey: string;
  autoDownload: boolean;
  stealthMode: boolean;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [config, setConfig] = useState<Config>({
    method: 'aes',
    encryptionKey: '',
    autoDownload: true,
    stealthMode: false
  });
  const [generatedPayload, setGeneratedPayload] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="text-primary-foreground text-sm" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Smugglo</h1>
                <p className="text-xs text-muted-foreground">HTML Payload Generator v1.0.0</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                <Shield className="w-3 h-3 inline mr-1" />
                Security Tool
              </div>
              <button className="text-muted-foreground hover:text-foreground" data-testid="button-help">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
            />
            
            <MethodSelection
              selectedMethod={config.method}
              onMethodChange={(method) => setConfig(prev => ({ ...prev, method }))}
            />

            <ConfigurationPanel
              config={config}
              onConfigChange={setConfig}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <GenerationPanel
              selectedFile={selectedFile}
              config={config}
              onGenerate={setGeneratedPayload}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              generatedPayload={generatedPayload}
            />

            <PayloadPreview payload={generatedPayload} />

            {/* Security Warning */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="text-destructive text-sm" />
                </div>
                <div>
                  <h3 className="font-medium text-destructive mb-2">Security Notice</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    This tool is designed for authorized security testing and red team operations only. 
                    The generated payloads should only be used in controlled environments with proper authorization.
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Obtain proper authorization before testing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Use only in isolated test environments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Follow responsible disclosure practices</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Smugglo v1.0.0 - Professional Security Tool
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
