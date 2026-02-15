/**
 * @module components/typing-indicator
 * @description React Native TypingIndicator for the Wisp design system.
 *
 * Animated "someone is typing…" indicator with bounce, pulse, scale, or wave
 * dot animations. Can render as bare dots or inside a chat-bubble-shaped
 * container with optional avatar.
 */

import React, { forwardRef, useMemo, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { ChatBubbleAlignment } from '@coexist/wisp-core/types/ChatBubble.types';
import type { TypingIndicatorAnimation } from '@coexist/wisp-core/types/TypingIndicator.types';
import { defaultSpacing, defaultRadii, defaultTypography } from '@coexist/wisp-core/theme/create-theme';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TypingIndicatorProps extends ViewProps {
  animation?: TypingIndicatorAnimation;
  bubble?: boolean;
  align?: ChatBubbleAlignment;
  avatar?: React.ReactNode;
  sender?: string;
  color?: string;
  dotSize?: number;
}

// ---------------------------------------------------------------------------
// Animated Dot
// ---------------------------------------------------------------------------

function AnimatedDot({
  index,
  animation,
  dotSize,
  color,
}: {
  index: number;
  animation: TypingIndicatorAnimation;
  dotSize: number;
  color: string;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = animation === 'pulse' ? 1400 : animation === 'wave' ? 1600 : 1200;
    const delay = index * 150;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [anim, animation, index]);

  const animatedStyle = useMemo(() => {
    switch (animation) {
      case 'bounce':
      case 'wave':
        return {
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -6],
              }),
            },
          ],
        };
      case 'pulse':
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 1],
          }),
        };
      case 'scale':
        return {
          transform: [
            {
              scale: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.5],
              }),
            },
          ],
        };
      default:
        return {};
    }
  }, [anim, animation]);

  return (
    <Animated.View
      style={[
        {
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const TypingIndicator = forwardRef<View, TypingIndicatorProps>(function TypingIndicator(
  {
    animation = 'bounce',
    bubble = false,
    align = 'incoming',
    avatar,
    sender,
    color,
    dotSize = 8,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;
  const isLight = theme.mode === 'light';
  const isOutgoing = align === 'outgoing';
  const dotColor = color ?? themeColors.text.secondary;

  const dotsContainerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.xs,
  }), []);

  const dots = (
    <View style={dotsContainerStyle}>
      {[0, 1, 2].map((i) => (
        <AnimatedDot
          key={i}
          index={i}
          animation={animation}
          dotSize={dotSize}
          color={dotColor}
        />
      ))}
    </View>
  );

  // ---- Bubble mode styles (always call hooks to satisfy Rules of Hooks) ----
  const bubbleStyle = useMemo<ViewStyle>(() => {
    // Match ChatBubble color resolution so the typing bubble looks like a real chat bubble
    const incomingBg = isLight ? themeColors.background.sunken : themeColors.background.raised;
    const incomingBorder = isLight ? themeColors.border.subtle : (themeColors.accent as any).dividerRaised ?? themeColors.border.subtle;
    return {
      paddingHorizontal: defaultSpacing.lg,
      paddingVertical: defaultSpacing.md,
      borderTopLeftRadius: defaultRadii.lg,
      borderTopRightRadius: defaultRadii.lg,
      borderBottomLeftRadius: isOutgoing ? 12 : 2,
      borderBottomRightRadius: isOutgoing ? 2 : 12,
      backgroundColor: isOutgoing ? '#FFFFFF' : incomingBg,
      borderWidth: 1,
      borderColor: isOutgoing ? '#E4E4E7' : incomingBorder,
    };
  }, [isOutgoing, isLight, themeColors]);

  const groupStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'column',
    alignItems: isOutgoing ? 'flex-end' : 'flex-start',
    gap: defaultSpacing.xs,
  }), [isOutgoing]);

  const rowStyle = useMemo<ViewStyle>(() => ({
    flexDirection: isOutgoing ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    gap: defaultSpacing.sm,
  }), [isOutgoing]);

  const senderNameStyle = useMemo<TextStyle>(() => ({
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: 18,
    fontWeight: defaultTypography.weights.semibold,
    color: themeColors.text.secondary,
  }), [themeColors]);

  // ---- Non-bubble mode ----
  if (!bubble) {
    return (
      <View
        ref={ref}
        style={[{ flexDirection: 'row', alignItems: 'center' }, userStyle]}
        accessibilityRole="none"
        accessibilityLabel="Typing"
        {...rest}
      >
        {dots}
      </View>
    );
  }

  // ---- Bubble mode ----
  return (
    <View
      ref={ref}
      style={[groupStyle, userStyle]}
      accessibilityRole="none"
      accessibilityLabel={sender ? `${sender} is typing` : 'Typing'}
      {...rest}
    >
      {sender && <Text style={senderNameStyle}>{sender}</Text>}
      <View style={rowStyle}>
        {avatar}
        <View style={bubbleStyle}>
          {dots}
        </View>
      </View>
    </View>
  );
});

TypingIndicator.displayName = 'TypingIndicator';
