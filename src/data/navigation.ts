export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { id: "about", label: "Zakaj umetnost?", href: "/about" },
  { id: "gallery", label: "Galerija", href: "/gallery" },
  { id: "exhibitions", label: "Razstave", href: "/exhibitions" },
  { id: "events", label: "Dogodki", href: "/events" },
  { id: "auctions", label: "Dražbe", href: "/auctions" },
  { id: "gifts", label: "Darila", href: "/gifts" },
  { id: "club", label: "Klub", href: "/club" },
  { id: "contact", label: "Kontakt", href: "/contact" },
];
