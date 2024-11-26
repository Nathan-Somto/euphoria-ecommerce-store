import React from "react";
import useCart from "./use-cart";

export function useisInCart(id: string) {
    const [isInCart, setIsInCart] = React.useState(false);
    const cart = useCart(state => state.cart);
    React.useEffect(() => {
        setIsInCart(cart.some((item) => item.id === id));
    }, [cart, id]);
    return isInCart;
}