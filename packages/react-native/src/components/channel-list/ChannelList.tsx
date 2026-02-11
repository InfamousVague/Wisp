/**
 * @module components/channel-list
 * @description React Native ChannelList for the Wisp design system.
 *
 * Reuses color resolution from `@wisp-ui/core`. Renders via `<View>` + `<Text>`.
 * Collapsible category-grouped channel sidebar with type icons.
 */

import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type {
  ChannelItem as ChannelItemType,
  ChannelCategory,
  ChannelType,
} from '@wisp-ui/core/types/ChannelList.types';
import { resolveChannelListColors } from '@wisp-ui/core/styles/ChannelList.styles';
import { defaultSpacing, defaultRadii, defaultTypography } from '@wisp-ui/core/theme/create-theme';
import { useTheme } from '../../providers';
import Svg, { Line, Path, Polyline, Rect } from 'react-native-svg';

// ---------------------------------------------------------------------------
// Props (RN-specific override — ViewProps instead of HTMLAttributes)
// ---------------------------------------------------------------------------

export interface ChannelListProps extends ViewProps {
  /** List of channel categories. */
  categories: ChannelCategory[];
  /** Called when a channel is pressed. */
  onChannelClick?: (channel: ChannelItemType) => void;
  /** Called when a category collapse state toggles. */
  onCategoryToggle?: (categoryId: string) => void;
  /** Optional header element above the channel list (e.g. server name). */
  header?: React.ReactNode;
  /** Whether the list is loading. @default false */
  loading?: boolean;
  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function HashIcon({ size = 18, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1={4} y1={9} x2={20} y2={9} />
      <Line x1={4} y1={15} x2={20} y2={15} />
      <Line x1={10} y1={3} x2={8} y2={21} />
      <Line x1={16} y1={3} x2={14} y2={21} />
    </Svg>
  );
}

function SpeakerIcon({ size = 18, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M11 5L6 9H2v6h4l5 4V5z" />
      <Path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <Path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </Svg>
  );
}

function MegaphoneIcon({ size = 18, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M3 11l18-5v12L3 13v-2z" />
      <Path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </Svg>
  );
}

function MessageSquareIcon({ size = 18, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

function MessagesIcon({ size = 18, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
      <Path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
    </Svg>
  );
}

function ChevronIcon({ size = 12, color, collapsed }: { size?: number; color?: string; collapsed?: boolean }) {
  return (
    <View style={{ transform: [{ rotate: collapsed ? '-90deg' : '0deg' }], flexShrink: 0 }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? '#888'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Polyline points="6,9 12,15 18,9" />
      </Svg>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Channel type icon map
// ---------------------------------------------------------------------------

function ChannelTypeIcon({
  type,
  size,
  color,
}: {
  type: ChannelType;
  size?: number;
  color?: string;
}) {
  switch (type) {
    case 'voice':
      return <SpeakerIcon size={size} color={color} />;
    case 'announcement':
      return <MegaphoneIcon size={size} color={color} />;
    case 'thread':
      return <MessageSquareIcon size={size} color={color} />;
    case 'forum':
      return <MessagesIcon size={size} color={color} />;
    case 'text':
    default:
      return <HashIcon size={size} color={color} />;
  }
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

function ChannelListSkeleton({
  skeletonColor,
}: {
  skeletonColor: string;
}) {
  const catStyle: ViewStyle = {
    height: 10,
    width: '40%',
    borderRadius: defaultRadii.sm,
    backgroundColor: skeletonColor,
    marginTop: defaultSpacing.sm,
    marginBottom: defaultSpacing.xs,
    marginHorizontal: defaultSpacing.md,
  };

  const itemBaseStyle: ViewStyle = {
    height: 14,
    borderRadius: defaultRadii.sm,
    backgroundColor: skeletonColor,
    marginVertical: defaultSpacing.xs,
    marginHorizontal: defaultSpacing.md,
  };

  const widths: ('55%' | '70%' | '85%')[] = ['55%', '70%', '55%', '85%'];

  return (
    <>
      {[0, 1, 2].map((catIdx) => (
        <View key={catIdx}>
          <View style={catStyle} />
          {[0, 1, 2, 3].map((itemIdx) => (
            <View
              key={itemIdx}
              style={[itemBaseStyle, { width: widths[itemIdx % widths.length] }]}
            />
          ))}
        </View>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// ChannelList
// ---------------------------------------------------------------------------

/**
 * ChannelList -- Collapsible category-grouped channel sidebar (React Native).
 *
 * @remarks
 * Renders a list of category groups, each containing channel items.
 * Categories are collapsible with a chevron toggle. Channels display
 * a type icon, name, and optional unread/mention badge. Active channels
 * receive highlighted styling and muted channels have reduced opacity.
 *
 * @example
 * ```tsx
 * <ChannelList
 *   categories={categories}
 *   onChannelClick={(ch) => setActiveChannel(ch.id)}
 *   onCategoryToggle={(catId) => toggleCategory(catId)}
 *   header={<Text>My Server</Text>}
 * />
 * ```
 */
export const ChannelList = forwardRef<View, ChannelListProps>(
  function ChannelList(
    {
      categories,
      onChannelClick,
      onCategoryToggle,
      header,
      loading = false,
      skeleton = false,
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();

    // Track collapsed state per category, initialized from category.collapsed
    const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>(
      () => {
        const initial: Record<string, boolean> = {};
        for (const cat of categories) {
          if (cat.collapsed) {
            initial[cat.id] = true;
          }
        }
        return initial;
      },
    );

    // ----- Colors -----
    const colors = useMemo(
      () => resolveChannelListColors(theme),
      [theme],
    );

    // ----- Styles -----
    const containerStyle: ViewStyle = useMemo(() => ({
      flex: 1,
      backgroundColor: colors.bg,
      width: '100%',
    }), [colors.bg]);

    const headerSlotStyle: ViewStyle = useMemo(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: defaultSpacing.md,
      paddingHorizontal: defaultSpacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.headerBg,
      minHeight: 48,
    }), [colors.border, colors.headerBg]);

    const categoryHeaderStyle: ViewStyle = useMemo(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: defaultSpacing.xs,
      paddingVertical: defaultSpacing.xs,
      paddingHorizontal: defaultSpacing.sm,
      marginTop: defaultSpacing.sm,
      marginHorizontal: defaultSpacing.sm,
      borderRadius: defaultRadii.sm,
    }), []);

    const categoryLabelStyle: TextStyle = useMemo(() => ({
      fontSize: defaultTypography.sizes['2xs'].fontSize,
      lineHeight: defaultTypography.sizes['2xs'].lineHeight,
      fontWeight: String(defaultTypography.weights.semibold) as TextStyle['fontWeight'],
      color: colors.categoryText,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      flex: 1,
    }), [colors.categoryText]);

    const badgeStyle: ViewStyle & TextStyle = useMemo(() => ({
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      paddingHorizontal: 5,
      backgroundColor: colors.badgeBg,
    }), [colors.badgeBg]);

    const badgeTextStyle: TextStyle = useMemo(() => ({
      fontSize: defaultTypography.sizes['2xs'].fontSize,
      lineHeight: defaultTypography.sizes['2xs'].lineHeight,
      fontWeight: String(defaultTypography.weights.semibold) as TextStyle['fontWeight'],
      color: colors.badgeText,
    }), [colors.badgeText]);

    const loadingTextStyle: TextStyle = useMemo(() => ({
      fontSize: defaultTypography.sizes.sm.fontSize,
      color: colors.categoryText,
    }), [colors.categoryText]);

    // ----- Handlers -----
    const handleCategoryToggle = useCallback(
      (categoryId: string) => {
        setCollapsedMap((prev) => ({
          ...prev,
          [categoryId]: !prev[categoryId],
        }));
        onCategoryToggle?.(categoryId);
      },
      [onCategoryToggle],
    );

    const handleChannelClick = useCallback(
      (channel: ChannelItemType) => {
        onChannelClick?.(channel);
      },
      [onChannelClick],
    );

    // ----- Render helpers -----
    const renderChannel = useCallback(
      (channel: ChannelItemType) => {
        const active = channel.active ?? false;
        const muted = channel.muted ?? false;
        const type = channel.type ?? 'text';
        const hasUnread = (channel.unreadCount ?? 0) > 0;

        const itemStyle: ViewStyle = {
          flexDirection: 'row',
          alignItems: 'center',
          gap: defaultSpacing.sm,
          paddingVertical: defaultSpacing.xs + 1,
          paddingHorizontal: defaultSpacing.sm,
          marginVertical: 1,
          marginHorizontal: defaultSpacing.sm,
          borderRadius: defaultRadii.md,
          backgroundColor: active ? colors.channelActiveBg : 'transparent',
          opacity: muted && !active ? 0.5 : 1,
          minHeight: 32,
        };

        const iconContainerStyle: ViewStyle = {
          width: 18,
          height: 18,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        };

        const iconColor = active ? colors.channelIconActive : colors.channelIcon;

        const nameStyle: TextStyle = {
          fontSize: defaultTypography.sizes.sm.fontSize,
          lineHeight: defaultTypography.sizes.sm.lineHeight,
          fontWeight: active || hasUnread
            ? String(defaultTypography.weights.semibold) as TextStyle['fontWeight']
            : String(defaultTypography.weights.regular) as TextStyle['fontWeight'],
          color: active ? colors.channelTextActive : colors.channelText,
          flex: 1,
        };

        return (
          <Pressable
            key={channel.id}
            accessibilityRole="button"
            accessibilityLabel={`${channel.name} channel`}
            accessibilityState={{ selected: active }}
            onPress={() => handleChannelClick(channel)}
            style={itemStyle}
          >
            {/* Channel icon */}
            <View style={iconContainerStyle}>
              {channel.icon ?? <ChannelTypeIcon type={type} size={18} color={iconColor} />}
            </View>

            {/* Channel name */}
            <Text style={nameStyle} numberOfLines={1}>{channel.name}</Text>

            {/* Badge */}
            {hasUnread && !muted && (
              <View style={badgeStyle}>
                <Text style={badgeTextStyle}>
                  {channel.hasMention
                    ? `@${channel.unreadCount}`
                    : channel.unreadCount}
                </Text>
              </View>
            )}
          </Pressable>
        );
      },
      [colors, badgeStyle, badgeTextStyle, handleChannelClick],
    );

    const renderCategory = useCallback(
      (category: ChannelCategory) => {
        const isCollapsed = collapsedMap[category.id] ?? false;

        return (
          <View
            key={category.id}
            accessibilityRole="summary"
            accessibilityLabel={category.label}
          >
            {/* Category header */}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${category.label}, ${isCollapsed ? 'collapsed' : 'expanded'}`}
              accessibilityState={{ expanded: !isCollapsed }}
              onPress={() => handleCategoryToggle(category.id)}
              style={categoryHeaderStyle}
            >
              <ChevronIcon
                size={12}
                color={colors.categoryIcon}
                collapsed={isCollapsed}
              />
              <Text style={categoryLabelStyle} numberOfLines={1}>
                {category.label}
              </Text>
            </Pressable>

            {/* Channel items */}
            {!isCollapsed &&
              category.channels.map((channel) => renderChannel(channel))}
          </View>
        );
      },
      [
        collapsedMap,
        categoryHeaderStyle,
        categoryLabelStyle,
        colors.categoryIcon,
        handleCategoryToggle,
        renderChannel,
      ],
    );

    return (
      <View
        ref={ref}
        accessibilityRole="menu"
        accessibilityLabel="Channel list"
        style={[containerStyle, userStyle as ViewStyle]}
        {...rest}
      >
        {/* Header slot */}
        {header && <View style={headerSlotStyle}>{header}</View>}

        {/* Scrollable content */}
        <ScrollView style={{ flex: 1 }}>
          {/* Loading state */}
          {loading && !skeleton && (
            <View style={{ alignItems: 'center', justifyContent: 'center', padding: defaultSpacing.xl }}>
              <Text style={loadingTextStyle}>Loading channels...</Text>
            </View>
          )}

          {/* Skeleton state */}
          {skeleton && (
            <ChannelListSkeleton skeletonColor={colors.skeleton} />
          )}

          {/* Categories */}
          {!loading && !skeleton && categories.map((cat) => renderCategory(cat))}
        </ScrollView>
      </View>
    );
  },
);

ChannelList.displayName = 'ChannelList';
