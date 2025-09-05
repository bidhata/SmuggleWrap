import { useState } from "react";
import { Rocket, Download, Copy, Check } from "lucide-react";
import { FileData, Config } from "@/pages/home";
import { generatePayload } from "@/lib/payloadGenerator";
import { useToast } from "@/hooks/use-toast";

interface GenerationPanelProps {
  selectedFile: FileData | null;
  config: Config;
  onGenerate: (payload: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  generatedPayload: string;
}

export default function GenerationPanel({
  selectedFile,
  config,
  onGenerate,
  isGenerating,
  setIsGenerating,
  generatedPayload
}: GenerationPanelProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to generate a payload.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 20;
          return next > 90 ? 90 : next;
        });
      }, 100);

      const payload = await generatePayload(selectedFile, config);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        onGenerate(payload);
        setIsGenerating(false);
        setProgress(0);
        toast({
          title: "Payload generated successfully",
          description: "Your HTML payload is ready for download."
        });
      }, 500);
    } catch (error) {
      setIsGenerating(false);
      setProgress(0);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "An error occurred during payload generation.",
        variant: "destructive"
      });
    }
  };

  const handleDownload = () => {
    if (!generatedPayload) return;

    const blob = new Blob([generatedPayload], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smugglo_payload_${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Your HTML payload has been downloaded."
    });
  };

  const handleCopy = async () => {
    if (!generatedPayload) return;

    try {
      await navigator.clipboard.writeText(generatedPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "The payload has been copied to your clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold flex items-center">
          <Rocket className="text-primary mr-2 w-5 h-5" />
          Payload Generation
        </h2>
        <div className="text-sm text-muted-foreground">
          Status: <span className="text-accent font-medium">
            {isGenerating ? 'Generating...' : generatedPayload ? 'Complete' : 'Ready'}
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleGenerate}
          disabled={!selectedFile || isGenerating}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          data-testid="button-generate"
        >
          <Rocket className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'Generate HTML Payload'}</span>
        </button>
        
        {/* Progress Bar */}
        {isGenerating && (
          <div className="fade-in" data-testid="progress-bar">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Generating payload...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        
        {/* Success State */}
        {generatedPayload && !isGenerating && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 fade-in" data-testid="success-state">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="text-primary text-sm w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">Payload Generated Successfully</p>
                <p className="text-xs text-muted-foreground">
                  smugglo_payload.html • {formatFileSize(new Blob([generatedPayload]).size)}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleDownload}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                data-testid="button-download"
              >
                <Download className="w-4 h-4" />
                <span>Download HTML</span>
              </button>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors flex items-center space-x-2 text-sm"
                data-testid="button-copy"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
