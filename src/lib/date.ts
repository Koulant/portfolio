type ParsedDate = {
  year: number;
  monthIndex: number;
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export function parsePeriodStart(period: string): ParsedDate | null {
  const normalizedPeriod = period.replace(/\s*-\s*/g, " - ").trim();
  const start = normalizedPeriod.split(" - ")[0]?.trim();
  if (!start) return null;

  const splitParts = start.split(" ").filter(Boolean);
  if (splitParts.length === 1) {
    const yearOnly = Number.parseInt(splitParts[0], 10);
    if (!Number.isFinite(yearOnly)) return null;
    return { year: yearOnly, monthIndex: 0 };
  }

  const [monthRaw, yearRaw] = splitParts;
  if (!monthRaw || !yearRaw) return null;

  const month = monthRaw.charAt(0).toUpperCase() + monthRaw.slice(1).toLowerCase();
  const monthIndex = MONTH_INDEX[month as keyof typeof MONTH_INDEX];
  const parsedYear = Number.parseInt(yearRaw, 10);

  if (!Number.isFinite(parsedYear) || monthIndex === undefined) return null;

  return { year: parsedYear, monthIndex };
}

export function isAfter(a: ParsedDate, b: ParsedDate): boolean {
  if (a.year !== b.year) return a.year > b.year;
  return a.monthIndex > b.monthIndex;
}
