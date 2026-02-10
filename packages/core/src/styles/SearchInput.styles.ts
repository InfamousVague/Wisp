/**
 * @module SearchInput
 */
import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { ComponentSize } from '../tokens/shared';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Size map (reuse Input dimensions)
// ---------------------------------------------------------------------------

export interface SearchInputSizeConfig {
  height: number;
  paddingX: number;
  fontSize: number;
  lineHeight: number;
  borderRadius: number;
  iconSize: number;
}

export const searchInputSizeMap: Record<ComponentSize, SearchInputSizeConfig> = {
  xs: { height: 28, paddingX: 8, fontSize: defaultTypography.sizes.xs.fontSize, lineHeight: 1.33, borderRadius: defaultRadii.md, iconSize: 14 },
  sm: { height: 32, paddingX: 10, fontSize: defaultTypography.sizes.sm.fontSize, lineHeight: 1.38, borderRadius: defaultRadii.md, iconSize: 16 },
  md: { height: 38, paddingX: 12, fontSize: defaultTypography.sizes.sm.fontSize, lineHeight: 1.43, borderRadius: defaultRadii.md, iconSize: 18 },
  lg: { height: 44, paddingX: 14, fontSize: defaultTypography.sizes.base.fontSize, lineHeight: 1.47, borderRadius: defaultRadii.md, iconSize: 20 },
  xl: { height: 52, paddingX: 16, fontSize: defaultTypography.sizes.base.fontSize, lineHeight: 1.5, borderRadius: defaultRadii.lg, iconSize: 22 },
};

// ---------------------------------------------------------------------------
// Container style
// ---------------------------------------------------------------------------

export function buildSearchInputContainerStyle(
  sizeConfig: SearchInputSizeConfig,
  focused: boolean,
  disabled: boolean,
  themeColors: ThemeColors,
  fullWidth: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.paddingX > 10 ? 8 : 6,
    height: sizeConfig.height,
    paddingLeft: sizeConfig.paddingX - 2,
    paddingRight: sizeConfig.paddingX - 2,
    backgroundColor: 'transparent',
    borderRadius: sizeConfig.borderRadius,
    boxSizing: 'border-box',
    border: `1px solid ${focused ? themeColors.accent.primary : themeColors.border.strong}`,
    boxShadow: focused ? `0 0 0 2px ${themeColors.accent.primary}25` : 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.5 : 1,
  };
}

// ---------------------------------------------------------------------------
// Input element style
// ---------------------------------------------------------------------------

export function buildSearchInputFieldStyle(
  sizeConfig: SearchInputSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    appearance: 'none',
    flex: 1,
    minWidth: 0,
    width: '100%',
    height: '100%',
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.lineHeight,
    color: themeColors.text.primary,
    cursor: 'inherit',
  };
}

// ---------------------------------------------------------------------------
// Clear button style
// ---------------------------------------------------------------------------

export function buildSearchInputClearButtonStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: defaultSpacing['2xs'],
    margin: 0,
    border: 'none',
    borderRadius: defaultRadii.sm,
    background: 'transparent',
    color: themeColors.text.muted,
    cursor: 'pointer',
    flexShrink: 0,
    outline: 'none',
    transition: 'color 150ms ease',
  };
}
