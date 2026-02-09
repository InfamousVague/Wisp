import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { TimePickerSizeConfig } from '../types/TimePicker.types';
import { fontFamilyStacks } from '../tokens/shared';

// ---------------------------------------------------------------------------
// Container style
// ---------------------------------------------------------------------------

/**
 * Builds the outer container style (vertical flex column for label + trigger + error).
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig} for the chosen size variant.
 * @returns CSS properties for the container `<div>`.
 */
export function buildTimePickerContainerStyle(
  sizeConfig: TimePickerSizeConfig,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 4,
    position: 'relative',
  };
}

// ---------------------------------------------------------------------------
// Trigger style
// ---------------------------------------------------------------------------

/**
 * Builds the trigger button style (the clickable area that opens the dropdown).
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @param isOpen - Whether the dropdown is currently open.
 * @param isDisabled - Whether the trigger is disabled.
 * @param hasError - Whether the component is in an error state.
 * @param isHovered - Whether the trigger is currently hovered.
 * @returns CSS properties for the trigger `<button>`.
 */
export function buildTimePickerTriggerStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
  isOpen: boolean,
  isDisabled: boolean,
  hasError: boolean,
  isHovered: boolean,
): CSSStyleObject {
  let borderColor = themeColors.border.strong;
  let focusRing = 'transparent';

  if (isDisabled) {
    borderColor = themeColors.border.subtle;
  } else if (hasError) {
    borderColor = themeColors.status.danger;
    if (isOpen) focusRing = themeColors.status.danger;
  } else if (isOpen) {
    borderColor = themeColors.accent.primary;
    focusRing = themeColors.accent.primary;
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: sizeConfig.paddingX > 10 ? 8 : 6,
    height: sizeConfig.inputHeight,
    paddingLeft: sizeConfig.paddingX,
    paddingRight: sizeConfig.paddingX,
    backgroundColor: isDisabled ? themeColors.border.subtle : 'transparent',
    borderRadius: sizeConfig.borderRadius,
    boxSizing: 'border-box',
    border: '1px solid ' + borderColor,
    boxShadow: focusRing !== 'transparent'
      ? '0 0 0 2px ' + focusRing + '25'
      : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    lineHeight: 1.4,
    color: isDisabled ? themeColors.text.muted : themeColors.text.primary,
    outline: 'none',
    margin: 0,
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  };
}

// ---------------------------------------------------------------------------
// Dropdown style
// ---------------------------------------------------------------------------

/**
 * Builds the dropdown panel style that appears below the trigger.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @returns CSS properties for the dropdown `<div>`.
 */
export function buildTimePickerDropdownStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    position: 'absolute',
    top: sizeConfig.inputHeight + 4,
    left: 0,
    zIndex: 50,
    backgroundColor: themeColors.background.raised,
    borderRadius: 12,
    border: '1px solid ' + themeColors.border.subtle,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    boxSizing: 'border-box',
  };
}

// ---------------------------------------------------------------------------
// Column style
// ---------------------------------------------------------------------------

/**
 * Builds the scrollable column style for hours, minutes, or AM/PM.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @returns CSS properties for a column `<div>`.
 */
export function buildTimePickerColumnStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    width: sizeConfig.columnWidth,
    maxHeight: 200,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };
}

// ---------------------------------------------------------------------------
// Option style
// ---------------------------------------------------------------------------

/**
 * Builds the style for an individual option inside a column.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @param isSelected - Whether this option is the currently selected value.
 * @param isHovered - Whether this option is currently hovered.
 * @returns CSS properties for the option `<div>`.
 */
export function buildTimePickerOptionStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
  isSelected: boolean,
  isHovered: boolean,
): CSSStyleObject {
  const optionHeight = sizeConfig.fontSize >= 14 ? 32 : 28;

  let backgroundColor = 'transparent';
  if (isSelected) {
    backgroundColor = themeColors.accent.highlight;
  } else if (isHovered) {
    backgroundColor = themeColors.accent.highlight;
  }

  return {
    height: optionHeight,
    minHeight: optionHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    cursor: 'pointer',
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    lineHeight: 1.4,
    color: isSelected ? themeColors.text.onRaised : themeColors.text.onRaisedSecondary,
    backgroundColor,
    transition: 'background-color 100ms ease',
    userSelect: 'none',
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Label style
// ---------------------------------------------------------------------------

/**
 * Builds the label text style rendered above the trigger.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @param isDisabled - Whether the component is disabled.
 * @returns CSS properties for the label `<span>`.
 */
export function buildTimePickerLabelStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
  isDisabled: boolean,
): CSSStyleObject {
  return {
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    lineHeight: 1.4,
    fontWeight: 500,
    color: isDisabled ? themeColors.text.muted : themeColors.text.primary,
    cursor: 'default',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Error style
// ---------------------------------------------------------------------------

/**
 * Builds the error message text style rendered below the trigger.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @returns CSS properties for the error `<span>`.
 */
export function buildTimePickerErrorStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize - 1,
    lineHeight: 1.4,
    fontWeight: 400,
    color: themeColors.status.danger,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Skeleton style
// ---------------------------------------------------------------------------

/**
 * Builds the skeleton loading placeholder style for the TimePicker component.
 *
 * @param sizeConfig - Active {@link TimePickerSizeConfig}.
 * @param themeColors - Active theme color tokens.
 * @returns CSS properties for the skeleton `<div>`.
 */
export function buildTimePickerSkeletonStyle(
  sizeConfig: TimePickerSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-block',
    width: '100%',
    height: sizeConfig.inputHeight,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
