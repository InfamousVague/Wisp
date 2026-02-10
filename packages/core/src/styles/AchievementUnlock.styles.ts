/**
 * @module components/achievement-unlock
 * @description Style builders for the Wisp AchievementUnlock component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { AchievementRarity } from '../types/AchievementCard.types';
import { achievementRarityMap } from '../types/AchievementCard.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

export function buildAchievementUnlockOverlayStyle(): CSSStyleObject {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0,0,0,0.4)',
    animation: 'wisp-achievement-panel-in 300ms ease-out',
  };
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

export function buildAchievementUnlockPanelStyle(
  themeColors: ThemeColors,
  rarity: AchievementRarity,
): CSSStyleObject {
  const rarityConfig = achievementRarityMap[rarity];
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: defaultSpacing.md,
    padding: `${defaultSpacing['2xl']}px ${defaultSpacing['2xl']}px`,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderTop: `3px solid ${rarityConfig.color}`,
    borderRadius: defaultRadii.lg,
    fontFamily: fontFamilyStacks.sans,
    maxWidth: 400,
    width: '90%',
    boxShadow: '0 16px 48px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    position: 'relative',
  };
}

// ---------------------------------------------------------------------------
// Icon container
// ---------------------------------------------------------------------------

export function buildAchievementUnlockIconStyle(
  rarityColor: string,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: defaultRadii.xl,
    backgroundColor: `${rarityColor}1A`,
    color: rarityColor,
    animation: 'wisp-achievement-icon-in 500ms ease-out',
  };
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

export function buildAchievementUnlockTitleStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: 18,
    fontWeight: defaultTypography.weights.bold,
    lineHeight: 1.3,
    color: themeColors.text.primary,
    margin: 0,
    animation: 'wisp-achievement-text-in 400ms ease-out 200ms both',
  };
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

export function buildAchievementUnlockDescriptionStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: 14,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: 1.5,
    color: themeColors.text.secondary,
    margin: 0,
    animation: 'wisp-achievement-text-in 400ms ease-out 300ms both',
  };
}

// ---------------------------------------------------------------------------
// Rarity label
// ---------------------------------------------------------------------------

export function buildAchievementUnlockRarityStyle(
  rarityColor: string,
): CSSStyleObject {
  return {
    fontSize: 11,
    fontWeight: defaultTypography.weights.bold,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: rarityColor,
    animation: 'wisp-achievement-text-in 400ms ease-out 100ms both',
  };
}

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------

export function buildAchievementUnlockCloseStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    position: 'absolute',
    top: 10,
    right: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: defaultRadii.sm,
    border: 'none',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    color: themeColors.text.muted,
    cursor: 'pointer',
  };
}

// ---------------------------------------------------------------------------
// Action button
// ---------------------------------------------------------------------------

export function buildAchievementUnlockActionStyle(
  rarityColor: string,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${defaultSpacing.sm}px ${defaultSpacing.xl}px`,
    fontSize: 14,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: 1,
    borderRadius: defaultRadii.md,
    border: 'none',
    backgroundColor: rarityColor,
    color: '#FFFFFF',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    marginTop: defaultSpacing.xs,
    animation: 'wisp-achievement-text-in 400ms ease-out 400ms both',
  };
}
