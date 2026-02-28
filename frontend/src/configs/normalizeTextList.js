export const normalizeTextList = (input) => {
  // Case 1: already an array
  if (Array.isArray(input)) {
    return input
      .flatMap((item) => {
        if (typeof item === "string") {
          return item
            .split(/\n|,/); // split by newline OR comma
        }
        return [];
      })
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // Case 2: string
  if (typeof input === "string") {
    return input
      .split(/\n|,/)
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return [];
};