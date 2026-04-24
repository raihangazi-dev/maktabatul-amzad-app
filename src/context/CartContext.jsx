"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const handleAddtoCart = (book) => {
    const existing = cart.find((item) => item._id === book._id);
    if (existing) {
      setCart(cart.map((item) =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.success("Quantity updated");
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
      toast.success("Added to cart");
    }
  };

  const handleDeleteCartItem = (bookId) => {
    setCart(cart.filter((item) => item._id !== bookId));
    toast.success("Item removed");
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, setCart, handleAddtoCart, handleDeleteCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
