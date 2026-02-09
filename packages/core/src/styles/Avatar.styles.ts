import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { AvatarShape, AvatarSizeConfig, AvatarStatus } from '../types/Avatar.types';

// ---------------------------------------------------------------------------
// Status colors
// ---------------------------------------------------------------------------

/**
 * Static colour mapping for each {@link AvatarStatus} that has a dedicated hue.
 *
 * @remarks
 * Statuses not present in the map (e.g. `'offline'`) fall back to the
 * theme's muted text colour via {@link resolveStatusColor}.
 */
export const statusColorMap: Record<string, string> = {
  online: '#22C55E',
  busy: '#EF4444',
  away: '#F59E0B',
};

/**
 * Returns the background colour for a given status indicator dot.
 *
 * @param status - The current avatar status.
 * @param themeColors - Active theme colour tokens.
 * @returns A CSS colour string.
 */
export function resolveStatusColor(
  status: AvatarStatus,
  themeColors: ThemeColors,
): string {
  return statusColorMap[status] ?? themeColors.text.muted;
}

// ---------------------------------------------------------------------------
// Initials extraction
// ---------------------------------------------------------------------------

/**
 * Extracts up to two uppercase initials from a full name string.
 *
 * @remarks
 * Single-word names produce one initial; multi-word names produce the first
 * and last initials.
 *
 * @param name - The full display name.
 * @returns One or two uppercase characters, or an empty string if the name is blank.
 */
export function extractInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || parts[0] === '') return '';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ---------------------------------------------------------------------------
// Container style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the outermost avatar container.
 *
 * @param sizeConfig - Pixel dimensions for the chosen size preset.
 * @param shape - Shape of the avatar (`'circle'` or `'square'`).
 * @param themeColors - Active theme colour tokens.
 * @returns A `CSSStyleObject` object for the container `<div>`.
 */
export function buildContainerStyle(
  sizeConfig: AvatarSizeConfig,
  shape: AvatarShape,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.container,
    height: sizeConfig.container,
    flexShrink: 0,
    boxSizing: 'border-box',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Inner wrapper style — clips image/initials to shape, sits below status dot
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the inner wrapper that clips content to the avatar shape.
 *
 * @param sizeConfig - Pixel dimensions for the chosen size preset.
 * @param shape - Shape of the avatar (`'circle'` or `'square'`).
 * @param themeColors - Active theme colour tokens.
 * @returns A `CSSStyleObject` object for the inner wrapper `<div>`.
 */
export function buildInnerStyle(
  sizeConfig: AvatarSizeConfig,
  shape: AvatarShape,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.container,
    height: sizeConfig.container,
    borderRadius: shape === 'circle' ? '50%' : sizeConfig.squareRadius,
    backgroundColor: themeColors.accent.primary,
    overflow: 'hidden',
  };
}

// ---------------------------------------------------------------------------
// Image style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the avatar `<img>` element.
 *
 * @returns A `CSSStyleObject` object that makes the image fill and cover
 * its container.
 */
export function buildImageStyle(): CSSStyleObject {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };
}

// ---------------------------------------------------------------------------
// Initials text style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the initials text `<span>`.
 *
 * @param sizeConfig - Pixel dimensions for the chosen size preset.
 * @param themeColors - Active theme colour tokens.
 * @returns A `CSSStyleObject` object for the initials text.
 */
export function buildInitialsStyle(
  sizeConfig: AvatarSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    lineHeight: 1,
    color: themeColors.text.inverse,
    userSelect: 'none',
    pointerEvents: 'none',
  };
}

// ---------------------------------------------------------------------------
// Status dot style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the status indicator dot.
 *
 * @param sizeConfig - Pixel dimensions for the chosen size preset.
 * @param status - Current status value (e.g. `'online'`, `'busy'`).
 * @param shape - Shape of the avatar, used to calculate dot offset.
 * @param themeColors - Active theme colour tokens.
 * @returns A `CSSStyleObject` object positioned at the bottom-right corner.
 */
export function buildStatusStyle(
  sizeConfig: AvatarSizeConfig,
  status: AvatarStatus,
  shape: AvatarShape,
  themeColors: ThemeColors,
): CSSStyleObject {
  const size = sizeConfig.statusSize;
  const border = sizeConfig.statusBorder;
  const offset = shape === 'circle' ? 0 : -1;
  return {
    position: 'absolute',
    bottom: offset,
    right: offset,
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: resolveStatusColor(status, themeColors),
    border: border + 'px solid ' + themeColors.background.canvas,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  };
}

// ---------------------------------------------------------------------------
// Skeleton style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style object for the skeleton loading placeholder.
 *
 * @param sizeConfig - Pixel dimensions for the chosen size preset.
 * @param shape - Shape of the avatar skeleton.
 * @param themeColors - Active theme colour tokens.
 * @returns A `CSSStyleObject` object with a pulsing animation.
 */
export function buildSkeletonStyle(
  sizeConfig: AvatarSizeConfig,
  shape: AvatarShape,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-block',
    width: sizeConfig.container,
    height: sizeConfig.container,
    borderRadius: shape === 'circle' ? '50%' : sizeConfig.squareRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
