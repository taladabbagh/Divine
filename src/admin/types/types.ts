export interface Category {
    id: number;
    name: string;
    gender?: string;
  }
  
export interface Subcategory {
    id: number;
    name: string;
    categoryId: number;
  }

  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    subcategory: string;
    image: string;
  }
  export interface AddProductFormProps {
    addProduct: (product: Product) => void;
    categories: Category[];
    subcategories: Record<string, string[]>; // Category ID -> Subcategory Names
  }
  