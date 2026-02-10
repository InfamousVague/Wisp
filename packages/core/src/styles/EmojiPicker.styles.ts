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
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: sizeConfig.gap * 2,
    padding: `${sizeConfig.padding}px ${sizeConfig.padding}px ${sizeConfig.gap}px`,
    flexShrink: 0,
    backgroundColor: colors.bg,
  };
}

/** Row containing search input and skin tone trigger side by side. */
export function buildEmojiPickerSearchRowStyle(): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  };
}

/** The hand emoji button that toggles the skin tone row. */
export function buildEmojiPickerSkinToneTriggerStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
  open: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.searchHeight,
    height: sizeConfig.searchHeight,
    borderRadius: sizeConfig.borderRadius / 2,
    border: `1px solid ${open ? colors.skinToneActiveBorder : colors.border}`,
    backgroundColor: open ? colors.tabHoverBg : 'transparent',
    cursor: 'pointer',
    fontSize: Math.round(sizeConfig.searchHeight * 0.5),
    padding: 0,
    lineHeight: 1,
    flexShrink: 0,
    overflow: 'hidden',
    transition: 'border-color 150ms ease, background-color 150ms ease',
  };
}

/** The expanded row of skin tone hand options. */
export function buildEmojiPickerSkinToneRowStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: `6px 8px`,
    borderRadius: sizeConfig.borderRadius / 2,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.tabHoverBg,
  };
}

/** Individual skin tone option inside the expanded row. */
export function buildEmojiPickerSkinToneOptionStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
  active: boolean,
): CSSStyleObject {
  const optionSize = Math.round(sizeConfig.cellSize * 0.9);
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: optionSize,
    height: optionSize,
    borderRadius: '50%',
    border: active ? `2px solid ${colors.skinToneActiveBorder}` : '2px solid transparent',
    backgroundColor: active ? colors.bg : 'transparent',
    cursor: 'pointer',
    fontSize: Math.round(optionSize * 0.55),
    padding: 0,
    lineHeight: 1,
    overflow: 'hidden',
    transition: 'border-color 150ms ease',
  };
}

// Legacy — kept for backward compat
export function buildEmojiPickerSkinToneBarStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
): CSSStyleObject {
  return buildEmojiPickerSkinToneRowStyle(sizeConfig, colors);
}

export function buildEmojiPickerSkinToneDotStyle(
  sizeConfig: EmojiPickerSizeConfig,
  colors: EmojiPickerColors,
  active: boolean,
): CSSStyleObject {
  return buildEmojiPickerSkinToneOptionStyle(sizeConfig, colors, active);
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
