/**
 * VideoGrid style helpers.
 */

export function resolveGridColumns(participantCount: number): number {
  if (participantCount <= 1) return 1;
  if (participantCount <= 2) return 2;
  if (participantCount <= 4) return 2;
  if (participantCount <= 6) return 3;
  return 3;
}

export function resolveGridRows(participantCount: number): number {
  if (participantCount <= 1) return 1;
  if (participantCount <= 2) return 1;
  if (participantCount <= 4) return 2;
  return 2;
}

export function resolveGridBackground(isDark: boolean): string {
  return isDark ? '#0a0a0a' : '#1a1a1a';
}
