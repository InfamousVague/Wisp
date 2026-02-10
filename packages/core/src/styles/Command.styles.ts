/**
 * Style builders for the Wisp Command palette primitive.
 *
 * @module primitives/command/styles
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { CommandSize } from '../types/Command.types';
import { commandSizeMap } from '../types/Command.types';
import { fontFamilyStacks, glassStyle } from '../tokens/shared';
import type { SurfaceVariant } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';
import { zIndex } from '../tokens/z-index';
import { durations, easings } from '../tokens/motion';

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

export function buildOverlayStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: zIndex.modal,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '20vh',
    backgroundColor: themeColors.background.overlay,
  };
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

export function buildPanelStyle(
  size: CommandSize,
  themeColors: ThemeColors,
  variant: SurfaceVariant = 'solid',
): CSSStyleObject {
  const base: CSSStyleObject = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: commandSizeMap[size],
    maxHeight: 420,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: defaultRadii.lg,
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
    outline: 'none',
    overflow: 'hidden',
    fontFamily: fontFamilyStacks.sans,
  };

  if (variant === 'glass') {
    return { ...base, ...glassStyle, borderRadius: defaultRadii.lg, overflow: 'hidden' };
  }

  return base;
}

// ---------------------------------------------------------------------------
// Input wrapper
// ---------------------------------------------------------------------------

export function buildInputWrapperStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.sm,
    padding: `${defaultSpacing.md}px ${defaultSpacing.lg}px`,
    borderBottom: `1px solid ${themeColors.border.subtle}`,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

export function buildInputStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: themeColors.text.primary,
    fontSize: defaultTypography.sizes.base.fontSize,
    lineHeight: defaultTypography.sizes.base.lineHeight,
    fontFamily: fontFamilyStacks.sans,
    padding: 0,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Input icon
// ---------------------------------------------------------------------------

export function buildInputIconStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: themeColors.text.muted,
  };
}

// ---------------------------------------------------------------------------
// List container
// ---------------------------------------------------------------------------

export function buildListStyle(): CSSStyleObject {
  return {
    overflowY: 'auto',
    maxHeight: 320,
    padding: `${defaultSpacing.sm}px 0`,
    flex: 1,
  };
}

// ---------------------------------------------------------------------------
// Group heading
// ---------------------------------------------------------------------------

export function buildGroupHeadingStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    padding: `${defaultSpacing.sm}px ${defaultSpacing.lg}px ${defaultSpacing.xs}px`,
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontWeight: defaultTypography.weights.medium,
    lineHeight: defaultTypography.sizes.xs.lineHeight,
    color: themeColors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: fontFamilyStacks.sans,
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

export function buildItemStyle(
  themeColors: ThemeColors,
  isActive: boolean,
  isDisabled: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.md,
    padding: `${defaultSpacing.md}px ${defaultSpacing.lg}px`,
    cursor: isDisabled ? 'default' : 'pointer',
    backgroundColor: isActive ? themeColors.accent.highlight : 'transparent',
    color: isDisabled ? themeColors.text.muted : themeColors.text.primary,
    opacity: isDisabled ? 0.5 : 1,
    transition: `background-color ${durations.fast}ms ${easings.easeOut.css}`,
    fontFamily: fontFamilyStacks.sans,
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Item icon
// ---------------------------------------------------------------------------

export function buildItemIconStyle(
  themeColors: ThemeColors,
  isDisabled: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: 20,
    height: 20,
    color: themeColors.text.secondary,
  };
}

// ---------------------------------------------------------------------------
// Item label area
// ---------------------------------------------------------------------------

export function buildItemLabelStyle(): CSSStyleObject {
  return {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: defaultSpacing['2xs'],
  };
}

// ---------------------------------------------------------------------------
// Item description
// ---------------------------------------------------------------------------

export function buildItemDescriptionStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: defaultTypography.sizes.xs.lineHeight,
    color: themeColors.text.secondary,
  };
}

// ---------------------------------------------------------------------------
// Item shortcut
// ---------------------------------------------------------------------------

export function buildItemShortcutStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    marginLeft: 'auto',
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: defaultTypography.sizes.xs.lineHeight,
    color: themeColors.text.secondary,
    fontFamily: fontFamilyStacks.sans,
    display: 'flex',
    gap: defaultSpacing.xs,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Shortcut key
// ---------------------------------------------------------------------------

export function buildShortcutKeyStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    padding: `0 ${defaultSpacing.xs}px`,
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontWeight: defaultTypography.weights.medium,
    lineHeight: defaultTypography.sizes.sm.lineHeight,
    borderRadius: defaultRadii.sm,
    backgroundColor: themeColors.accent.highlight,
    color: themeColors.text.secondary,
  };
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function buildSeparatorStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    height: 1,
    margin: `${defaultSpacing.xs}px 0`,
    backgroundColor: themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

export function buildEmptyStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    padding: `${defaultSpacing['2xl']}px ${defaultSpacing.lg}px`,
    textAlign: 'center',
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: defaultTypography.sizes.sm.lineHeight,
    color: themeColors.text.muted,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

export function buildLoadingStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${defaultSpacing.xl}px ${defaultSpacing.lg}px`,
  };
}
