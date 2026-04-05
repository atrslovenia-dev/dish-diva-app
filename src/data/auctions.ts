export interface AuctionItem {
  id: string;
  title: string;
  artist: string;
  description: string;
  longDescription: string;
  dimensions: string;
  medium: string;
  year: number;
  provenance: string;
  startingPrice: number;
  currentBid: number;
  estimateLow: number;
  estimateHigh: number;
  images: string[];
  endDate: string;
  bidCount: number;
  bids: AuctionBid[];
  lotNumber: number;
  featured: boolean;
  status: "active" | "upcoming" | "sold";
}

export interface AuctionBid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
}

export const auctionsData: AuctionItem[] = [
  {
    id: "1",
    title: "Odsev jeseni",
    artist: "Marjanca Jemec Božič",
    description: "Olje na platnu, 80×60 cm. Impresionistični prikaz jesenskega gozda.",
    longDescription: "Mojstrsko delo, ki zajema bežno lepoto jesenskega gozda v toplih odtenkih zlate, rdeče in oranžne. Umetnica z izjemno občutljivostjo za svetlobo ujame trenutek, ko sonce prebije skozi krošnje in osvetli gozdna tla. Delo odraža dolgoletno predanost umetnice naravi in njenemu cikličnemu spreminjanju.",
    dimensions: "80 × 60 cm",
    medium: "Olje na platnu",
    year: 2024,
    provenance: "Direktno iz ateljeja umetnice",
    startingPrice: 350,
    currentBid: 520,
    estimateLow: 400,
    estimateHigh: 700,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-15T18:00:00",
    bidCount: 8,
    bids: [
      { id: "b1", bidder: "Kupec ****72", amount: 520, timestamp: "2025-11-28T14:23:00" },
      { id: "b2", bidder: "Kupec ****15", amount: 480, timestamp: "2025-11-27T09:45:00" },
      { id: "b3", bidder: "Kupec ****72", amount: 450, timestamp: "2025-11-26T16:12:00" },
      { id: "b4", bidder: "Kupec ****38", amount: 420, timestamp: "2025-11-25T11:30:00" },
      { id: "b5", bidder: "Kupec ****15", amount: 400, timestamp: "2025-11-24T08:55:00" },
      { id: "b6", bidder: "Kupec ****91", amount: 380, timestamp: "2025-11-23T19:10:00" },
    ],
    lotNumber: 101,
    featured: true,
    status: "active",
  },
  {
    id: "2",
    title: "Mediteranski veter",
    artist: "Klavdij Tutta",
    description: "Akvarel na papirju, 50×40 cm. Poetična krajina istrske obale.",
    longDescription: "Poetična krajina, ki diha z mediteranskim vetrom. Tutta s preprostimi, a izjemno učinkovitimi potezami ustvari ambient istrske obale — turkizno morje, beli kamni in olivna drevesa. Akvarel, ki vabi v tišino in kontemplacijo.",
    dimensions: "50 × 40 cm",
    medium: "Akvarel na papirju",
    year: 2023,
    provenance: "Zasebna zbirka, Ljubljana",
    startingPrice: 200,
    currentBid: 310,
    estimateLow: 250,
    estimateHigh: 500,
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-20T20:00:00",
    bidCount: 5,
    bids: [
      { id: "b7", bidder: "Kupec ****44", amount: 310, timestamp: "2025-11-29T10:15:00" },
      { id: "b8", bidder: "Kupec ****67", amount: 280, timestamp: "2025-11-28T15:40:00" },
      { id: "b9", bidder: "Kupec ****44", amount: 250, timestamp: "2025-11-27T12:20:00" },
      { id: "b10", bidder: "Kupec ****23", amount: 230, timestamp: "2025-11-26T09:00:00" },
      { id: "b11", bidder: "Kupec ****67", amount: 210, timestamp: "2025-11-25T17:30:00" },
    ],
    lotNumber: 102,
    featured: false,
    status: "active",
  },
  {
    id: "3",
    title: "Urbana simfonija",
    artist: "Ana Koželj",
    description: "Mešana tehnika, 100×70 cm. Sodobna interpretacija mestnega utripa.",
    longDescription: "Dinamično delo, ki združuje kolažne elemente, akrilne ploskve in grafične posege v celovito kompozicijo urbanega ritma. Koželj raziskuje odnos med posameznikom in mestnim tkivom, med tišino in hrupom, med redom in kaosom. Delo je prejelo nagrado na letnem salonu sodobne umetnosti.",
    dimensions: "100 × 70 cm",
    medium: "Mešana tehnika na platnu",
    year: 2024,
    provenance: "Razstava 'Urbani pulz', Galerija Cankarjevega doma",
    startingPrice: 450,
    currentBid: 680,
    estimateLow: 500,
    estimateHigh: 900,
    images: [
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-18T19:00:00",
    bidCount: 12,
    bids: [
      { id: "b12", bidder: "Kupec ****56", amount: 680, timestamp: "2025-11-29T16:45:00" },
      { id: "b13", bidder: "Kupec ****89", amount: 650, timestamp: "2025-11-29T14:20:00" },
      { id: "b14", bidder: "Kupec ****56", amount: 620, timestamp: "2025-11-28T18:10:00" },
      { id: "b15", bidder: "Kupec ****12", amount: 580, timestamp: "2025-11-27T11:35:00" },
      { id: "b16", bidder: "Kupec ****89", amount: 550, timestamp: "2025-11-26T09:50:00" },
      { id: "b17", bidder: "Kupec ****34", amount: 520, timestamp: "2025-11-25T15:25:00" },
    ],
    lotNumber: 103,
    featured: true,
    status: "active",
  },
  {
    id: "4",
    title: "Tišina v modrem",
    artist: "Peter Marolt",
    description: "Akril na platnu, 90×90 cm. Abstraktna meditacija o morju in nebu.",
    longDescription: "Minimalistična kompozicija, ki raziskuje neskončne odtenke modre — od globokomodre morskih globin do prosojne azurne neba. Marolt s subtilnimi prehodi in teksturnimi plastmi ustvari meditativno delo, ki gledalca potegne v tišino in notranji mir.",
    dimensions: "90 × 90 cm",
    medium: "Akril na platnu",
    year: 2024,
    provenance: "Direktno iz ateljeja umetnika",
    startingPrice: 280,
    currentBid: 400,
    estimateLow: 300,
    estimateHigh: 600,
    images: [
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-22T17:00:00",
    bidCount: 6,
    bids: [
      { id: "b18", bidder: "Kupec ****77", amount: 400, timestamp: "2025-11-29T13:10:00" },
      { id: "b19", bidder: "Kupec ****45", amount: 370, timestamp: "2025-11-28T10:25:00" },
      { id: "b20", bidder: "Kupec ****77", amount: 340, timestamp: "2025-11-27T16:40:00" },
      { id: "b21", bidder: "Kupec ****63", amount: 320, timestamp: "2025-11-26T12:15:00" },
    ],
    lotNumber: 104,
    featured: false,
    status: "active",
  },
  {
    id: "5",
    title: "Pomladno prebujanje",
    artist: "Maja Kovač",
    description: "Olje na platnu, 120×80 cm. Eksplozija barv in svetlobe.",
    longDescription: "Veličastno delo, ki praznuje moč narave v trenutku pomladnega prebujanja. Kovač z drznimi barvnimi nanosi in ekspresivno gesto ujame energijo prvega cvetenja — od nežno rožnatih cvetov do živahno zelenih poganjkov. Delo je bilo razstavljeno na mednarodnem festivalu umetnosti v Gradcu.",
    dimensions: "120 × 80 cm",
    medium: "Olje na platnu",
    year: 2024,
    provenance: "Festival umetnosti, Gradec 2024",
    startingPrice: 600,
    currentBid: 850,
    estimateLow: 700,
    estimateHigh: 1200,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-25T20:00:00",
    bidCount: 15,
    bids: [
      { id: "b22", bidder: "Kupec ****99", amount: 850, timestamp: "2025-11-29T18:00:00" },
      { id: "b23", bidder: "Kupec ****31", amount: 800, timestamp: "2025-11-29T15:30:00" },
      { id: "b24", bidder: "Kupec ****99", amount: 760, timestamp: "2025-11-28T12:45:00" },
      { id: "b25", bidder: "Kupec ****07", amount: 720, timestamp: "2025-11-27T09:20:00" },
      { id: "b26", bidder: "Kupec ****31", amount: 680, timestamp: "2025-11-26T16:55:00" },
    ],
    lotNumber: 105,
    featured: true,
    status: "active",
  },
  {
    id: "6",
    title: "Nocturne — Ljubljana",
    artist: "Tomaž Bernik",
    description: "Grafika, 60×45 cm. Nočna veduta Ljubljane v mehkih tonih.",
    longDescription: "Izjemna grafika, ki ujame čar nočne Ljubljane — odseve luči na Ljubljanici, silhueto gradu in tišino ulic po polnoči. Bernik z virtuozno grafično tehniko ustvari atmosfero, ki je hkrati intimna in univerzalna.",
    dimensions: "60 × 45 cm",
    medium: "Grafika — bakrotisk",
    year: 2023,
    provenance: "Grafični bienale, Ljubljana",
    startingPrice: 180,
    currentBid: 250,
    estimateLow: 200,
    estimateHigh: 400,
    images: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=800&fit=crop",
    ],
    endDate: "2025-12-28T18:00:00",
    bidCount: 4,
    bids: [
      { id: "b27", bidder: "Kupec ****55", amount: 250, timestamp: "2025-11-29T11:00:00" },
      { id: "b28", bidder: "Kupec ****82", amount: 220, timestamp: "2025-11-28T14:35:00" },
      { id: "b29", bidder: "Kupec ****55", amount: 200, timestamp: "2025-11-27T10:10:00" },
      { id: "b30", bidder: "Kupec ****19", amount: 190, timestamp: "2025-11-26T08:45:00" },
    ],
    lotNumber: 106,
    featured: false,
    status: "active",
  },
];
