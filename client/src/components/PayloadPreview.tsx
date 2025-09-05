import { Eye } from "lucide-react";

interface PayloadPreviewProps {
  payload: string;
}

export default function PayloadPreview({ payload }: PayloadPreviewProps) {
  const getPreviewContent = () => {
    if (!payload) {
      return (
        <div className="text-muted-foreground text-center py-8">
          <p>Generate a payload to see preview</p>
        </div>
      );
    }

    // Extract key parts for preview
    const lines = payload.split('\n');
    const previewLines = lines.slice(0, 20); // Show first 20 lines
    
    return (
      <div className="text-sm font-mono">
        {previewLines.map((line, index) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('<!--')) {
            return (
              <div key={index} className="text-muted-foreground">
                {line}
              </div>
            );
          }
          
          if (trimmedLine.startsWith('<!DOCTYPE') || trimmedLine.startsWith('<html')) {
            return (
              <div key={index} className="text-accent">
                {line}
              </div>
            );
          }
          
          if (trimmedLine.includes('<') && trimmedLine.includes('>')) {
            const parts = line.split(/(<[^>]*>)/);
            return (
              <div key={index}>
                {parts.map((part, partIndex) => {
                  if (part.startsWith('<') && part.endsWith('>')) {
                    const tagMatch = part.match(/<(\/?[a-zA-Z]+)/);
                    const tagName = tagMatch ? tagMatch[1] : '';
                    const attributes = part.match(/\s+([a-zA-Z-]+)=/g);
                    
                    return (
                      <span key={partIndex}>
                        <span className="text-foreground">&lt;</span>
                        <span className="text-primary">{tagName}</span>
                        {attributes && attributes.map((attr, attrIndex) => (
                          <span key={attrIndex}>
                            <span className="text-accent">{attr.slice(0, -1)}</span>
                            <span className="text-foreground">=</span>
                          </span>
                        ))}
                        <span className="text-foreground">&gt;</span>
                      </span>
                    );
                  }
                  return <span key={partIndex}>{part}</span>;
                })}
              </div>
            );
          }
          
          if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
            return (
              <div key={index} className="text-muted-foreground">
                {line}
              </div>
            );
          }
          
          if (trimmedLine.includes('--payload') || trimmedLine.includes('data:')) {
            return (
              <div key={index}>
                <span className="text-accent">{line.substring(0, line.indexOf(':') + 1)}</span>
                <span className="text-muted-foreground break-all">
                  {line.substring(line.indexOf(':') + 1, line.indexOf(':') + 50)}...
                </span>
              </div>
            );
          }
          
          return (
            <div key={index} className="text-foreground">
              {line}
            </div>
          );
        })}
        
        {lines.length > 20 && (
          <div className="text-muted-foreground text-center mt-4">
            ... {lines.length - 20} more lines
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Eye className="text-primary mr-2 w-5 h-5" />
        Payload Preview
      </h2>
      
      <div className="code-block rounded-lg p-4 overflow-x-auto max-h-96" data-testid="payload-preview">
        {getPreviewContent()}
      </div>
    </div>
  );
}
