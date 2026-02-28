export const normalizeResponsibilities = (value) => {
  // already correct
  if (Array.isArray(value)) {
    return value.map(v => v.trim()).filter(Boolean);
  }

  // textarea string → array
  if (typeof value === "string") {
    return value
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);
  }

  return [];
};