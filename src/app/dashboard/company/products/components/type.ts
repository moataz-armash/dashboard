export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  status: string;
  brand: string;
  size: number;
  weight: number;
  color: string;
  images: string[];
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export const initialProductState = {
  errors: {},
  name: "",
  description: "",
  brand: "",
  category: "",
  size: 0,
  weight: 0,
  color: "",
  images: [],
  success: false,
  message: "",
};
