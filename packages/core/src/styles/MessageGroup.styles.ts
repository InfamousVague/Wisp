import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { ChatBubbleAlignment } from '../types/ChatBubble.types';
import { defaultSpacing, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Group container
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the message group wrapper.
 *
 * @param align - Message direction (`incoming` or `outgoing`).
 */
export function buildMessageGroupStyle(align: ChatBubbleAlignment): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'outgoing' ? 'flex-end' : 'flex-start',
    gap: defaultSpacing['2xs'],
  };
}

// ---------------------------------------------------------------------------
// Sender name text
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the sender display name.
 *
 * @param themeColors - Current theme color tokens.
 */
export function buildSenderNameStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: `${defaultTypography.sizes.xs.lineHeight}px`,
    fontWeight: defaultTypography.weights.semibold,
    fontFamily: fontFamilyStacks.sans,
    color: themeColors.text.secondary,
  };
}

// ---------------------------------------------------------------------------
// Content row: avatar + bubbles side-by-side
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the horizontal row that places avatar beside
 * the stacked bubbles column.
 *
 * @param align - Message direction.
 */
export function buildContentRowStyle(align: ChatBubbleAlignment): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: align === 'outgoing' ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    gap: defaultSpacing.sm,
  };
}

// ---------------------------------------------------------------------------
// Bubbles stack
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the stacked bubbles container.
 *
 * @param align - Message direction.
 */
export function buildBubblesContainerStyle(align: ChatBubbleAlignment): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'outgoing' ? 'flex-end' : 'flex-start',
    gap: defaultSpacing.xs,
  };
}

// ---------------------------------------------------------------------------
// Group footer (timestamp + status)
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the group-level footer row (timestamp + status).
 *
 * @param align - Message direction.
 */
export function buildGroupFooterStyle(align: ChatBubbleAlignment): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    marginTop: defaultSpacing.xs,
    justifyContent: align === 'outgoing' ? 'flex-end' : 'flex-start',
  };
}

// ---------------------------------------------------------------------------
// Group footer timestamp text
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the group-level timestamp label.
 *
 * @param themeColors - Current theme color tokens.
 */
export function buildGroupTimestampStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: `${defaultTypography.sizes['2xs'].lineHeight}px`,
    color: themeColors.text.muted,
    fontFamily: fontFamilyStacks.sans,
    whiteSpace: 'nowrap',
  };
}

// ---------------------------------------------------------------------------
// Group footer status icon
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the group-level status icon wrapper.
 *
 * @param themeColors - Current theme color tokens.
 */
export function buildGroupStatusStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    color: themeColors.text.muted,
    flexShrink: 0,
  };
}
