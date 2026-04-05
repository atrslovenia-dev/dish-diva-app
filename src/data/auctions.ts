export interface AuctionItem {
  id: string;
  title: string;
  artist: string;
  description: string;
  startingPrice: number;
  currentBid: number;
  image: string;
  endDate: string;
  bidCount: number;
}

export const auctionsData: AuctionItem[] = [
  {
    id: "1",
    title: "Odsev jeseni",
    artist: "Marjanca Jemec Božič",
    description: "Olje na platnu, 80×60 cm. Impresionistični prikaz jesenskega gozda.",
    startingPrice: 350,
    currentBid: 520,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop",
    endDate: "2025-12-15",
    bidCount: 8,
  },
  {
    id: "2",
    title: "Mediteranski veter",
    artist: "Klavdij Tutta",
    description: "Akvarel na papirju, 50×40 cm. Poetična krajina istrske obale.",
    startingPrice: 200,
    currentBid: 310,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&h=500&fit=crop",
    endDate: "2025-12-20",
    bidCount: 5,
  },
  {
    id: "3",
    title: "Urbana simfonija",
    artist: "Ana Koželj",
    description: "Mešana tehnika, 100×70 cm. Sodobna interpretacija mestnega utripa.",
    startingPrice: 450,
    currentBid: 680,
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=500&h=500&fit=crop",
    endDate: "2025-12-18",
    bidCount: 12,
  },
  {
    id: "4",
    title: "Tišina v modrem",
    artist: "Peter Marolt",
    description: "Akril na platnu, 90×90 cm. Abstraktna meditacija o morju in nebu.",
    startingPrice: 280,
    currentBid: 400,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
    endDate: "2025-12-22",
    bidCount: 6,
  },
];
