/**
 * @module components/chat-bubble
 * @description React Native ChatBubble for the Wisp design system.
 *
 * Reuses color resolution from `@wisp-ui/core`. Renders via `<View>` + `<Text>`.
 */

import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type {
  ChatBubbleAlignment,
  ChatBubbleVariant,
  ChatBubbleStatus,
  ChatBubbleReaction,
} from '@wisp-ui/core/types/ChatBubble.types';
import { resolveChatBubbleColors } from '@wisp-ui/core/styles/ChatBubble.styles';
import { useThemeColors } from '../../providers';
import Svg, { Path } from 'react-native-svg';
import { defaultSpacing, defaultRadii, defaultTypography } from '@wisp-ui/core/theme/create-theme';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ChatBubbleProps extends ViewProps {
  children: React.ReactNode;
  align?: ChatBubbleAlignment;
  variant?: ChatBubbleVariant;
  timestamp?: string;
  status?: ChatBubbleStatus;
  reactions?: ChatBubbleReaction[];
  onReactionClick?: (emoji: string) => void;
  /** @internal Injected by MessageGroup to suppress footer. */
  _inGroup?: boolean;
}

// ---------------------------------------------------------------------------
// Inline SVG status icons
// ---------------------------------------------------------------------------

function CheckIcon({ size = 12, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

function CheckCheckIcon({ size = 12, color }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 6 7 17l-5-5" />
      <Path d="m22 10-9.5 9.5L10 17" />
    </Svg>
  );
}

export function StatusIcon({ status, color, readColor }: { status: ChatBubbleStatus; color: string; readColor: string }) {
  switch (status) {
    case 'sent':
      return <CheckIcon color={color} />;
    case 'delivered':
      return <CheckCheckIcon color={color} />;
    case 'read':
      return <CheckCheckIcon color={readColor} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const ChatBubble = forwardRef<View, ChatBubbleProps>(function ChatBubble(
  {
    children,
    align = 'incoming',
    variant = 'default',
    timestamp,
    status,
    reactions,
    onReactionClick,
    _inGroup = false,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const isOutgoing = align === 'outgoing';

  const colors = useMemo(
    () => resolveChatBubbleColors(align, variant, themeColors),
    [align, variant, themeColors],
  );

  const bubbleStyle = useMemo<ViewStyle>(() => ({
    paddingHorizontal: defaultSpacing.md,
    paddingVertical: defaultSpacing.sm,
    borderTopLeftRadius: defaultRadii.lg,
    borderTopRightRadius: defaultRadii.lg,
    borderBottomLeftRadius: isOutgoing ? 12 : 2,
    borderBottomRightRadius: isOutgoing ? 2 : 12,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
  }), [isOutgoing, colors]);

  const textStyle = useMemo<TextStyle>(() => ({
    color: colors.text,
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: 20,
  }), [colors]);

  const footerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    marginTop: defaultSpacing.xs,
    justifyContent: isOutgoing ? 'flex-end' : 'flex-start',
  }), [isOutgoing]);

  const timestampStyle = useMemo<TextStyle>(() => ({
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: 14,
    color: colors.timestamp,
  }), [colors]);

  const reactionsContainerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: defaultSpacing.xs,
    marginTop: defaultSpacing.sm,
  }), []);

  const handleReactionClick = useCallback(
    (emoji: string) => { onReactionClick?.(emoji); },
    [onReactionClick],
  );

  const showFooter = !_inGroup && (timestamp || status);
  const hasReactions = reactions && reactions.length > 0;

  return (
    <View ref={ref} style={userStyle} {...rest}>
      {/* Bubble */}
      <View style={bubbleStyle}>
        <Text style={textStyle}>{children}</Text>

        {/* Reactions inside bubble */}
        {hasReactions && (
          <View style={reactionsContainerStyle}>
            {reactions!.map((reaction) => (
              <Pressable
                key={reaction.emoji}
                onPress={() => handleReactionClick(reaction.emoji)}
                accessibilityLabel={`${reaction.emoji} ${reaction.count}`}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: defaultSpacing.xs,
                  paddingHorizontal: defaultSpacing.sm,
                  paddingVertical: defaultSpacing.xs,
                  borderRadius: defaultRadii.lg,
                  borderWidth: 1,
                  borderColor: reaction.reacted
                    ? themeColors.brand.primary
                    : themeColors.border.subtle,
                  backgroundColor: reaction.reacted
                    ? `${themeColors.brand.primary}15`
                    : themeColors.background.surface,
                }}
              >
                <Text style={{ fontSize: defaultTypography.sizes.xs.fontSize }}>{reaction.emoji}</Text>
                <Text style={{ fontSize: defaultTypography.sizes.xs.fontSize, color: themeColors.text.secondary }}>
                  {reaction.count}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Footer below bubble */}
      {showFooter && (
        <View style={footerStyle}>
          {timestamp && <Text style={timestampStyle}>{timestamp}</Text>}
          {status && (
            <StatusIcon
              status={status}
              color={colors.timestamp}
              readColor="#0C0C0E"
            />
          )}
        </View>
      )}
    </View>
  );
});

ChatBubble.displayName = 'ChatBubble';
