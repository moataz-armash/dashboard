export interface DialogWindowProps {
  icon: React.ReactNode;
  title: string;
  buttonTitle: string;
  dialogTitle: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  fields: Record<string, { name: string; title: string }>;
  initialState: Record<string, any>;
  method: (prevState: any, formData: FormData) => Promise<any>;
}
