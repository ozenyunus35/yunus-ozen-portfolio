
export function getExploringStatusLabel(
  status: "Learning" | "Developing",
  locale: "tr" | "en",
): string {
  if (locale === "tr") {
    return status === "Learning" ? "Öğreniyorum" : "Geliştiriyorum";
  }
  return status === "Learning" ? "Learning" : "Developing";
}
