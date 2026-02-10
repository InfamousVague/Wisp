import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { ChatBubbleAlignment, ChatBubbleVariant } from '../types/ChatBubble.types';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Variant -> colors (theme-aware)
// ---------------------------------------------------------------------------

/**
 * Resolved color tokens for a chat bubble instance.
 */
export interface ChatBubbleColors {
  /** Bubble background color. */
  bg: string;
  /** Message text color. */
  text: string;
  /** Timestamp / secondary text color. */
  timestamp: string;
  /** Border color (used for subtle outlines). */
  border: string;
}

/**
 * Maps an alignment + variant combination to its theme-aware colors.
 *
 * @param align - Message direction (`incoming` or `outgoing`).
 * @param variant - Visual color variant (`default` or `accent`).
 * @param themeColors - Current theme color tokens.
 * @returns Resolved color set for the bubble.
 */
export function resolveChatBubbleColors(
  align: ChatBubbleAlignment,
  variant: ChatBubbleVariant,
  themeColors: ThemeColors,
): ChatBubbleColors {
  if (align === 'outgoing') {
    return {
      bg: themeColors.accent.primary,
      text: themeColors.text.primary,
      timestamp: themeColors.text.secondary,
      border: themeColors.border.subtle,
    };
  }

  // incoming — black bubble with white text in both themes
  return {
    bg: themeColors.background.raised,
    text: themeColors.text.onRaised,
    timestamp: themeColors.text.onRaisedSecondary,
    border: themeColors.accent.dividerRaised,
  };
}

// ---------------------------------------------------------------------------
// Bubble container style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the chat bubble container.
 *
 * The bubble has three rounded corners and one sharp (2 px) corner:
 * - incoming: sharp bottom-left
 * - outgoing: sharp bottom-right
 */
export function buildChatBubbleStyle(
  align: ChatBubbleAlignment,
  colors: ChatBubbleColors,
): CSSStyleObject {
  const isOutgoing = align === 'outgoing';

  return {
    display: 'inline-block',
    padding: `${defaultSpacing.sm}px ${defaultSpacing.md}px`,
    borderRadius: isOutgoing ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    color: colors.text,
    fontFamily: fontFamilyStacks.sans,
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: defaultTypography.sizes.sm.lineHeight,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    boxSizing: 'border-box',
  };
}

// ---------------------------------------------------------------------------
// Footer row (timestamp + status)
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the footer row that holds timestamp and status.
 */
export function buildFooterStyle(align: ChatBubbleAlignment): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    marginTop: defaultSpacing.xs,
    justifyContent: align === 'outgoing' ? 'flex-end' : 'flex-start',
  };
}

// ---------------------------------------------------------------------------
// Timestamp text
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the timestamp label.
 */
export function buildTimestampStyle(colors: ChatBubbleColors): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: defaultTypography.sizes['2xs'].lineHeight,
    color: colors.timestamp,
    fontFamily: fontFamilyStacks.sans,
    whiteSpace: 'nowrap',
  };
}

// ---------------------------------------------------------------------------
// Status indicator
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the delivery status icon wrapper.
 */
export function buildStatusStyle(colors: ChatBubbleColors): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    color: colors.timestamp,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Reactions container
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the reactions row below the bubble.
 */
export function buildReactionsContainerStyle(): CSSStyleObject {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    gap: defaultSpacing.xs,
    marginTop: defaultSpacing.xs,
  };
}

// ---------------------------------------------------------------------------
// Reaction chip
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for an individual reaction chip.
 *
 * @param reacted - Whether the current user has reacted.
 * @param themeColors - Current theme color tokens.
 */
export function buildReactionChipStyle(
  reacted: boolean,
  themeColors: ThemeColors,
): CSSStyleObject {
  const chipBg = reacted
    ? themeColors.brand.surface
    : themeColors.background.surface;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    padding: `${defaultSpacing['2xs']}px ${defaultSpacing.sm}px`,
    borderRadius: defaultRadii.xl,
    fontSize: defaultTypography.sizes.xs.fontSize,
    lineHeight: defaultTypography.sizes.xs.lineHeight,
    fontFamily: fontFamilyStacks.sans,
    border: `1px solid ${reacted ? themeColors.brand.border : themeColors.border.subtle}`,
    backgroundColor: chipBg,
    color: reacted ? themeColors.brand.text : themeColors.text.secondary,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 150ms ease, border-color 150ms ease',
  };
}
