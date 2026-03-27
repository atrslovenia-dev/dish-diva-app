export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  published: boolean;
}

export const giftsData: Gift[] = [
  { id: "1", name: "Green Vase (cone) L", price: 221.50, image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6ab?w=400&h=400&fit=crop", published: true },
  { id: "2", name: "Two Green Vases (round) S, M", price: 151.50, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop", published: true },
  { id: "3", name: "Romeo Vase L", price: 47.00, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop", published: true },
  { id: "4", name: "Green Vase XL", price: 180.00, image: "https://images.unsplash.com/photo-1602528495711-85c17df76b88?w=400&h=400&fit=crop", published: true },
  { id: "5", name: "Pebble Vase", price: 65.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop", published: true },
  { id: "6", name: "Mihael White Wine — Label by Klavdij Tutta", price: 24.90, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=400&fit=crop", published: true },
  { id: "7", name: "Functional Ceramics — Slovenian Clay, Wood-fired", price: 45.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop", published: true },
  { id: "8", name: "Set of 5 Greeting Cards — Marjanca Jemec Božič", price: 22.50, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop", published: true },
];
