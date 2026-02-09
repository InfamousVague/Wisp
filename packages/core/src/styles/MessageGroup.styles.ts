import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { ChatBubbleAlignment } from '../types/ChatBubble.types';

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
    gap: 2,
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
    fontSize: 13,
    lineHeight: '18px',
    fontWeight: 600,
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
    gap: 8,
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
    gap: 4,
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
    gap: 4,
    marginTop: 4,
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
    fontSize: 11,
    lineHeight: '14px',
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
