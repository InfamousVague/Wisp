import type React from 'react';

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------

/** Available chat bubble alignment options. */
export const chatBubbleAlignments = ['incoming', 'outgoing'] as const;

/** Union of valid alignment values derived from {@link chatBubbleAlignments}. */
export type ChatBubbleAlignment = (typeof chatBubbleAlignments)[number];

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

/** Available chat bubble visual variants. */
export const chatBubbleVariants = ['default', 'accent'] as const;

/** Union of valid variant values derived from {@link chatBubbleVariants}. */
export type ChatBubbleVariant = (typeof chatBubbleVariants)[number];

// ---------------------------------------------------------------------------
// Delivery status
// ---------------------------------------------------------------------------

/** Available delivery status indicators for outgoing messages. */
export const chatBubbleStatuses = ['sent', 'delivered', 'read'] as const;

/** Union of valid status values derived from {@link chatBubbleStatuses}. */
export type ChatBubbleStatus = (typeof chatBubbleStatuses)[number];

// ---------------------------------------------------------------------------
// Reactions
// ---------------------------------------------------------------------------

/**
 * Represents a single emoji reaction attached to a message.
 */
export interface ChatBubbleReaction {
  /** The emoji character (e.g. "👍", "❤️"). */
  emoji: string;
  /** Total reaction count. */
  count: number;
  /** Whether the current user has reacted with this emoji. */
  reacted?: boolean;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props accepted by the {@link ChatBubble} component.
 *
 * @remarks
 * Extends the native `<div>` element attributes so any valid HTML div
 * prop (e.g. `aria-*`, `data-*`) can be forwarded.
 *
 * The bubble renders with one sharp corner to visually indicate the
 * message direction:
 * - `incoming`: sharp bottom-left corner (points toward sender on the left)
 * - `outgoing`: sharp bottom-right corner (points toward sender on the right)
 */
export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Message direction / alignment.
   * - `'incoming'`: renders on the left with a sharp bottom-left corner.
   * - `'outgoing'`: renders on the right with a sharp bottom-right corner.
   * @default 'incoming'
   */
  align?: ChatBubbleAlignment;

  /**
   * Visual color variant.
   * - `'default'`: theme surface colors (subtle for incoming, raised for outgoing).
   * - `'accent'`: brand/accent color (typically for outgoing messages).
   * @default 'default'
   */
  variant?: ChatBubbleVariant;

  /** Optional timestamp text displayed below the message (e.g. "2:34 PM"). */
  timestamp?: string;

  /**
   * Delivery status indicator for outgoing messages.
   * - `'sent'`: single check
   * - `'delivered'`: double check
   * - `'read'`: double check (accent color)
   */
  status?: ChatBubbleStatus;

  /** Optional array of emoji reactions displayed below the bubble. */
  reactions?: ChatBubbleReaction[];

  /** Callback fired when a reaction chip is clicked. Receives the emoji string. */
  onReactionClick?: (emoji: string) => void;

  /**
   * @internal
   * When `true`, the bubble suppresses its own timestamp/status footer
   * because the parent `MessageGroup` renders it instead.
   * **Do not set this prop manually** — it is injected by `MessageGroup`.
   */
  _inGroup?: boolean;
}
