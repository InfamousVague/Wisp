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
  searchBg: string;
  searchText: string;
  searchPlaceholder: string;
  tabText: string;
  tabTextActive: string;
  tabIndicator: string;
  cellHover: string;
  categoryLabel: string;
  scrollbar: string;
}

export function resolveEmojiPickerColors(themeColors: ThemeColors): EmojiPickerColors {
  return {
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
    searchBg: themeColors.background.sunken,
    searchText: themeColors.text.primary,
    searchPlaceholder: themeColors.text.muted,
    tabText: themeColors.text.muted,
    tabTextActive: themeColors.accent.primary,
    tabIndicator: themeColors.accent.primary,
    cellHover: themeColors.background.sunken,
    categoryLabel: themeColors.text.muted,
    scrollbar: themeColors.border.subtle,
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

export function buildEmojiPickerSearchStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    height: sizeConfig.searchHeight,
    margin: `${sizeConfig.padding}px ${sizeConfig.padding}px 0`,
    padding: `0 ${sizeConfig.padding}px`,
    borderRadius: sizeConfig.searchHeight / 2,
    backgroundColor: colors.searchBg,
    border: 'none',
    fontSize: sizeConfig.fontSize,
    color: colors.searchText,
    outline: 'none',
    width: `calc(100% - ${sizeConfig.padding * 2}px)`,
    fontFamily: 'inherit',
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
    fontSize: sizeConfig.emojiSize * 0.7,
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
    padding: `${sizeConfig.gap}px 0`,
    userSelect: 'none',
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
    borderRadius: 6,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: sizeConfig.emojiSize,
    padding: 0,
    transition: 'background-color 100ms ease',
    lineHeight: 1,
  };
}

export function buildEmojiPickerCellRowStyle(
  sizeConfig: EmojiPickerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: sizeConfig.gap,
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
