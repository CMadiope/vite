import { useContext, createContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode;
};
type ShoppingCartContext = {
    openCart(): void;
    closeCart(): void;
    cartQuantity: number;
    getItemQuantity(id: number): number;
    increaseCartQuantity(id: number): void;
    decreaseCartQuantity(id: number): void;
    removeFromCart(id: number): void;
    cartItems: CartItem[];
};

type CartItem = {
    id: number;
    quantity: number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);
export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
    children,
}: ShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    };
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    );
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const increaseCartQuantity = (id: number) => {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id == id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };
    const decreaseCartQuantity = (id: number) => {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id == id)?.quantity === 1) {
                return currentItems.filter((item) => item.id !== id);
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.id !== id);
        });
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart,
                isOpen,
            }}
        >
            {children}
            <ShoppingCart />
        </ShoppingCartContext.Provider>
    );
};
