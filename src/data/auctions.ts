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

import auctionTondi from "@/assets/auction-tondi.jpg";
import auctionAbstractBlue from "@/assets/auction-abstract-blue.jpg";
import auctionMixedMedia from "@/assets/auction-mixed-media.jpg";
import auctionMediterranean from "@/assets/auction-mediterranean.jpg";

export const auctionsData: AuctionItem[] = [
  {
    id: "1",
    title: "Devet svetov — serija tondijev",
    artist: "Marjanca Jemec Božič",
    description: "Ciklus devetih okroglih slik (tondijev), mešana tehnika, vsak Ø 40 cm.",
    longDescription: "Izjemen ciklus devetih okroglih slik, ki raziskuje kozmične in krajinske svetove skozi naivistični idiom. Vsak tondi pripoveduje svojo zgodbo — od zlatorumenih sončnih zahodov, zvezdnatih noči, do rdečih polj in jadranskih regal. Serija je celostna instalacija, ki deluje kot vizualni koledar letnih časov in razpoloženj. Delo je bilo prvič razstavljeno na samostojni razstavi v Galeriji LjArt.",
    dimensions: "9× Ø 40 cm (skupna instalacija 140 × 140 cm)",
    medium: "Mešana tehnika na okroglem lesu",
    year: 2024,
    provenance: "Direktno iz ateljeja umetnice, prvič razstavljeno v Galeriji LjArt",
    startingPrice: 4500,
    currentBid: 6800,
    estimateLow: 5000,
    estimateHigh: 9000,
    images: [auctionTondi],
    endDate: "2026-05-15T18:00:00",
    bidCount: 14,
    bids: [
      { id: "b1", bidder: "Kupec ****72", amount: 6800, timestamp: "2026-04-06T14:23:00" },
      { id: "b2", bidder: "Kupec ****15", amount: 6400, timestamp: "2026-04-05T09:45:00" },
      { id: "b3", bidder: "Kupec ****72", amount: 6000, timestamp: "2026-04-04T16:12:00" },
      { id: "b4", bidder: "Kupec ****38", amount: 5600, timestamp: "2026-04-03T11:30:00" },
      { id: "b5", bidder: "Kupec ****15", amount: 5200, timestamp: "2026-04-02T08:55:00" },
      { id: "b6", bidder: "Kupec ****91", amount: 4800, timestamp: "2026-04-01T19:10:00" },
    ],
    lotNumber: 101,
    featured: true,
    status: "active",
  },
  {
    id: "2",
    title: "Modra eksplozija",
    artist: "Ana Koželj",
    description: "Olje na platnu, 40×40 cm. Abstraktni ekspresionizem v modrih in rumenih tonih.",
    longDescription: "Ekspresivno abstraktno delo, ki z intenzivnimi modrimi in rumenimi nanosi ustvari dinamično napetost med toplim in hladnim. Vidni so odločni potezi čopiča, ki razkrivajo energijo ustvarjalnega procesa. Delo je intimno po formatu, a monumentalno po izrazu — prava galerijska kakovost za zahtevnega zbiratelja sodobne umetnosti.",
    dimensions: "40 × 40 cm",
    medium: "Olje na platnu",
    year: 2024,
    provenance: "Zasebna zbirka, razstava v Galeriji LjArt 2024",
    startingPrice: 800,
    currentBid: 1350,
    estimateLow: 900,
    estimateHigh: 1800,
    images: [auctionAbstractBlue],
    endDate: "2026-05-20T20:00:00",
    bidCount: 9,
    bids: [
      { id: "b7", bidder: "Kupec ****44", amount: 1350, timestamp: "2026-04-07T10:15:00" },
      { id: "b8", bidder: "Kupec ****67", amount: 1200, timestamp: "2026-04-06T15:40:00" },
      { id: "b9", bidder: "Kupec ****44", amount: 1100, timestamp: "2026-04-05T12:20:00" },
      { id: "b10", bidder: "Kupec ****23", amount: 1000, timestamp: "2026-04-04T09:00:00" },
      { id: "b11", bidder: "Kupec ****67", amount: 900, timestamp: "2026-04-03T17:30:00" },
    ],
    lotNumber: 102,
    featured: false,
    status: "active",
  },
  {
    id: "3",
    title: "Kompozicija s čolnom",
    artist: "Klavdij Tutta",
    description: "Mešana tehnika, večdelno delo. Minimalistična poetika predmetov in krajine.",
    longDescription: "Triptih sodobne mešane tehnike, ki združuje risbo, kolaž in akrilne ploskve v minimalističen vizualni dialog. Osrednje delo prikazuje stiliziran čoln na rdeči podlagi, obdana z dvema manjšima deloma z geometrijskimi motivi. Tutta z izčiščeno kompozicijo in omejeno paleto ustvari meditativni prostor med figuro in abstrakcijo. Delo je značilno za umetnikov zreli slog.",
    dimensions: "Glavno delo 100 × 70 cm + 2× 40 × 30 cm",
    medium: "Mešana tehnika na platnu",
    year: 2023,
    provenance: "Razstava 'Tihi dialogi', Galerija LjArt",
    startingPrice: 3200,
    currentBid: 4800,
    estimateLow: 3500,
    estimateHigh: 6500,
    images: [auctionMixedMedia],
    endDate: "2026-05-18T19:00:00",
    bidCount: 11,
    bids: [
      { id: "b12", bidder: "Kupec ****56", amount: 4800, timestamp: "2026-04-07T16:45:00" },
      { id: "b13", bidder: "Kupec ****89", amount: 4400, timestamp: "2026-04-06T14:20:00" },
      { id: "b14", bidder: "Kupec ****56", amount: 4000, timestamp: "2026-04-05T18:10:00" },
      { id: "b15", bidder: "Kupec ****12", amount: 3800, timestamp: "2026-04-04T11:35:00" },
      { id: "b16", bidder: "Kupec ****89", amount: 3500, timestamp: "2026-04-03T09:50:00" },
      { id: "b17", bidder: "Kupec ****34", amount: 3300, timestamp: "2026-04-02T15:25:00" },
    ],
    lotNumber: 103,
    featured: true,
    status: "active",
  },
  {
    id: "4",
    title: "Mediteranski cipresi — triptih",
    artist: "Peter Marolt",
    description: "Akril na platnu, triptih. Istrska krajina s kolesarji, cipresami in morjem.",
    longDescription: "Čaroben triptih, ki ujame duh mediteranske krajine — od nočne vožnje kolesarjev mimo cipres pod polno luno, do sončnih oljčnih nasadov z razgledom na morje. Marolt z živahno paleto in naivističnim pripovednim slogom ustvari dela, ki so hkrati nostalgična in sodobna. Serija je popolna za ljubitelje istrskega ambienta in sredozemske svetlobe.",
    dimensions: "Glavno delo 60 × 60 cm + 2× 30 × 20 cm",
    medium: "Akril in mešana tehnika na platnu",
    year: 2024,
    provenance: "Festival umetnosti, Galerija LjArt 2024",
    startingPrice: 2800,
    currentBid: 3900,
    estimateLow: 3000,
    estimateHigh: 5500,
    images: [auctionMediterranean],
    endDate: "2026-05-22T17:00:00",
    bidCount: 8,
    bids: [
      { id: "b18", bidder: "Kupec ****77", amount: 3900, timestamp: "2026-04-07T13:10:00" },
      { id: "b19", bidder: "Kupec ****45", amount: 3600, timestamp: "2026-04-06T10:25:00" },
      { id: "b20", bidder: "Kupec ****77", amount: 3300, timestamp: "2026-04-05T16:40:00" },
      { id: "b21", bidder: "Kupec ****63", amount: 3100, timestamp: "2026-04-04T12:15:00" },
    ],
    lotNumber: 104,
    featured: true,
    status: "active",
  },
];
