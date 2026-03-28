export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  published: boolean;
}

export const giftsData: Gift[] = [
  { id: "1", name: "Zelena vaza (stožec) L", price: 221.50, image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6ab?w=400&h=400&fit=crop", published: true },
  { id: "2", name: "Dve zeleni vazi (okrogli) S, M", price: 151.50, image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop", published: true },
  { id: "3", name: "Vaza Romeo L", price: 47.00, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=400&fit=crop", published: true },
  { id: "4", name: "Zelena vaza XL", price: 180.00, image: "https://images.unsplash.com/photo-1602528495711-85c17df76b88?w=400&h=400&fit=crop", published: true },
  { id: "5", name: "Vaza Kamenček", price: 65.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop", published: true },
  { id: "6", name: "Mihael belo vino — etiketa Klavdij Tutta", price: 24.90, image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=400&fit=crop", published: true },
  { id: "7", name: "Funkcionalna keramika — slovenska glina", price: 45.00, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop", published: true },
  { id: "8", name: "Set 5 voščilnic — Marjanca Jemec Božič", price: 22.50, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop", published: true },
];
