export const nasaContent = {
  sectionNumber: "06",
  sectionLabel: "NASA Space Apps",
  title: "NASA International Space Apps Challenge",
  year: "2022",
  location: "Elazığ",
  /** Set when verified — e.g. "Local Winner". Leave null for neutral wording. */
  award: "1st Place, Elazığ" as string | null,
  github: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
  projectName: "WINK TO THE FUTURE INNOSOFT",
  description:
    "1st place in the Elazığ round of the NASA International Space Apps Challenge 2022 with team Innosoft. We built Wink to the Future, a Flutter app, in 48 hours.",
  participationLabel: "Hackathon Winner",
  githubLinkLabel: "View Project Repository",
} as const;

export function isNasaGithubConfigured(
  url: string | null,
): url is string {
  return Boolean(url && !url.includes("placeholder"));
}
