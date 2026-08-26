export const isSuperAdmin = (email?: string | null): boolean => {
  return email?.toLowerCase() === 'captainmarkvil@gmail.com';
};

export const isCellLeaderAdmin = (email?: string | null): boolean => {
  if (isSuperAdmin(email)) return true;
  return email?.toLowerCase() === 'isalynmaravilla13@gmail.com';
};

export const isEventAdmin = (email?: string | null): boolean => {
  if (isSuperAdmin(email)) return true;
  const normalizedEmail = email?.toLowerCase();
  return normalizedEmail === 'beaangelnicole.mendoza@gmail.com' || normalizedEmail === 'beaangelnicole.mendoza@gmail.con';
};

export const isPrayerAdmin = (email?: string | null): boolean => {
  if (isSuperAdmin(email)) return true;
  return email?.toLowerCase() === 'lzvmndmendoza@gmail.com';
};
