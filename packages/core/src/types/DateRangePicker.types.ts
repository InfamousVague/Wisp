/**
 * @module DateRangePicker.types
 * @description Type definitions for the Wisp DateRangePicker component.
 */

import type { HTMLAttributes } from 'react';

// ---------------------------------------------------------------------------
// Date Range
// ---------------------------------------------------------------------------

/** Represents a date range with a start and end date. */
export interface DateRange {
  /** The start date of the range, or `null` if not yet selected. */
  start: Date | null;
  /** The end date of the range, or `null` if not yet selected. */
  end: Date | null;
}

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

/** Available size presets for the DateRangePicker component. */
export const dateRangePickerSizes = ['sm', 'md', 'lg'] as const;

/** Union of allowed date range picker size values. */
export type DateRangePickerSize = (typeof dateRangePickerSizes)[number];

/** Dimensional configuration for a single DateRangePicker size preset. */
export interface DateRangePickerSizeConfig {
  /** Height of the trigger input in pixels. */
  inputHeight: number;
  /** Font size in pixels for the trigger text. */
  fontSize: number;
  /** Size of the calendar icon in pixels. */
  iconSize: number;
  /** Border radius of the trigger in pixels. */
  borderRadius: number;
  /** Horizontal padding inside the trigger in pixels. */
  paddingX: number;
  /** Width and height of each day cell in pixels. */
  cellSize: number;
  /** Font size in pixels for the month/year header. */
  headerFontSize: number;
  /** Font size in pixels for the day-of-week headers (Su, Mo, ...). */
  dayHeaderFontSize: number;
}

/**
 * Maps each {@link DateRangePickerSize} to its {@link DateRangePickerSizeConfig}.
 *
 * @remarks
 * Used internally by the DateRangePicker component and its style builders to
 * resolve sizing tokens.
 */
export const dateRangePickerSizeMap: Record<DateRangePickerSize, DateRangePickerSizeConfig> = {
  sm: { inputHeight: 28, fontSize: 12, iconSize: 14, borderRadius: 6, paddingX: 10, cellSize: 28, headerFontSize: 13, dayHeaderFontSize: 11 },
  md: { inputHeight: 34, fontSize: 13, iconSize: 16, borderRadius: 8, paddingX: 12, cellSize: 32, headerFontSize: 14, dayHeaderFontSize: 12 },
  lg: { inputHeight: 40, fontSize: 14, iconSize: 18, borderRadius: 8, paddingX: 14, cellSize: 36, headerFontSize: 16, dayHeaderFontSize: 13 },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/** Props accepted by the {@link DateRangePicker} component. */
export interface DateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * The currently selected date range (controlled).
   * When provided the component is fully controlled.
   */
  value?: DateRange;
  /**
   * The initially selected date range (uncontrolled).
   * Ignored when {@link DateRangePickerProps.value} is provided.
   */
  defaultValue?: DateRange;
  /** Callback fired when the user selects or completes a date range. */
  onChange?: (range: DateRange) => void;
  /**
   * Controls the visual size of the date range picker.
   * @default 'md'
   */
  size?: DateRangePickerSize;
  /**
   * Placeholder text shown when no range is selected.
   * @default 'Select dates'
   */
  placeholder?: string;
  /** The earliest selectable date. Days before this are disabled. */
  minDate?: Date;
  /** The latest selectable date. Days after this are disabled. */
  maxDate?: Date;
  /**
   * Whether the date range picker is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * When `true` a pulsing skeleton placeholder is rendered instead of the component.
   * @default false
   */
  skeleton?: boolean;
  /** Label text rendered above the trigger. */
  label?: string;
}
