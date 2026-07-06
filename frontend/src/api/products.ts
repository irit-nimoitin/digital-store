import apiClient from './client';
import type { Product, ProductFilters, PaginatedProducts } from '../types';

export const productsApi = {
  getProducts: async (filters?: ProductFilters): Promise<PaginatedProducts> => {
    const params = new URLSearchParams();
    if (filters?.name) params.append('name', filters.name);
    if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters?.sortBy) params.append('sort_by', filters.sortBy);
    if (filters?.sortOrder) params.append('sort_order', filters.sortOrder);

    const response = await apiClient.get<PaginatedProducts>(`/products?${params.toString()}`);
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
};
