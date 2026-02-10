/**
 * @module types/EmojiPicker
 * @description Type definitions for the EmojiPicker component — emoji
 * selection grid with category tabs and search.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

export const emojiPickerSizes = ['sm', 'md', 'lg'] as const;
export type EmojiPickerSize = (typeof emojiPickerSizes)[number];

export interface EmojiPickerSizeConfig {
  /** Width of the picker panel. */
  width: number;
  /** Height of the picker panel. */
  height: number;
  /** Size of each emoji cell. */
  cellSize: number;
  /** Font size for emojis. */
  emojiSize: number;
  /** Font size for labels. */
  fontSize: number;
  /** Padding. */
  padding: number;
  /** Gap between cells. */
  gap: number;
  /** Category tab height. */
  tabHeight: number;
  /** Search input height. */
  searchHeight: number;
  /** Border radius. */
  borderRadius: number;
}

export const emojiPickerSizeMap: Record<EmojiPickerSize, EmojiPickerSizeConfig> = {
  sm: { width: 280, height: 300, cellSize: 30, emojiSize: 18, fontSize: 11, padding: 8, gap: 2, tabHeight: 32, searchHeight: 32, borderRadius: 12 },
  md: { width: 320, height: 360, cellSize: 36, emojiSize: 22, fontSize: 12, padding: 12, gap: 2, tabHeight: 36, searchHeight: 36, borderRadius: 16 },
  lg: { width: 380, height: 420, cellSize: 44, emojiSize: 28, fontSize: 13, padding: 16, gap: 4, tabHeight: 40, searchHeight: 40, borderRadius: 20 },
};

// ---------------------------------------------------------------------------
// Emoji categories & data
// ---------------------------------------------------------------------------

export const emojiCategories = [
  'smileys',
  'people',
  'animals',
  'food',
  'travel',
  'activities',
  'objects',
  'symbols',
  'flags',
] as const;
export type EmojiCategory = (typeof emojiCategories)[number];

export interface EmojiItem {
  /** The emoji character. */
  emoji: string;
  /** Display name / search term. */
  name: string;
  /** Category the emoji belongs to. */
  category: EmojiCategory;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EmojiPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
  /** Size preset. @default 'md' */
  size?: EmojiPickerSize;

  /** Called when an emoji is selected. */
  onSelect?: (emoji: string) => void;

  /** Custom emoji data. If not provided, uses built-in set. */
  emojis?: EmojiItem[];

  /** Recently used emojis (shown in a special top section). */
  recent?: string[];

  /** Search placeholder text. @default 'Search emoji...' */
  searchPlaceholder?: string;

  /** Show search bar. @default true */
  showSearch?: boolean;

  /** Show category tabs. @default true */
  showCategories?: boolean;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
