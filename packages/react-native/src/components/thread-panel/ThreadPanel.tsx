/**
 * @module components/thread-panel
 * @description React Native ThreadPanel for the Wisp design system.
 *
 * Reuses color resolution from `@wisp-ui/core`. Renders via `<View>` + `<Text>`.
 */

import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import {
  resolveThreadPanelColors,
} from '@wisp-ui/core/styles/ThreadPanel.styles';
import { defaultSpacing, defaultRadii, defaultTypography } from '@wisp-ui/core/theme/create-theme';
import { fontFamilyStacks } from '@wisp-ui/core/tokens/shared';
import { useTheme } from '../../providers';
import Svg, { Line, Path } from 'react-native-svg';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ThreadMessage {
  id: string;
  sender: string;
  avatar?: React.ReactNode;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

export interface ThreadPanelProps extends ViewProps {
  parentMessage: ThreadMessage;
  replies: ThreadMessage[];
  replyCount?: number;
  onClose?: () => void;
  onReply?: (text: string) => void;
  title?: string;
  sending?: boolean;
  placeholder?: string;
  loading?: boolean;
  renderMessage?: (message: ThreadMessage) => React.ReactNode;
}

// ---------------------------------------------------------------------------
// SVG Icons
// ---------------------------------------------------------------------------

function CloseIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Line x1={18} y1={6} x2={6} y2={18} />
      <Line x1={6} y1={6} x2={18} y2={18} />
    </Svg>
  );
}

function SendIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <Path d="m21.854 2.147-10.94 10.939" />
    </Svg>
  );
}

// ---------------------------------------------------------------------------
// Default Avatar
// ---------------------------------------------------------------------------

function DefaultAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <View style={{
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{initials}</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// ThreadPanel
// ---------------------------------------------------------------------------

export const ThreadPanel = forwardRef<View, ThreadPanelProps>(
  function ThreadPanel(
    {
      parentMessage,
      replies,
      replyCount,
      onClose,
      onReply,
      title = 'Thread',
      sending = false,
      placeholder = 'Reply...',
      loading = false,
      renderMessage,
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();
    const [replyText, setReplyText] = useState('');

    const colors = useMemo(
      () => resolveThreadPanelColors(theme),
      [theme],
    );

    const displayCount = replyCount ?? replies.length;

    const handleSubmit = useCallback(() => {
      const trimmed = replyText.trim();
      if (trimmed && onReply) {
        onReply(trimmed);
        setReplyText('');
      }
    }, [replyText, onReply]);

    // ------ Styles ------
    const containerStyle: ViewStyle = {
      flex: 1,
      backgroundColor: colors.bg,
      borderLeftWidth: 1,
      borderLeftColor: colors.border,
    };

    const headerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: defaultSpacing.sm,
      paddingHorizontal: defaultSpacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      minHeight: 48,
    };

    const titleTextStyle: TextStyle = {
      fontSize: defaultTypography.sizes.sm.fontSize,
      lineHeight: defaultTypography.sizes.sm.lineHeight,
      fontWeight: String(defaultTypography.weights.semibold) as TextStyle['fontWeight'],
      color: colors.headerText,
    };

    const closeButtonStyle: ViewStyle = {
      width: 28,
      height: 28,
      borderRadius: defaultRadii.md,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const messageRowStyle: ViewStyle = {
      flexDirection: 'row',
      gap: defaultSpacing.sm,
      paddingVertical: defaultSpacing.sm,
      paddingHorizontal: defaultSpacing.md,
    };

    const senderRowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 6,
    };

    const nameTextStyle: TextStyle = {
      fontSize: defaultTypography.sizes.sm.fontSize,
      lineHeight: defaultTypography.sizes.sm.lineHeight,
      fontWeight: String(defaultTypography.weights.semibold) as TextStyle['fontWeight'],
      color: colors.messageText,
    };

    const tsTextStyle: TextStyle = {
      fontSize: defaultTypography.sizes['2xs'].fontSize,
      lineHeight: defaultTypography.sizes['2xs'].lineHeight,
      color: colors.messageTextMuted,
    };

    const msgTextStyle: TextStyle = {
      fontSize: defaultTypography.sizes.sm.fontSize,
      lineHeight: defaultTypography.sizes.sm.lineHeight,
      color: colors.messageTextSecondary,
    };

    const dividerRowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: defaultSpacing.sm,
      paddingVertical: defaultSpacing.xs,
      paddingHorizontal: defaultSpacing.md,
    };

    const dividerLineStyle: ViewStyle = {
      flex: 1,
      height: 1,
      backgroundColor: colors.dividerLine,
    };

    const dividerTextStyle: TextStyle = {
      fontSize: defaultTypography.sizes.xs.fontSize,
      lineHeight: defaultTypography.sizes.xs.lineHeight,
      color: colors.dividerText,
      fontWeight: String(defaultTypography.weights.medium) as TextStyle['fontWeight'],
    };

    const inputAreaStyle: ViewStyle = {
      paddingVertical: defaultSpacing.sm,
      paddingHorizontal: defaultSpacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    };

    const inputRowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: defaultRadii.md,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.bg,
    };

    const loadingViewStyle: ViewStyle = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: defaultSpacing.xl,
    };

    const renderThreadMessage = useCallback(
      (msg: ThreadMessage) => {
        if (renderMessage) return renderMessage(msg);
        return (
          <View style={messageRowStyle}>
            <View style={{ flexShrink: 0 }}>
              {msg.avatar || <DefaultAvatar name={msg.sender} />}
            </View>
            <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
              <View style={senderRowStyle}>
                <Text style={nameTextStyle}>{msg.sender}</Text>
                <Text style={tsTextStyle}>{msg.timestamp}</Text>
              </View>
              <Text style={msgTextStyle}>{msg.content}</Text>
            </View>
          </View>
        );
      },
      [renderMessage, colors, theme],
    );

    return (
      <View ref={ref} style={[containerStyle, userStyle as ViewStyle]} {...rest}>
        {/* Header */}
        <View style={headerStyle}>
          <Text style={titleTextStyle}>{title}</Text>
          {onClose && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close thread"
              onPress={onClose}
              style={closeButtonStyle}
            >
              <CloseIcon size={16} color={colors.headerTextMuted} />
            </Pressable>
          )}
        </View>

        {/* Body */}
        <ScrollView style={{ flex: 1 }}>
          {/* Parent message */}
          {renderThreadMessage(parentMessage)}

          {/* Divider */}
          <View style={dividerRowStyle}>
            <View style={dividerLineStyle} />
            <Text style={dividerTextStyle}>
              {displayCount} {displayCount === 1 ? 'reply' : 'replies'}
            </Text>
            <View style={dividerLineStyle} />
          </View>

          {/* Loading */}
          {loading && (
            <View style={loadingViewStyle}>
              <Text style={{ color: colors.messageTextMuted, fontSize: defaultTypography.sizes.sm.fontSize }}>
                Loading replies…
              </Text>
            </View>
          )}

          {/* Replies */}
          {!loading && replies.map((reply) => (
            <View key={reply.id}>
              {renderThreadMessage(reply)}
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        {onReply && (
          <View style={inputAreaStyle}>
            <View style={inputRowStyle}>
              <TextInput
                value={replyText}
                onChangeText={setReplyText}
                placeholder={placeholder}
                placeholderTextColor={colors.messageTextMuted}
                editable={!sending}
                multiline
                style={{
                  flex: 1,
                  color: colors.messageText,
                  fontSize: defaultTypography.sizes.sm.fontSize,
                  lineHeight: defaultTypography.sizes.sm.lineHeight,
                  padding: 0,
                  margin: 0,
                }}
                onSubmitEditing={handleSubmit}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Send reply"
                disabled={sending || !replyText.trim()}
                onPress={handleSubmit}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: defaultRadii.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: replyText.trim() ? 1 : 0.4,
                }}
              >
                <SendIcon size={16} color={replyText.trim() ? colors.headerText : colors.messageTextMuted} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  },
);

ThreadPanel.displayName = 'ThreadPanel';
