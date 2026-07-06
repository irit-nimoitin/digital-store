import apiClient from './client';
import type { CartItem } from '../types';

export interface CartResponse {
  items: CartItem[];
  total: number;
}

export interface UpdateCartPayload {
  productId: string;
  quantity: number;
}

export const cartApi = {
  getCart: async (): Promise<CartResponse> => {
    const response = await apiClient.get<CartResponse>('/cart');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<CartResponse> => {
    const response = await apiClient.post<CartResponse>('/cart/items', { productId, quantity });
    return response.data;
  },

  updateItem: async (productId: string, quantity: number): Promise<CartResponse> => {
    const response = await apiClient.put<CartResponse>(`/cart/items/${productId}`, { quantity });
    return response.data;
  },

  removeItem: async (productId: string): Promise<CartResponse> => {
    const response = await apiClient.delete<CartResponse>(`/cart/items/${productId}`);
    return response.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/cart');
  },
};
