import { CartItem } from '@/app/(main)/(root)/cart/components';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface CartState {
    cart: CartItem[];
}
interface CartActions {
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    clearCart: () => void;
}
interface CartStore extends CartState, CartActions { }
const useCart = create<CartStore>()(persist((set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
    increaseQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    })),
    decreaseQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    })),
    clearCart: () => set({ cart: [] }),
}), {
    name: 'cart-storage',
}));
export default useCart;