/**
 * @module types/MessageInput
 * @description Type definitions for the MessageInput component — rich chat
 * input with send, attachment, and emoji support.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

export const messageInputSizes = ['sm', 'md', 'lg'] as const;
export type MessageInputSize = (typeof messageInputSizes)[number];

export interface MessageInputSizeConfig {
  /** Minimum height (px). */
  minHeight: number;
  /** Maximum height before scroll (px). */
  maxHeight: number;
  /** Font size. */
  fontSize: number;
  /** Padding. */
  padding: number;
  /** Icon button size. */
  iconButtonSize: number;
  /** Icon size. */
  iconSize: number;
  /** Border radius. */
  borderRadius: number;
  /** Gap between elements. */
  gap: number;
}

export const messageInputSizeMap: Record<MessageInputSize, MessageInputSizeConfig> = {
  sm: { minHeight: 36, maxHeight: 120, fontSize: 13, padding: 8, iconButtonSize: 28, iconSize: 16, borderRadius: 18, gap: 4 },
  md: { minHeight: 44, maxHeight: 160, fontSize: 14, padding: 12, iconButtonSize: 34, iconSize: 18, borderRadius: 22, gap: 6 },
  lg: { minHeight: 52, maxHeight: 200, fontSize: 15, padding: 16, iconButtonSize: 40, iconSize: 20, borderRadius: 26, gap: 8 },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface MessageInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onSubmit'> {
  /** Current input value (controlled). */
  value?: string;

  /** Default input value (uncontrolled). */
  defaultValue?: string;

  /** Placeholder text. @default 'Type a message...' */
  placeholder?: string;

  /** Size preset. @default 'md' */
  size?: MessageInputSize;

  /** Called when the value changes. */
  onValueChange?: (value: string) => void;

  /** Called when the user submits the message (Enter or send button). */
  onSubmit?: (value: string) => void;

  /** Show attachment button. @default true */
  showAttachment?: boolean;

  /** Called when attachment button is clicked. */
  onAttachmentClick?: () => void;

  /** Show emoji trigger button. @default true */
  showEmoji?: boolean;

  /** Called when emoji button is clicked. */
  onEmojiClick?: () => void;

  /** Whether the input is disabled. @default false */
  disabled?: boolean;

  /** Whether the message is being sent (shows spinner). @default false */
  sending?: boolean;

  /** Auto-expand textarea as user types. @default true */
  autoExpand?: boolean;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
