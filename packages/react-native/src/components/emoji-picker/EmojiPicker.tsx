/**
 * @module components/emoji-picker
 * @description React Native EmojiPicker for the Wisp design system.
 *
 * Full-featured emoji selection panel with category tabs, keyword search,
 * skin tone selector, and scroll-synced navigation via onScroll offset
 * tracking (RN alternative to IntersectionObserver).
 */

import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Animated } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import type {
  EmojiItem,
  EmojiCategory,
  SkinTone,
} from '@wisp-ui/core/types/EmojiPicker.types';
import {
  emojiPickerSizeMap,
  emojiCategories,
  skinTones,
  SKIN_TONE_MODIFIERS,
} from '@wisp-ui/core/types/EmojiPicker.types';
import type { EmojiPickerSize } from '@wisp-ui/core/types/EmojiPicker.types';
import { resolveEmojiPickerColors } from '@wisp-ui/core/styles/EmojiPicker.styles';
import { EMOJI_DATA } from './emoji-data';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Category labels
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<EmojiCategory, string> = {
  recent: 'Recent',
  smileys: 'Smileys & Emotion',
  people: 'People & Body',
  animals: 'Animals & Nature',
  food: 'Food & Drink',
  travel: 'Travel & Places',
  activities: 'Activities',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
};

const CATEGORY_ICONS: Record<EmojiCategory, string> = {
  recent: '\u{1F552}',
  smileys: '\u{1F600}',
  people: '\u{1F465}',
  animals: '\u{1F43E}',
  food: '\u{1F354}',
  travel: '\u{2708}',
  activities: '\u{1F3C6}',
  objects: '\u{1F4A1}',
  symbols: '\u{2764}',
  flags: '\u{1F3F3}',
};

const SKIN_TONE_PREVIEW = '\u{1F44B}';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface EmojiPickerProps extends ViewProps {
  /** Size preset. @default 'md' */
  size?: EmojiPickerSize;
  /** Called when an emoji is selected. */
  onSelect?: (emoji: string, item?: EmojiItem) => void;
  /** Custom emoji data. */
  emojis?: EmojiItem[];
  /** Recently used emojis. */
  recent?: string[];
  /** Search placeholder text. @default 'Search emoji...' */
  searchPlaceholder?: string;
  /** Show search bar. @default true */
  showSearch?: boolean;
  /** Show category tabs. @default true */
  showCategories?: boolean;
  /** Show skin tone selector. @default true */
  showSkinTones?: boolean;
  /** Default skin tone. @default 'default' */
  defaultSkinTone?: SkinTone;
  /** Controlled skin tone. */
  skinTone?: SkinTone;
  /** Callback when skin tone changes. */
  onSkinToneChange?: (tone: SkinTone) => void;
  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const EmojiPicker = forwardRef<View, EmojiPickerProps>(function EmojiPicker(
  {
    size = 'md',
    onSelect,
    emojis,
    recent,
    searchPlaceholder = 'Search emoji...',
    showSearch = true,
    showCategories = true,
    showSkinTones = true,
    skeleton = false,
    defaultSkinTone = 'default',
    skinTone: controlledSkinTone,
    onSkinToneChange,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = emojiPickerSizeMap[size];
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>('smileys');
  const [internalSkinTone, setInternalSkinTone] = useState<SkinTone>(defaultSkinTone);
  const [skinToneOpen, setSkinToneOpen] = useState(false);
  const skinToneAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Map<string, number>>(new Map());
  const isScrollingProgrammatically = useRef(false);

  const currentSkinTone = controlledSkinTone ?? internalSkinTone;

  const handleSkinToneChange = useCallback(
    (tone: SkinTone) => {
      if (controlledSkinTone === undefined) setInternalSkinTone(tone);
      onSkinToneChange?.(tone);
      // Close the picker after selection
      setSkinToneOpen(false);
      Animated.timing(skinToneAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    },
    [controlledSkinTone, onSkinToneChange, skinToneAnim],
  );

  const toggleSkinTonePicker = useCallback(() => {
    const next = !skinToneOpen;
    setSkinToneOpen(next);
    Animated.timing(skinToneAnim, {
      toValue: next ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [skinToneOpen, skinToneAnim]);

  const colors = useMemo(
    () => resolveEmojiPickerColors(themeColors),
    [themeColors],
  );

  if (skeleton) {
    const skeletonStyle: ViewStyle = {
      width: sizeConfig.width,
      height: sizeConfig.height,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: themeColors.border.subtle,
    };
    return <View style={[skeletonStyle, userStyle as ViewStyle]} />;
  }

  const allEmojis = emojis ?? EMOJI_DATA;

  const sortedEmojis = useMemo(() => {
    return [...allEmojis].sort((a, b) => (a.popularityRank ?? 999) - (b.popularityRank ?? 999));
  }, [allEmojis]);

  const filteredEmojis = useMemo(() => {
    if (!search.trim()) return sortedEmojis;
    const q = search.toLowerCase().trim();
    return sortedEmojis.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.keywords.some((kw: string) => kw.includes(q)) ||
        e.emoji.includes(q),
    );
  }, [sortedEmojis, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, EmojiItem[]>();
    for (const item of filteredEmojis) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return map;
  }, [filteredEmojis]);

  const dataCategories = useMemo(() => {
    return emojiCategories.filter((cat: EmojiCategory) => cat !== 'recent' && grouped.has(cat));
  }, [grouped]);

  const tabCategories = useMemo(() => {
    const cats: EmojiCategory[] = [];
    if (recent && recent.length > 0) cats.push('recent');
    cats.push(...dataCategories);
    return cats;
  }, [recent, dataCategories]);

  const applySkinTone = useCallback(
    (emoji: string, item?: EmojiItem): string => {
      if (!item?.skinToneSupport || currentSkinTone === 'default') return emoji;
      return emoji + SKIN_TONE_MODIFIERS[currentSkinTone];
    },
    [currentSkinTone],
  );

  const handleSelect = useCallback(
    (emoji: string, item?: EmojiItem) => {
      const finalEmoji = applySkinTone(emoji, item);
      onSelect?.(finalEmoji, item);
    },
    [onSelect, applySkinTone],
  );

  // Scroll-tab sync via onScroll offset tracking
  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollingProgrammatically.current || search.trim()) return;
    const y = e.nativeEvent.contentOffset.y + 20;
    let closest: EmojiCategory = 'smileys';
    let closestDiff = Infinity;
    sectionOffsets.current.forEach((offset, cat) => {
      const diff = y - offset;
      if (diff >= 0 && diff < closestDiff) {
        closestDiff = diff;
        closest = cat as EmojiCategory;
      }
    });
    setActiveCategory(closest);
  }, [search]);

  const handleSectionLayout = useCallback((cat: string) => (e: LayoutChangeEvent) => {
    sectionOffsets.current.set(cat, e.nativeEvent.layout.y);
  }, []);

  const handleTabClick = useCallback((cat: EmojiCategory) => {
    setActiveCategory(cat);
    const offset = sectionOffsets.current.get(cat);
    if (offset !== undefined && scrollRef.current) {
      isScrollingProgrammatically.current = true;
      scrollRef.current.scrollTo({ y: offset, animated: true });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  }, []);

  const isSearching = search.trim().length > 0;
  const hasResults = isSearching ? filteredEmojis.length > 0 : true;

  // ---- Styles ----
  const containerStyle = useMemo<ViewStyle>(() => ({
    width: sizeConfig.width,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  }), [sizeConfig, colors]);

  const headerStyle = useMemo<ViewStyle>(() => ({
    paddingHorizontal: sizeConfig.padding,
    paddingTop: sizeConfig.padding,
    paddingBottom: sizeConfig.gap,
    backgroundColor: colors.bg,
    zIndex: 2,
  }), [sizeConfig, colors]);

  const searchRowStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }), []);

  const searchStyle = useMemo<TextStyle>(() => ({
    flex: 1,
    height: sizeConfig.searchHeight,
    fontSize: sizeConfig.fontSize,
    color: themeColors.text.primary,
    backgroundColor: themeColors.background.sunken,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizeConfig.borderRadius / 2,
    paddingHorizontal: sizeConfig.padding,
  }), [sizeConfig, colors, themeColors]);

  const skinToneButtonStyle = useMemo<ViewStyle>(() => ({
    width: sizeConfig.searchHeight,
    height: sizeConfig.searchHeight,
    borderRadius: sizeConfig.borderRadius / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: skinToneOpen ? themeColors.background.sunken : 'transparent',
    borderWidth: 1,
    borderColor: skinToneOpen ? colors.skinToneActiveBorder : colors.border,
  }), [sizeConfig, colors, themeColors, skinToneOpen]);

  const skinToneRowStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: themeColors.background.sunken,
    borderRadius: sizeConfig.borderRadius / 2,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: sizeConfig.gap,
  }), [sizeConfig, colors, themeColors]);

  const tabBarStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    height: sizeConfig.tabHeight,
    paddingHorizontal: sizeConfig.padding,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
    zIndex: 1,
  }), [sizeConfig, colors]);

  const categoryLabelStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.fontSize - 1,
    fontWeight: '600',
    color: colors.categoryLabel,
    paddingHorizontal: sizeConfig.padding,
    paddingVertical: 4,
  }), [sizeConfig, colors]);

  const cellRowStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: sizeConfig.padding,
  }), [sizeConfig]);

  const cellStyle = useMemo<ViewStyle>(() => ({
    width: sizeConfig.cellSize,
    height: sizeConfig.cellSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizeConfig.cellSize / 4,
  }), [sizeConfig]);

  const emojiTextStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.emojiSize,
  }), [sizeConfig]);

  const noResultsStyle = useMemo<ViewStyle>(() => ({
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  }), []);

  // Skin tone hand size for the trigger button
  const handFontSize = Math.round(sizeConfig.searchHeight * 0.55);
  // Skin tone option size inside the expanded row
  const skinToneOptionSize = Math.round(sizeConfig.skinToneDotSize * 1.4);

  return (
    <View ref={ref} style={[containerStyle, userStyle as ViewStyle]} {...rest}>
      {/* Header: Search + Skin Tone trigger */}
      <View style={headerStyle}>
        <View style={searchRowStyle}>
          {showSearch && (
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder={searchPlaceholder}
              placeholderTextColor={themeColors.text.muted}
              style={searchStyle}
              accessibilityLabel="Search emoji"
            />
          )}
          {showSkinTones && (
            <Pressable
              onPress={toggleSkinTonePicker}
              style={skinToneButtonStyle}
              accessibilityLabel="Select skin tone"
              accessibilityRole="button"
            >
              <Text style={{ fontSize: handFontSize }}>
                {SKIN_TONE_PREVIEW}{SKIN_TONE_MODIFIERS[currentSkinTone]}
              </Text>
            </Pressable>
          )}
        </View>

        {/* Expanded skin tone row */}
        {showSkinTones && skinToneOpen && (
          <Animated.View
            style={[
              skinToneRowStyle,
              {
                opacity: skinToneAnim,
                transform: [{
                  translateY: skinToneAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-8, 0],
                  }),
                }],
              },
            ]}
          >
            {skinTones.map((tone: SkinTone) => {
              const isActive = currentSkinTone === tone;
              const optionStyle: ViewStyle = {
                width: skinToneOptionSize,
                height: skinToneOptionSize,
                borderRadius: skinToneOptionSize / 2,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: isActive ? 2 : 0,
                borderColor: isActive ? colors.skinToneActiveBorder : 'transparent',
                backgroundColor: isActive ? (themeColors.background.surface) : 'transparent',
              };
              return (
                <Pressable
                  key={tone}
                  onPress={() => handleSkinToneChange(tone)}
                  accessibilityLabel={`Skin tone: ${tone}`}
                  style={optionStyle}
                >
                  <Text style={{ fontSize: skinToneOptionSize * 0.6 }}>
                    {SKIN_TONE_PREVIEW}{SKIN_TONE_MODIFIERS[tone]}
                  </Text>
                </Pressable>
              );
            })}
          </Animated.View>
        )}
      </View>

      {/* Category tabs */}
      {showCategories && !isSearching && (
        <View style={tabBarStyle}>
          {tabCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const tabStyle: ViewStyle = {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: sizeConfig.tabHeight,
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: isActive ? colors.tabIndicator : 'transparent',
            };
            return (
              <Pressable key={cat} onPress={() => handleTabClick(cat)} style={tabStyle}>
                <Text style={{ fontSize: sizeConfig.tabIconSize, opacity: isActive ? 1 : 0.5 }}>
                  {CATEGORY_ICONS[cat]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {/* Emoji grid */}
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {!hasResults && (
          <View style={noResultsStyle}>
            <Text style={{ fontSize: 13, color: colors.categoryLabel }}>No emoji found</Text>
          </View>
        )}

        {/* Recent section */}
        {recent && recent.length > 0 && !isSearching && (
          <View onLayout={handleSectionLayout('recent')}>
            <Text style={categoryLabelStyle}>Recent</Text>
            <View style={cellRowStyle}>
              {recent.map((emoji, i) => (
                <Pressable
                  key={`recent-${i}`}
                  onPress={() => handleSelect(emoji)}
                  accessibilityLabel={emoji}
                  style={cellStyle}
                >
                  <Text style={emojiTextStyle}>{emoji}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Category sections */}
        {dataCategories.map((cat: EmojiCategory) => {
          const items = grouped.get(cat);
          if (!items || items.length === 0) return null;

          return (
            <View key={cat} onLayout={handleSectionLayout(cat)}>
              <Text style={categoryLabelStyle}>{CATEGORY_LABELS[cat]}</Text>
              <View style={cellRowStyle}>
                {items.map((item) => {
                  const displayEmoji = applySkinTone(item.emoji, item);
                  return (
                    <Pressable
                      key={item.emoji}
                      onPress={() => handleSelect(item.emoji, item)}
                      accessibilityLabel={item.name}
                      style={cellStyle}
                    >
                      <Text style={emojiTextStyle}>{displayEmoji}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

EmojiPicker.displayName = 'EmojiPicker';
