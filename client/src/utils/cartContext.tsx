import { createContext, ReactNode, useState } from "react";

export interface CartItemInfo {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartContextType {// this function courtesy of ChatGPT
  cartContents: CartItemInfo[];
  setCartContents: React.Dispatch<React.SetStateAction<CartItemInfo[]>>;
}

export const CartContext = createContext<CartContextType>({
  cartContents: [],
  setCartContents: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({children} : CartProviderProps) {
  const [cartContents, setCartContents] = useState<CartItemInfo[]>([]);
  return (
    <CartContext.Provider value={{ cartContents, setCartContents }}>
      {children}
    </CartContext.Provider>
  );
}
