/**
 * @module styles/EmojiPicker
 * @description Pure style-builder functions for the EmojiPicker component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { EmojiPickerSizeConfig } from '../types/EmojiPicker.types';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface EmojiPickerColors {
  bg: string;
  border: string;
  tabText: string;
  tabTextActive: string;
  tabIndicator: string;
  tabHoverBg: string;
  cellHover: string;
  categoryLabel: string;
  scrollbar: string;
  skinToneBorder: string;
  skinToneActiveBorder: string;
}

export function resolveEmojiPickerColors(themeColors: ThemeColors): EmojiPickerColors {
  return {
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
    tabText: themeColors.text.muted,
    tabTextActive: themeColors.accent.primary,
    tabIndicator: themeColors.accent.primary,
    tabHoverBg: themeColors.background.sunken,
    cellHover: themeColors.background.sunken,
    categoryLabel: themeColors.text.muted,
    scrollbar: themeColors.border.subtle,
    skinToneBorder: themeColors.border.subtle,
    skinToneActiveBorder: themeColors.accent.primary,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

export function buildEmojiPickerContainerStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: sizeConfig.width,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    overflow: 'hidden',
  };
}

export function buildEmojiPickerHeaderStyle(
  sizeConfig: EmojiPickerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: sizeConfig.gap * 2,
    padding: `${sizeConfig.padding}px ${sizeConfig.padding}px 0`,
    flexShrink: 0,
  };
}

export function buildEmojiPickerSkinToneBarStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.gap + 2,
    padding: `${sizeConfig.gap}px 0`,
  };
}

export function buildEmojiPickerSkinToneDotStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
  active: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.skinToneDotSize,
    height: sizeConfig.skinToneDotSize,
    borderRadius: '50%',
    border: `2px solid ${active ? colors.skinToneActiveBorder : 'transparent'}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: sizeConfig.skinToneDotSize * 0.7,
    padding: 0,
    lineHeight: 1,
    transition: 'border-color 150ms ease',
  };
}

export function buildEmojiPickerTabBarStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    height: sizeConfig.tabHeight,
    padding: `0 ${sizeConfig.padding}px`,
    gap: 0,
    borderBottom: `1px solid ${colors.border}`,
    flexShrink: 0,
    overflow: 'hidden',
  };
}

export function buildEmojiPickerTabStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
  active: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    color: active ? colors.tabTextActive : colors.tabText,
    borderBottom: active ? `2px solid ${colors.tabIndicator}` : '2px solid transparent',
    transition: 'all 150ms ease',
  };
}

export function buildEmojiPickerGridStyle(
  sizeConfig: EmojiPickerSizeConfig,
): CSSStyleObject {
  return {
    flex: 1,
    overflowY: 'auto',
    padding: sizeConfig.padding,
    display: 'flex',
    flexDirection: 'column',
    gap: sizeConfig.gap * 2,
    scrollbarWidth: 'thin' as any,
  };
}

export function buildEmojiPickerCategoryLabelStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 600,
    color: colors.categoryLabel,
    textTransform: 'capitalize',
    padding: `${sizeConfig.gap + 2}px 0 ${sizeConfig.gap}px`,
    userSelect: 'none',
    position: 'sticky',
    top: 0,
    backgroundColor: colors.bg,
    zIndex: 1,
  };
}

export function buildEmojiPickerCellStyle(
  sizeConfig: EmojiPickerSizeConfig,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.cellSize,
    height: sizeConfig.cellSize,
    borderRadius: 8,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: sizeConfig.emojiSize,
    padding: 0,
    transition: 'background-color 100ms ease, transform 100ms ease',
    lineHeight: 1,
    fontFamily: 'inherit',
  };
}

export function buildEmojiPickerCellRowStyle(
  sizeConfig: EmojiPickerSizeConfig,
): CSSStyleObject {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${sizeConfig.columnsCount}, 1fr)`,
    gap: sizeConfig.gap,
    justifyItems: 'center',
  };
}

export function buildEmojiPickerSkeletonStyle(
  sizeConfig: EmojiPickerSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'block',
    width: sizeConfig.width,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}

export function buildEmojiPickerNoResultsStyle(
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    color: colors.categoryLabel,
    fontSize: 13,
    padding: 20,
    textAlign: 'center',
  };
}
