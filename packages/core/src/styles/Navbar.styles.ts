/**
 * @module Navbar
 */
import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { NavbarVariant } from '../types/Navbar.types';
import { fontFamilyStacks, glassStyle } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';
import { zIndex } from '../tokens/z-index';

// ---------------------------------------------------------------------------
// Navbar container
// ---------------------------------------------------------------------------

export function buildNavbarStyle(
  variant: NavbarVariant,
  sticky: boolean,
  height: number,
  themeColors: ThemeColors,
): CSSStyleObject {
  const base: CSSStyleObject = {
    display: 'flex',
    alignItems: 'center',
    height,
    paddingLeft: defaultSpacing.xl,
    paddingRight: defaultSpacing.xl,
    boxSizing: 'border-box',
    borderBottom: `1px solid ${themeColors.border.subtle}`,
    fontFamily: fontFamilyStacks.sans,
    ...(sticky
      ? { position: 'sticky', top: 0, zIndex: zIndex.sticky }
      : {}),
  };

  switch (variant) {
    case 'glass':
      return {
        ...base,
        ...glassStyle,
        color: themeColors.text.primary,
      };
    case 'transparent':
      return {
        ...base,
        backgroundColor: 'transparent',
        color: themeColors.text.primary,
        borderBottom: 'none',
      };
    case 'solid':
    default:
      return {
        ...base,
        backgroundColor: themeColors.background.surface,
        color: themeColors.text.onRaised,
      };
  }
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export function buildNavbarBrandStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: defaultSpacing.sm,
    flexShrink: 0,
    fontWeight: defaultTypography.weights.bold,
    fontSize: 16,
    cursor: 'pointer',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export function buildNavbarContentStyle(
  align: 'start' | 'center' | 'end',
): CSSStyleObject {
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end' } as const;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    flex: 1,
    justifyContent: justifyMap[align],
  };
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

export function buildNavbarItemStyle(
  active: boolean,
  themeColors: ThemeColors,
  isSolid: boolean,
): CSSStyleObject {
  const textColor = isSolid ? themeColors.text.onRaised : themeColors.text.primary;
  const mutedColor = isSolid ? themeColors.text.onRaisedSecondary : themeColors.text.secondary;

  return {
    display: 'flex',
    alignItems: 'center',
    padding: `${defaultSpacing.sm}px ${defaultSpacing.md}px`,
    borderRadius: defaultRadii.md,
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? textColor : mutedColor,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 150ms ease, color 150ms ease',
  };
}
