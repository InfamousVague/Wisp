/**
 * @module FileUploader
 */
import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Dropzone container
// ---------------------------------------------------------------------------

export function buildDropzoneStyle(
  themeColors: ThemeColors,
  isDragOver: boolean,
  disabled: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: defaultSpacing.sm,
    padding: `${defaultSpacing['2xl']}px ${defaultSpacing.xl}px`,
    borderRadius: defaultRadii.lg,
    border: `2px dashed ${isDragOver ? themeColors.accent.primary : themeColors.border.strong}`,
    backgroundColor: isDragOver ? themeColors.accent.highlight : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontFamily: fontFamilyStacks.sans,
    textAlign: 'center',
    transition: 'border-color 150ms ease, background-color 150ms ease',
    boxSizing: 'border-box',
    position: 'relative',
  };
}

// ---------------------------------------------------------------------------
// Icon wrapper
// ---------------------------------------------------------------------------

export function buildDropzoneIconStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: defaultRadii.lg,
    backgroundColor: themeColors.accent.highlight,
    color: themeColors.text.secondary,
  };
}

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

export function buildDropzoneTitleStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: 14,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: 1.4,
    color: themeColors.text.primary,
    margin: 0,
  };
}

export function buildDropzoneDescriptionStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: 13,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: 1.4,
    color: themeColors.text.muted,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Browse link highlight
// ---------------------------------------------------------------------------

export function buildDropzoneLinkStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    color: themeColors.accent.primary,
    fontWeight: defaultTypography.weights.semibold,
    cursor: 'pointer',
    textDecoration: 'underline',
    textUnderlineOffset: 2,
  };
}
