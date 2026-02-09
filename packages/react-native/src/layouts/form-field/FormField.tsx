import React, { forwardRef, useMemo } from 'react';
import { View, Text as RNText } from 'react-native';
import type { FormFieldSize } from '@wisp-ui/core/types/FormField.types';
import { formFieldSizeMap } from '@wisp-ui/core/types/FormField.types';
import { useThemeColors } from '../../providers';

export type FormFieldOrientation = 'vertical' | 'horizontal';

export interface FormFieldProps {
  /** The form control element (Input, Select, TextArea, etc.) */
  children: React.ReactNode;
  /** Label text displayed above or beside the control. */
  label?: string;
  /** Helper text displayed below the control. */
  description?: string;
  /** Error message — replaces description when present. */
  error?: string;
  /** Show a required indicator (*) next to the label. @default false */
  required?: boolean;
  /** Disable the field visually. @default false */
  disabled?: boolean;
  /** Size variant affecting label/hint text sizes. @default 'md' */
  size?: FormFieldSize;
  /** Label placement. @default 'vertical' */
  orientation?: FormFieldOrientation;
  /** Width of the label column in horizontal orientation. @default 120 */
  labelWidth?: number;
  /** Adapt colors for dark / raised surfaces. @default false */
  onSurface?: boolean;
  /** Stretch to full width. @default true */
  fullWidth?: boolean;
  style?: object;
}

export const FormField = forwardRef<View, FormFieldProps>(function FormField(
  {
    children,
    label,
    description,
    error,
    required = false,
    disabled = false,
    size = 'md',
    orientation = 'vertical',
    labelWidth = 120,
    onSurface = false,
    fullWidth = true,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = formFieldSizeMap[size];
  const isHorizontal = orientation === 'horizontal';
  const hintText = error || description;

  const labelColor = useMemo(
    () =>
      disabled
        ? themeColors.text.muted
        : onSurface
          ? themeColors.text.onRaised
          : themeColors.text.primary,
    [disabled, onSurface, themeColors],
  );

  const hintColor = useMemo(
    () =>
      error
        ? themeColors.status.danger
        : onSurface
          ? themeColors.text.onRaisedSecondary
          : themeColors.text.muted,
    [error, onSurface, themeColors],
  );

  return (
    <View
      ref={ref}
      style={[
        {
          flexDirection: isHorizontal ? 'row' : 'column',
          alignItems: isHorizontal ? 'flex-start' : undefined,
          gap: sizeConfig.gap,
          width: fullWidth ? '100%' : undefined,
        },
        userStyle,
      ]}
    >
      {label && (
        <View
          style={[
            isHorizontal ? { width: labelWidth, flexShrink: 0, paddingTop: 8 } : undefined,
          ]}
        >
          <RNText
            style={{
              fontSize: sizeConfig.labelFontSize,
              fontWeight: '600',
              color: labelColor,
            }}
          >
            {label}
            {required && (
              <RNText style={{ color: themeColors.status.danger, fontWeight: '400' }}>
                {' *'}
              </RNText>
            )}
          </RNText>
        </View>
      )}

      {isHorizontal ? (
        <View style={{ flex: 1, gap: 4 }}>
          {children}
          {hintText && (
            <RNText
              style={{
                fontSize: sizeConfig.hintFontSize,
                color: hintColor,
              }}
            >
              {hintText}
            </RNText>
          )}
        </View>
      ) : (
        <>
          {children}
          {hintText && (
            <RNText
              style={{
                fontSize: sizeConfig.hintFontSize,
                color: hintColor,
              }}
            >
              {hintText}
            </RNText>
          )}
        </>
      )}
    </View>
  );
});

FormField.displayName = 'FormField';
