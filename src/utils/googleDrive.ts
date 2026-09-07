/**
 * Google Drive & Universal Video URL Parser & Utilities
 * Extracts file and video IDs from various formats:
 * - Google Drive: /file/d/ID/view, /file/d/ID/preview, ?id=ID, <iframe>, raw ID
 * - YouTube: watch?v=ID, youtu.be/ID, embed/ID, shorts/ID
 */

export function extractGoogleDriveFileId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // If this is obviously YouTube, don't mistakenly treat as Drive
  if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
    return null;
  }

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

export function extractYouTubeVideoId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 1. Extract src if enclosed in iframe
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const target = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;

  // 2. youtu.be/ID
  const youtuBeMatch = target.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch && youtuBeMatch[1]) {
    return youtuBeMatch[1];
  }

  // 3. youtube.com/watch?v=ID or /shorts/ID or /embed/ID
  const ytMatch = target.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return ytMatch[1];
  }

  return null;
}

export function getGoogleDriveEmbedUrl(urlOrId: string): string | null {
  const fileId = extractGoogleDriveFileId(urlOrId);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getGoogleDriveDirectViewUrl(urlOrId: string): string | null {
  const fileId = extractGoogleDriveFileId(urlOrId);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/view?usp=drivesdk`;
}

export interface ParsedVideoSource {
  type: 'google-drive' | 'youtube' | 'direct' | 'unknown';
  id: string | null;
  embedUrl: string | null;
  directUrl: string | null;
  platformName: string;
}

export function parseVideoSource(input: string): ParsedVideoSource {
  if (!input || typeof input !== 'string') {
    return { type: 'unknown', id: null, embedUrl: null, directUrl: null, platformName: 'Unknown' };
  }

  const trimmed = input.trim();

  // Check YouTube first
  const ytId = extractYouTubeVideoId(trimmed);
  if (ytId) {
    return {
      type: 'youtube',
      id: ytId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&playsinline=1`,
      directUrl: `https://www.youtube.com/watch?v=${ytId}`,
      platformName: 'YouTube'
    };
  }

  // Check Google Drive
  const driveId = extractGoogleDriveFileId(trimmed);
  if (driveId) {
    return {
      type: 'google-drive',
      id: driveId,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      directUrl: `https://drive.google.com/file/d/${driveId}/view?usp=drivesdk`,
      platformName: 'Google Drive'
    };
  }

  // Check direct video file (.mp4, .webm)
  if (/\.(mp4|webm|ogv)(\?.*)?$/i.test(trimmed)) {
    return {
      type: 'direct',
      id: trimmed,
      embedUrl: trimmed,
      directUrl: trimmed,
      platformName: 'Direct Video'
    };
  }

  return {
    type: 'unknown',
    id: null,
    embedUrl: null,
    directUrl: null,
    platformName: 'Video Link'
  };
}
