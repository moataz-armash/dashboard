import React from "react";
import toast from "react-hot-toast";

type SetPreviewImage = React.Dispatch<React.SetStateAction<string | null>>;

type setIsLoading = React.Dispatch<React.SetStateAction<boolean>>;

interface SubmitEntityOptions {
  formRef?: React.RefObject<HTMLFormElement | null>;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
  fields: string[];
  endpoint: string;
  token: string | null;
  setIsLoading: setIsLoading;
  entityDefaults?: Record<string, any>;
  fileFieldName?: string;
  fileFallbackUrl?: string | null;
  onSuccess?: () => void;
  onError?: (err: any) => void;
  updateRequest: string;
}

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPreviewImage: SetPreviewImage
) => {
  const file = e.target.files?.[0];
  if (file) {
    const previewUrl = URL.createObjectURL(file);

    setPreviewImage(previewUrl);
    toast.success("Image uploaded successfully");
  }
};

const getImage = (photo: string | null | undefined) => {
  const profilePhotoUrl = photo
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/image?in=${photo}`
    : null;
  return profilePhotoUrl;
};

const handleImageClick = (
  fileInputRef: React.RefObject<HTMLInputElement | null>
) => {
  fileInputRef.current?.click();
};

const SubmitEntityUpdate = async ({
  formRef,
  fileInputRef,
  fields,
  endpoint,
  token,
  setIsLoading,
  entityDefaults = {},
  fileFieldName = "profilePhoto",
  fileFallbackUrl = "",
  onSuccess,
  onError,
  updateRequest,
}: SubmitEntityOptions) => {
  try {
    setIsLoading(true);

    const form = formRef?.current;
    if (!form) return;

    const formData = new FormData(form);
    const entity: Record<string, any> = {};

    for (const field of fields) {
      entity[field] = String(formData.get(field)) || "";
    }

    Object.assign(entity, entityDefaults);

    const formDataToSend = new FormData();

    const file = fileInputRef?.current?.files?.[0];
    if (file) {
      formDataToSend.append(fileFieldName, file);
      // entity[fileFieldName] = [file.name];
    } else if (fileFallbackUrl) {
      entity[fileFieldName] = fileFallbackUrl;
    }

    formDataToSend.append(
      String(updateRequest),
      new Blob([JSON.stringify(entity)], {
        type: "application/json",
      })
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}${endpoint}`,
      {
        method: "PUT",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Update failed");
    }

    onSuccess?.();
  } catch (err) {
    console.error("Entity update failed:", err);
    onError?.(err);
  } finally {
    setIsLoading(false);
    setTimeout(() => {
      document.location.reload();
    }, 1500);
  }
};

function CategoriesFormatter(categories: string[]) {
  return categories.map((cat) => ({
    label: cat
      .replace(/_/, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    value: cat,
  }));
}

export {
  handleFileChange,
  getImage,
  handleImageClick,
  SubmitEntityUpdate,
  CategoriesFormatter,
};
