/**
 * Google Drive Video URL Parser & Utilities
 * Extracts file IDs from various Google Drive link formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/preview
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - <iframe src="https://drive.google.com/file/d/FILE_ID/preview" ...></iframe>
 * - Raw FILE_ID
 */

export function extractGoogleDriveFileId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Check if enclosed inside an <iframe> tag (extract src attribute)
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const target = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;

  // 2. Match standard /file/d/[ID] format
  const fileDMatch = target.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // 3. Match query parameter id=[ID] (e.g. open?id=... or uc?id=...)
  const queryIdMatch = target.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (queryIdMatch && queryIdMatch[1]) {
    return queryIdMatch[1];
  }

  // 4. Match /d/[ID] shorthand
  const dMatch = target.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch && dMatch[1]) {
    return dMatch[1];
  }

  // 5. Direct raw File ID (Google Drive IDs are typically 20-50 alphanumeric characters)
  if (/^[a-zA-Z0-9_-]{20,60}$/.test(target)) {
    return target;
  }

  return null;
}

export function getGoogleDriveEmbedUrl(urlOrId: string): string | null {
  const fileId = extractGoogleDriveFileId(urlOrId);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
