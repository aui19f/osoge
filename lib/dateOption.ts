import { START_SERVICE_YEAR } from "@/lib/constant";
import { FormOption } from "@/types/forms";

export function getYearList(): FormOption[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - START_SERVICE_YEAR + 1 },
    (_, index) => {
      const year = START_SERVICE_YEAR + index;
      const yearString = year.toString();
      return { id: yearString, label: `${yearString}년` };
    }
  );
}

export function getMonthList(): FormOption[] {
  return Array(12)
    .fill(0)
    .map((_, x) => ({ id: (x + 1).toString(), label: `${x + 1}월` }));
}

export function getDayList(): FormOption[] {
  return Array(31)
    .fill(0)
    .map((_, x) => ({ id: (x + 1).toString(), label: `${x + 1}일` }));
}

export function getMonthOptions(start: string): FormOption[] {
  const startDate = new Date(`${start}-01`);
  const endDate = new Date();

  const options: FormOption[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const value = current.toISOString().slice(0, 7); // YYYY-MM
    options.push({ id: value, label: value });
    current.setMonth(current.getMonth() + 1);
  }

  return options;
}

export function getYearOptions(startYear: string): FormOption[] {
  const start = parseInt(startYear, 10);
  const end = new Date().getFullYear();

  const options: FormOption[] = [];

  for (let y = start; y <= end; y++) {
    const yearStr = String(y);
    options.push({ id: yearStr, label: yearStr });
  }

  return options;
}
