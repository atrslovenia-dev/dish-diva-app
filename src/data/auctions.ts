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
  startDate: string;
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

import akr0086 from "@/assets/gallery/AKR_0086.jpg";
import akr0137 from "@/assets/gallery/AKR_0137.jpg";
import akr0010 from "@/assets/gallery/AKR_0010.jpg";
import akr0645 from "@/assets/gallery/AKR_0645.jpg";
import akr0209 from "@/assets/gallery/AKR_0209.jpg";
import akr0613 from "@/assets/gallery/AKR_0613.jpg";
import akr0637 from "@/assets/gallery/AKR_0637.jpg";
import akr0624 from "@/assets/gallery/AKR_0624.jpg";

export const auctionsData: AuctionItem[] = [
  {
    id: "1",
    title: "Krožni svet",
    artist: "Klavdij Tutta",
    description: "Barvita simbolna kompozicija z ribami in osrednjim motivom.",
    longDescription: "Izjemna krožna kompozicija, ki v živahni paleti združuje mediteranske simbole — ribe, morje, sonce. Tutta z igrivimi oblikami in toplimi barvami ustvari kozmično mandalo, ki odpira pogled v arhetipski svet jadranske kulture. Delo je značilno za umetnikov zreli, prepoznavni slog.",
    dimensions: "Ø 60 cm",
    medium: "Mešana tehnika na okroglem lesu",
    year: 2024,
    provenance: "Neposredno iz ateljeja, Galerija LjArt",
    startingPrice: 3200,
    currentBid: 5400,
    estimateLow: 3500,
    estimateHigh: 7000,
    images: [akr0086],
    startDate: "2026-03-15T10:00:00",
    endDate: "2026-05-15T18:00:00",
    bidCount: 16,
    bids: [
      { id: "b1", bidder: "M. K.", amount: 5400, timestamp: "2026-04-08T14:23:00" },
      { id: "b2", bidder: "A. P.", amount: 5000, timestamp: "2026-04-07T09:45:00" },
      { id: "b3", bidder: "M. K.", amount: 4600, timestamp: "2026-04-06T16:12:00" },
      { id: "b4", bidder: "T. R.", amount: 4200, timestamp: "2026-04-05T11:30:00" },
      { id: "b5", bidder: "A. P.", amount: 3800, timestamp: "2026-04-04T08:55:00" },
      { id: "b6", bidder: "J. N.", amount: 3500, timestamp: "2026-04-03T19:10:00" },
    ],
    lotNumber: 101,
    featured: true,
    status: "active",
  },
  {
    id: "2",
    title: "Solarni krog",
    artist: "Klavdij Tutta",
    description: "Igriva krožna kompozicija z mediteranskimi simboli in ribami.",
    longDescription: "Drugi dragoceni krog Klavdija Tutte, ki nadaljuje dialog med človekom in morjem. Topli rumeni in oranžni toni se prepletajo z modrimi akcenti, ribe in sonca prehajajo drug v drugega. Delo izžareva mediteransko svetlobo in igrivost, značilno za Tuttov opus.",
    dimensions: "Ø 55 cm",
    medium: "Akril in mešana tehnika na lesu",
    year: 2023,
    provenance: "Razstava 'Krog in morje', Galerija LjArt",
    startingPrice: 2800,
    currentBid: 4100,
    estimateLow: 3000,
    estimateHigh: 5500,
    images: [akr0137],
    startDate: "2026-03-18T10:00:00",
    endDate: "2026-05-18T19:00:00",
    bidCount: 12,
    bids: [
      { id: "b7", bidder: "L. Š.", amount: 4100, timestamp: "2026-04-08T10:15:00" },
      { id: "b8", bidder: "N. B.", amount: 3800, timestamp: "2026-04-07T15:40:00" },
      { id: "b9", bidder: "L. Š.", amount: 3500, timestamp: "2026-04-06T12:20:00" },
      { id: "b10", bidder: "R. M.", amount: 3200, timestamp: "2026-04-05T09:00:00" },
      { id: "b11", bidder: "N. B.", amount: 3000, timestamp: "2026-04-04T17:30:00" },
    ],
    lotNumber: 102,
    featured: true,
    status: "active",
  },
  {
    id: "3",
    title: "Modri horizont",
    artist: "Galerijska zbirka",
    description: "Lirična abstrakcija v hladnih modrih tonih.",
    longDescription: "Meditativno abstraktno delo, ki s preprostimi modrimi ploskvami in subtilnimi prehodi ustvari občutek neskončnega horizonta. Slika vabi gledalca v tišino in kontemplativni prostor med nebom in morjem. Idealno delo za sodobne interierje z občutkom za umirjeno estetiko.",
    dimensions: "80 × 60 cm",
    medium: "Olje na platnu",
    year: 2024,
    provenance: "Zasebna zbirka, Galerija LjArt",
    startingPrice: 1200,
    currentBid: 1850,
    estimateLow: 1400,
    estimateHigh: 2500,
    images: [akr0010],
    startDate: "2026-03-20T10:00:00",
    endDate: "2026-05-20T20:00:00",
    bidCount: 9,
    bids: [
      { id: "b12", bidder: "E. V.", amount: 1850, timestamp: "2026-04-08T16:45:00" },
      { id: "b13", bidder: "P. G.", amount: 1650, timestamp: "2026-04-07T14:20:00" },
      { id: "b14", bidder: "E. V.", amount: 1500, timestamp: "2026-04-06T18:10:00" },
      { id: "b15", bidder: "S. D.", amount: 1350, timestamp: "2026-04-05T11:35:00" },
    ],
    lotNumber: 103,
    featured: false,
    status: "active",
  },
  {
    id: "4",
    title: "Abstraktna modrina",
    artist: "Galerijska zbirka",
    description: "Ekspresivna slika z močno modro barvno energijo.",
    longDescription: "Dinamično abstraktno delo, ki z intenzivnimi modrimi nanosi in energičnimi potezami čopiča ustvari občutek eksplozije barvne moči. Vidna je ekspresionistična svoboda v oblikovanju prostora in barve. Delo je intimno po formatu, a monumentalno po izrazu.",
    dimensions: "50 × 50 cm",
    medium: "Akril na platnu",
    year: 2024,
    provenance: "Galerija LjArt, razstava 2024",
    startingPrice: 900,
    currentBid: 1400,
    estimateLow: 1000,
    estimateHigh: 2000,
    images: [akr0645],
    startDate: "2026-03-22T10:00:00",
    endDate: "2026-05-22T17:00:00",
    bidCount: 7,
    bids: [
      { id: "b16", bidder: "K. L.", amount: 1400, timestamp: "2026-04-08T13:10:00" },
      { id: "b17", bidder: "D. T.", amount: 1250, timestamp: "2026-04-07T10:25:00" },
      { id: "b18", bidder: "K. L.", amount: 1100, timestamp: "2026-04-06T16:40:00" },
      { id: "b19", bidder: "B. J.", amount: 1000, timestamp: "2026-04-05T12:15:00" },
    ],
    lotNumber: 104,
    featured: false,
    status: "active",
  },
  {
    id: "5",
    title: "Miška s štiriperesno deteljico",
    artist: "K. K. Lina",
    description: "Nežna ilustracija z igrivim karakterjem in toplim humorjem.",
    longDescription: "Čarobna ilustracija, ki z nežnimi črtami in toplimi barvami pripoveduje zgodbo o sreči. Miška z deteljico je univerzalni simbol upanja in igrivosti. Delo je izjemno primerno za otroške sobe, a hkrati dovolj sofisticirano za zbiratelje ilustracij.",
    dimensions: "30 × 30 cm",
    medium: "Akvarel in tuš na papirju",
    year: 2024,
    provenance: "Avtorska izdaja, Galerija LjArt",
    startingPrice: 400,
    currentBid: 680,
    estimateLow: 450,
    estimateHigh: 900,
    images: [akr0209],
    startDate: "2026-03-25T10:00:00",
    endDate: "2026-05-25T18:00:00",
    bidCount: 11,
    bids: [
      { id: "b20", bidder: "Z. P.", amount: 680, timestamp: "2026-04-08T11:00:00" },
      { id: "b21", bidder: "I. M.", amount: 620, timestamp: "2026-04-07T16:30:00" },
      { id: "b22", bidder: "Z. P.", amount: 560, timestamp: "2026-04-06T09:15:00" },
      { id: "b23", bidder: "A. R.", amount: 500, timestamp: "2026-04-05T14:45:00" },
      { id: "b24", bidder: "I. M.", amount: 450, timestamp: "2026-04-04T10:20:00" },
    ],
    lotNumber: 105,
    featured: false,
    status: "active",
  },
  {
    id: "6",
    title: "Sinica",
    artist: "K. K. Lina",
    description: "Nežna akvarelna ilustracija ptice na suhi cvetni glavi.",
    longDescription: "Poetična akvarelna študija sinice na posušenem cvetju. Lina z izjemno subtilnimi barvnimi prehodi in občutljivo risbo ujame krhkost trenutka v naravi. Delo diha z nežnostjo in natančnostjo, značilno za avtoričin prepoznavni slog naravoslovnih ilustracij.",
    dimensions: "25 × 35 cm",
    medium: "Akvarel na papirju",
    year: 2023,
    provenance: "Serija 'Ptice', Galerija LjArt",
    startingPrice: 350,
    currentBid: 580,
    estimateLow: 400,
    estimateHigh: 800,
    images: [akr0613],
    endDate: "2026-05-28T19:00:00",
    bidCount: 8,
    bids: [
      { id: "b25", bidder: "V. K.", amount: 580, timestamp: "2026-04-08T15:20:00" },
      { id: "b26", bidder: "G. S.", amount: 520, timestamp: "2026-04-07T12:10:00" },
      { id: "b27", bidder: "V. K.", amount: 460, timestamp: "2026-04-06T17:35:00" },
      { id: "b28", bidder: "M. Z.", amount: 400, timestamp: "2026-04-05T08:50:00" },
    ],
    lotNumber: 106,
    featured: false,
    status: "active",
  },
  {
    id: "7",
    title: "Morski spomin",
    artist: "Galerijska zbirka",
    description: "Svetla kompozicija s prepletom modrine in teksturirane površine.",
    longDescription: "Atmosferično delo, ki z večplastnimi nanosi barv in tekstur ustvari občutek morskega spomina — kot bi gledalec videl ocean skozi zaveso časa. Modri in beli toni se prepletajo z naravnimi teksturami, ustvarjajoč meditativno globino. Primerno za ljubitelje sodobne abstrakcije.",
    dimensions: "70 × 50 cm",
    medium: "Mešana tehnika na platnu",
    year: 2024,
    provenance: "Galerija LjArt, zasebna zbirka",
    startingPrice: 1500,
    currentBid: 2200,
    estimateLow: 1800,
    estimateHigh: 3200,
    images: [akr0637],
    endDate: "2026-05-16T20:00:00",
    bidCount: 10,
    bids: [
      { id: "b29", bidder: "F. H.", amount: 2200, timestamp: "2026-04-08T09:30:00" },
      { id: "b30", bidder: "C. Ž.", amount: 2000, timestamp: "2026-04-07T18:15:00" },
      { id: "b31", bidder: "F. H.", amount: 1800, timestamp: "2026-04-06T13:45:00" },
      { id: "b32", bidder: "J. B.", amount: 1650, timestamp: "2026-04-05T10:00:00" },
      { id: "b33", bidder: "C. Ž.", amount: 1500, timestamp: "2026-04-04T15:30:00" },
    ],
    lotNumber: 107,
    featured: true,
    status: "active",
  },
  {
    id: "8",
    title: "Tišina forme",
    artist: "Galerijska zbirka",
    description: "Abstraktni motiv z mehkim prehajanjem svetlobe in ploskev.",
    longDescription: "Subtilno delo, ki raziskuje mejo med vidnim in nevidnim. Mehki prehodi svetlobe in sence ustvarjajo prostorsko globino na dvodimenzionalni površini. Delo je mojstrski primer minimalizma, ki ne odreče čustvenosti — tišina forme spregovori skozi barvo in svetlobo.",
    dimensions: "60 × 80 cm",
    medium: "Olje in pigmenti na platnu",
    year: 2023,
    provenance: "Razstava 'Tihi dialogi', Galerija LjArt",
    startingPrice: 1800,
    currentBid: 2800,
    estimateLow: 2000,
    estimateHigh: 4000,
    images: [akr0624],
    endDate: "2026-05-19T17:00:00",
    bidCount: 13,
    bids: [
      { id: "b34", bidder: "H. M.", amount: 2800, timestamp: "2026-04-08T12:40:00" },
      { id: "b35", bidder: "U. L.", amount: 2500, timestamp: "2026-04-07T08:20:00" },
      { id: "b36", bidder: "H. M.", amount: 2300, timestamp: "2026-04-06T14:55:00" },
      { id: "b37", bidder: "D. K.", amount: 2100, timestamp: "2026-04-05T16:10:00" },
      { id: "b38", bidder: "U. L.", amount: 1900, timestamp: "2026-04-04T11:25:00" },
    ],
    lotNumber: 108,
    featured: true,
    status: "active",
  },
];
