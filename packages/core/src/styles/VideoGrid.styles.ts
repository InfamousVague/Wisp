/**
 * VideoGrid style helpers.
 */

/**
 * Resolve optimal column count for a given number of participants.
 * Scales smoothly from 1 to large groups.
 */
export function resolveGridColumns(participantCount: number): number {
  if (participantCount <= 1) return 1;
  if (participantCount <= 2) return 2;
  if (participantCount <= 4) return 2;
  if (participantCount <= 6) return 3;
  if (participantCount <= 9) return 3;
  if (participantCount <= 16) return 4;
  return 5;
}

/**
 * Resolve optimal row count for a given number of participants.
 */
export function resolveGridRows(participantCount: number): number {
  const cols = resolveGridColumns(participantCount);
  return Math.ceil(participantCount / cols);
}

export function resolveGridBackground(isDark: boolean): string {
  return isDark ? '#0a0a0a' : '#1a1a1a';
}

/** Max number of thumbnails visible in the strip before scrolling */
export const THUMBNAIL_STRIP_MAX_VISIBLE = 6;

/** Thumbnail strip tile height */
export const THUMBNAIL_STRIP_HEIGHT = 100;
