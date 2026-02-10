/**
 * @module styles/MessageInput
 * @description Pure style-builder functions for the MessageInput component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors, WispTheme } from '../theme/types';
import type { MessageInputSizeConfig } from '../types/MessageInput.types';
import { durations, easings } from '../tokens/motion';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface MessageInputColors {
  bg: string;
  border: string;
  borderFocus: string;
  text: string;
  placeholder: string;
  icon: string;
  iconHover: string;
  sendBg: string;
  sendIcon: string;
  sendBgDisabled: string;
}

export function resolveMessageInputColors(theme: WispTheme): MessageInputColors {
  const { colors: themeColors } = theme;
  return {
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
    borderFocus: themeColors.accent.primary,
    text: themeColors.text.primary,
    placeholder: themeColors.text.muted,
    icon: themeColors.text.muted,
    iconHover: themeColors.text.secondary,
    sendBg: themeColors.accent.primary,
    sendIcon: themeColors.background.surface,
    sendBgDisabled: themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

export function buildMessageInputContainerStyle(
  sizeConfig: MessageInputSizeConfig,
  colors: MessageInputColors,
  theme: WispTheme,
): CSSStyleObject {
  const { radii } = theme;
  return {
    display: 'flex',
    alignItems: 'flex-end',
    gap: sizeConfig.gap,
    padding: `${sizeConfig.padding / 2}px ${sizeConfig.padding}px`,
    borderRadius: radii[sizeConfig.borderRadius],
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    transition: `border-color ${durations.fast}ms ${easings.easeOut.css}`,
    width: '100%',
  };
}

export function buildMessageInputTextareaStyle(
  sizeConfig: MessageInputSizeConfig,
  colors: MessageInputColors,
): CSSStyleObject {
  return {
    flex: 1,
    minHeight: sizeConfig.minHeight - sizeConfig.padding,
    maxHeight: sizeConfig.maxHeight,
    fontSize: sizeConfig.fontSize,
    fontFamily: 'inherit',
    color: colors.text,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: `${sizeConfig.padding / 2}px 0`,
    lineHeight: 1.4,
    overflow: 'auto',
  };
}

export function buildMessageInputIconButtonStyle(
  sizeConfig: MessageInputSizeConfig,
  colors: MessageInputColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconButtonSize,
    height: sizeConfig.iconButtonSize,
    borderRadius: sizeConfig.iconButtonSize / 2,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.icon,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    transition: `color ${durations.fast}ms ${easings.easeOut.css}`,
  };
}

export function buildMessageInputSendButtonStyle(
  sizeConfig: MessageInputSizeConfig,
  colors: MessageInputColors,
  hasContent: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconButtonSize,
    height: sizeConfig.iconButtonSize,
    borderRadius: sizeConfig.iconButtonSize / 2,
    border: 'none',
    backgroundColor: hasContent ? colors.sendBg : colors.sendBgDisabled,
    color: colors.sendIcon,
    cursor: hasContent ? 'pointer' : 'default',
    padding: 0,
    flexShrink: 0,
    transition: `all ${durations.fast}ms ${easings.easeOut.css}`,
    opacity: hasContent ? 1 : 0.5,
  };
}

export function buildMessageInputSkeletonStyle(
  sizeConfig: MessageInputSizeConfig,
  theme: WispTheme,
): CSSStyleObject {
  const { colors: themeColors, radii } = theme;
  return {
    display: 'block',
    width: '100%',
    height: sizeConfig.minHeight + sizeConfig.padding,
    borderRadius: radii[sizeConfig.borderRadius],
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
