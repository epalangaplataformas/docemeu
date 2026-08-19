import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderItem, Product } from '@/schemas';

interface OrderState {
  items: OrderItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearOrder: () => void;
  total: () => number;
  count: () => number;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const existing = get().items.find(i => i.productId === product.id);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.productId === product.id
                ? { ...i, quantity: i.quantity + quantity, subtotal: (i.quantity + quantity) * i.unitPrice }
                : i
            )
          }));
        } else {
          const newItem: OrderItem = {
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            quantity,
            image: product.image,
            subtotal: product.price * quantity
          };
          set(state => ({ items: [...state.items, newItem] }));
        }
      },
      removeItem: (productId) => set(state => ({ items: state.items.filter(i => i.productId !== productId) })),
      updateQuantity: (productId, quantity) => set(state => ({
        items: state.items.map(i =>
          i.productId === productId
            ? { ...i, quantity: Math.max(1, quantity), subtotal: Math.max(1, quantity) * i.unitPrice }
            : i
        )
      })),
      clearOrder: () => set({ items: [] }),
      total: () => get().items.reduce((acc, item) => acc + item.subtotal, 0),
      count: () => get().items.reduce((acc, item) => acc + item.quantity, 0)
    }),
    { name: 'doce-meu-order' }
  )
);
