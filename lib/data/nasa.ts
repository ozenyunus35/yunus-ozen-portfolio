export const nasaContent = {
  sectionNumber: "06",
  sectionLabel: "NASA Space Apps",
  title: "NASA International Space Apps Challenge",
  year: "2022",
  location: "Elazığ",
  /** Set when verified — e.g. "Local Winner". Leave null for neutral wording. */
  award: null as string | null,
  github: "https://github.com/ozenyunus35/WINK-TO-THE-FUTURE-INNOSOFT",
  projectName: "WINK TO THE FUTURE INNOSOFT",
  description:
    "Participated in the NASA International Space Apps Challenge in Elazığ, 2022 — collaborating on a team project. The related GitHub repository is a fork of the original team repository.",
  participationLabel: "Hackathon Participation",
  githubLinkLabel: "View Project Repository",
} as const;

export function isNasaGithubConfigured(
  url: string | null,
): url is string {
  return Boolean(url && !url.includes("placeholder"));
}
