import { useState } from "react";
import { Search, FileText, Shield, AlertTriangle, Eye, Download, Upload, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  structure: {
    hasCSS: boolean;
    hasJS: boolean;
    scriptCount: number;
    styleCount: number;
    suspiciousElements: string[];
  };
  encoding: {
    detectedMethod: string;
    confidence: number;
    encodedDataFound: boolean;
    dataLocation: string;
    estimatedDataSize: number;
    extractedData?: string;
    originalFileName?: string;
  };
  stealth: {
    obfuscation: string[];
    antiAnalysis: string[];
    delays: boolean;
    decoyElements: string[];
    fingerprintEvasion: boolean;
  };
  threats: {
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    indicators: string[];
    recommendations: string[];
  };
  metadata: {
    title: string;
    fileSize: number;
    analysisTime: number;
    suspiciousPatterns: number;
  };
}

export default function ForensicAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'text/html' || file.name.endsWith('.html')) {
        setSelectedFile(file);
        setAnalysisResult(null);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an HTML file for analysis.",
          variant: "destructive"
        });
      }
    }
  };

  const analyzePayload = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setProgress(0);

    try {
      const content = await selectedFile.text();
      
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 90 ? 90 : next;
        });
      }, 200);

      // Perform analysis
      const result = await performForensicAnalysis(content, selectedFile.name);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setProgress(0);
        toast({
          title: "Analysis complete",
          description: `Payload analyzed successfully. Risk level: ${result.threats.riskLevel}`
        });
      }, 500);
      
    } catch (error) {
      setIsAnalyzing(false);
      setProgress(0);
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the payload. Please check the file format.",
        variant: "destructive"
      });
    }
  };

  const performForensicAnalysis = async (content: string, fileName: string): Promise<AnalysisResult> => {
    const startTime = Date.now();
    
    // Get AI analysis for enhanced threat assessment
    let aiAnalysis: any = null;
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'forensic_analysis',
          content: content.substring(0, 2000), // Limit content size for AI analysis
          fileName,
          prompt: 'Analyze this HTML payload for security threats, obfuscation techniques, and potential malicious behavior. Provide threat level assessment and specific indicators.'
        })
      });
      if (response.ok) {
        aiAnalysis = await response.json();
      }
    } catch (error) {
      console.warn('AI analysis unavailable, using rule-based analysis only');
    }
    
    // Structure analysis
    const structure = {
      hasCSS: content.includes('<style>') || content.includes('stylesheet'),
      hasJS: content.includes('<script>') || content.includes('javascript:'),
      scriptCount: (content.match(/<script/g) || []).length,
      styleCount: (content.match(/<style/g) || []).length,
      suspiciousElements: []
    };

    // Check for suspicious elements
    const suspiciousPatterns = [
      'document.createElement',
      'innerHTML',
      'eval(',
      'atob(',
      'btoa(',
      'URL.createObjectURL',
      'download=',
      'getComputedStyle',
      '--payload',
      'localStorage',
      'sessionStorage',
      'indexedDB'
    ];

    const foundSuspiciousElements = suspiciousPatterns.filter(pattern => 
      content.toLowerCase().includes(pattern.toLowerCase())
    );
    structure.suspiciousElements = foundSuspiciousElements;

    // Encoding detection
    const encoding = {
      detectedMethod: 'Unknown',
      confidence: 0,
      encodedDataFound: false,
      dataLocation: 'Not found',
      estimatedDataSize: 0
    };

    // Detect encoding methods
    if (content.includes('--payload-data') || content.includes('getComputedStyle')) {
      encoding.detectedMethod = 'CSS Variables';
      encoding.confidence = 90;
      encoding.dataLocation = 'CSS Variables';
      encoding.encodedDataFound = true;
    } else if (content.includes('localStorage') || content.includes('sessionStorage')) {
      encoding.detectedMethod = 'Browser Storage';
      encoding.confidence = 85;
      encoding.dataLocation = 'Local/Session Storage';
      encoding.encodedDataFound = true;
    } else if (content.includes('indexedDB')) {
      encoding.detectedMethod = 'IndexedDB';
      encoding.confidence = 80;
      encoding.dataLocation = 'IndexedDB';
      encoding.encodedDataFound = true;
    } else if (content.includes('atob(') && content.includes('btoa(')) {
      if (content.includes('XOR') || content.includes('^')) {
        encoding.detectedMethod = 'XOR + Base64';
        encoding.confidence = 85;
      } else if (content.includes('AES') || content.includes('GCM')) {
        encoding.detectedMethod = 'AES-GCM';
        encoding.confidence = 90;
      } else {
        encoding.detectedMethod = 'Base64';
        encoding.confidence = 75;
      }
      encoding.dataLocation = 'JavaScript Variables';
      encoding.encodedDataFound = true;
    }

    // Estimate data size and attempt extraction
    const base64Patterns = content.match(/['"][A-Za-z0-9+/]{50,}={0,2}['"]/g) || [];
    if (base64Patterns.length > 0) {
      const largestBase64 = base64Patterns.reduce((a, b) => a.length > b.length ? a : b);
      const cleanBase64 = largestBase64.slice(1, -1); // Remove quotes
      encoding.estimatedDataSize = Math.floor(cleanBase64.length * 0.75); // Rough base64 decode size
      
      // Attempt to extract the encoded data
      try {
        if (encoding.detectedMethod === 'Base64') {
          encoding.extractedData = cleanBase64;
        } else if (encoding.detectedMethod.includes('XOR')) {
          // For XOR, we might need to find the key pattern
          encoding.extractedData = cleanBase64; // Store for manual analysis
        }
        
        // Try to find original filename in download attribute
        const downloadMatch = content.match(/download\s*=\s*['"]([^'"]+)['"]/i);
        if (downloadMatch) {
          encoding.originalFileName = downloadMatch[1];
        }
      } catch (error) {
        console.warn('Failed to extract payload data:', error);
      }
    }

    // Stealth techniques detection
    const stealth = {
      obfuscation: [] as string[],
      antiAnalysis: [] as string[],
      delays: false,
      decoyElements: [] as string[],
      fingerprintEvasion: false
    };

    // Detect obfuscation
    if (content.includes('eval(') || content.includes('Function(')) {
      stealth.obfuscation.push('Dynamic Code Execution');
    }
    if (content.match(/[a-z]{8,}[A-Z][a-z]+/g)?.length || 0 > 5) {
      stealth.obfuscation.push('Variable Name Obfuscation');
    }
    if (content.includes('String.fromCharCode') || content.includes('charCodeAt')) {
      stealth.obfuscation.push('String Obfuscation');
    }

    // Detect anti-analysis
    if (content.includes('debugger') || content.includes('performance.now')) {
      stealth.antiAnalysis.push('Debugger Detection');
    }
    if (content.includes('phantom') || content.includes('selenium') || content.includes('webdriver')) {
      stealth.antiAnalysis.push('Automation Tool Detection');
    }
    if (content.includes('outerHeight') || content.includes('outerWidth')) {
      stealth.antiAnalysis.push('Viewport Analysis');
    }
    if (content.includes('navigator.userAgent')) {
      stealth.antiAnalysis.push('User Agent Inspection');
    }

    // Detect delays
    if (content.includes('setTimeout') || content.includes('setInterval') || content.includes('Promise')) {
      stealth.delays = true;
    }

    // Detect decoy elements
    if (content.includes('analytics') || content.includes('tracking') || content.includes('metrics')) {
      stealth.decoyElements.push('Fake Analytics Scripts');
    }
    if (content.includes('toDataURL') || content.includes('getContext')) {
      stealth.fingerprintEvasion = true;
    }

    // Threat assessment
    let riskScore = 0;
    const indicators: string[] = [];
    const recommendations: string[] = [];

    // Risk scoring
    if (encoding.encodedDataFound) {
      riskScore += 30;
      indicators.push('Encoded payload data detected');
    }
    if (structure.suspiciousElements.length > 5) {
      riskScore += 25;
      indicators.push('High number of suspicious JavaScript functions');
    }
    if (stealth.antiAnalysis.length > 0) {
      riskScore += 20;
      indicators.push('Anti-analysis techniques detected');
    }
    if (stealth.obfuscation.length > 0) {
      riskScore += 15;
      indicators.push('Code obfuscation present');
    }
    if (stealth.delays) {
      riskScore += 10;
      indicators.push('Timing-based evasion detected');
    }

    // Incorporate AI analysis if available
    if (aiAnalysis?.content) {
      const aiContent = aiAnalysis.content.toLowerCase();
      
      // Extract AI insights for threat indicators
      if (aiContent.includes('high risk') || aiContent.includes('critical') || aiContent.includes('malicious')) {
        riskScore += 15;
        indicators.push('AI analysis indicates elevated threat level');
      }
      
      if (aiContent.includes('sophisticated') || aiContent.includes('advanced')) {
        riskScore += 10;
        indicators.push('Advanced techniques detected by AI analysis');
      }
      
      // Add AI-generated recommendations
      if (aiContent.includes('sandbox')) {
        recommendations.push('AI recommends sandbox analysis');
      }
      if (aiContent.includes('monitor') || aiContent.includes('watch')) {
        recommendations.push('AI suggests enhanced monitoring');
      }
    }

    // Risk level determination
    let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    if (riskScore >= 80) {
      riskLevel = 'Critical';
      recommendations.push('Immediate investigation required');
      recommendations.push('Isolate and analyze in sandbox environment');
      recommendations.push('Update security policies to block similar payloads');
    } else if (riskScore >= 60) {
      riskLevel = 'High';
      recommendations.push('Detailed analysis recommended');
      recommendations.push('Monitor for similar patterns');
      recommendations.push('Consider additional security controls');
    } else if (riskScore >= 30) {
      riskLevel = 'Medium';
      recommendations.push('Review security logs for related activity');
      recommendations.push('Consider enhanced monitoring');
    } else {
      riskLevel = 'Low';
      recommendations.push('Standard monitoring sufficient');
    }

    const analysisTime = Date.now() - startTime;

    return {
      structure,
      encoding,
      stealth,
      threats: {
        riskLevel,
        indicators,
        recommendations
      },
      metadata: {
        title: fileName,
        fileSize: content.length,
        analysisTime,
        suspiciousPatterns: structure.suspiciousElements.length
      }
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Search className="text-primary mr-2 w-5 h-5" />
          Forensic Analysis Mode
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Upload and analyze HTML payloads to identify encoding methods, stealth techniques, and potential threats.
        </p>
        
        {/* File Upload */}
        <div className="flex items-center space-x-4">
          <input
            type="file"
            id="forensicFile"
            accept=".html,text/html"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="input-forensic-file"
          />
          <label
            htmlFor="forensicFile"
            className="cursor-pointer inline-flex items-center px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Select HTML Payload
          </label>
          
          {selectedFile && (
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span>{selectedFile.name}</span>
              <span className="text-muted-foreground">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          )}
        </div>
        
        {selectedFile && (
          <button
            onClick={analyzePayload}
            disabled={isAnalyzing}
            className="mt-4 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            data-testid="button-analyze"
          >
            <Zap className="w-4 h-4" />
            <span>{isAnalyzing ? 'Analyzing...' : 'Start Forensic Analysis'}</span>
          </button>
        )}
        
        {/* Progress Bar */}
        {isAnalyzing && (
          <div className="mt-4 fade-in" data-testid="analysis-progress">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Analyzing payload structure and threats...</span>
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
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6 fade-in">
          {/* Threat Assessment */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Shield className="text-primary mr-2 w-5 h-5" />
                Threat Assessment
              </h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                analysisResult.threats.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400' :
                analysisResult.threats.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                analysisResult.threats.riskLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {analysisResult.threats.riskLevel} Risk
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Threat Indicators</h4>
                <div className="space-y-2">
                  {analysisResult.threats.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{indicator}</span>
                    </div>
                  ))}
                  {analysisResult.threats.indicators.length === 0 && (
                    <p className="text-sm text-muted-foreground">No specific threat indicators found</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {analysisResult.threats.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Structure Analysis */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="text-primary mr-2 w-5 h-5" />
                Structure Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Script Tags</div>
                    <div className="text-xl font-bold">{analysisResult.structure.scriptCount}</div>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Style Tags</div>
                    <div className="text-xl font-bold">{analysisResult.structure.styleCount}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Suspicious Functions</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.structure.suspiciousElements.map((element, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        {element}
                      </span>
                    ))}
                    {analysisResult.structure.suspiciousElements.length === 0 && (
                      <span className="text-sm text-muted-foreground">None detected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Encoding Analysis */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Eye className="text-primary mr-2 w-5 h-5" />
                Encoding Analysis
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Detected Method</span>
                    <span className="font-medium">{analysisResult.encoding.detectedMethod}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="font-medium">{analysisResult.encoding.confidence}%</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Data Location</span>
                    <span className="font-medium">{analysisResult.encoding.dataLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Size</span>
                    <span className="font-medium">
                      {analysisResult.encoding.estimatedDataSize > 0 
                        ? `${(analysisResult.encoding.estimatedDataSize / 1024).toFixed(1)} KB`
                        : 'Unknown'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stealth Techniques */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="text-primary mr-2 w-5 h-5" />
              Stealth Techniques
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Obfuscation</h4>
                <div className="space-y-2">
                  {analysisResult.stealth.obfuscation.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      <span>{tech}</span>
                    </div>
                  ))}
                  {analysisResult.stealth.obfuscation.length === 0 && (
                    <span className="text-sm text-muted-foreground">None detected</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Anti-Analysis</h4>
                <div className="space-y-2">
                  {analysisResult.stealth.antiAnalysis.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-red-400 rounded-full" />
                      <span>{tech}</span>
                    </div>
                  ))}
                  {analysisResult.stealth.antiAnalysis.length === 0 && (
                    <span className="text-sm text-muted-foreground">None detected</span>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Evasion Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${analysisResult.stealth.delays ? 'bg-yellow-400' : 'bg-gray-400'}`} />
                    <span>Timing Delays</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${analysisResult.stealth.fingerprintEvasion ? 'bg-yellow-400' : 'bg-gray-400'}`} />
                    <span>Fingerprint Evasion</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${analysisResult.stealth.decoyElements.length > 0 ? 'bg-yellow-400' : 'bg-gray-400'}`} />
                    <span>Decoy Elements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payload Recovery */}
          {analysisResult.encoding.extractedData && (
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Download className="text-primary mr-2 w-5 h-5" />
                Payload Recovery
              </h3>
              
              <div className="space-y-4">
                <div className="bg-muted/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Extracted Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Original File:</span>
                      <span className="ml-2 font-medium">{analysisResult.encoding.originalFileName || 'Unknown'}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Encoded Size:</span>
                      <span className="ml-2 font-medium">{analysisResult.encoding.extractedData.length} bytes</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      try {
                        if (analysisResult.encoding.detectedMethod === 'Base64') {
                          const decoded = atob(analysisResult.encoding.extractedData!);
                          const bytes = new Uint8Array(decoded.length);
                          for (let i = 0; i < decoded.length; i++) {
                            bytes[i] = decoded.charCodeAt(i);
                          }
                          const blob = new Blob([bytes]);
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = analysisResult.encoding.originalFileName || 'recovered_file.bin';
                          a.click();
                          URL.revokeObjectURL(url);
                          
                          toast({
                            title: "File recovered",
                            description: "The embedded file has been extracted and downloaded."
                          });
                        } else {
                          toast({
                            title: "Manual extraction required",
                            description: "This encoding method requires manual analysis to recover the file.",
                            variant: "destructive"
                          });
                        }
                      } catch (error) {
                        toast({
                          title: "Extraction failed",
                          description: "Failed to decode the embedded file. The data may be corrupted or use a different encoding.",
                          variant: "destructive"
                        });
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                    data-testid="button-extract-file"
                  >
                    <Download className="w-4 h-4" />
                    <span>Extract Embedded File</span>
                  </button>
                  
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(analysisResult.encoding.extractedData!);
                        toast({
                          title: "Copied to clipboard",
                          description: "The encoded data has been copied for manual analysis."
                        });
                      } catch (error) {
                        toast({
                          title: "Copy failed",
                          description: "Failed to copy to clipboard.",
                          variant: "destructive"
                        });
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors"
                    data-testid="button-copy-data"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Copy Raw Data</span>
                  </button>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  ⚠ Only attempt file recovery in a secure, isolated environment. Extracted files may contain malicious content.
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Metadata</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(analysisResult.metadata.fileSize / 1024).toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">KB File Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{analysisResult.metadata.analysisTime}</div>
                <div className="text-sm text-muted-foreground">ms Analysis Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{analysisResult.metadata.suspiciousPatterns}</div>
                <div className="text-sm text-muted-foreground">Suspicious Patterns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{analysisResult.encoding.confidence}</div>
                <div className="text-sm text-muted-foreground">% Confidence</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}