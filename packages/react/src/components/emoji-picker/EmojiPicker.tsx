/**
 * @module EmojiPicker
 * @description Emoji selection panel with category tabs, search filtering,
 * recent emojis, and a clickable grid of emoji characters.
 */

import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { useThemeColors } from '../../providers';
import type { EmojiPickerProps, EmojiItem, EmojiCategory } from '@wisp-ui/core/types/EmojiPicker.types';
import { emojiPickerSizeMap, emojiCategories } from '@wisp-ui/core/types/EmojiPicker.types';
import {
  resolveEmojiPickerColors,
  buildEmojiPickerContainerStyle,
  buildEmojiPickerSearchStyle,
  buildEmojiPickerTabBarStyle,
  buildEmojiPickerTabStyle,
  buildEmojiPickerGridStyle,
  buildEmojiPickerCategoryLabelStyle,
  buildEmojiPickerCellStyle,
  buildEmojiPickerCellRowStyle,
  buildEmojiPickerSkeletonStyle,
} from '@wisp-ui/core/styles/EmojiPicker.styles';

// ---------------------------------------------------------------------------
// Built-in emoji data (small curated set)
// ---------------------------------------------------------------------------

const BUILTIN_EMOJIS: EmojiItem[] = [
  // Smileys
  { emoji: '😀', name: 'grinning', category: 'smileys' },
  { emoji: '😃', name: 'smiley', category: 'smileys' },
  { emoji: '😄', name: 'smile', category: 'smileys' },
  { emoji: '😁', name: 'grin', category: 'smileys' },
  { emoji: '😆', name: 'laughing', category: 'smileys' },
  { emoji: '😅', name: 'sweat smile', category: 'smileys' },
  { emoji: '🤣', name: 'rofl', category: 'smileys' },
  { emoji: '😂', name: 'joy', category: 'smileys' },
  { emoji: '🙂', name: 'slightly smiling', category: 'smileys' },
  { emoji: '😊', name: 'blush', category: 'smileys' },
  { emoji: '😇', name: 'innocent', category: 'smileys' },
  { emoji: '🥰', name: 'smiling hearts', category: 'smileys' },
  { emoji: '😍', name: 'heart eyes', category: 'smileys' },
  { emoji: '😘', name: 'kissing heart', category: 'smileys' },
  { emoji: '😜', name: 'wink tongue', category: 'smileys' },
  { emoji: '🤔', name: 'thinking', category: 'smileys' },
  { emoji: '😎', name: 'sunglasses', category: 'smileys' },
  { emoji: '🥳', name: 'partying', category: 'smileys' },
  { emoji: '😢', name: 'cry', category: 'smileys' },
  { emoji: '😡', name: 'angry', category: 'smileys' },
  { emoji: '🤯', name: 'exploding head', category: 'smileys' },
  { emoji: '😱', name: 'scream', category: 'smileys' },
  { emoji: '🥺', name: 'pleading', category: 'smileys' },
  { emoji: '😴', name: 'sleeping', category: 'smileys' },
  // People
  { emoji: '👍', name: 'thumbsup', category: 'people' },
  { emoji: '👎', name: 'thumbsdown', category: 'people' },
  { emoji: '👏', name: 'clap', category: 'people' },
  { emoji: '🙌', name: 'raised hands', category: 'people' },
  { emoji: '🤝', name: 'handshake', category: 'people' },
  { emoji: '✌️', name: 'victory', category: 'people' },
  { emoji: '🤞', name: 'crossed fingers', category: 'people' },
  { emoji: '💪', name: 'muscle', category: 'people' },
  { emoji: '🙏', name: 'pray', category: 'people' },
  { emoji: '👋', name: 'wave', category: 'people' },
  { emoji: '🫶', name: 'heart hands', category: 'people' },
  { emoji: '🤙', name: 'call me', category: 'people' },
  // Animals
  { emoji: '🐶', name: 'dog', category: 'animals' },
  { emoji: '🐱', name: 'cat', category: 'animals' },
  { emoji: '🐻', name: 'bear', category: 'animals' },
  { emoji: '🦊', name: 'fox', category: 'animals' },
  { emoji: '🐼', name: 'panda', category: 'animals' },
  { emoji: '🦄', name: 'unicorn', category: 'animals' },
  { emoji: '🐸', name: 'frog', category: 'animals' },
  { emoji: '🐙', name: 'octopus', category: 'animals' },
  // Food
  { emoji: '🍕', name: 'pizza', category: 'food' },
  { emoji: '🍔', name: 'burger', category: 'food' },
  { emoji: '🍟', name: 'fries', category: 'food' },
  { emoji: '🌮', name: 'taco', category: 'food' },
  { emoji: '🍦', name: 'ice cream', category: 'food' },
  { emoji: '☕', name: 'coffee', category: 'food' },
  { emoji: '🍺', name: 'beer', category: 'food' },
  { emoji: '🍷', name: 'wine', category: 'food' },
  // Activities
  { emoji: '⚽', name: 'soccer', category: 'activities' },
  { emoji: '🏀', name: 'basketball', category: 'activities' },
  { emoji: '🎮', name: 'video game', category: 'activities' },
  { emoji: '🎯', name: 'bullseye', category: 'activities' },
  { emoji: '🏆', name: 'trophy', category: 'activities' },
  { emoji: '🎉', name: 'party popper', category: 'activities' },
  { emoji: '🎵', name: 'music', category: 'activities' },
  { emoji: '🎸', name: 'guitar', category: 'activities' },
  // Objects
  { emoji: '💡', name: 'light bulb', category: 'objects' },
  { emoji: '🔥', name: 'fire', category: 'objects' },
  { emoji: '⭐', name: 'star', category: 'objects' },
  { emoji: '💎', name: 'gem', category: 'objects' },
  { emoji: '🚀', name: 'rocket', category: 'objects' },
  { emoji: '💰', name: 'money bag', category: 'objects' },
  { emoji: '📱', name: 'phone', category: 'objects' },
  { emoji: '💻', name: 'laptop', category: 'objects' },
  // Symbols
  { emoji: '❤️', name: 'red heart', category: 'symbols' },
  { emoji: '💔', name: 'broken heart', category: 'symbols' },
  { emoji: '💯', name: 'hundred', category: 'symbols' },
  { emoji: '✅', name: 'check', category: 'symbols' },
  { emoji: '❌', name: 'cross mark', category: 'symbols' },
  { emoji: '⚡', name: 'lightning', category: 'symbols' },
  { emoji: '💤', name: 'zzz', category: 'symbols' },
  { emoji: '🔔', name: 'bell', category: 'symbols' },
  // Flags
  { emoji: '🏳️', name: 'white flag', category: 'flags' },
  { emoji: '🏴', name: 'black flag', category: 'flags' },
  { emoji: '🚩', name: 'red flag', category: 'flags' },
  { emoji: '🏁', name: 'checkered flag', category: 'flags' },
];

// Category emoji icons for tabs
const CATEGORY_ICONS: Record<EmojiCategory, string> = {
  smileys: '😊',
  people: '👋',
  animals: '🐶',
  food: '🍕',
  travel: '✈️',
  activities: '⚽',
  objects: '💡',
  symbols: '❤️',
  flags: '🏁',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const EmojiPicker = forwardRef<HTMLDivElement, EmojiPickerProps>(function EmojiPicker(
  {
    size = 'md',
    onSelect,
    emojis,
    recent,
    searchPlaceholder = 'Search emoji...',
    showSearch = true,
    showCategories = true,
    skeleton = false,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = emojiPickerSizeMap[size];
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EmojiCategory | 'recent'>('smileys');

  const colors = useMemo(
    () => resolveEmojiPickerColors(themeColors),
    [themeColors],
  );

  if (skeleton) {
    const skeletonStyle = buildEmojiPickerSkeletonStyle(sizeConfig, themeColors);
    return <div aria-hidden className={className} style={{ ...skeletonStyle, ...userStyle }} />;
  }

  const allEmojis = emojis ?? BUILTIN_EMOJIS;

  // Filter by search
  const filteredEmojis = useMemo(() => {
    if (!search.trim()) return allEmojis;
    const q = search.toLowerCase();
    return allEmojis.filter((e) => e.name.toLowerCase().includes(q) || e.emoji.includes(q));
  }, [allEmojis, search]);

  // Group by category
  const grouped = useMemo(() => {
    const map = new Map<string, EmojiItem[]>();
    for (const item of filteredEmojis) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [filteredEmojis]);

  // Available categories (those with emojis)
  const availableCategories = useMemo(() => {
    return emojiCategories.filter((cat) => grouped.has(cat));
  }, [grouped]);

  const containerStyle = useMemo(
    () => buildEmojiPickerContainerStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const searchStyle = useMemo(
    () => buildEmojiPickerSearchStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const tabBarStyle = useMemo(
    () => buildEmojiPickerTabBarStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const gridStyle = useMemo(
    () => buildEmojiPickerGridStyle(sizeConfig),
    [sizeConfig],
  );

  const categoryLabelStyle = useMemo(
    () => buildEmojiPickerCategoryLabelStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const cellStyle = useMemo(
    () => buildEmojiPickerCellStyle(sizeConfig),
    [sizeConfig],
  );

  const cellRowStyle = useMemo(
    () => buildEmojiPickerCellRowStyle(sizeConfig),
    [sizeConfig],
  );

  const handleSelect = useCallback(
    (emoji: string) => {
      onSelect?.(emoji);
    },
    [onSelect],
  );

  // Determine which categories to render
  const categoriesToShow = search.trim()
    ? availableCategories
    : activeCategory === 'recent'
      ? []
      : availableCategories.filter((c) => c === activeCategory || !showCategories);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...containerStyle, ...userStyle }}
      role="dialog"
      aria-label="Emoji picker"
      {...rest}
    >
      {/* Search */}
      {showSearch && (
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
          placeholder={searchPlaceholder}
          style={searchStyle}
          aria-label="Search emoji"
        />
      )}

      {/* Category tabs */}
      {showCategories && !search.trim() && (
        <div style={tabBarStyle}>
          {recent && recent.length > 0 && (
            <button
              type="button"
              style={buildEmojiPickerTabStyle(sizeConfig, colors, activeCategory === 'recent')}
              onClick={() => setActiveCategory('recent')}
              aria-label="Recent"
            >
              🕐
            </button>
          )}
          {emojiCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              style={buildEmojiPickerTabStyle(sizeConfig, colors, activeCategory === cat)}
              onClick={() => setActiveCategory(cat)}
              aria-label={cat}
            >
              {CATEGORY_ICONS[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div style={gridStyle}>
        {/* Recent section */}
        {(activeCategory === 'recent' || search.trim()) && recent && recent.length > 0 && (
          <div>
            <div style={categoryLabelStyle}>Recent</div>
            <div style={cellRowStyle}>
              {recent.map((emoji, i) => (
                <button
                  key={`recent-${i}`}
                  type="button"
                  style={cellStyle}
                  onClick={() => handleSelect(emoji)}
                  aria-label={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category sections */}
        {(search.trim() ? availableCategories : [activeCategory as EmojiCategory]).map((cat) => {
          const items = grouped.get(cat);
          if (!items || items.length === 0) return null;

          return (
            <div key={cat}>
              <div style={categoryLabelStyle}>{cat}</div>
              <div style={cellRowStyle}>
                {items.map((item) => (
                  <button
                    key={item.emoji}
                    type="button"
                    style={cellStyle}
                    onClick={() => handleSelect(item.emoji)}
                    aria-label={item.name}
                    title={item.name}
                  >
                    {item.emoji}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

EmojiPicker.displayName = 'EmojiPicker';
