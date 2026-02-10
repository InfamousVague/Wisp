/**
 * @module components/achievement-card
 * @description Style builders for the Wisp AchievementCard component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { AchievementStatus, AchievementRarity } from '../types/AchievementCard.types';
import { achievementRarityMap } from '../types/AchievementCard.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Colour resolution
// ---------------------------------------------------------------------------

export interface AchievementCardColors {
  bg: string;
  border: string;
  text: string;
  descriptionText: string;
  iconBg: string;
  iconColor: string;
  rarityColor: string;
}

export function resolveAchievementColors(
  status: AchievementStatus,
  rarity: AchievementRarity,
  themeColors: ThemeColors,
): AchievementCardColors {
  const rarityConfig = achievementRarityMap[rarity];

  if (status === 'locked') {
    return {
      bg: themeColors.background.canvas,
      border: themeColors.border.subtle,
      text: themeColors.text.muted,
      descriptionText: themeColors.text.muted,
      iconBg: themeColors.border.subtle,
      iconColor: themeColors.text.muted,
      rarityColor: themeColors.text.muted,
    };
  }

  return {
    bg: themeColors.background.canvas,
    border: themeColors.border.subtle,
    text: themeColors.text.primary,
    descriptionText: themeColors.text.secondary,
    iconBg: `${rarityConfig.color}1A`,
    iconColor: rarityConfig.color,
    rarityColor: rarityConfig.color,
  };
}

// ---------------------------------------------------------------------------
// Card container
// ---------------------------------------------------------------------------

export function buildAchievementCardStyle(
  colors: AchievementCardColors,
  status: AchievementStatus,
  clickable: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: defaultSpacing.md,
    padding: `${defaultSpacing.lg}px ${defaultSpacing.lg}px`,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: defaultRadii.lg,
    fontFamily: fontFamilyStacks.sans,
    cursor: clickable ? 'pointer' : 'default',
    transition: 'opacity 200ms ease, filter 200ms ease',
    opacity: status === 'locked' ? 0.6 : 1,
    filter: status === 'locked' ? 'grayscale(0.8)' : 'none',
  };
}

// ---------------------------------------------------------------------------
// Icon container
// ---------------------------------------------------------------------------

export function buildAchievementIconStyle(
  colors: AchievementCardColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    borderRadius: defaultRadii.md,
    backgroundColor: colors.iconBg,
    color: colors.iconColor,
  };
}

// ---------------------------------------------------------------------------
// Content area
// ---------------------------------------------------------------------------

export function buildAchievementContentStyle(): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: defaultSpacing.xs,
    flex: 1,
    minWidth: 0,
  };
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

export function buildAchievementTitleStyle(
  textColor: string,
): CSSStyleObject {
  return {
    fontSize: 14,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: 1.43,
    color: textColor,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

export function buildAchievementDescriptionStyle(
  descriptionColor: string,
): CSSStyleObject {
  return {
    fontSize: 13,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: 1.46,
    color: descriptionColor,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

export function buildAchievementProgressTrackStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: '100%',
    height: 4,
    borderRadius: defaultRadii.sm,
    backgroundColor: themeColors.border.subtle,
    marginTop: defaultSpacing.xs,
    overflow: 'hidden',
  };
}

export function buildAchievementProgressBarStyle(
  rarityColor: string,
  progress: number,
): CSSStyleObject {
  return {
    width: `${Math.min(Math.max(progress, 0), 100)}%`,
    height: '100%',
    borderRadius: defaultRadii.sm,
    backgroundColor: rarityColor,
    transition: 'width 500ms ease',
  };
}

// ---------------------------------------------------------------------------
// Rarity badge
// ---------------------------------------------------------------------------

export function buildAchievementRarityStyle(
  rarityColor: string,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    fontSize: 11,
    fontWeight: defaultTypography.weights.semibold,
    color: rarityColor,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  };
}

// ---------------------------------------------------------------------------
// Date text
// ---------------------------------------------------------------------------

export function buildAchievementDateStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: 11,
    fontWeight: defaultTypography.weights.regular,
    color: themeColors.text.muted,
    margin: 0,
  };
}
