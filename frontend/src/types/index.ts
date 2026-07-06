export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  thumbnailUrl: string;
  longDescription: string;
  category: string;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ProductCategory = 'ebook' | 'software' | 'course' | 'all';

export type SortField = 'price' | 'name';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  name?: string;
  category?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  detail: string;
}
