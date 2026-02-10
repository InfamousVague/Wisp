/**
 * @module Stepper
 */
import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { StepperSizeConfig } from '../types/Stepper.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Container style (the bordered row with [- button] [value] [+ button])
// ---------------------------------------------------------------------------

/**
 * Builds the outer container style for the Stepper row.
 *
 * @param sizeConfig - Dimension tokens derived from the active size variant.
 * @param themeColors - Resolved theme color palette.
 * @returns CSS properties for the container `div`.
 */
export function buildStepperContainerStyle(
  sizeConfig: StepperSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    height: sizeConfig.height,
    border: `1px solid ${themeColors.border.strong}`,
    borderRadius: sizeConfig.borderRadius,
    overflow: 'hidden',
    boxSizing: 'border-box',
    gap: sizeConfig.gap,
  };
}

// ---------------------------------------------------------------------------
// Button style (decrement / increment buttons)
// ---------------------------------------------------------------------------

/**
 * Builds the style for a stepper button (decrement or increment).
 *
 * @param sizeConfig - Dimension tokens derived from the active size variant.
 * @param themeColors - Resolved theme color palette.
 * @param isDisabled - Whether the button is disabled (or at a clamped boundary).
 * @param isHovered - Whether the button is currently hovered.
 * @returns CSS properties for the `button` element.
 */
export function buildStepperButtonStyle(
  sizeConfig: StepperSizeConfig,
  themeColors: ThemeColors,
  isDisabled: boolean,
  isHovered: boolean,
): CSSStyleObject {
  return {
    // Reset
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    appearance: 'none' as const,

    // Sizing
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.buttonWidth,
    height: sizeConfig.height,
    flexShrink: 0,

    // Colors
    background: isHovered && !isDisabled
      ? themeColors.accent.highlight
      : 'transparent',
    color: isDisabled ? themeColors.text.muted : themeColors.text.primary,

    // Interaction
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'background 120ms ease, color 120ms ease',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Value display style (the center number readout)
// ---------------------------------------------------------------------------

/**
 * Builds the style for the centered numeric value display.
 *
 * @param sizeConfig - Dimension tokens derived from the active size variant.
 * @param themeColors - Resolved theme color palette.
 * @returns CSS properties for the value `span` element.
 */
export function buildStepperValueStyle(
  sizeConfig: StepperSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    // Sizing
    minWidth: sizeConfig.buttonWidth,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // Typography
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    fontWeight: defaultTypography.weights.medium,
    lineHeight: 1,
    textAlign: 'center' as const,

    // Colors
    color: themeColors.text.primary,

    // Borders (vertical separators)
    borderLeft: `1px solid ${themeColors.border.strong}`,
    borderRight: `1px solid ${themeColors.border.strong}`,

    // Box model
    boxSizing: 'border-box',
    padding: '0 8px',
  };
}

// ---------------------------------------------------------------------------
// Skeleton style
// ---------------------------------------------------------------------------

/**
 * Generates the inline style for a stepper skeleton shimmer placeholder.
 *
 * @param sizeConfig - The resolved {@link StepperSizeConfig} (determines width, height, and radius).
 * @param themeColors - The current theme color tokens.
 * @returns A `CSSStyleObject` object with dimensions, radius, background, and pulse animation.
 */
export function getStepperSkeletonStyle(
  sizeConfig: StepperSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  // Total width = 2 buttons + value area (same width as a button) + 2 border pixels
  const totalWidth = sizeConfig.buttonWidth * 3 + 2;
  return {
    display: 'inline-block',
    width: totalWidth,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
