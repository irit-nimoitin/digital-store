import { makeAutoObservable, computed } from 'mobx';
import type { CartItem, Product } from '../types';

class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this, {
      total: computed,
      itemCount: computed,
    });
    this.loadFromStorage();
  }

  addItem(product: Product, quantity = 1) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.saveToStorage();
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const item = this.items.find((i) => i.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
  }

  clearCart() {
    this.items = [];
    this.saveToStorage();
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private saveToStorage() {
    localStorage.setItem('digital-store-cart', JSON.stringify(this.items));
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('digital-store-cart');
      if (saved) {
        this.items = JSON.parse(saved) as CartItem[];
      }
    } catch {
      this.items = [];
    }
  }
}

export const cartStore = new CartStore();
