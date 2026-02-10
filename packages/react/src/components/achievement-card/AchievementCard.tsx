/**
 * AchievementCard — Card showing achievement with locked/in-progress/unlocked states.
 *
 * @module components/achievement-card
 * @example
 * ```tsx
 * <AchievementCard
 *   title="First Steps"
 *   description="Complete your first task"
 *   status="unlocked"
 *   rarity="rare"
 *   unlockedAt="Jan 15, 2025"
 * />
 * ```
 */

import React, { useMemo } from 'react';
import type { AchievementCardProps } from '@wisp-ui/core/types/AchievementCard.types';
import { achievementRarityMap } from '@wisp-ui/core/types/AchievementCard.types';
import {
  resolveAchievementColors,
  buildAchievementCardStyle,
  buildAchievementIconStyle,
  buildAchievementContentStyle,
  buildAchievementTitleStyle,
  buildAchievementDescriptionStyle,
  buildAchievementProgressTrackStyle,
  buildAchievementProgressBarStyle,
  buildAchievementRarityStyle,
  buildAchievementDateStyle,
} from '@wisp-ui/core/styles/AchievementCard.styles';
import { useThemeColors } from '../../providers';
import { Text } from '../../primitives/text';
import { Icon } from '../../primitives/icon';
import { Progress } from '../../primitives/progress';
import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { defaultSpacing } from '@wisp-ui/core/theme/create-theme';

export function AchievementCard({
  title,
  description,
  icon: IconComponent,
  status = 'locked',
  progress = 0,
  rarity = 'common',
  unlockedAt,
  onClick,
  className,
  style: userStyle,
}: AchievementCardProps) {
  const themeColors = useThemeColors();

  const colors = useMemo(
    () => resolveAchievementColors(status, rarity, themeColors),
    [status, rarity, themeColors],
  );

  const cardStyle = useMemo(
    () => buildAchievementCardStyle(colors, status, !!onClick),
    [colors, status, onClick],
  );
  const iconContainerStyle = useMemo(
    () => buildAchievementIconStyle(colors),
    [colors],
  );
  const contentStyle = useMemo(
    () => buildAchievementContentStyle(),
    [],
  );
  const titleStyle = useMemo(
    () => buildAchievementTitleStyle(colors.text),
    [colors.text],
  );
  const descriptionStyle = useMemo(
    () => buildAchievementDescriptionStyle(colors.descriptionText),
    [colors.descriptionText],
  );
  const progressTrackStyle = useMemo(
    () => buildAchievementProgressTrackStyle(themeColors),
    [themeColors],
  );
  const progressBarStyle = useMemo(
    () => buildAchievementProgressBarStyle(colors.rarityColor, progress),
    [colors.rarityColor, progress],
  );
  const rarityStyle = useMemo(
    () => buildAchievementRarityStyle(colors.rarityColor),
    [colors.rarityColor],
  );
  const dateStyle = useMemo(
    () => buildAchievementDateStyle(themeColors),
    [themeColors],
  );

  const rarityConfig = achievementRarityMap[rarity];

  // Determine which icon to show
  let ResolvedIcon = IconComponent || Trophy;
  if (status === 'locked' && !IconComponent) {
    ResolvedIcon = Lock;
  }

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={className}
      style={{ ...cardStyle, ...userStyle } as React.CSSProperties}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      {/* Icon */}
      <div style={iconContainerStyle as React.CSSProperties}>
        <Icon icon={ResolvedIcon} size="sm" style={{ color: colors.iconColor }} />
      </div>

      {/* Content */}
      <div style={contentStyle as React.CSSProperties}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: defaultSpacing.sm }}>
          <Text as="p" size="sm" weight="semibold" style={titleStyle as React.CSSProperties}>{title}</Text>
          {status === 'unlocked' && (
            <Text size="xs" weight="medium" style={rarityStyle as React.CSSProperties}>
              {rarityConfig.label}
            </Text>
          )}
        </div>

        {description && (
          <Text as="p" size="sm" style={descriptionStyle as React.CSSProperties}>{description}</Text>
        )}

        {/* Progress bar for in-progress */}
        {status === 'in-progress' && (
          <Progress value={progress} size="xs" style={{ marginTop: defaultSpacing.sm }} />
        )}

        {/* Unlocked check + date */}
        {status === 'unlocked' && unlockedAt && (
          <div style={{ display: 'flex', alignItems: 'center', gap: defaultSpacing.xs, marginTop: defaultSpacing['2xs'] }}>
            <Icon icon={CheckCircle} size="xs" style={{ color: colors.rarityColor }} />
            <Text size="xs" style={dateStyle as React.CSSProperties}>{unlockedAt}</Text>
          </div>
        )}
      </div>
    </div>
  );
}

AchievementCard.displayName = 'AchievementCard';
