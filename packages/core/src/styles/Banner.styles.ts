/**
 * @module Banner
 */
import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { BannerVariant } from '../types/Banner.types';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Variant colors
// ---------------------------------------------------------------------------

export interface BannerColors {
  bg: string;
  text: string;
  border: string;
  icon: string;
}

export function resolveBannerColors(
  variant: BannerVariant,
  themeColors: ThemeColors,
): BannerColors {
  switch (variant) {
    case 'info':
      return {
        bg: themeColors.status.infoSurface,
        text: themeColors.text.primary,
        border: themeColors.status.infoBorder,
        icon: themeColors.status.info,
      };
    case 'success':
      return {
        bg: themeColors.status.successSurface,
        text: themeColors.text.primary,
        border: themeColors.status.successBorder,
        icon: themeColors.status.success,
      };
    case 'warning':
      return {
        bg: themeColors.status.warningSurface,
        text: themeColors.text.primary,
        border: themeColors.status.warningBorder,
        icon: themeColors.status.warning,
      };
    case 'danger':
      return {
        bg: themeColors.status.dangerSurface,
        text: themeColors.text.primary,
        border: themeColors.status.dangerBorder,
        icon: themeColors.status.danger,
      };
    case 'default':
    default:
      return {
        bg: themeColors.background.surface,
        text: themeColors.text.onRaised,
        border: themeColors.border.strong,
        icon: themeColors.text.onRaisedSecondary,
      };
  }
}

// ---------------------------------------------------------------------------
// Container style
// ---------------------------------------------------------------------------

export function buildBannerStyle(
  colors: BannerColors,
  fullWidth: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: defaultSpacing.md,
    padding: `${defaultSpacing.md}px ${defaultSpacing.lg}px`,
    borderRadius: fullWidth ? 0 : 10,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    fontFamily: fontFamilyStacks.sans,
    boxSizing: 'border-box',
    width: fullWidth ? '100%' : undefined,
  };
}

// ---------------------------------------------------------------------------
// Text styles
// ---------------------------------------------------------------------------

export function buildBannerTitleStyle(
  colors: BannerColors,
): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.sm.fontSize,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: 1.4,
    color: colors.text,
    margin: 0,
  };
}

export function buildBannerMessageStyle(
  colors: BannerColors,
): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.sm.fontSize,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: 1.5,
    color: colors.text,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Dismiss button style
// ---------------------------------------------------------------------------

export function buildBannerDismissStyle(
  colors: BannerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: colors.icon,
    flexShrink: 0,
    borderRadius: defaultRadii.sm,
  };
}
