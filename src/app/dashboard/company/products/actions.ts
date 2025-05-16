"use server";
import { cookies } from "next/headers";
import { z } from "zod";

const CreateProductSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  size: z.number().min(0, "Size must be greater than or equal to 0"),
  weight: z.number().min(0, "Weight must be greater than or equal to 0"),
  color: z.string().min(1, "Color is required"),
  images: z
    .array(z.string().min(1, "Image cannot be empty"))
    .min(1, "You have to upload image"),
});

export async function createProduct(prevState: any, formData: FormData) {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  const imageFiles = formData
    .getAll("images")
    .filter(
      (value): value is File =>
        value instanceof File && value.name !== "" && value.size > 0
    );
  const raw = {
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    category: String(formData.get("category") || ""),
    brand: String(formData.get("brand") || ""),
    size: Number(formData.get("size") || 0),
    weight: Number(formData.get("weight") || 0),
    color: String(formData.get("color") || ""),
    images: imageFiles.map((file) => file.name),
  };

  const parsed = CreateProductSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.format(),
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      size: formData.get("size"),
      weight: formData.get("weight"),
      color: formData.get("color"),
      success: false,
    };
  }

  const apiFormData = new FormData();

  // const file = images as File;
  // if (file) {
  //   apiFormData.append("images", file);
  // }

  apiFormData.append(
    "createProductRequest",
    new Blob([JSON.stringify(parsed.data)], { type: "application/json" })
  );

  imageFiles.forEach((file) => {
    apiFormData.append("images", file, file.name);
  });

  console.log(Object.entries(apiFormData));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_COMPANY}/product/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: apiFormData,
    }
  );

  if (!res.ok) {
    const errorJson = await res.json(); // assuming your API sends a JSON response with `message`
    return {
      errors: {},
      name: raw.name,
      description: raw.description,
      category: raw.category,
      brand: raw.brand,
      size: raw.size,
      weight: raw.weight,
      color: raw.color,
      success: false,
      message: errorJson.message || "Create Product failed",
    };
  }

  return { data: await res.json(), success: true };
}
