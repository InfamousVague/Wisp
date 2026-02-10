/**
 * @module styles/MediaPlayer
 * @description Pure style-builder functions for the MediaPlayer component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { MediaPlayerSizeConfig } from '../types/MediaPlayer.types';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface MediaPlayerColors {
  bg: string;
  controlBg: string;
  text: string;
  textSecondary: string;
  icon: string;
  iconHover: string;
  trackBg: string;
  trackFill: string;
  thumb: string;
  border: string;
}

export function resolveMediaPlayerColors(themeColors: ThemeColors): MediaPlayerColors {
  return {
    bg: themeColors.background.sunken,
    controlBg: themeColors.background.surface,
    text: themeColors.text.primary,
    textSecondary: themeColors.text.secondary,
    icon: themeColors.text.secondary,
    iconHover: themeColors.text.primary,
    trackBg: themeColors.border.subtle,
    trackFill: themeColors.accent.primary,
    thumb: themeColors.text.primary,
    border: themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

export function buildMediaPlayerContainerStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
  isVideo: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: sizeConfig.borderRadius,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    overflow: 'hidden',
    position: 'relative',
    ...(isVideo ? { aspectRatio: '16/9' } : {}),
  };
}

export function buildVideoContainerStyle(): CSSStyleObject {
  return {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    overflow: 'hidden',
    minHeight: 0,
  };
}

export function buildVideoElementStyle(): CSSStyleObject {
  return {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  };
}

export function buildControlBarStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
  isVideo: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    padding: `0 ${sizeConfig.padding}px`,
    height: sizeConfig.controlBarHeight,
    backgroundColor: isVideo ? 'rgba(0,0,0,0.7)' : colors.controlBg,
    borderTop: isVideo ? 'none' : `1px solid ${colors.border}`,
    flexShrink: 0,
    ...(isVideo
      ? {
          position: 'absolute' as const,
          bottom: 0,
          left: 0,
          right: 0,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }
      : {}),
  };
}

export function buildControlButtonStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconSize + 8,
    height: sizeConfig.iconSize + 8,
    borderRadius: defaultRadii.sm,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.icon,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    transition: 'color 150ms ease, background-color 150ms ease',
  };
}

export function buildSeekBarContainerStyle(
  sizeConfig: MediaPlayerSizeConfig,
): CSSStyleObject {
  return {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    height: sizeConfig.controlBarHeight,
    cursor: 'pointer',
    position: 'relative',
    minWidth: 0,
  };
}

export function buildSeekBarTrackStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    width: '100%',
    height: sizeConfig.trackHeight,
    borderRadius: sizeConfig.trackHeight / 2,
    backgroundColor: colors.trackBg,
    position: 'relative',
    overflow: 'hidden',
  };
}

export function buildSeekBarFillStyle(
  colors: MediaPlayerColors,
  progress: number,
): CSSStyleObject {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${progress * 100}%`,
    backgroundColor: colors.trackFill,
    borderRadius: 'inherit',
    transition: 'width 100ms linear',
  };
}

export function buildTimeDisplayStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.fontSize,
    fontFamily: 'monospace',
    color: colors.textSecondary,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    userSelect: 'none',
  };
}

export function buildVolumeContainerStyle(
  sizeConfig: MediaPlayerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    flexShrink: 0,
  };
}

export function buildVolumeSliderStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    width: sizeConfig.volumeWidth,
    height: sizeConfig.trackHeight,
    borderRadius: sizeConfig.trackHeight / 2,
    backgroundColor: colors.trackBg,
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
  };
}

export function buildSpeedButtonStyle(
  sizeConfig: MediaPlayerSizeConfig,
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizeConfig.iconSize + 4,
    paddingLeft: defaultSpacing.xs,
    paddingRight: defaultSpacing.xs,
    borderRadius: defaultRadii.sm,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    cursor: 'pointer',
    fontSize: sizeConfig.fontSize,
    fontWeight: defaultTypography.weights.semibold,
    fontFamily: 'monospace',
    flexShrink: 0,
    transition: 'color 150ms ease',
  };
}

export function buildAudioInfoStyle(
  colors: MediaPlayerColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: `${defaultSpacing.md}px ${defaultSpacing.lg}px ${defaultSpacing.xs}px`,
    gap: defaultSpacing['2xs'],
  };
}

export function buildAudioSeekRowStyle(
  sizeConfig: MediaPlayerSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    padding: `0 ${sizeConfig.padding}px`,
    height: 24,
  };
}

export function buildMediaPlayerSkeletonStyle(
  sizeConfig: MediaPlayerSizeConfig,
  themeColors: ThemeColors,
  isVideo: boolean,
): CSSStyleObject {
  return {
    display: 'block',
    width: '100%',
    height: isVideo ? 300 : sizeConfig.controlBarHeight + 60,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
