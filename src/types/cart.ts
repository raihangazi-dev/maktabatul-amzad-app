export type CartItem = {
  bookId: string;
  quantity: number;
};

export type Cart = {
  id: string;
  items: CartItem[];
};