import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { SwitchGroupOption, SwitchGroupOrientation } from '@wisp-ui/core/types/SwitchGroup.types';
import { useThemeColors } from '../../providers';
import { Toggle } from '../../primitives/toggle';

export interface SwitchGroupProps {
  label?: string;
  description?: string;
  options: SwitchGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  orientation?: SwitchGroupOrientation;
  disabled?: boolean;
  error?: string;
  style?: ViewStyle;
}

export const SwitchGroup = forwardRef<View, SwitchGroupProps>(function SwitchGroup(
  {
    label,
    description,
    options,
    value: controlledValue,
    defaultValue = [],
    onChange,
    orientation = 'vertical',
    disabled = false,
    error,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;

  const handleToggle = useCallback(
    (optionValue: string, checked: boolean) => {
      const next = checked
        ? [...selected, optionValue]
        : selected.filter((v) => v !== optionValue);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [selected, isControlled, onChange],
  );

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      gap: 12,
    }),
    [],
  );

  const optionsStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      gap: orientation === 'horizontal' ? 16 : 8,
      flexWrap: orientation === 'horizontal' ? 'wrap' : undefined,
    }),
    [orientation],
  );

  const labelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.text.primary,
    }),
    [themeColors],
  );

  const descriptionStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 13,
      color: themeColors.text.secondary,
      marginTop: 2,
    }),
    [themeColors],
  );

  const optionLabelStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.text.primary,
    }),
    [themeColors],
  );

  const optionDescStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 12,
      color: themeColors.text.secondary,
      marginTop: 2,
    }),
    [themeColors],
  );

  const errorStyle = useMemo<TextStyle>(
    () => ({
      fontSize: 12,
      color: themeColors.status.danger,
      marginTop: 4,
    }),
    [themeColors],
  );

  return (
    <View ref={ref} accessibilityRole="none" style={[containerStyle, userStyle]}>
      {(label || description) && (
        <View>
          {label && <Text style={labelStyle}>{label}</Text>}
          {description && <Text style={descriptionStyle}>{description}</Text>}
        </View>
      )}

      <View style={optionsStyle}>
        {options.map((option) => {
          const isOptionDisabled = disabled || !!option.disabled;
          const isChecked = selected.includes(option.value);

          return (
            <Pressable
              key={option.value}
              onPress={() => {
                if (!isOptionDisabled) handleToggle(option.value, !isChecked);
              }}
              disabled={isOptionDisabled}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                opacity: isOptionDisabled ? 0.4 : 1,
              }}
            >
              <Toggle
                checked={isChecked}
                onChange={(checked) => handleToggle(option.value, checked)}
                disabled={isOptionDisabled}
                size="sm"
              />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={optionLabelStyle}>{option.label}</Text>
                {option.description && (
                  <Text style={optionDescStyle}>{option.description}</Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
});

SwitchGroup.displayName = 'SwitchGroup';
