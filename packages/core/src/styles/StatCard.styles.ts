/**
 * @module styles/StatCard
 * @description Pure style-builder functions for the StatCard component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { StatCardVariant, StatCardSizeConfig } from '../types/StatCard.types';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface StatCardColors {
  /** Accent color for the icon and variant highlight. */
  accent: string;
  /** Trend up color (green). */
  trendUp: string;
  /** Trend down color (red). */
  trendDown: string;
  /** Neutral / zero trend color. */
  trendNeutral: string;
  /** Value text color. */
  value: string;
  /** Label text color. */
  label: string;
  /** Description text color. */
  description: string;
  /** Card background. */
  bg: string;
  /** Card border. */
  border: string;
}

/**
 * Resolves all StatCard semantic colors from the theme.
 */
export function resolveStatCardColors(
  variant: StatCardVariant,
  themeColors: ThemeColors,
): StatCardColors {
  let accent: string;

  switch (variant) {
    case 'success': accent = themeColors.status.success; break;
    case 'warning': accent = themeColors.status.warning; break;
    case 'danger':  accent = themeColors.status.danger;  break;
    case 'info':    accent = themeColors.status.info;    break;
    case 'default':
    default:        accent = themeColors.accent.primary; break;
  }

  return {
    accent,
    trendUp: themeColors.status.success,
    trendDown: themeColors.status.danger,
    trendNeutral: themeColors.text.muted,
    value: themeColors.text.primary,
    label: themeColors.text.secondary,
    description: themeColors.text.muted,
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

/**
 * Outer card container style.
 */
export function buildStatCardContainerStyle(
  sizeConfig: StatCardSizeConfig,
  colors: StatCardColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: sizeConfig.padding,
    gap: sizeConfig.gap,
    borderRadius: defaultRadii.lg,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  };
}

/**
 * Left content area (icon + text stack).
 */
export function buildStatCardContentStyle(
  sizeConfig: StatCardSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizeConfig.gap,
    flex: 1,
    minWidth: 0,
  };
}

/**
 * Text stack (label, value, description).
 */
export function buildStatCardTextStackStyle(): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: defaultSpacing['2xs'],
    flex: 1,
    minWidth: 0,
  };
}

/**
 * Icon container style.
 */
export function buildStatCardIconStyle(
  sizeConfig: StatCardSizeConfig,
  accentColor: string,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconSize + 8,
    height: sizeConfig.iconSize + 8,
    borderRadius: defaultRadii.md,
    backgroundColor: accentColor + '14', // ~8% opacity
    color: accentColor,
    flexShrink: 0,
  };
}

/**
 * Value text style.
 */
export function buildStatCardValueStyle(
  sizeConfig: StatCardSizeConfig,
  colors: StatCardColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.valueFontSize,
    lineHeight: `${sizeConfig.valueLineHeight}px`,
    fontWeight: defaultTypography.weights.bold,
    color: colors.value,
    letterSpacing: '-0.02em',
    margin: 0,
  };
}

/**
 * Label text style.
 */
export function buildStatCardLabelStyle(
  sizeConfig: StatCardSizeConfig,
  colors: StatCardColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.labelFontSize,
    lineHeight: 1.4,
    fontWeight: defaultTypography.weights.medium,
    color: colors.label,
    margin: 0,
  };
}

/**
 * Description text style.
 */
export function buildStatCardDescriptionStyle(
  sizeConfig: StatCardSizeConfig,
  colors: StatCardColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.descriptionFontSize,
    lineHeight: 1.4,
    fontWeight: defaultTypography.weights.regular,
    color: colors.description,
    margin: 0,
  };
}

/**
 * Right side container (trend + sparkline).
 */
export function buildStatCardRightStyle(
  sizeConfig: StatCardSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: sizeConfig.gap,
    flexShrink: 0,
  };
}

/**
 * Trend indicator container style.
 */
export function buildStatCardTrendStyle(
  sizeConfig: StatCardSizeConfig,
  trendColor: string,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    fontSize: sizeConfig.trendFontSize,
    fontWeight: defaultTypography.weights.semibold,
    color: trendColor,
    lineHeight: 1,
  };
}

/**
 * Skeleton placeholder style.
 */
export function buildStatCardSkeletonStyle(
  sizeConfig: StatCardSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'block',
    width: '100%',
    height: sizeConfig.padding * 2 + sizeConfig.valueLineHeight + sizeConfig.labelFontSize * 1.4 + 4,
    borderRadius: defaultRadii.lg,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
