// Centralized category definitions for the CRM
export type ItemCategory =
  | "painting"
  | "work_on_paper"
  | "graphic"
  | "illustration"
  | "art_print"
  | "sculpture"
  | "ceramic_utility"
  | "stone_product"
  | "wine"
  | "juice"
  | "praline"
  | "magnet"
  | "card"
  | "notebook"
  | "other_gift";

export type ItemStatus = "draft" | "available" | "reserved" | "sold" | "archived";

export const CATEGORY_GROUPS: { label: string; items: { value: ItemCategory; label: string; hint?: string }[] }[] = [
  {
    label: "Likovna dela",
    items: [
      { value: "painting", label: "Slika na platnu", hint: "olje / akril, unikat" },
      { value: "work_on_paper", label: "Delo na papirju", hint: "akvarel, risba — unikat" },
      { value: "graphic", label: "Grafika", hint: "več odtisov, oštevilčena edicija" },
      { value: "illustration", label: "Ilustracija", hint: "originalna ilustracija" },
      { value: "art_print", label: "Art print / Giclée", hint: "digitalni odtis, edicija" },
      { value: "sculpture", label: "Skulptura" },
    ],
  },
  {
    label: "Uporabni izdelki",
    items: [
      { value: "ceramic_utility", label: "Keramika (uporabna)", hint: "skodelice, vaze, sklede" },
      { value: "stone_product", label: "Kraški kamen", hint: "podstavki, terilniki, posode" },
    ],
  },
  {
    label: "Slovenska darila",
    items: [
      { value: "wine", label: "Vino z avtorsko etiketo" },
      { value: "juice", label: "Teranov sok" },
      { value: "praline", label: "Pralineji" },
      { value: "magnet", label: "Kraški magnet" },
      { value: "card", label: "Voščilnica / Vizitka" },
      { value: "notebook", label: "Notesnik / Rokovnik" },
      { value: "other_gift", label: "Drugo darilo" },
    ],
  },
];

export const ALL_CATEGORIES: { value: ItemCategory; label: string }[] = CATEGORY_GROUPS.flatMap((g) =>
  g.items.map((i) => ({ value: i.value, label: `${g.label} — ${i.label}` })),
);

export const categoryLabel = (c: ItemCategory) => ALL_CATEGORIES.find((x) => x.value === c)?.label ?? c;

export const STATUS_OPTIONS: { value: ItemStatus; label: string }[] = [
  { value: "draft", label: "Osnutek" },
  { value: "available", label: "Na voljo" },
  { value: "reserved", label: "Rezervirano" },
  { value: "sold", label: "Prodano" },
  { value: "archived", label: "Arhiv" },
];

// Field hints — which fields are most relevant for which category
export const categoryFieldHints = (c: ItemCategory) => {
  switch (c) {
    case "painting":
      return { unique: true, showEdition: false, showDimensions: true, techniqueHint: "olje / akril", materialsHint: "platno" };
    case "work_on_paper":
      return { unique: true, showEdition: false, showDimensions: true, techniqueHint: "akvarel / risba", materialsHint: "papir" };
    case "graphic":
      return { unique: false, showEdition: true, showDimensions: true, techniqueHint: "linorez / litografija / sitotisk", materialsHint: "papir" };
    case "illustration":
      return { unique: true, showEdition: false, showDimensions: true, techniqueHint: "mešana tehnika", materialsHint: "papir" };
    case "art_print":
      return { unique: false, showEdition: true, showDimensions: true, techniqueHint: "Giclée", materialsHint: "umetniški papir" };
    case "sculpture":
      return { unique: true, showEdition: false, showDimensions: true, techniqueHint: "", materialsHint: "kamen / bron / les" };
    case "ceramic_utility":
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "ročno oblikovano / serijska izdelava", materialsHint: "slovenska glina / porcelan" };
    case "stone_product":
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "kleano / brušeno", materialsHint: "kraški apnenec" };
    case "wine":
      return { unique: false, showEdition: false, showDimensions: false, techniqueHint: "", materialsHint: "steklenica 0,75l" };
    case "juice":
      return { unique: false, showEdition: false, showDimensions: false, techniqueHint: "", materialsHint: "steklenica" };
    case "praline":
      return { unique: false, showEdition: false, showDimensions: false, techniqueHint: "", materialsHint: "embalaža" };
    case "magnet":
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "graviranje", materialsHint: "kraški apnenec" };
    case "card":
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "tisk / kaligrafija", materialsHint: "papir" };
    case "notebook":
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "ročna vezava", materialsHint: "papir" };
    default:
      return { unique: false, showEdition: false, showDimensions: true, techniqueHint: "", materialsHint: "" };
  }
};
