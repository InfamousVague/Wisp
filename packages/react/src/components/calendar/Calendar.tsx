/**
 * Calendar -- A date-picker calendar grid with month navigation.
 *
 * @remarks
 * - Supports controlled and uncontrolled date selection via {@link CalendarProps.value} / {@link CalendarProps.defaultValue}.
 * - Configurable locale, week start day, min/max bounds, and individually disabled dates.
 * - Shows outside days from adjacent months to fill the 6-row grid.
 * - Includes skeleton loading state for deferred rendering.
 * - Theme-aware: reads accent and text colors from the current {@link useThemeColors} context.
 *
 * @module components/calendar
 * @example
 * ```tsx
 * <Calendar
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   size="md"
 *   minDate={new Date(2024, 0, 1)}
 * />
 * ```
 */

import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import type { CalendarProps } from '@wisp-ui/core/types/Calendar.types';
import { calendarSizeMap } from '@wisp-ui/core/types/Calendar.types';
import {
  buildCalendarContainerStyle,
  buildCalendarHeaderStyle,
  buildCalendarNavButtonStyle,
  buildCalendarGridStyle,
  buildCalendarDayHeaderStyle,
  buildCalendarDayCellStyle,
  buildCalendarMonthYearStyle,
  buildCalendarSkeletonCellStyle,
} from '@wisp-ui/core/styles/Calendar.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if two dates represent the same calendar day. */
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Returns the number of days in the given month (0-indexed). */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns an array of Date objects representing each cell in the 6-row
 * calendar grid for the given month, padded with outside days.
 */
function buildCalendarGrid(
  year: number,
  month: number,
  weekStartsOn: 0 | 1,
): Date[] {
  const firstDay = new Date(year, month, 1);
  let startOffset = firstDay.getDay() - weekStartsOn;
  if (startOffset < 0) startOffset += 7;

  const days: Date[] = [];
  const totalCells = 42; // 6 rows x 7 cols

  for (let i = 0; i < totalCells; i++) {
    const day = new Date(year, month, 1 - startOffset + i);
    days.push(day);
  }

  return days;
}

/**
 * Returns the abbreviated day-of-week headers respecting the locale and
 * week start configuration.
 */
function getDayHeaders(locale: string, weekStartsOn: 0 | 1): string[] {
  const headers: string[] = [];
  // Use a known Sunday: Jan 4, 1970 is a Sunday
  const baseSunday = new Date(1970, 0, 4);
  const fmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });

  for (let i = 0; i < 7; i++) {
    const dayIndex = (weekStartsOn + i) % 7;
    const d = new Date(baseSunday);
    d.setDate(baseSunday.getDate() + dayIndex);
    // Take first 2 characters for compact display
    const label = fmt.format(d);
    headers.push(label.slice(0, 2));
  }

  return headers;
}

// ---------------------------------------------------------------------------
// Chevron icons
// ---------------------------------------------------------------------------

/** Left-pointing chevron icon for previous month navigation. */
const ChevronLeft: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

/** Right-pointing chevron icon for next month navigation. */
const ChevronRight: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value,
    defaultValue,
    onChange,
    size = 'md',
    minDate,
    maxDate,
    disabledDates,
    locale = 'en-US',
    weekStartsOn = 0,
    showOutsideDays = true,
    skeleton = false,
    className,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = calendarSizeMap[size];

  // ---- Internal state ---------------------------------------------------

  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);
  const selectedDate = value !== undefined ? value : internalValue;

  const today = useMemo(() => new Date(), []);

  const initialMonth = selectedDate ?? defaultValue ?? today;
  const [displayMonth, setDisplayMonth] = useState<Date>(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1),
  );

  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<'prev' | 'next' | null>(null);

  // ---- Derived values ---------------------------------------------------

  const displayYear = displayMonth.getFullYear();
  const displayMonthIndex = displayMonth.getMonth();

  const monthYearLabel = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    return fmt.format(displayMonth);
  }, [locale, displayMonth]);

  const dayHeaders = useMemo(
    () => getDayHeaders(locale, weekStartsOn),
    [locale, weekStartsOn],
  );

  const gridDays = useMemo(
    () => buildCalendarGrid(displayYear, displayMonthIndex, weekStartsOn),
    [displayYear, displayMonthIndex, weekStartsOn],
  );

  // ---- Disable check ----------------------------------------------------

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) {
        return true;
      }
      if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) {
        return true;
      }
      if (disabledDates) {
        return disabledDates.some((d) => isSameDay(d, date));
      }
      return false;
    },
    [minDate, maxDate, disabledDates],
  );

  // ---- Handlers ---------------------------------------------------------

  const handlePrevMonth = useCallback(() => {
    setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setDisplayMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;

      // If clicking an outside day, navigate to that month
      if (date.getMonth() !== displayMonthIndex) {
        setDisplayMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      }

      if (value === undefined) {
        setInternalValue(date);
      }
      onChange?.(date);
    },
    [isDateDisabled, displayMonthIndex, value, onChange],
  );

  // ---- Styles -----------------------------------------------------------

  const containerStyle = useMemo(
    () => buildCalendarContainerStyle(sizeConfig, themeColors),
    [sizeConfig, themeColors],
  );
  const headerStyle = useMemo(
    () => buildCalendarHeaderStyle(sizeConfig),
    [sizeConfig],
  );
  const gridStyle = useMemo(
    () => buildCalendarGridStyle(sizeConfig),
    [sizeConfig],
  );
  const dayHeaderStyle = useMemo(
    () => buildCalendarDayHeaderStyle(sizeConfig, themeColors),
    [sizeConfig, themeColors],
  );
  const monthYearStyle = useMemo(
    () => buildCalendarMonthYearStyle(sizeConfig, themeColors),
    [sizeConfig, themeColors],
  );

  const iconSize = sizeConfig.cellSize < 36 ? 16 : 20;

  // ---- Skeleton ---------------------------------------------------------

  if (skeleton) {
    const skeletonCellStyle = buildCalendarSkeletonCellStyle(sizeConfig, themeColors);

    return (
      <div
        aria-hidden
        data-testid="calendar-skeleton"
        className={className}
        style={{ ...containerStyle, ...userStyle }}
        {...rest}
      >
        {/* Header skeleton */}
        <div style={headerStyle}>
          <div
            style={{
              width: 100,
              height: sizeConfig.headerFontSize + 4,
              borderRadius: 6,
              backgroundColor: themeColors.border.subtle,
              animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
        {/* Grid skeleton */}
        <div style={gridStyle}>
          {/* Day headers */}
          {dayHeaders.map((_, i) => (
            <div key={`dh-${i}`} style={dayHeaderStyle} />
          ))}
          {/* 42 skeleton cells */}
          {Array.from({ length: 42 }, (_, i) => (
            <div key={`sk-${i}`} style={skeletonCellStyle} />
          ))}
        </div>
      </div>
    );
  }

  // ---- Render -----------------------------------------------------------

  const mergedStyle: React.CSSProperties = { ...containerStyle, ...userStyle };

  return (
    <div
      ref={ref}
      className={className}
      style={mergedStyle}
      role="group"
      aria-label="Calendar"
      {...rest}
    >
      {/* Header */}
      <div style={headerStyle}>
        <button
          type="button"
          aria-label="Previous month"
          onClick={handlePrevMonth}
          onMouseEnter={() => setHoveredNav('prev')}
          onMouseLeave={() => setHoveredNav(null)}
          style={buildCalendarNavButtonStyle(sizeConfig, themeColors, hoveredNav === 'prev')}
        >
          <ChevronLeft size={iconSize} color="currentColor" />
        </button>

        <span style={monthYearStyle}>{monthYearLabel}</span>

        <button
          type="button"
          aria-label="Next month"
          onClick={handleNextMonth}
          onMouseEnter={() => setHoveredNav('next')}
          onMouseLeave={() => setHoveredNav(null)}
          style={buildCalendarNavButtonStyle(sizeConfig, themeColors, hoveredNav === 'next')}
        >
          <ChevronRight size={iconSize} color="currentColor" />
        </button>
      </div>

      {/* Grid */}
      <div style={gridStyle} role="grid">
        {/* Day-of-week headers */}
        {dayHeaders.map((label, i) => (
          <div key={`header-${i}`} style={dayHeaderStyle} role="columnheader" aria-label={label}>
            {label}
          </div>
        ))}

        {/* Day cells */}
        {gridDays.map((date, i) => {
          const isOutside = date.getMonth() !== displayMonthIndex;
          const isDisabled = isDateDisabled(date);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
          const isTodayCell = isSameDay(date, today);
          const cellKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

          if (isOutside && !showOutsideDays) {
            return <div key={`empty-${i}`} style={{ width: sizeConfig.cellSize, height: sizeConfig.cellSize }} />;
          }

          return (
            <button
              key={cellKey}
              type="button"
              role="gridcell"
              aria-label={date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              tabIndex={isDisabled ? -1 : 0}
              onClick={() => handleDayClick(date)}
              onMouseEnter={() => !isDisabled && setHoveredCell(cellKey)}
              onMouseLeave={() => setHoveredCell(null)}
              style={buildCalendarDayCellStyle(
                sizeConfig,
                themeColors,
                isSelected,
                isTodayCell,
                isDisabled,
                isOutside,
                hoveredCell === cellKey,
                false, // isInRange -- reserved for future use
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
});

Calendar.displayName = 'Calendar';
