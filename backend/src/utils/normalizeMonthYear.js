export const normalizeMonthYear = (value) => {
  if (!value) return value;
  const d = new Date(value);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};