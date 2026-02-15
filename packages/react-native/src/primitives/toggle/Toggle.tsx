/**
 * @module primitives/toggle
 * @description React Native Toggle (switch) primitive for the Wisp design system.
 *
 * Reuses color resolution and size maps from `@coexist/wisp-core`.
 * Key differences from the React DOM version:
 *
 * - Uses `<Pressable>` instead of `<button>`.
 * - Handle sliding via `Animated.timing` instead of CSS `transition`.
 * - No CSS grid spacer trick — track width is computed directly.
 * - No `className` or mouse event props.
 */

import React, { forwardRef, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { Pressable, View, Animated } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';
import type { ComponentSize } from '@coexist/wisp-core/tokens/shared';
import type { ToggleSizeConfig } from '@coexist/wisp-core/types/Toggle.types';
import {
  resolveToggleColors,
  getDisabledToggleColors,
  resolveSizeConfig,
} from '@coexist/wisp-core/styles/Toggle.styles';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ToggleProps extends Omit<ViewProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ComponentSize;
  slim?: boolean;
  disabled?: boolean;
  handleIcon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  checkedColor?: string;
  uncheckedColor?: string;
  label?: string;
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Toggle = forwardRef<View, ToggleProps>(function Toggle(
  {
    checked: controlledChecked,
    defaultChecked = false,
    onChange,
    size = 'md',
    slim = false,
    disabled = false,
    handleIcon: HandleIconComponent,
    checkedColor,
    uncheckedColor,
    label,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;

  // Controlled / uncontrolled
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  // Animated position for handle
  const slideAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isChecked ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isChecked, slideAnim]);

  const sizeConfig = useMemo(
    () => resolveSizeConfig(size, slim),
    [size, slim],
  );

  const colors = useMemo(() => {
    if (disabled) return getDisabledToggleColors(theme);
    return resolveToggleColors(isChecked, theme, checkedColor, uncheckedColor);
  }, [isChecked, disabled, themeColors, checkedColor, uncheckedColor]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, isControlled, onChange]);

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const trackStyle = useMemo<ViewStyle>(() => ({
    width: sizeConfig.trackWidth,
    height: sizeConfig.trackHeight,
    borderRadius: sizeConfig.trackHeight / 2,
    backgroundColor: colors.trackBg,
    justifyContent: 'center',
    paddingHorizontal: sizeConfig.padding,
    opacity: disabled ? 0.5 : 1,
  }), [sizeConfig, colors, disabled]);

  const handleSize = sizeConfig.handleSize;
  const travelDistance = sizeConfig.trackWidth - handleSize - sizeConfig.padding * 2;

  const animatedLeft = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, travelDistance],
  });

  const handleStyle = useMemo<ViewStyle>(() => ({
    width: handleSize,
    height: handleSize,
    borderRadius: handleSize / 2,
    backgroundColor: colors.handleBg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 2,
  }), [handleSize, colors]);

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      accessibilityLabel={label}
      style={[userStyle]}
      {...rest}
    >
      <View style={trackStyle}>
        <Animated.View
          style={[
            handleStyle,
            { transform: [{ translateX: animatedLeft }] },
          ]}
        >
          {HandleIconComponent && (
            <HandleIconComponent
              size={sizeConfig.handleIconSize}
              color={colors.handleIconColor}
              strokeWidth={2}
            />
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
});

Toggle.displayName = 'Toggle';
