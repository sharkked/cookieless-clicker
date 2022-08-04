export function formatNumber(n: number): string {
  if (n < 1e1) return n.toFixed(3);
  if (n < 0) return "-" + formatNumber(-n);
  const exp = Math.floor(Math.log(n) / Math.log(1000));
  const base = n / Math.pow(1000, exp);
  return (
    base.toFixed(4).substring(0, 5) +
    " " +
    [
      "",
      "k",
      "M",
      "B",
      "T",
      "Qa",
      "Qi",
      "Sx",
      "Sp",
      "Oc",
      "No",
      "Dc",
      "Ud",
      "Dd",
      "Td",
      "Qad",
      "Qid",
    ][exp]
  );
}

export function formatPercent(n: number) {
  return (n * 100).toFixed(1) + "%";
}
