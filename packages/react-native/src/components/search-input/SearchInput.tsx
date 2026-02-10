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
import type { ComponentSize } from '@wisp-ui/core/tokens/shared';
import { searchInputSizeMap } from '@wisp-ui/core/styles/SearchInput.styles';
import { useTheme } from '../../providers';

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
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();
    const themeColors = theme.colors;
    const sizeConfig = searchInputSizeMap[size];

    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const [focused, setFocused] = useState(false);
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

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

    const containerStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizeConfig.paddingX > 10 ? 8 : 6,
      height: sizeConfig.height,
      paddingHorizontal: sizeConfig.paddingX - 2,
      borderRadius: sizeConfig.borderRadius,
      borderWidth: 1,
      borderColor: focused ? themeColors.accent.primary : themeColors.border.strong,
      opacity: disabled ? 0.5 : 1,
      ...(fullWidth ? { width: '100%' as any } : {}),
    }), [sizeConfig, focused, disabled, fullWidth, themeColors]);

    const inputStyle = useMemo<TextStyle>(() => ({
      flex: 1,
      minWidth: 0,
      fontSize: sizeConfig.fontSize,
      color: themeColors.text.primary,
      padding: 0,
    }), [sizeConfig, themeColors]);

    const iconStyle = useMemo<TextStyle>(() => ({
      fontSize: sizeConfig.iconSize,
      color: themeColors.text.muted,
    }), [sizeConfig, themeColors]);

    const clearStyle = useMemo<TextStyle>(() => ({
      fontSize: sizeConfig.iconSize - 2,
      color: themeColors.text.muted,
    }), [sizeConfig, themeColors]);

    const hasValue = value.length > 0;

    return (
      <View ref={ref} style={[containerStyle, userStyle]} {...rest}>
        <Text style={iconStyle}>{'\u{1F50D}'}</Text>

        <TextInput
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={themeColors.text.muted}
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
            color={themeColors.text.muted}
          />
        )}

        {hasValue && !loading && (
          <Pressable onPress={handleClear} accessibilityLabel="Clear search">
            <Text style={clearStyle}>{'\u{2715}'}</Text>
          </Pressable>
        )}
      </View>
    );
  },
);

SearchInput.displayName = 'SearchInput';
