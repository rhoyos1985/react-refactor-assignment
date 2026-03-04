export function normalizeName(fullName: string): string {
  const trimmed = fullName.trim();
  const parts = trimmed.split(' ').filter(Boolean);
  
  if (parts.length < 2) {
    return capitalize(trimmed);
  }

  const [, surname] = parts;
  
  if (surname?.toLowerCase().startsWith("o'")) {
    return parts
      .map((part) => {
        if (part.toLowerCase().startsWith("o'")) {
          return "O'" + capitalize(part.slice(2));
        }
        return capitalize(part);
      })
      .join(' ');
  }

  return parts.map(capitalize).join(' ');
}

function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isSlotStale(createdAt: string): boolean {
  const created = new Date(createdAt);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return created < fiveMinutesAgo;
}

export function shouldReportErrors(): boolean {
  const today = new Date();
  return today.getDay() !== 0;
}
