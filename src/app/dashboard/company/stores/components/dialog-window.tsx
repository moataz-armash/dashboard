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
import InputForm from "../../../../../components/ui/input-form";
import toast from "react-hot-toast";
import UploadImage from "@/components/ui/upload-image";
import { DialogWindowProps } from "./type";

const defaultUserImg =
  "https://static-00.iconduck.com/assets.00/profile-circle-icon-256x256-cm91gqm2.png";

export function DialogWindow({
  icon,
  title,
  variant = "default",
  className,
  method,
  fileInputRef,
  fields,
  initialState,
  dialogTitle,
  buttonTitle,
}: DialogWindowProps) {
  const [state, formAction, pending] = useActionState(method, initialState);
  const [open, setOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(
    defaultUserImg
  );

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
          {icon} {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-4xl">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              Make changes to your {title} here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {fileInputRef && (
            <UploadImage
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              fileInputRef={fileInputRef}
              nameOfInput="images"
            />
          )}
          {state?.errors?.images?._errors?.[0] && (
            <p className="text-red-500 text-sm col-span-full text-center">
              {state.errors.images._errors[0]}
            </p>
          )}

          <div className="grid gap-4 py-4 grid-cols-2">
            {Object.values(fields).map((field, index, arr) => (
              <InputForm
                key={field.name}
                title={field.title}
                name={field.name}
                state={state}
                text="text-left"
                index={index}
                totalItems={arr.length}
              />
            ))}
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
