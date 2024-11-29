import { create } from 'zustand';
export interface WishlistState {
    wishlistProductIds: Record<string, boolean>;
}
interface WishlistActions {
    setWishlistProductIds: (wishlistProductIds: Record<string, boolean>) => void;
    getTotalWishlistProducts: () => number;
    toggleOptimisticId: (productId: string) => void;
}
interface WishlistStore extends WishlistState, WishlistActions { }
const useWishlist = create<WishlistStore>((set, get) => ({
    wishlistProductIds: {},
    setWishlistProductIds: (wishlistProductIds) => set({ wishlistProductIds }),
    getTotalWishlistProducts: () => Object.keys(get().wishlistProductIds ?? {}).length,
    toggleOptimisticId: (productId) => {
        set((state) => {
            const newWishlistProductIds = { ...state.wishlistProductIds };
            if (newWishlistProductIds[productId]) {
                delete newWishlistProductIds[productId];
            } else {
                newWishlistProductIds[productId] = true;
            }
            return { wishlistProductIds: newWishlistProductIds };
        });
    }
}));
export default useWishlist;