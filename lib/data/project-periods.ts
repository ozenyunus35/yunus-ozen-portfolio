export type MonthYear = {
  month: number;
  year: number;
};

export type ProjectDateRange = {
  start: MonthYear;
  end?: MonthYear;
  ongoing?: boolean;
};

/** Canonical project date ranges — used for ordering and display copy. */
export const PROJECT_DATE_RANGES = {
  "tavuk-da-tavuk": {
    start: { month: 3, year: 2026 },
    end: { month: 3, year: 2026 },
  },
  bisevk: {
    start: { month: 5, year: 2025 },
    ongoing: true,
  },
  fmd: {
    start: { month: 1, year: 2025 },
    end: { month: 5, year: 2025 },
  },
  eyfel: {
    start: { month: 5, year: 2024 },
    end: { month: 10, year: 2024 },
  },
} satisfies Record<string, ProjectDateRange>;

const MONTHS_TR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
] as const;

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatMonthYear({ month, year }: MonthYear, locale: "tr" | "en") {
  const months = locale === "tr" ? MONTHS_TR : MONTHS_EN;
  return `${months[month - 1]} ${year}`;
}

export function formatProjectPeriod(
  slug: keyof typeof PROJECT_DATE_RANGES,
  locale: "tr" | "en",
): string {
  const range = PROJECT_DATE_RANGES[slug];
  const start = formatMonthYear(range.start, locale);

  if ("ongoing" in range && range.ongoing) {
    return locale === "tr" ? `${start} — Günümüz` : `${start} — Present`;
  }

  if (!("end" in range) || !range.end) {
    return start;
  }

  const end = formatMonthYear(range.end, locale);
  if (range.start.month === range.end.month && range.start.year === range.end.year) {
    return start;
  }

  return `${start} — ${end}`;
}

export function compareProjectsByDate(a: string, b: string) {
  const rangeA = PROJECT_DATE_RANGES[a as keyof typeof PROJECT_DATE_RANGES];
  const rangeB = PROJECT_DATE_RANGES[b as keyof typeof PROJECT_DATE_RANGES];
  const keyA = rangeA.start.year * 12 + rangeA.start.month;
  const keyB = rangeB.start.year * 12 + rangeB.start.month;
  return keyB - keyA;
}
