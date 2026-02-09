import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import type { ChipSize, ChipColor, ChipVariant } from '@wisp-ui/core/types/Chip.types';
import { chipSizeMap } from '@wisp-ui/core/types/Chip.types';
import { resolveChipColors } from '@wisp-ui/core/styles/Chip.styles';
import { useThemeColors } from '../../providers';

export interface ChipProps {
  children: React.ReactNode;
  size?: ChipSize;
  color?: ChipColor;
  variant?: ChipVariant;
  removable?: boolean;
  onRemove?: () => void;
  clickable?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
}

export const Chip = forwardRef<View, ChipProps>(function Chip(
  {
    children,
    size = 'md',
    color = 'default',
    variant = 'filled',
    removable = false,
    onRemove,
    clickable = false,
    icon,
    disabled = false,
    onPress,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = chipSizeMap[size];

  const colors = useMemo(
    () => resolveChipColors(color, variant, themeColors),
    [color, variant, themeColors],
  );

  const handleRemove = useCallback(() => {
    if (!disabled && onRemove) onRemove();
  }, [disabled, onRemove]);

  const handlePress = useCallback(() => {
    if (!disabled && clickable && onPress) onPress();
  }, [disabled, clickable, onPress]);

  const containerStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: sizeConfig.gap,
      paddingHorizontal: sizeConfig.paddingX,
      paddingVertical: sizeConfig.paddingY,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.border,
      opacity: disabled ? 0.5 : 1,
    }),
    [sizeConfig, colors, disabled],
  );

  const content = (
    <>
      {icon && (
        <View style={{ width: sizeConfig.iconSize, height: sizeConfig.iconSize }}>
          {icon}
        </View>
      )}
      <RNText
        style={{
          fontSize: sizeConfig.fontSize,
          lineHeight: sizeConfig.fontSize * sizeConfig.lineHeight,
          fontWeight: '500',
          color: colors.text,
        }}
      >
        {children}
      </RNText>
      {removable && (
        <Pressable
          onPress={handleRemove}
          disabled={disabled}
          accessibilityLabel="Remove"
          style={{
            width: sizeConfig.removeButtonSize,
            height: sizeConfig.removeButtonSize,
            borderRadius: sizeConfig.borderRadius > 4 ? sizeConfig.borderRadius - 2 : 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ width: sizeConfig.removeIconSize, height: sizeConfig.removeIconSize }}>
            <View
              style={{
                position: 'absolute',
                width: sizeConfig.removeIconSize,
                height: 1.5,
                backgroundColor: colors.text,
                top: sizeConfig.removeIconSize / 2 - 0.75,
                transform: [{ rotate: '45deg' }],
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: sizeConfig.removeIconSize,
                height: 1.5,
                backgroundColor: colors.text,
                top: sizeConfig.removeIconSize / 2 - 0.75,
                transform: [{ rotate: '-45deg' }],
              }}
            />
          </View>
        </Pressable>
      )}
    </>
  );

  if (clickable) {
    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        style={[containerStyle, userStyle]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View ref={ref} style={[containerStyle, userStyle]}>
      {content}
    </View>
  );
});

Chip.displayName = 'Chip';
