/**
 * @module types/ReactionBar
 * @description Type definitions for the ReactionBar component — floating
 * emoji reaction bar for chat messages.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

export const reactionBarSizes = ['sm', 'md', 'lg'] as const;
export type ReactionBarSize = (typeof reactionBarSizes)[number];

export interface ReactionBarSizeConfig {
  /** Button size (px). */
  buttonSize: number;
  /** Font size for emoji. */
  emojiSize: number;
  /** Padding around bar. */
  padding: number;
  /** Gap between buttons. */
  gap: number;
  /** Border radius. */
  borderRadius: number;
  /** Count font size. */
  countFontSize: number;
}

export const reactionBarSizeMap: Record<ReactionBarSize, ReactionBarSizeConfig> = {
  sm: { buttonSize: 28, emojiSize: 14, padding: 4, gap: 2, borderRadius: 16, countFontSize: 10 },
  md: { buttonSize: 36, emojiSize: 18, padding: 6, gap: 4, borderRadius: 20, countFontSize: 11 },
  lg: { buttonSize: 44, emojiSize: 22, padding: 8, gap: 6, borderRadius: 24, countFontSize: 12 },
};

// ---------------------------------------------------------------------------
// Reaction
// ---------------------------------------------------------------------------

export interface Reaction {
  /** The emoji character. */
  emoji: string;
  /** Number of users who reacted. */
  count: number;
  /** Whether the current user has reacted. */
  active?: boolean;
  /** Optional label for the emoji. */
  label?: string;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ReactionBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Array of reactions to display. */
  reactions: Reaction[];

  /** Size preset. @default 'md' */
  size?: ReactionBarSize;

  /** Called when a reaction button is clicked. */
  onReactionClick?: (emoji: string, active: boolean) => void;

  /** Show the "add reaction" button at the end. @default true */
  showAddButton?: boolean;

  /** Called when the "add" button is clicked. */
  onAddClick?: () => void;

  /** Maximum number of reactions to show before "+N more". @default undefined (show all) */
  maxVisible?: number;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
