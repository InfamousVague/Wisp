import React, { forwardRef, useMemo } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { useThemeColors } from '../../providers';

const sizeMap = {
  sm: { dotSize: 24, lineThickness: 2, labelFontSize: 12, descFontSize: 11, iconSize: 14, gap: 8 },
  md: { dotSize: 32, lineThickness: 2, labelFontSize: 14, descFontSize: 12, iconSize: 16, gap: 10 },
  lg: { dotSize: 40, lineThickness: 2, labelFontSize: 15, descFontSize: 13, iconSize: 20, gap: 12 },
} as const;

type ProgressStepsSize = keyof typeof sizeMap;
type StepStatus = 'completed' | 'active' | 'upcoming';

export interface ProgressStep {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
}

export interface ProgressStepsProps {
  steps: ProgressStep[];
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: ProgressStepsSize;
  onStepClick?: (index: number) => void;
  style?: ViewStyle;
}

export const ProgressSteps = forwardRef<View, ProgressStepsProps>(function ProgressSteps(
  {
    steps,
    currentStep = 0,
    orientation = 'horizontal',
    size = 'md',
    onStepClick,
    style: userStyle,
  },
  ref,
) {
  const themeColors = useThemeColors();
  const cfg = sizeMap[size];
  const isHorizontal = orientation === 'horizontal';

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: isHorizontal ? 'flex-start' : 'stretch',
    }),
    [isHorizontal],
  );

  return (
    <View ref={ref} style={[containerStyle, userStyle]}>
      {steps.map((step, i) => {
        const status: StepStatus = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'upcoming';
        const isLast = i === steps.length - 1;
        const Icon = step.icon;
        const isClickable = status === 'completed' && !!onStepClick;

        const dotColor = status === 'completed' || status === 'active'
          ? themeColors.accent.primary
          : themeColors.border.subtle;

        const dotStyle: ViewStyle = {
          width: cfg.dotSize,
          height: cfg.dotSize,
          borderRadius: cfg.dotSize / 2,
          backgroundColor: status === 'upcoming' ? 'transparent' : dotColor,
          borderWidth: status === 'upcoming' ? 2 : 0,
          borderColor: dotColor,
          alignItems: 'center',
          justifyContent: 'center',
        };

        const dotContent = status === 'completed'
          ? (Icon ? (
              <Icon size={cfg.iconSize} color="#fff" strokeWidth={2} />
            ) : (
              <Svg width={cfg.iconSize} height={cfg.iconSize} viewBox="0 0 24 24" fill="none">
                <Polyline points="20 6 9 17 4 12" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            ))
          : Icon ? (
              <Icon size={cfg.iconSize} color={status === 'active' ? '#fff' : themeColors.text.muted} strokeWidth={2} />
            ) : (
              <RNText style={{ fontSize: cfg.labelFontSize, fontWeight: '600', color: status === 'active' ? '#fff' : themeColors.text.muted } as TextStyle}>
                {i + 1}
              </RNText>
            );

        const lineColor = status === 'completed' ? themeColors.accent.primary : themeColors.border.subtle;

        if (isHorizontal) {
          return (
            <View key={step.id} style={{ flex: 1, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {i > 0 && (
                  <View style={{ flex: 1, height: cfg.lineThickness, backgroundColor: (i <= currentStep ? themeColors.accent.primary : themeColors.border.subtle) }} />
                )}
                <Pressable
                  onPress={isClickable ? () => onStepClick(i) : undefined}
                  disabled={!isClickable}
                  style={dotStyle}
                >
                  {dotContent}
                </Pressable>
                {!isLast && (
                  <View style={{ flex: 1, height: cfg.lineThickness, backgroundColor: lineColor }} />
                )}
              </View>
              <View style={{ alignItems: 'center', marginTop: cfg.gap }}>
                <RNText style={{ fontSize: cfg.labelFontSize, fontWeight: status === 'active' ? '600' : '400', color: status === 'upcoming' ? themeColors.text.muted : themeColors.text.primary, textAlign: 'center' } as TextStyle}>
                  {step.label}
                </RNText>
                {step.description && (
                  <RNText style={{ fontSize: cfg.descFontSize, color: themeColors.text.secondary, textAlign: 'center', marginTop: 2 } as TextStyle}>
                    {step.description}
                  </RNText>
                )}
              </View>
            </View>
          );
        }

        return (
          <View key={step.id} style={{ flexDirection: 'row', gap: cfg.gap }}>
            <View style={{ alignItems: 'center' }}>
              <Pressable
                onPress={isClickable ? () => onStepClick(i) : undefined}
                disabled={!isClickable}
                style={dotStyle}
              >
                {dotContent}
              </Pressable>
              {!isLast && (
                <View style={{ flex: 1, width: cfg.lineThickness, backgroundColor: lineColor, marginVertical: 4 }} />
              )}
            </View>
            <View style={{ flex: 1, paddingBottom: isLast ? 0 : cfg.gap }}>
              <RNText style={{ fontSize: cfg.labelFontSize, fontWeight: status === 'active' ? '600' : '400', color: status === 'upcoming' ? themeColors.text.muted : themeColors.text.primary } as TextStyle}>
                {step.label}
              </RNText>
              {step.description && (
                <RNText style={{ fontSize: cfg.descFontSize, color: themeColors.text.secondary, marginTop: 2 } as TextStyle}>
                  {step.description}
                </RNText>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
});

ProgressSteps.displayName = 'ProgressSteps';
