export const formatCurrency = (n: number, locale = "es-CO", currency = "COP") =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(n);

export const cls = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");
