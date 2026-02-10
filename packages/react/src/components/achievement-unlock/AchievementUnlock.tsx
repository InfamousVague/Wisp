/**
 * AchievementUnlock — Animated popup notification for achievement unlock events.
 *
 * @remarks
 * Portal-based popup with staggered entrance animations (icon bounce, text fade).
 * Auto-dismisses after a configurable duration. Supports rarity-coloured accents.
 *
 * @module components/achievement-unlock
 * @example
 * ```tsx
 * <AchievementUnlock
 *   open={true}
 *   title="First Blood"
 *   description="Complete your very first task."
 *   rarity="epic"
 *   onClose={() => {}}
 * />
 * ```
 */

import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { AchievementUnlockProps } from '@wisp-ui/core/types/AchievementUnlock.types';
import { achievementRarityMap } from '@wisp-ui/core/types/AchievementCard.types';
import {
  buildAchievementUnlockOverlayStyle,
  buildAchievementUnlockPanelStyle,
  buildAchievementUnlockIconStyle,
  buildAchievementUnlockTitleStyle,
  buildAchievementUnlockDescriptionStyle,
  buildAchievementUnlockRarityStyle,
  buildAchievementUnlockCloseStyle,
  buildAchievementUnlockActionStyle,
} from '@wisp-ui/core/styles/AchievementUnlock.styles';
import { useThemeColors } from '../../providers';
import { Button } from '../../primitives/button';
import { Text } from '../../primitives/text';
import { Icon } from '../../primitives/icon';
import { Trophy, X } from 'lucide-react';

// ---------------------------------------------------------------------------
// Keyframe injection (singleton)
// ---------------------------------------------------------------------------

let achievementAnimInjected = false;

function injectAchievementKeyframes() {
  if (achievementAnimInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wisp-achievement-icon-in {
      0%   { transform: scale(0.3); opacity: 0; }
      60%  { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    @keyframes wisp-achievement-text-in {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes wisp-achievement-panel-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  achievementAnimInjected = true;
}

// ---------------------------------------------------------------------------
// AchievementUnlock
// ---------------------------------------------------------------------------

export function AchievementUnlock({
  open,
  onClose,
  title,
  description,
  icon: IconComponent,
  rarity = 'common',
  duration = 5000,
  actionLabel,
  onAction,
}: AchievementUnlockProps) {
  const themeColors = useThemeColors();
  const rarityConfig = achievementRarityMap[rarity];

  // Inject animation keyframes
  useEffect(() => {
    injectAchievementKeyframes();
  }, []);

  // Auto-dismiss
  useEffect(() => {
    if (!open || duration === 0 || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const overlayStyle = useMemo(() => buildAchievementUnlockOverlayStyle(themeColors), [themeColors]);
  const panelStyle = useMemo(
    () => buildAchievementUnlockPanelStyle(themeColors, rarity),
    [themeColors, rarity],
  );
  const iconStyle = useMemo(
    () => buildAchievementUnlockIconStyle(rarityConfig.color),
    [rarityConfig.color],
  );
  const titleStyle = useMemo(
    () => buildAchievementUnlockTitleStyle(themeColors),
    [themeColors],
  );
  const descriptionStyle = useMemo(
    () => buildAchievementUnlockDescriptionStyle(themeColors),
    [themeColors],
  );
  const rarityStyle = useMemo(
    () => buildAchievementUnlockRarityStyle(rarityConfig.color),
    [rarityConfig.color],
  );
  const closeStyle = useMemo(
    () => buildAchievementUnlockCloseStyle(themeColors),
    [themeColors],
  );
  const actionStyle = useMemo(
    () => buildAchievementUnlockActionStyle(rarityConfig.color, themeColors),
    [rarityConfig.color, themeColors],
  );

  if (!open) return null;

  const ResolvedIcon = IconComponent || Trophy;

  const portalContent = (
    <div
      style={overlayStyle as React.CSSProperties}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        role="dialog"
        aria-label="Achievement unlocked"
        style={panelStyle as React.CSSProperties}
      >
        {/* Close */}
        {onClose && (
          <Button variant="tertiary" size="sm" style={closeStyle as React.CSSProperties} onClick={onClose} iconLeft={<Icon icon={X} size="xs" />} aria-label="Close" />
        )}

        {/* Icon */}
        <div style={iconStyle as React.CSSProperties}>
          <Icon icon={ResolvedIcon} size="lg" style={{ color: rarityConfig.color }} />
        </div>

        {/* Rarity label */}
        <Text size="xs" weight="semibold" style={rarityStyle as React.CSSProperties}>
          {rarityConfig.label} Achievement
        </Text>

        {/* Title */}
        <Text as="p" size="lg" weight="bold" style={titleStyle as React.CSSProperties}>{title}</Text>

        {/* Description */}
        {description && (
          <Text as="p" size="sm" style={descriptionStyle as React.CSSProperties}>{description}</Text>
        )}

        {/* Action */}
        {actionLabel && onAction && (
          <Button variant="primary" size="sm" style={actionStyle as React.CSSProperties} onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );

  if (typeof document === 'undefined') return portalContent;
  return createPortal(portalContent, document.body);
}

AchievementUnlock.displayName = 'AchievementUnlock';
