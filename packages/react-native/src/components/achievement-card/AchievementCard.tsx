/**
 * @module components/achievement-card
 * @description React Native AchievementCard for the Wisp design system.
 *
 * Card showing achievement with locked/in-progress/unlocked states and rarity tier.
 */

import React, { forwardRef, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import type { AchievementStatus, AchievementRarity } from '@wisp-ui/core/types/AchievementCard.types';
import { achievementRarityMap } from '@wisp-ui/core/types/AchievementCard.types';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AchievementCardProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  status?: AchievementStatus;
  progress?: number;
  rarity?: AchievementRarity;
  unlockedAt?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AchievementCard = forwardRef<View, AchievementCardProps>(
  function AchievementCard(
    {
      title,
      description,
      icon: IconComponent,
      status = 'locked',
      progress = 0,
      rarity = 'common',
      unlockedAt,
      onPress,
      style: userStyle,
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const rarityConfig = achievementRarityMap[rarity];
    const isLocked = status === 'locked';
    const isUnlocked = status === 'unlocked';

    const containerStyle = useMemo<ViewStyle>(() => ({
      padding: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isUnlocked ? rarityConfig.color + '40' : themeColors.border.subtle,
      backgroundColor: themeColors.background.surface,
      opacity: isLocked ? 0.6 : 1,
      width: '100%',
    }), [isLocked, isUnlocked, rarityConfig, themeColors]);

    const headerStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    }), []);

    const iconContainerStyle = useMemo<ViewStyle>(() => ({
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isUnlocked ? rarityConfig.color + '20' : themeColors.border.subtle,
    }), [isUnlocked, rarityConfig, themeColors]);

    const titleStyle = useMemo<TextStyle>(() => ({
      fontSize: 15,
      fontWeight: '600',
      color: themeColors.text.primary,
    }), [themeColors]);

    const descStyle = useMemo<TextStyle>(() => ({
      fontSize: 13,
      color: themeColors.text.muted,
      marginTop: 2,
    }), [themeColors]);

    const rarityStyle = useMemo<TextStyle>(() => ({
      fontSize: 11,
      fontWeight: '600',
      color: rarityConfig.color,
      marginTop: 4,
    }), [rarityConfig]);

    const progressBarBg = useMemo<ViewStyle>(() => ({
      height: 4,
      borderRadius: 2,
      backgroundColor: themeColors.border.subtle,
      marginTop: 12,
      overflow: 'hidden',
    }), [themeColors]);

    const progressBarFill = useMemo<ViewStyle>(() => ({
      height: 4,
      borderRadius: 2,
      backgroundColor: rarityConfig.color,
      width: `${Math.min(100, Math.max(0, progress))}%`,
    }), [progress, rarityConfig]);

    const unlockedAtStyle = useMemo<TextStyle>(() => ({
      fontSize: 11,
      color: themeColors.text.muted,
      marginTop: 8,
    }), [themeColors]);

    const iconColor = isUnlocked ? rarityConfig.color : themeColors.text.muted;

    const content = (
      <>
        <View style={headerStyle}>
          <View style={iconContainerStyle}>
            {IconComponent ? (
              <IconComponent size={24} color={iconColor} strokeWidth={2} />
            ) : (
              <Text style={{ fontSize: 20 }}>{isLocked ? '\u{1F512}' : '\u{1F3C6}'}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={titleStyle}>{title}</Text>
            {description && <Text style={descStyle}>{description}</Text>}
            <Text style={rarityStyle}>{rarityConfig.label}</Text>
          </View>
        </View>

        {status === 'in-progress' && (
          <View style={progressBarBg}>
            <View style={progressBarFill} />
          </View>
        )}

        {isUnlocked && unlockedAt && (
          <Text style={unlockedAtStyle}>Unlocked {unlockedAt}</Text>
        )}
      </>
    );

    if (onPress) {
      return (
        <Pressable ref={ref as any} onPress={onPress} style={[containerStyle, userStyle]}>
          {content}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[containerStyle, userStyle]}>
        {content}
      </View>
    );
  },
);

AchievementCard.displayName = 'AchievementCard';
