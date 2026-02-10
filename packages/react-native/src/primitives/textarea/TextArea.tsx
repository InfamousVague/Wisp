/**
 * @module primitives/textarea
 * @description React Native TextArea primitive for the Wisp design system.
 *
 * Reuses color resolution and size maps from `@wisp-ui/core`.
 * Key differences from the React DOM version:
 *
 * - Uses `<TextInput multiline>` instead of `<textarea>`.
 * - `onChangeText` instead of `onChange`.
 * - No `useId()` (no `htmlFor`/`aria-describedby` in RN).
 * - Focus ring via `borderColor` change (no `boxShadow`).
 * - No `resize` prop (RN TextInputs don't have resize handles).
 * - No `className` or `skeleton` props.
 * - Label and hint rendered as `<Text>` components.
 */

import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { View, TextInput } from 'react-native';
import type {
  TextInputProps,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import type { ComponentSize } from '@wisp-ui/core/tokens/shared';
import { textAreaSizeMap } from '@wisp-ui/core/types/TextArea.types';
import { resolveTextAreaColors } from '@wisp-ui/core/styles/TextArea.styles';
import { Text } from '../text';
import { defaultSpacing, defaultTypography } from '@wisp-ui/core/theme/create-theme';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  size?: ComponentSize;
  label?: string;
  hint?: string;
  error?: string | boolean;
  warning?: string | boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * TextArea -- Multi-line text input primitive for the Wisp design system (React Native).
 *
 * @remarks
 * Monochrome bordered multi-line input with optional label, hint/error text.
 * Key features:
 *
 * - Five sizes via the `ComponentSize` scale (`xs` | `sm` | `md` | `lg` | `xl`).
 * - Error and warning states with optional message text below the textarea.
 * - Disabled state with muted colors.
 * - Full-width layout mode stretching to 100% of the container.
 * - Forwards a ref to the underlying `<TextInput>` element.
 *
 * @example
 * ```tsx
 * // Basic
 * <TextArea placeholder="Enter text..." />
 *
 * // With label and hint
 * <TextArea label="Description" hint="Max 500 characters." />
 *
 * // Error state
 * <TextArea label="Bio" error="Bio is required." />
 *
 * // Full width
 * <TextArea fullWidth placeholder="Full width textarea" />
 * ```
 */
export const TextArea = forwardRef<TextInput, TextAreaProps>(function TextArea(
  {
    size = 'md',
    label,
    hint,
    error,
    warning,
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
  const sizeConfig = textAreaSizeMap[size];

  // ---------------------------------------------------------------------------
  // Focus state
  // ---------------------------------------------------------------------------
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!disabled) setFocused(true);
      onFocus?.(e);
    },
    [disabled, onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  // ---------------------------------------------------------------------------
  // State resolution
  // ---------------------------------------------------------------------------
  const hasError = Boolean(error);
  const hasWarning = Boolean(warning);
  const errorMessage = typeof error === 'string' ? error : undefined;
  const warningMessage = typeof warning === 'string' ? warning : undefined;

  const colors = useMemo(
    () => resolveTextAreaColors(focused, hasError, hasWarning, disabled, theme),
    [focused, hasError, hasWarning, disabled, themeColors],
  );

  // ---------------------------------------------------------------------------
  // Styles
  // ---------------------------------------------------------------------------

  const wrapperStyle = useMemo<ViewStyle>(() => ({
    gap: sizeConfig.paddingY > 6 ? 6 : 4,
    ...(fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' }),
  }), [sizeConfig, fullWidth]);

  const containerStyle = useMemo<ViewStyle>(() => ({
    minHeight: sizeConfig.minHeight,
    paddingHorizontal: sizeConfig.paddingX,
    paddingVertical: sizeConfig.paddingY,
    borderRadius: sizeConfig.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    opacity: disabled ? 0.5 : 1,
  }), [sizeConfig, colors, disabled]);

  const inputStyle = useMemo<TextStyle>(() => ({
    flex: 1,
    fontSize: sizeConfig.fontSize,
    lineHeight: sizeConfig.fontSize * sizeConfig.lineHeight,
    color: colors.text,
    padding: 0,
    textAlignVertical: 'top',
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

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <View style={[wrapperStyle, userStyle]}>
      {label && <Text style={labelStyle}>{label}</Text>}

      <View style={containerStyle}>
        <TextInput
          ref={ref}
          multiline
          editable={!disabled}
          placeholderTextColor={colors.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          {...rest}
        />
      </View>

      {bottomText && <Text style={hintStyle}>{bottomText}</Text>}
    </View>
  );
});

TextArea.displayName = 'TextArea';
