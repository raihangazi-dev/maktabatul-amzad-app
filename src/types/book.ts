export type Book = {
  id: string;
  title: string;
  slug: string;
  authorId?: string;
  categoryId?: string;
  price: number;
  stock: number;
};