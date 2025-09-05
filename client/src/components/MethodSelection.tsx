import { Settings, Code, Key, Lock, Hash } from "lucide-react";
import { Config } from "@/pages/home";

interface MethodSelectionProps {
  selectedMethod: Config['method'];
  onMethodChange: (method: Config['method']) => void;
}

const methods = [
  {
    id: 'css' as const,
    name: 'CSS Encoding',
    description: 'Hide data in CSS variables for maximum stealth',
    icon: Code,
    iconColor: 'text-accent'
  },
  {
    id: 'xor' as const,
    name: 'XOR Encryption',
    description: 'Simple XOR cipher with custom key',
    icon: Key,
    iconColor: 'text-accent'
  },
  {
    id: 'aes' as const,
    name: 'AES-GCM Encryption',
    description: 'Strong encryption with authentication',
    icon: Lock,
    iconColor: 'text-accent',
    recommended: true
  },
  {
    id: 'base64' as const,
    name: 'Base64 Encoding',
    description: 'Simple base64 encoding',
    icon: Code,
    iconColor: 'text-accent'
  },
  {
    id: 'hex' as const,
    name: 'Hex Encoding',
    description: 'Hexadecimal representation',
    icon: Hash,
    iconColor: 'text-accent'
  }
];

export default function MethodSelection({ selectedMethod, onMethodChange }: MethodSelectionProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Settings className="text-primary mr-2 w-5 h-5" />
        Encoding Method
      </h2>
      
      <div className="space-y-3">
        {methods.map((method) => {
          const IconComponent = method.icon;
          return (
            <label
              key={method.id}
              className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/20 cursor-pointer transition-colors"
              data-testid={`method-${method.id}`}
            >
              <input
                type="radio"
                name="method"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => onMethodChange(method.id)}
                className="mt-1 text-primary focus:ring-primary"
                data-testid={`input-method-${method.id}`}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`${method.iconColor} text-sm w-4 h-4`} />
                  <span className="font-medium text-sm">{method.name}</span>
                  {method.recommended && (
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
