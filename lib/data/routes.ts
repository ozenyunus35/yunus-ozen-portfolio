export type RouteMode = "home" | "work" | "about" | "journey" | "contact";

export type RouteEntry = {
  index: string;
  label: string;
  href: string;
  mode: RouteMode;
};

export const routeRegistry: RouteEntry[] = [
  { index: "00", label: "INDEX", href: "/", mode: "home" },
  { index: "01", label: "WORK", href: "/work", mode: "work" },
  { index: "02", label: "ABOUT", href: "/about", mode: "about" },
  { index: "03", label: "JOURNEY", href: "/journey", mode: "journey" },
  { index: "04", label: "CONTACT", href: "/contact", mode: "contact" },
];

export function getRouteFromPathname(pathname: string): RouteEntry {
  if (pathname === "/") return routeRegistry[0];
  if (pathname.startsWith("/work")) return routeRegistry[1];
  if (pathname.startsWith("/about")) return routeRegistry[2];
  if (pathname.startsWith("/journey")) return routeRegistry[3];
  if (pathname.startsWith("/contact")) return routeRegistry[4];
  return routeRegistry[0];
}

export function getRouteMode(pathname: string): RouteMode {
  return getRouteFromPathname(pathname).mode;
}
