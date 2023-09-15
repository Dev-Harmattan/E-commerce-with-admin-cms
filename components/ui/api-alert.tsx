import { Copy, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { Badge, BadgeProps } from './badge';
import { Button } from './button';
import { toast } from 'react-toastify';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  admin: 'Admin',
  public: 'Public',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  admin: 'destructive',
  public: 'secondary',
};

const copy = (description: string) => {
  navigator.clipboard.writeText(description);
  toast.success('API route copied to the clipboard');
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  description,
  title,
  variant = 'public',
}) => {
  return (
    <Alert>
      <Server className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant="outline" size="icon" onClick={() => copy(description)}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
