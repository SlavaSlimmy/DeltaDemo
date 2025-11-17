export function formatNumber(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function formatDiff(curr?: number, prev?: number): string {
  if (prev === undefined || prev === 0 || curr === undefined) return "";
  const diff = ((curr - prev) / prev) * 100;
  const sign = diff > 0 ? "+" : diff < 0 ? "-" : "";
  return `${sign}${Math.abs(diff).toFixed(0)}%`;
}

export function percentDiff(curr: number, prev: number): number {
  if (prev === 0 || prev === undefined) return 0;
  const diff = ((curr - prev) / prev) * 100;
  return diff;
}
