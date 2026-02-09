import React, { forwardRef, useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { View, Pressable, Modal, Animated, StyleSheet, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useThemeColors } from '../../providers';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  displayDuration?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Tooltip = forwardRef<View, TooltipProps>(function Tooltip(
  {
    children,
    content,
    placement = 'top',
    delay = 500,
    displayDuration = 2000,
    disabled = false,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    setVisible(true);
    Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }).start();
    dismissTimer.current = setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
        setVisible(false);
      });
    }, displayDuration);
  }, [disabled, displayDuration, fadeAnim]);

  const hide = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
      setVisible(false);
    });
  }, [fadeAnim]);

  useEffect(() => {
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const tooltipStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: themeColors.text.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      maxWidth: 220,
    }),
    [themeColors],
  );

  const textStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 12,
      color: themeColors.text.inverse,
    }),
    [themeColors],
  );

  return (
    <View ref={ref} style={userStyle}>
      <Pressable onLongPress={show} delayLongPress={delay} onPressOut={hide}>
        {children}
      </Pressable>

      {visible && (
        <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={hide}>
          <Pressable style={StyleSheet.absoluteFill} onPress={hide}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Animated.View style={[tooltipStyle, { opacity: fadeAnim }]}>
                {typeof content === 'string' ? (
                  <RNText style={textStyle}>{content}</RNText>
                ) : (
                  content
                )}
              </Animated.View>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
});

Tooltip.displayName = 'Tooltip';
