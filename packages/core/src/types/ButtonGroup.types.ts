/**
 * @module ButtonGroup
 */
import type React from 'react';
import type { ComponentSize } from '../tokens/shared';

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

/** Available button group sizes. */
export const buttonGroupSizes = ['xs', 'sm', 'md', 'lg'] as const;

/** Union of valid button group size values. */
export type ButtonGroupSize = (typeof buttonGroupSizes)[number];

/** Dimensional config for a button group size step. */
export interface ButtonGroupSizeConfig {
  /** Button height in pixels. */
  height: number;
  /** Horizontal padding in pixels. */
  paddingX: number;
  /** Font size in pixels. */
  fontSize: number;
  /** Line height in pixels. */
  lineHeight: number;
  /** Icon size in pixels. */
  iconSize: number;
  /** Gap between icon and label. */
  gap: number;
}

/** Size → config lookup. */
export const buttonGroupSizeMap: Record<ButtonGroupSize, ButtonGroupSizeConfig> = {
  xs: { height: 28, paddingX: 10, fontSize: 12, lineHeight: 18, iconSize: 14, gap: 4 },
  sm: { height: 32, paddingX: 12, fontSize: 13, lineHeight: 20, iconSize: 16, gap: 4 },
  md: { height: 36, paddingX: 14, fontSize: 14, lineHeight: 20, iconSize: 16, gap: 6 },
  lg: { height: 40, paddingX: 16, fontSize: 14, lineHeight: 24, iconSize: 20, gap: 6 },
};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

/** Available button group visual variants. */
export const buttonGroupVariants = ['outline', 'ghost'] as const;

/** Union of valid button group variant values. */
export type ButtonGroupVariant = (typeof buttonGroupVariants)[number];

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

/** Describes a single item within a ButtonGroup. */
export interface ButtonGroupItem {
  /** Unique value identifying this item. */
  value: string;
  /** Visible label text. */
  label: string;
  /** Optional icon displayed before the label. */
  icon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  /**
   * Whether this item is disabled.
   * @default false
   */
  disabled?: boolean;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props accepted by the {@link ButtonGroup} component.
 */
export interface ButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Array of items to render. */
  items: ButtonGroupItem[];

  /** Controlled selected value. */
  value?: string;

  /** Initial value for uncontrolled usage. */
  defaultValue?: string;

  /** Callback fired when selection changes. */
  onChange?: (value: string) => void;

  /**
   * Visual variant.
   * - `outline` — bordered buttons
   * - `ghost` — no borders, subtle highlight on active
   * @default 'outline'
   */
  variant?: ButtonGroupVariant;

  /**
   * Size controlling height, padding, and font size.
   * @default 'md'
   */
  size?: ButtonGroupSize;

  /**
   * When `true`, the group stretches to fill its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Disables all items.
   * @default false
   */
  disabled?: boolean;
}
