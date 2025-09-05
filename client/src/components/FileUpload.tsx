import { useCallback } from "react";
import { CloudUpload, File, X } from "lucide-react";
import { FileData } from "@/pages/home";

interface FileUploadProps {
  selectedFile: FileData | null;
  onFileSelect: (file: FileData | null) => void;
}

export default function FileUpload({ selectedFile, onFileSelect }: FileUploadProps) {
  const handleFileSelect = useCallback(async (file: File) => {
    try {
      const content = await file.arrayBuffer();
      onFileSelect({ file, content });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <CloudUpload className="text-primary mr-2 w-5 h-5" />
        File Selection
      </h2>
      
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center transition-all hover:border-primary/50 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput')?.click()}
        data-testid="dropzone-upload"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <CloudUpload className="text-2xl text-muted-foreground w-8 h-8" />
          </div>
          <div>
            <p className="text-foreground font-medium">Drop files here or click to browse</p>
            <p className="text-sm text-muted-foreground mt-1">Any file type supported</p>
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileInputChange}
            data-testid="input-file"
          />
        </div>
      </div>
      
      {/* File Info Display */}
      {selectedFile && (
        <div className="mt-4 p-4 bg-muted/20 rounded-lg fade-in" data-testid="file-info">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                <File className="text-primary text-sm w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm" data-testid="text-filename">
                  {selectedFile.file.name}
                </p>
                <p className="text-xs text-muted-foreground" data-testid="text-filesize">
                  {formatFileSize(selectedFile.file.size)}
                </p>
              </div>
            </div>
            <button
              className="text-destructive hover:text-destructive/80"
              onClick={() => onFileSelect(null)}
              data-testid="button-remove-file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
