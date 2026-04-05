export interface ClubBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ClubTrip {
  id: string;
  destination: string;
  highlight: string;
  date: string;
  image: string;
  description: string;
}

export interface ClubTier {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export const clubBenefits: ClubBenefit[] = [
  {
    id: "1",
    icon: "🎨",
    title: "Mesečne voščilnice",
    description: "Ekskluzivne umetniške voščilnice slovenskih avtorjev, dostavljene na vaš dom.",
  },
  {
    id: "2",
    icon: "🎁",
    title: "Sezonska darila",
    description: "Skrbno izbrana umetniška darila ob posebnih priložnostih — keramika, grafike, unikati.",
  },
  {
    id: "3",
    icon: "📦",
    title: "Promocijski izdelki",
    description: "Limitirane edicije tiskov, beležnic in dodatkov z deli slovenskih umetnikov.",
  },
  {
    id: "4",
    icon: "✈️",
    title: "Umetniška potovanja",
    description: "Organizirani obiski svetovno znanih galerij — Benetke, Pariz, Louvre in več.",
  },
  {
    id: "5",
    icon: "🎟️",
    title: "Prednostni vstop",
    description: "Prednostne vstopnice za razstave, delavnice in posebne dogodke ateljeja.",
  },
  {
    id: "6",
    icon: "📰",
    title: "Mesečnik ateljeja",
    description: "Ekskluzivno glasilo z novicami iz sveta umetnosti, intervjuji in priporočili.",
  },
];

export const clubTrips: ClubTrip[] = [
  {
    id: "1",
    destination: "Benetke — Bienale",
    highlight: "La Biennale di Venezia 2025",
    date: "Junij 2025",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop",
    description: "3-dnevni obisk beneškega bienala s strokovnim vodstvom in obiskom otoških galerij.",
  },
  {
    id: "2",
    destination: "Pariz — Louvre & Musée d'Orsay",
    highlight: "Impresionisti in renesansa",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop",
    description: "4-dnevno potovanje po pariških muzejih z ekskluzivnimi vodstvi in degustacijami.",
  },
  {
    id: "3",
    destination: "Dunaj — Belvedere & Albertina",
    highlight: "Klimt, Schiele in dunajska moderna",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop",
    description: "Vikend na Dunaju z obiskom vrhunskih zbirk in skritih galerij.",
  },
];

export const clubTiers: ClubTier[] = [
  {
    id: "basic",
    name: "Prijatelj",
    price: "9,90 €",
    period: "mesečno",
    features: [
      "Mesečne voščilnice",
      "Mesečnik ateljeja",
      "10% popust v galeriji",
      "Prednostna obvestila",
    ],
  },
  {
    id: "premium",
    name: "Mecen",
    price: "29,90 €",
    period: "mesečno",
    features: [
      "Vse iz paketa Prijatelj",
      "Sezonska darila (4×/leto)",
      "Promocijski izdelki",
      "Prednostni vstop na dogodke",
      "15% popust v galeriji",
    ],
    highlighted: true,
  },
  {
    id: "vip",
    name: "Ambasador",
    price: "59,90 €",
    period: "mesečno",
    features: [
      "Vse iz paketa Mecen",
      "Umetniška potovanja (popust)",
      "Ekskluzivni VIP dogodki",
      "Osebni umetniški svetovalec",
      "20% popust v galeriji",
      "Limitirane edicije del",
    ],
  },
];
