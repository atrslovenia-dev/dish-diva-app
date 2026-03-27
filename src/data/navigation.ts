export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { id: "about", label: "Why Art?", href: "/about" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "exhibitions", label: "Exhibitions", href: "/exhibitions" },
  { id: "events", label: "Events", href: "/events" },
  { id: "gifts", label: "Gifts", href: "/gifts" },
  { id: "contact", label: "Contact", href: "/contact" },
];
