/**
 * @module components/search-input
 * @description React Native SearchInput for the Wisp design system.
 *
 * A TextInput pre-configured with a search icon, clear button,
 * loading spinner, and optional debounced search callback.
 */

import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TextInput, Pressable, Text, ActivityIndicator } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { ComponentSize } from '@coexist/wisp-core/tokens/shared';
import { searchInputSizeMap } from '@coexist/wisp-core/styles/SearchInput.styles';
import { useTheme } from '../../providers';
import Svg, { Circle, Line, Path } from 'react-native-svg';

function SearchIcon({ size = 16, color = '#888' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={11} cy={11} r={8} />
      <Line x1={21} y1={21} x2={16.65} y2={16.65} />
    </Svg>
  );
}

function ClearIcon({ size = 14, color = '#888' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SearchInputProps extends ViewProps {
  /** Input size token. @default 'md' */
  size?: ComponentSize;
  /** Current value (controlled). */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Placeholder text. @default 'Search...' */
  placeholder?: string;
  /** Callback fired on submit or after debounce. */
  onSearch?: (value: string) => void;
  /** Callback fired when the value changes. */
  onValueChange?: (value: string) => void;
  /** Callback fired when the clear button is pressed. */
  onClear?: () => void;
  /** When true, shows a spinner. @default false */
  loading?: boolean;
  /** Debounce delay in milliseconds. @default 0 */
  debounceMs?: number;
  /** When true, the input stretches to fill its container. @default false */
  fullWidth?: boolean;
  /** Whether the input is disabled. @default false */
  disabled?: boolean;
  /** Pill-shaped border radius. @default false */
  rounded?: boolean;
  /** When true, uses surface-aware colors for dark backgrounds. @default false */
  onSurface?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const SearchInput = forwardRef<View, SearchInputProps>(
  function SearchInput(
    {
      size = 'md',
      value: controlledValue,
      defaultValue = '',
      placeholder = 'Search...',
      onSearch,
      onValueChange,
      onClear,
      loading = false,
      debounceMs = 0,
      fullWidth = false,
      disabled = false,
      rounded = false,
      onSurface = false,
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();
    const themeColors = theme.colors;
    const textColor = onSurface ? themeColors.text.onRaised : themeColors.text.primary;
    const mutedColor = onSurface ? themeColors.text.onRaisedSecondary : themeColors.text.muted;
    const sizeConfig = searchInputSizeMap[size];

    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const [focused, setFocused] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Debounce logic
    useEffect(() => {
      if (debounceMs > 0 && value.trim()) {
        debounceTimer.current = setTimeout(() => {
          onSearch?.(value);
        }, debounceMs);
        return () => clearTimeout(debounceTimer.current);
      }
    }, [value, debounceMs, onSearch]);

    const handleChangeText = useCallback(
      (text: string) => {
        if (controlledValue === undefined) setInternalValue(text);
        onValueChange?.(text);
      },
      [controlledValue, onValueChange],
    );

    const handleClear = useCallback(() => {
      if (controlledValue === undefined) setInternalValue('');
      onClear?.();
      onValueChange?.('');
    }, [controlledValue, onClear, onValueChange]);

    const handleSubmit = useCallback(() => {
      onSearch?.(value);
    }, [onSearch, value]);

    const resolvedRadius = rounded
      ? sizeConfig.height / 2
      : (theme.radii[sizeConfig.borderRadius as keyof typeof theme.radii] ?? 8);

    const containerStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizeConfig.paddingX > 10 ? 8 : 6,
      height: sizeConfig.height,
      paddingHorizontal: rounded ? sizeConfig.paddingX + 4 : sizeConfig.paddingX - 2,
      borderRadius: resolvedRadius,
      borderWidth: 1,
      borderColor: focused ? themeColors.accent.primary : themeColors.border.strong,
      opacity: disabled ? 0.5 : 1,
      ...(fullWidth ? { width: '100%' as any } : {}),
    }), [sizeConfig, focused, disabled, fullWidth, rounded, themeColors, resolvedRadius]);

    const inputStyle = useMemo<TextStyle>(() => ({
      flex: 1,
      minWidth: 0,
      fontSize: sizeConfig.fontSize,
      color: textColor,
      padding: 0,
      outlineStyle: 'none' as any,
    }), [sizeConfig, textColor]);

    const iconStyle = useMemo<TextStyle>(() => ({
      fontSize: sizeConfig.iconSize,
      color: mutedColor,
    }), [sizeConfig, mutedColor]);

    const clearStyle = useMemo<TextStyle>(() => ({
      fontSize: sizeConfig.iconSize - 2,
      color: mutedColor,
    }), [sizeConfig, mutedColor]);

    const hasValue = value.length > 0;

    return (
      <View ref={ref} style={[containerStyle, userStyle]} {...rest}>
        <SearchIcon size={sizeConfig.iconSize} color={mutedColor} />

        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={mutedColor}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          style={inputStyle}
          accessibilityLabel="Search"
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color={mutedColor}
          />
        )}

        {hasValue && !loading && (
          <Pressable onPress={handleClear} accessibilityLabel="Clear search">
            <ClearIcon size={sizeConfig.iconSize - 2} color={mutedColor} />
          </Pressable>
        )}
      </View>
    );
  },
);

SearchInput.displayName = 'SearchInput';
