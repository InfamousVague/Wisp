/**
 * @module primitives/progress
 * @description React Native Progress primitive for the Wisp design system.
 *
 * Reuses color resolution, size maps, and thickness tokens from `@wisp-ui/core`.
 * Key differences from the React DOM version:
 *
 * - Track and fill rendered as `<View>` instead of `<div>`.
 * - Determinate fill uses percentage-based width via `flex` layout.
 * - Indeterminate mode uses `Animated.loop(Animated.timing(...))` with
 *   `translateX` instead of CSS `@keyframes`.
 * - Label and value text rendered via the `<Text>` primitive.
 * - No `className`, CSS transitions, or `<style>` injection.
 * - Skeleton state omitted (RN apps typically use a dedicated Skeleton).
 */

import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import { View, Animated } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { ComponentSize, Thickness } from '@wisp-ui/core/tokens/shared';
import { thicknessValues } from '@wisp-ui/core/tokens/shared';
import { progressSizeMap } from '@wisp-ui/core/types/Progress.types';
import { resolveProgressColors } from '@wisp-ui/core/styles/Progress.styles';
import type { ProgressColors } from '@wisp-ui/core/styles/Progress.styles';
import { useThemeColors } from '../../providers';
import { Text } from '../text';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ProgressProps extends Omit<ViewProps, 'children'> {
  /**
   * Current progress value (clamped between `0` and `max`).
   *
   * @default 0
   */
  value?: number;

  /**
   * Maximum value that represents 100% completion.
   *
   * @default 100
   */
  max?: number;

  /**
   * Progress bar size.
   *
   * @default 'md'
   */
  size?: ComponentSize;

  /** Label text rendered above the bar on the left side. */
  label?: string;

  /**
   * Whether to display the formatted percentage value above the bar.
   *
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom value formatter used when `showValue` is `true`.
   *
   * @param value - The clamped current value.
   * @param max - The maximum value.
   * @returns A formatted string to display (e.g. `"75%"`).
   */
  formatValue?: (value: number, max: number) => string;

  /**
   * Semantic color variant for the filled portion of the bar.
   *
   * @default 'default'
   */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';

  /**
   * When `true`, renders a continuously sliding animation instead of a
   * fixed-width fill. Useful when the total duration is unknown.
   *
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Override the bar thickness (height) using the shared `Thickness`
   * token. When provided this takes precedence over the size-based default.
   */
  thickness?: Thickness;

  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Progress = forwardRef<View, ProgressProps>(function Progress(
  {
    value = 0,
    max = 100,
    size = 'md',
    label,
    showValue = false,
    formatValue,
    color = 'default',
    thickness,
    indeterminate = false,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const baseSizeConfig = progressSizeMap[size];

  // Apply thickness override if provided
  const sizeConfig = useMemo(() => {
    if (!thickness) return baseSizeConfig;
    const h = thicknessValues[thickness];
    return { ...baseSizeConfig, height: h, borderRadius: Math.round(h / 2) };
  }, [baseSizeConfig, thickness]);

  // ---------------------------------------------------------------------------
  // Clamp value and compute percentage
  // ---------------------------------------------------------------------------
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percent = max > 0 ? (clampedValue / max) * 100 : 0;

  // ---------------------------------------------------------------------------
  // Default value formatter
  // ---------------------------------------------------------------------------
  const defaultFormatValue = (v: number, m: number): string =>
    `${Math.round((v / m) * 100)}%`;

  const displayValue = useMemo(() => {
    const formatter = formatValue || defaultFormatValue;
    return formatter(clampedValue, max);
  }, [clampedValue, max, formatValue]);

  // ---------------------------------------------------------------------------
  // Colors
  // ---------------------------------------------------------------------------
  const colors = useMemo(
    () => resolveProgressColors(color, themeColors),
    [color, themeColors],
  );

  // ---------------------------------------------------------------------------
  // Indeterminate animation
  // ---------------------------------------------------------------------------
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!indeterminate) return;
    const loop = Animated.loop(
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [indeterminate, slideAnim]);

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const labelRowStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  }), []);

  const labelTextStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.labelFontSize,
    lineHeight: Math.round(sizeConfig.labelFontSize * 1.4),
    fontWeight: '500',
    color: colors.label,
  }), [sizeConfig, colors]);

  const valueTextStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.valueFontSize,
    lineHeight: Math.round(sizeConfig.valueFontSize * 1.4),
    fontWeight: '500',
    color: colors.value,
  }), [sizeConfig, colors]);

  const trackStyle = useMemo<ViewStyle>(() => ({
    width: '100%',
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.track,
    overflow: 'hidden',
  }), [sizeConfig, colors]);

  const determinateFillStyle = useMemo<ViewStyle>(() => ({
    height: '100%',
    width: `${percent}%`,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.fill,
  }), [sizeConfig, colors, percent]);

  const indeterminateFillStyle = useMemo<ViewStyle>(() => ({
    height: '100%',
    width: '40%',
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.fill,
  }), [sizeConfig, colors]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View
      ref={ref}
      accessibilityRole="progressbar"
      accessibilityState={indeterminate ? { busy: true } : undefined}
      accessibilityValue={
        indeterminate
          ? undefined
          : { min: 0, max, now: clampedValue }
      }
      style={[{ width: '100%' }, userStyle]}
      {...rest}
    >
      {/* Label row */}
      {(label || showValue) && (
        <View style={labelRowStyle}>
          {label && <Text style={labelTextStyle}>{label}</Text>}
          {showValue && !indeterminate && (
            <Text style={valueTextStyle}>{displayValue}</Text>
          )}
        </View>
      )}

      {/* Track */}
      <View style={trackStyle}>
        {/* Fill */}
        {indeterminate ? (
          <Animated.View
            style={[
              indeterminateFillStyle,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 350],
                    }),
                  },
                ],
              },
            ]}
          />
        ) : (
          <View style={determinateFillStyle} />
        )}
      </View>
    </View>
  );
});

Progress.displayName = 'Progress';
