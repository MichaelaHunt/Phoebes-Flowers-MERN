import { createContext, ReactNode, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartContextType {// this function courtesy of ChatGPT
  cartContents: CartItem[];
  setCartContents: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const CartContext = createContext<CartContextType>({
  cartContents: [],
  setCartContents: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({children} : CartProviderProps) {
  const [cartContents, setCartContents] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cartContents, setCartContents }}>
      {children}
    </CartContext.Provider>
  );
}
