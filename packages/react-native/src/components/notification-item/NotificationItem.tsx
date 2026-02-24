/**
 * @module components/notification-item
 * @description React Native NotificationItem for the Wisp design system.
 *
 * Renders an individual notification row with avatar/icon, title, description,
 * timestamp, optional action buttons, and dismiss. Supports read/unread state
 * with a left accent border indicator.
 */

import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Pressable, Text as RNText, Image } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { defaultSpacing, defaultRadii, defaultTypography } from '@coexist/wisp-core/theme/create-theme';
import {
  resolveNotificationItemColors,
  resolveNotificationAccent,
} from '@coexist/wisp-core/styles/NotificationItem.styles';
import type {
  NotificationItemProps,
  NotificationType,
} from '@coexist/wisp-core/types/NotificationItem.types';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AVATAR_SIZE = 36;
const UNREAD_BORDER_WIDTH = 3;

// ---------------------------------------------------------------------------
// NotificationItem
// ---------------------------------------------------------------------------

export const NotificationItem = forwardRef<View, NotificationItemProps>(
  function NotificationItem(
    {
      id,
      type,
      title,
      description,
      timestamp,
      read,
      avatar,
      avatarFallback,
      icon: CustomIcon,
      iconColor,
      actions,
      onPress,
      onDismiss,
      style: userStyle,
    },
    ref,
  ) {
    const { theme } = useTheme();
    const colors = useMemo(
      () => resolveNotificationItemColors(type, read, theme),
      [type, read, theme],
    );
    const accent = useMemo(
      () => resolveNotificationAccent(type, theme),
      [type, theme],
    );

    // ------ Styles ------
    const containerStyle = useMemo<ViewStyle>(
      () => ({
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: defaultSpacing.sm,
        paddingHorizontal: defaultSpacing.md,
        paddingLeft: defaultSpacing.md - (read ? 0 : UNREAD_BORDER_WIDTH),
        gap: defaultSpacing.md,
        borderLeftWidth: read ? 0 : UNREAD_BORDER_WIDTH,
        borderLeftColor: read ? 'transparent' : accent,
        backgroundColor: read ? 'transparent' : colors.bgUnread,
        borderRadius: defaultRadii.md,
        minHeight: 56,
      }),
      [read, accent, colors.bgUnread],
    );

    const titleStyle = useMemo<TextStyle>(
      () => ({
        fontSize: defaultTypography.sizes.sm.fontSize,
        lineHeight: defaultTypography.sizes.sm.lineHeight,
        fontWeight: read
          ? (String(defaultTypography.weights.regular) as TextStyle['fontWeight'])
          : (String(defaultTypography.weights.semibold) as TextStyle['fontWeight']),
        color: colors.text,
      }),
      [read, colors.text],
    );

    const descriptionStyle = useMemo<TextStyle>(
      () => ({
        fontSize: defaultTypography.sizes.xs.fontSize,
        lineHeight: defaultTypography.sizes.xs.lineHeight,
        color: colors.textMuted,
        marginTop: 2,
      }),
      [colors.textMuted],
    );

    const timestampStyle = useMemo<TextStyle>(
      () => ({
        fontSize: defaultTypography.sizes['2xs']?.fontSize ?? 10,
        lineHeight: defaultTypography.sizes['2xs']?.lineHeight ?? 14,
        color: colors.textMuted,
        marginTop: 2,
      }),
      [colors.textMuted],
    );

    const avatarStyle = useMemo<ViewStyle>(
      () => ({
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: colors.avatarBg,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }),
      [colors.avatarBg],
    );

    const actionBtnStyle = useCallback(
      (variant: 'primary' | 'secondary' | 'danger'): ViewStyle => ({
        paddingHorizontal: defaultSpacing.md,
        paddingVertical: defaultSpacing.xs,
        borderRadius: defaultRadii.md,
        backgroundColor:
          variant === 'primary'
            ? theme.colors.accent.primary
            : variant === 'danger'
              ? theme.colors.status.danger
              : 'transparent',
        borderWidth: variant === 'secondary' ? 1 : 0,
        borderColor: variant === 'secondary' ? theme.colors.border.subtle : 'transparent',
      }),
      [theme],
    );

    const actionTextStyle = useCallback(
      (variant: 'primary' | 'secondary' | 'danger'): TextStyle => ({
        fontSize: defaultTypography.sizes.xs.fontSize,
        fontWeight: String(defaultTypography.weights.medium) as TextStyle['fontWeight'],
        color:
          variant === 'primary' || variant === 'danger'
            ? '#fff'
            : theme.colors.text.primary,
      }),
      [theme],
    );

    const Icon = CustomIcon;
    const resolvedIconColor = iconColor ?? accent;

    return (
      <Pressable
        ref={ref as any}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${read ? '' : 'Unread '}notification: ${title}`}
        style={({ pressed }) => [
          containerStyle,
          pressed && onPress ? { opacity: 0.8 } : undefined,
          userStyle as ViewStyle,
        ]}
      >
        {/* Avatar / Icon */}
        <View style={avatarStyle}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 }}
            />
          ) : Icon ? (
            <Icon size={AVATAR_SIZE * 0.5} color={resolvedIconColor} />
          ) : avatarFallback ? (
            <RNText
              style={{
                fontSize: AVATAR_SIZE * 0.4,
                fontWeight: String(defaultTypography.weights.semibold) as TextStyle['fontWeight'],
                color: accent,
              }}
            >
              {avatarFallback}
            </RNText>
          ) : null}
        </View>

        {/* Content */}
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <RNText style={titleStyle} numberOfLines={2}>
              {title}
            </RNText>
            <RNText style={timestampStyle}>{timestamp}</RNText>
          </View>

          {description ? (
            <RNText style={descriptionStyle} numberOfLines={2}>
              {description}
            </RNText>
          ) : null}

          {/* Action buttons */}
          {actions && actions.length > 0 && (
            <View style={{ flexDirection: 'row', gap: defaultSpacing.xs, marginTop: defaultSpacing.xs }}>
              {actions.map((action) => (
                <Pressable
                  key={action.label}
                  onPress={action.onPress}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                  style={actionBtnStyle(action.variant)}
                >
                  <RNText style={actionTextStyle(action.variant)}>{action.label}</RNText>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Dismiss button */}
        {onDismiss && (
          <Pressable
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss notification"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <RNText style={{ fontSize: 14, color: colors.dismissIcon, lineHeight: 16 }}>{'\u2715'}</RNText>
          </Pressable>
        )}
      </Pressable>
    );
  },
);

NotificationItem.displayName = 'NotificationItem';
