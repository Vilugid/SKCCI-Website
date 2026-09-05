// Role-Based Access Control (RBAC) helpers
// Reads configurable admin emails from environment variables or falls back to authorized defaults

const parseEmails = (envValue?: string, fallback: string[] = []): string[] => {
  if (envValue && envValue.trim()) {
    return envValue.toLowerCase().split(',').map(e => e.trim()).filter(Boolean);
  }
  return fallback.map(e => e.toLowerCase().trim());
};

const getEnvVar = (key: string): string | undefined => {
  try {
    return (import.meta as any)?.env?.[key];
  } catch {
    return undefined;
  }
};

const SUPER_ADMINS = parseEmails(
  getEnvVar('VITE_SUPER_ADMIN_EMAILS'),
  ['captainmarkvil@gmail.com']
);

const CELL_ADMINS = parseEmails(
  getEnvVar('VITE_CELL_ADMIN_EMAILS'),
  ['isalynmaravilla13@gmail.com']
);

const EVENT_ADMINS = parseEmails(
  getEnvVar('VITE_EVENT_ADMIN_EMAILS'),
  ['beaangelnicole.mendoza@gmail.com', 'beaangelnicole.mendoza@gmail.con', 'lzvmndmendoza@gmail.com']
);

const PRAYER_ADMINS = parseEmails(
  getEnvVar('VITE_PRAYER_ADMIN_EMAILS'),
  ['lzvmndmendoza@gmail.com']
);

export const isSuperAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  return SUPER_ADMINS.includes(email.toLowerCase().trim());
};

export const isCellLeaderAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  if (isSuperAdmin(email)) return true;
  return CELL_ADMINS.includes(email.toLowerCase().trim());
};

export const isEventAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  if (isSuperAdmin(email)) return true;
  return EVENT_ADMINS.includes(email.toLowerCase().trim());
};

export const isPrayerAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  if (isSuperAdmin(email)) return true;
  return PRAYER_ADMINS.includes(email.toLowerCase().trim());
};

