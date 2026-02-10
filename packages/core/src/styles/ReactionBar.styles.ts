/**
 * @module styles/ReactionBar
 * @description Pure style-builder functions for the ReactionBar component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { ReactionBarSizeConfig } from '../types/ReactionBar.types';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface ReactionBarColors {
  bg: string;
  border: string;
  buttonBg: string;
  buttonBgActive: string;
  buttonBorder: string;
  buttonBorderActive: string;
  text: string;
  textActive: string;
  addButtonColor: string;
}

export function resolveReactionBarColors(themeColors: ThemeColors): ReactionBarColors {
  return {
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
    buttonBg: 'transparent',
    buttonBgActive: themeColors.accent.highlight,
    buttonBorder: themeColors.border.subtle,
    buttonBorderActive: themeColors.accent.primary,
    text: themeColors.text.secondary,
    textActive: themeColors.accent.primary,
    addButtonColor: themeColors.text.muted,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

export function buildReactionBarContainerStyle(
  sizeConfig: ReactionBarSizeConfig,
  colors: ReactionBarColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    padding: sizeConfig.padding,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    flexWrap: 'wrap',
  };
}

export function buildReactionButtonStyle(
  sizeConfig: ReactionBarSizeConfig,
  colors: ReactionBarColors,
  active: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    height: sizeConfig.buttonSize,
    minWidth: sizeConfig.buttonSize,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: sizeConfig.borderRadius - 2,
    border: `1px solid ${active ? colors.buttonBorderActive : colors.buttonBorder}`,
    backgroundColor: active ? colors.buttonBgActive : colors.buttonBg,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontSize: sizeConfig.emojiSize,
    lineHeight: 1,
  };
}

export function buildReactionCountStyle(
  sizeConfig: ReactionBarSizeConfig,
  colors: ReactionBarColors,
  active: boolean,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.countFontSize,
    fontWeight: 500,
    color: active ? colors.textActive : colors.text,
    lineHeight: 1,
    userSelect: 'none',
  };
}

export function buildAddButtonStyle(
  sizeConfig: ReactionBarSizeConfig,
  colors: ReactionBarColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.buttonSize,
    height: sizeConfig.buttonSize,
    borderRadius: sizeConfig.borderRadius - 2,
    border: `1px dashed ${colors.border}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: colors.addButtonColor,
    fontSize: sizeConfig.emojiSize,
    lineHeight: 1,
    transition: 'all 150ms ease',
    padding: 0,
  };
}

export function buildReactionBarSkeletonStyle(
  sizeConfig: ReactionBarSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-block',
    width: sizeConfig.buttonSize * 5 + sizeConfig.gap * 4 + sizeConfig.padding * 2,
    height: sizeConfig.buttonSize + sizeConfig.padding * 2,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
