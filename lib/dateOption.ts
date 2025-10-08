import { IOption } from "@/types/options";

export function getMonthOptions(start: string): IOption[] {
  const startDate = new Date(`${start}-01`);
  const endDate = new Date();

  const options: IOption[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const value = current.toISOString().slice(0, 7); // YYYY-MM
    options.push({ id: value, label: value });
    current.setMonth(current.getMonth() + 1);
  }

  return options;
}

export function getYearOptions(startYear: string): IOption[] {
  const start = parseInt(startYear, 10);
  const end = new Date().getFullYear();

  const options: IOption[] = [];

  for (let y = start; y <= end; y++) {
    const yearStr = String(y);
    options.push({ id: yearStr, label: yearStr });
  }

  return options;
}
