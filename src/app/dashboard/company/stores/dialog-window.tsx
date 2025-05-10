import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import InputForm from "../../../../components/ui/input-form";
import toast from "react-hot-toast";

interface DialogWindowProps {
  icon: React.ReactNode;
  title: string;
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
  method: (prevState: any, formData: FormData) => Promise<any>;
}

const initialState = {
  errors: {},
  name: "",
  email: "",
  storeCode: "",
  description: "",
  phoneNumber: "",
  website: "",
  status: "",
  addressId: "",
  success: false,
  message: "",
};

export function DialogWindow({
  icon,
  title,
  variant = "default",
  className,
  method,
}: DialogWindowProps) {
  const [state, formAction, pending] = useActionState(method, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.data?.message || "Store Created Successfully");
      setOpen(false);
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    } else if (state?.message) {
      toast.error(state?.message);
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the highlighted errors");
    }
  }, [state]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {icon} {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-4xl">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 grid-cols-2">
            <InputForm title="Name" name="name" state={state} />
            <InputForm title="Email" name="email" state={state} />
            <InputForm title="Store Code" name="storeCode" state={state} />
            <InputForm title="Description" name="description" state={state} />
            <InputForm title="Phone Number" name="phoneNumber" state={state} />
            <InputForm title="Website" name="website" state={state} />
            <InputForm title="Status" name="status" state={state} />
            <InputForm title="Address Id" name="addressId" state={state} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              Save changes {pending && " ..."}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
