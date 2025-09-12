import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Empty({ icon, title, description, action }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-slate-400">
        {icon || <Upload className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 mb-6 max-w-sm">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-[#2A6CF6] hover:bg-[#2A6CF6]/90"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
