/**
 * @module ActivityFeed
 */
import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { ActivityFeedSizeConfig } from '../types/ActivityFeed.types';

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export function buildFeedContainerStyle(): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Item wrapper
// ---------------------------------------------------------------------------

export function buildFeedItemStyle(
  sizeConfig: ActivityFeedSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: sizeConfig.gap,
    position: 'relative',
    padding: '12px 0',
  };
}

// ---------------------------------------------------------------------------
// Avatar / Icon circle
// ---------------------------------------------------------------------------

export function buildFeedAvatarStyle(
  sizeConfig: ActivityFeedSizeConfig,
  themeColors: ThemeColors,
  iconColor?: string,
): CSSStyleObject {
  return {
    width: sizeConfig.avatarSize,
    height: sizeConfig.avatarSize,
    borderRadius: '50%',
    backgroundColor: iconColor || themeColors.accent.highlight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    color: themeColors.text.secondary,
    fontSize: sizeConfig.secondaryFontSize,
    fontWeight: 600,
    position: 'relative',
    zIndex: 1,
  };
}

// ---------------------------------------------------------------------------
// Connector line
// ---------------------------------------------------------------------------

export function buildFeedConnectorStyle(
  sizeConfig: ActivityFeedSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    position: 'absolute',
    left: sizeConfig.avatarSize / 2 - sizeConfig.lineWidth / 2,
    top: sizeConfig.avatarSize + 12,
    bottom: -12,
    width: sizeConfig.lineWidth,
    backgroundColor: themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Content text
// ---------------------------------------------------------------------------

export function buildFeedContentStyle(
  sizeConfig: ActivityFeedSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.primaryFontSize,
    lineHeight: 1.5,
    color: themeColors.text.primary,
    margin: 0,
  };
}

export function buildFeedTimestampStyle(
  sizeConfig: ActivityFeedSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.secondaryFontSize,
    lineHeight: 1.4,
    color: themeColors.text.muted,
    margin: 0,
    marginTop: 2,
  };
}
