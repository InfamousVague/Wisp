/**
 * @module primitives/input
 * @description React Native Input primitive for the Wisp design system.
 *
 * Reuses color resolution and size maps from `@coexist/wisp-core`.
 * Key differences from the React DOM version:
 *
 * - Uses `<TextInput>` instead of `<input>`.
 * - `onChangeText` instead of `onChange`.
 * - No `useId()` (no `htmlFor`/`aria-describedby` in RN).
 * - Focus ring via `borderColor` change (no `boxShadow`).
 * - Label and hint rendered as `<Text>` components.
 */

import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import type {
  TextInputProps,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TargetedEvent,
} from 'react-native';
import type { ComponentSize } from '@coexist/wisp-core/tokens/shared';
import { inputSizeMap } from '@coexist/wisp-core/types/Input.types';
import { resolveInputColors } from '@coexist/wisp-core/styles/Input.styles';
import { defaultSpacing, defaultTypography, defaultRadii } from '@coexist/wisp-core/theme/create-theme';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface InputProps extends Omit<TextInputProps, 'style'> {
  size?: ComponentSize;
  label?: string;
  hint?: string;
  error?: string | boolean;
  warning?: string | boolean;
  icon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  trailingIcon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    size = 'md',
    label,
    hint,
    error,
    warning,
    icon: LeadingIcon,
    trailingIcon: TrailingIcon,
    fullWidth = false,
    disabled = false,
    style: userStyle,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;
  const sizeConfig = inputSizeMap[size];

  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      if (!disabled) setFocused(true);
      onFocus?.(e as any);
    },
    [disabled, onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setFocused(false);
      onBlur?.(e as any);
    },
    [onBlur],
  );

  const hasError = Boolean(error);
  const hasWarning = Boolean(warning);
  const errorMessage = typeof error === 'string' ? error : undefined;
  const warningMessage = typeof warning === 'string' ? warning : undefined;

  const colors = useMemo(
    () => resolveInputColors(focused, hasError, hasWarning, disabled, theme),
    [focused, hasError, hasWarning, disabled, themeColors],
  );

  const wrapperStyle = useMemo<ViewStyle>(() => ({
    gap: defaultSpacing.xs,
    ...(fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' }),
  }), [fullWidth]);

  const containerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingX,
    borderRadius: typeof sizeConfig.borderRadius === 'number' ? sizeConfig.borderRadius : (defaultRadii as any)[sizeConfig.borderRadius] ?? defaultRadii.md,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    gap: defaultSpacing.sm,
    opacity: disabled ? 0.5 : 1,
  }), [sizeConfig, colors, disabled]);

  const inputStyle = useMemo<TextStyle>(() => ({
    flex: 1,
    fontSize: sizeConfig.fontSize,
    color: colors.text,
    padding: 0,
  }), [sizeConfig, colors]);

  const labelStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.labelFontSize,
    fontWeight: defaultTypography.weights.medium,
    color: colors.label,
    marginBottom: defaultSpacing['2xs'],
  }), [sizeConfig, colors]);

  const bottomText = errorMessage || warningMessage || hint;

  const hintStyle = useMemo<TextStyle | undefined>(() => {
    if (!bottomText) return undefined;
    const isStatus = Boolean(errorMessage || warningMessage);
    return {
      fontSize: sizeConfig.hintFontSize,
      color: isStatus ? colors.border : colors.hint,
      marginTop: defaultSpacing['2xs'],
    };
  }, [bottomText, sizeConfig, colors, errorMessage, warningMessage]);

  return (
    <View style={[wrapperStyle, userStyle]}>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View style={containerStyle}>
        {LeadingIcon && (
          <LeadingIcon
            size={sizeConfig.iconSize}
            color={colors.icon}
            strokeWidth={2}
          />
        )}

        <TextInput
          ref={ref}
          editable={!disabled}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          {...rest}
        />

        {TrailingIcon && (
          <TrailingIcon
            size={sizeConfig.iconSize}
            color={colors.icon}
            strokeWidth={2}
          />
        )}
      </View>

      {bottomText && <Text style={hintStyle}>{bottomText}</Text>}
    </View>
  );
});

Input.displayName = 'Input';
