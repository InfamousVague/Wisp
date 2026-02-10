/**
 * @module types/ReadReceipt
 * @description Type definitions for the ReadReceipt primitive — message
 * delivery status indicator (sent, delivered, read) for chat interfaces.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

export const readReceiptStatuses = ['sending', 'sent', 'delivered', 'read', 'failed'] as const;
export type ReadReceiptStatus = (typeof readReceiptStatuses)[number];

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

export const readReceiptSizes = ['xs', 'sm', 'md', 'lg'] as const;
export type ReadReceiptSize = (typeof readReceiptSizes)[number];

export interface ReadReceiptSizeConfig {
  /** Icon size (px). */
  iconSize: number;
  /** Font size for label text. */
  fontSize: number;
  /** Gap between icon and label. */
  gap: number;
}

export const readReceiptSizeMap: Record<ReadReceiptSize, ReadReceiptSizeConfig> = {
  xs: { iconSize: 12, fontSize: 10, gap: 2 },
  sm: { iconSize: 14, fontSize: 11, gap: 3 },
  md: { iconSize: 16, fontSize: 12, gap: 4 },
  lg: { iconSize: 20, fontSize: 14, gap: 5 },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ReadReceiptProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Current delivery status. */
  status: ReadReceiptStatus;

  /** Size preset. @default 'sm' */
  size?: ReadReceiptSize;

  /** Optional timestamp text (e.g. "2:30 PM"). */
  timestamp?: string;

  /** Show label text alongside icon. @default false */
  showLabel?: boolean;

  /** Custom labels for each status. */
  labels?: Partial<Record<ReadReceiptStatus, string>>;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
