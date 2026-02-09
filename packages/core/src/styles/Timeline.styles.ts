/**
 * @module Timeline
 */
import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { TimelineSizeConfig, TimelineOrientation, TimelineStatus } from '../types/Timeline.types';

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export function buildTimelineContainerStyle(
  orientation: TimelineOrientation,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    alignItems: orientation === 'horizontal' ? 'flex-start' : undefined,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Item wrapper
// ---------------------------------------------------------------------------

export function buildTimelineItemStyle(
  sizeConfig: TimelineSizeConfig,
  orientation: TimelineOrientation,
): CSSStyleObject {
  if (orientation === 'horizontal') {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      flex: 1,
    };
  }
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: sizeConfig.gap,
    position: 'relative',
  };
}

// ---------------------------------------------------------------------------
// Dot container (holds dot + line)
// ---------------------------------------------------------------------------

export function buildTimelineDotContainerStyle(
  sizeConfig: TimelineSizeConfig,
  orientation: TimelineOrientation,
): CSSStyleObject {
  if (orientation === 'horizontal') {
    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    };
  }
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Dot
// ---------------------------------------------------------------------------

export function buildTimelineDotStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
  status: TimelineStatus,
  color?: string,
): CSSStyleObject {
  let bg: string;
  let boxShadow: string | undefined;

  if (color) {
    bg = color;
    boxShadow = status === 'active' ? `0 0 0 3px ${color}33` : undefined;
  } else {
    switch (status) {
      case 'completed':
        bg = themeColors.accent.primary;
        break;
      case 'active':
        bg = themeColors.accent.primary;
        boxShadow = `0 0 0 3px ${themeColors.accent.primary}33`;
        break;
      case 'pending':
      default:
        bg = themeColors.border.subtle;
        break;
    }
  }

  return {
    width: sizeConfig.dotSize,
    height: sizeConfig.dotSize,
    borderRadius: '50%',
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    zIndex: 1,
    boxShadow,
    boxSizing: 'border-box',
    transition: 'background-color 200ms ease, box-shadow 200ms ease',
  };
}

// ---------------------------------------------------------------------------
// Connector line
// ---------------------------------------------------------------------------

export function buildTimelineLineStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
  isLast: boolean,
  orientation: TimelineOrientation,
): CSSStyleObject {
  if (isLast) {
    return { display: 'none' };
  }

  if (orientation === 'horizontal') {
    return {
      position: 'absolute',
      top: sizeConfig.dotSize / 2 - sizeConfig.lineWidth / 2,
      left: `calc(50% + ${sizeConfig.dotSize / 2 + 4}px)`,
      right: `calc(-50% + ${sizeConfig.dotSize / 2 + 4}px)`,
      height: sizeConfig.lineWidth,
      backgroundColor: themeColors.border.subtle,
      transition: 'background-color 200ms ease',
    };
  }

  return {
    position: 'absolute',
    left: sizeConfig.dotSize / 2 - sizeConfig.lineWidth / 2,
    top: sizeConfig.dotSize,
    bottom: 0,
    width: sizeConfig.lineWidth,
    backgroundColor: themeColors.border.subtle,
    transition: 'background-color 200ms ease',
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

export function buildTimelineContentStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
  orientation: TimelineOrientation,
  isLast: boolean,
): CSSStyleObject {
  if (orientation === 'horizontal') {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: sizeConfig.contentGap,
      marginTop: sizeConfig.gap,
      textAlign: 'center',
      maxWidth: 120,
    };
  }
  return {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: sizeConfig.contentGap,
    paddingBottom: isLast ? 0 : sizeConfig.gap + sizeConfig.dotSize,
    minWidth: 0,
  };
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

export function buildTimelineTitleStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
  status: TimelineStatus,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    lineHeight: 1.4,
    color: status === 'pending' ? themeColors.text.muted : themeColors.text.primary,
    margin: 0,
    transition: 'color 200ms ease',
  };
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

export function buildTimelineDescriptionStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.secondaryFontSize,
    fontWeight: 400,
    lineHeight: 1.4,
    color: themeColors.text.secondary,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Timestamp
// ---------------------------------------------------------------------------

export function buildTimelineTimestampStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.secondaryFontSize,
    fontWeight: 400,
    lineHeight: 1.4,
    color: themeColors.text.muted,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

/**
 * Builds the skeleton loading placeholder style for the Timeline component.
 *
 * @param themeColors - Active theme color tokens.
 * @returns CSS properties for the skeleton `<div>`.
 */
export function buildTimelineSkeletonStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '100%',
  };
}

export function buildTimelineSkeletonItemStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: sizeConfig.gap,
    alignItems: 'flex-start',
  };
}

export function buildTimelineSkeletonDotStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: sizeConfig.dotSize,
    height: sizeConfig.dotSize,
    borderRadius: '50%',
    backgroundColor: themeColors.border.subtle,
    flexShrink: 0,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}

export function buildTimelineSkeletonLineStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: '60%',
    height: sizeConfig.fontSize,
    borderRadius: 4,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}

export function buildTimelineSkeletonLineShortStyle(
  sizeConfig: TimelineSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: '40%',
    height: sizeConfig.secondaryFontSize,
    borderRadius: 4,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
