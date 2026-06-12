import akr0209 from "@/assets/gallery/AKR_0209.jpg";
import akr0601 from "@/assets/gallery/AKR_0601.jpg";
import akr0607 from "@/assets/gallery/AKR_0607.jpg";
import akr0613 from "@/assets/gallery/AKR_0613.jpg";
import akr0086 from "@/assets/gallery/AKR_0086.jpg";
import akr0137 from "@/assets/gallery/AKR_0137.jpg";
import akr0649 from "@/assets/gallery/AKR_0649.jpg";
import akr0645 from "@/assets/gallery/AKR_0645.jpg";
import akr0637 from "@/assets/gallery/AKR_0637.jpg";
import akr0624 from "@/assets/gallery/AKR_0624.jpg";
import akr0010 from "@/assets/gallery/AKR_0010.jpg";
import akr0152 from "@/assets/gallery/AKR_0152.jpg";

export interface ClubBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: ClubBenefitDetail[];
}

export interface ClubBenefitDetail {
  title: string;
  description: string;
  image?: string;
  price?: string;
}

export interface ClubTrip {
  id: string;
  destination: string;
  highlight: string;
  date: string;
  image: string;
  description: string;
  distance?: string;
  duration?: string;
}

export interface ClubTier {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export interface ClubSubmenu {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export const clubBenefits: ClubBenefit[] = [
  {
    id: "1",
    icon: "🎨",
    title: "Mesečne voščilnice",
    description: "Ekskluzivne umetniške voščilnice slovenskih avtorjev, dostavljene na vaš dom.",
    details: [
      {
        title: "Voščilnica — K. K. Lina »Sinica«",
        description: "Nežna akvarelna ilustracija ptice na suhi cvetni glavi. Ročno tiskana na 300g papir Hahnemühle.",
        image: akr0613,
        price: "4,50 €",
      },
      {
        title: "Voščilnica — Omerz »Hiša«",
        description: "Minimalistična risba hiše z otroško neposrednostjo. Idealna za prazničen pozdrav.",
        image: akr0607,
        price: "4,50 €",
      },
      {
        title: "Voščilnica — K. K. Lina »Zimski okraski«",
        description: "Praznična ilustracija z živalskima likoma in zimskim motivom. Set 3 kos.",
        image: akr0601,
        price: "12,00 €",
      },
      {
        title: "Voščilnica — »Miška s štiriperesno deteljico«",
        description: "Nežna ilustracija z igrivim karakterjem in toplim humorjem. Darilo za srečo.",
        image: akr0209,
        price: "4,50 €",
      },
    ],
  },
  {
    id: "2",
    icon: "🎁",
    title: "Sezonska darila",
    description: "Skrbno izbrana umetniška darila ob posebnih priložnostih — keramika, grafike, unikati.",
    details: [
      {
        title: "Keramična ploskev — unikatni kos",
        description: "Organsko oblikovana keramična plošča v umirjenih zemeljskih tonih. Ročno delo slovenskega obrtnika.",
        image: akr0649,
        price: "65,00 €",
      },
      {
        title: "Umetniški tisk — »Solarni krog« Klavdij Tutta",
        description: "Limitirana edicija (30 izvodov) igrive krožne kompozicije z mediteranskimi simboli.",
        image: akr0137,
        price: "120,00 €",
      },
      {
        title: "Abstraktna modrina — mini tisk",
        description: "Ekspresivna slika z močno modro energijo, na 20×20 cm archivsem papirju.",
        image: akr0645,
        price: "35,00 €",
      },
      {
        title: "Set za kreativnost — akvarel & beležnica",
        description: "Komplet z ročno izdelano beležnico in setom akvarelnih barv — darilo za umetniško dušo.",
        price: "42,00 €",
      },
    ],
  },
  {
    id: "3",
    icon: "📦",
    title: "Promocijski izdelki",
    description: "Limitirane edicije tiskov, beležnic in dodatkov z deli slovenskih umetnikov.",
    details: [
      {
        title: "Umetniška beležnica — »Krožni svet«",
        description: "A5 beležnica z naslovnico po motivu Klavdija Tutte. 120 listov, brezlinirano.",
        image: akr0086,
        price: "18,00 €",
      },
      {
        title: "Platnena torba — »Morski spomin«",
        description: "Ekološka bombažna torba z umetniškim tiskom. Praktična in edinstvena.",
        image: akr0637,
        price: "22,00 €",
      },
      {
        title: "Umetniški koledar 2026",
        description: "12 mesecev, 12 del iz galerije Atelje Lučka & Avgust. Format A3, premium papir.",
        image: akr0624,
        price: "28,00 €",
      },
      {
        title: "Komplet razglednic (8 kos)",
        description: "Izbor najboljših del iz galerijske zbirke v formatu razglednice 15×10 cm.",
        image: akr0010,
        price: "15,00 €",
      },
    ],
  },
  {
    id: "5",
    icon: "🎟️",
    title: "Prednostni vstop",
    description: "Prednostne vstopnice za razstave, delavnice in posebne dogodke ateljeja.",
    details: [
      {
        title: "VIP odprtje razstave",
        description: "Ekskluzivni vstop 1 uro pred javnim odprtjem. Vodstvo s kustosem, brezplačna pijača.",
        price: "Brezplačno za člane",
      },
      {
        title: "Delavnica keramike — vikend tečaj",
        description: "4-urni vikend tečaj z mentorjem. Ves material vključen, domov odnesete svoje delo.",
        price: "35,00 € (nečlani 55 €)",
      },
      {
        title: "Nocturne — nočni ogled galerije",
        description: "Galerija pri sveči. Intimna izkušnja ob glasbi in vodstvu avtorja.",
        price: "15,00 € (nečlani 25 €)",
      },
      {
        title: "Umetniški zajtrk s kustosom",
        description: "Mesečni sobotni zajtrk v galeriji z vodenim pogovorom o aktualni razstavi.",
        price: "20,00 € (nečlani 35 €)",
      },
      {
        title: "Otroška delavnica — Mali umetniki",
        description: "Kreativna delavnica za otroke 5–12 let. Risanje, modeliranje, kolaž.",
        price: "12,00 € (nečlani 20 €)",
      },
    ],
  },
  {
    id: "6",
    icon: "📰",
    title: "Mesečnik ateljeja",
    description: "Ekskluzivno glasilo z novicami iz sveta umetnosti, intervjuji in priporočili.",
    details: [
      {
        title: "Zakaj umetnost?",
        description: "Mesečna rubrika, ki raziskuje, kako umetnost vpliva na vsakdanje življenje, blagostanje in kreativnost.",
      },
      {
        title: "Intervju meseca",
        description: "Poglobljen pogovor z izbranim slovenskim ali mednarodnim umetnikom.",
      },
      {
        title: "Priporočila — kaj videti ta mesec",
        description: "Izbor najboljših razstav, dogodkov in knjig iz sveta umetnosti v Sloveniji in tujini.",
      },
      {
        title: "Umetniški nasvet — za zbiratelje",
        description: "Kratki nasveti za začetnike in izkušene zbiratelje: kako izbrati, ohraniti in investirati v umetnost.",
      },
    ],
  },
];

export const clubTrips: ClubTrip[] = [
  // Mednarodni
  {
    id: "1",
    destination: "Benetke — Bienale",
    highlight: "La Biennale di Venezia 2025",
    date: "Junij 2025",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop",
    description: "3-dnevni obisk beneškega bienala s strokovnim vodstvom in obiskom otoških galerij.",
    distance: "400 km",
    duration: "3 dni",
  },
  {
    id: "2",
    destination: "Pariz — Louvre & Musée d'Orsay",
    highlight: "Impresionisti in renesansa",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop",
    description: "4-dnevno potovanje po pariških muzejih z ekskluzivnimi vodstvi in degustacijami.",
    distance: "1200 km",
    duration: "4 dni",
  },
  {
    id: "3",
    destination: "Dunaj — Belvedere & Albertina",
    highlight: "Klimt, Schiele in dunajska moderna",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop",
    description: "Vikend na Dunaju z obiskom vrhunskih zbirk in skritih galerij.",
    distance: "380 km",
    duration: "2 dni",
  },
  // Lokalni (do 100 km od Ljubljane)
  {
    id: "4",
    destination: "Piran — Galerija Herman Pečarič",
    highlight: "Obmorska umetnost in arhitektura",
    date: "Maj 2025",
    image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=600&h=400&fit=crop",
    description: "Celodnevni izlet na obalo z ogledom stalne zbirke Hermana Pečariča in sprehod po piranski starini.",
    distance: "95 km",
    duration: "1 dan",
  },
  {
    id: "5",
    destination: "Kostanjevica na Krki — Galerija Božidar Jakac",
    highlight: "Največja galerija na odprtem",
    date: "Junij 2025",
    image: "https://images.unsplash.com/photo-1590059390047-f5e617e0f6a2?w=600&h=400&fit=crop",
    description: "Obisk Forme vive in zbirke Božidarja Jakca v cistercijanskem samostanu. Piknik ob reki.",
    distance: "75 km",
    duration: "1 dan",
  },
  {
    id: "6",
    destination: "Škofja Loka — Loški grad",
    highlight: "Srednjeveška umetnost in sodobni ateljeji",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    description: "Vodeni ogled grajskega muzeja in obisk lokalnih umetniških ateljejev v starem jedru.",
    distance: "25 km",
    duration: "Pol dneva",
  },
  {
    id: "7",
    destination: "Idrija — Mestni muzej & čipka",
    highlight: "Idrijsko kulturno izročilo",
    date: "Maj 2025",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&h=400&fit=crop",
    description: "Ogled muzeja s stavbiščem sv. Trojice, delavnica klekljanja in postanek v Geoparku.",
    distance: "60 km",
    duration: "1 dan",
  },
  {
    id: "8",
    destination: "Kamnik — Mali grad & Galerija Miha Maleš",
    highlight: "Od gotike do sodobnosti",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1587974928442-77dc3e0748b1?w=600&h=400&fit=crop",
    description: "Sprehod na Mali grad z razglediščem, ogled galerije in postanek v kavarni ob Kamniški Bistrici.",
    distance: "23 km",
    duration: "Pol dneva",
  },
  {
    id: "9",
    destination: "Radovljica — Šivčeva hiša",
    highlight: "Baročna dvorana in sodobna umetnost",
    date: "Julij 2025",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    description: "Obisk stalne zbirke v Šivčevi hiši, galerija Avsenik in degustacija čokolade v starem mestnem jedru.",
    distance: "55 km",
    duration: "Pol dneva",
  },
  {
    id: "10",
    destination: "Novo mesto — Dolenjski muzej",
    highlight: "Situlska umetnost in sodobna scena",
    date: "Junij 2025",
    image: "https://images.unsplash.com/photo-1574236170880-faeefaa4cee0?w=600&h=400&fit=crop",
    description: "Ogled prazgodovinske zbirke in sodobne galerije v Novem mestu. Sprehod ob Krki.",
    distance: "70 km",
    duration: "1 dan",
  },
  {
    id: "11",
    destination: "Kranj — Prešernova hiša & Layer haus",
    highlight: "Iz romantike v sodobnost",
    date: "Maj 2025",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    description: "Vodeni ogled Prešernove hiše in galerije Layer haus s panoramo Kamniško-Savinjskih Alp.",
    distance: "30 km",
    duration: "Pol dneva",
  },
  {
    id: "12",
    destination: "Bled — Festival Bled & okoliška galerija",
    highlight: "Umetnost ob jezeru",
    date: "Avgust 2025",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
    description: "Obisk poletnega festivala umetnosti na Bledu, pleneri ob jezeru in druženje z umetniki.",
    distance: "55 km",
    duration: "1 dan",
  },
  {
    id: "13",
    destination: "Vrhnika — Cankarjev dom & Tehnični muzej",
    highlight: "Literarna in tehnična dediščina",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&h=400&fit=crop",
    description: "Ogled Cankarjevega doma, tehničnega muzeja in sprehod po Verdu z razgledom na Ljubljansko barje.",
    distance: "20 km",
    duration: "Pol dneva",
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
      "Ekskluzivni VIP dogodki",
      "Osebni umetniški svetovalec",
      "20% popust v galeriji",
      "Limitirane edicije del",
    ],
  },
];

export const clubSubmenus: ClubSubmenu[] = [
  {
    id: "vr-gallery",
    title: "Virtualna galerija 360°",
    description: "Oglejte si našo galerijo v virtualni resničnosti — kot da ste tam. Sprehod po razstavnih prostorih, ogled del od blizu, interaktivna doživetja.",
    icon: "🥽",
  },
  {
    id: "video-intro",
    title: "Predstavitveni video",
    description: "Kratek film o poslanstvu ateljeja, umetnikih in viziji. Doživite atmosfero naših razstav in dogodkov.",
    icon: "🎬",
  },
  {
    id: "artist-talks",
    title: "Pogovori z umetniki",
    description: "Mesečni virtualni pogovori v živo z gostujočimi umetniki. Postavljajte vprašanja, spoznajte ustvarjalne procese.",
    icon: "🎙️",
  },
  {
    id: "art-education",
    title: "Umetnost za vsakogar",
    description: "Kratki izobraževalni moduli o umetnostni zgodovini, tehnikah in zbirateljstvu — za začetnike in navdušence.",
    icon: "📚",
  },
];
