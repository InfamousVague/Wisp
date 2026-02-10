import React, { forwardRef, useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { View, Pressable, Animated, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import type { SegmentedControlOption } from '@wisp-ui/core/types/SegmentedControl.types';
import { useThemeColors } from '../../providers';
import { defaultSpacing } from '@wisp-ui/core/theme/create-theme';

const sizeMap = {
  sm: { height: 28, fontSize: 12, paddingX: 10 },
  md: { height: 34, fontSize: 14, paddingX: 14 },
  lg: { height: 40, fontSize: 15, paddingX: 18 },
} as const;

type SegmentedControlSize = keyof typeof sizeMap;

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SegmentedControlSize;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const SegmentedControl = forwardRef<View, SegmentedControlProps>(function SegmentedControl(
  {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    size = 'md',
    fullWidth = false,
    disabled = false,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();
  const cfg = sizeMap[size];
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value);
  const activeValue = isControlled ? controlledValue : internalValue;

  const activeIndex = options.findIndex((o) => o.value === activeValue);
  const [containerWidth, setContainerWidth] = useState(0);
  const segmentWidth = options.length > 0 ? containerWidth / options.length : 0;

  const indicatorX = useRef(new Animated.Value(0)).current;
  const hasMounted = useRef(false);

  useEffect(() => {
    if (containerWidth === 0) return;
    const target = activeIndex * segmentWidth;
    if (!hasMounted.current) {
      hasMounted.current = true;
      indicatorX.setValue(target);
      return;
    }
    Animated.timing(indicatorX, {
      toValue: target,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, segmentWidth, containerWidth]);

  const handlePress = useCallback(
    (v: string) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [disabled, isControlled, onChange],
  );

  const handleContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  }, []);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: 'row',
      height: cfg.height,
      borderRadius: cfg.height / 2,
      backgroundColor: themeColors.background.surface,
      padding: defaultSpacing['2xs'],
      alignSelf: fullWidth ? 'stretch' : 'flex-start',
      position: 'relative',
      overflow: 'hidden',
    }),
    [cfg, themeColors, fullWidth],
  );

  return (
    <View
      ref={ref}
      onLayout={handleContainerLayout}
      style={[containerStyle, userStyle]}
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 2,
            bottom: 2,
            left: indicatorX,
            width: segmentWidth,
            borderRadius: (cfg.height - 4) / 2,
            backgroundColor: themeColors.accent.highlight,
          }}
        />
      )}
      {options.map((option) => {
        const isActive = activeValue === option.value;
        const isOptionDisabled = disabled || !!option.disabled;

        const segStyle: ViewStyle = {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: defaultSpacing.sm,
          paddingHorizontal: cfg.paddingX,
          opacity: isOptionDisabled ? 0.4 : 1,
          zIndex: 1,
        };

        const labelStyle: TextStyle = {
          fontSize: cfg.fontSize,
          fontWeight: isActive ? '600' : '400',
          color: isActive ? themeColors.text.primary : themeColors.text.secondary,
        };

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: isActive, disabled: isOptionDisabled }}
            disabled={isOptionDisabled}
            onPress={() => handlePress(option.value)}
            style={segStyle}
          >
            {option.icon}
            <RNText style={labelStyle}>
              {typeof option.label === 'string' ? option.label : option.label}
            </RNText>
          </Pressable>
        );
      })}
    </View>
  );
});

SegmentedControl.displayName = 'SegmentedControl';
