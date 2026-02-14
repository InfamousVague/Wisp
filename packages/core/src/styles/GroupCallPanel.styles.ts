/**
 * GroupCallPanel style helpers.
 */

export function resolveGroupCallBackground(isDark: boolean): string {
  return isDark ? '#0f0f0f' : '#111111';
}

export function resolveGroupCallBorder(isDark: boolean): string {
  return isDark ? '#2a2a2a' : '#333333';
}

export function resolveControlBarBackground(isDark: boolean): string {
  return isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.5)';
}
