/**
 * @module components/spotlight-tour
 * @description Style builders for the Wisp SpotlightTour component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { SpotlightTourVariant } from '../types/SpotlightTour.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';
import { zIndex } from '../tokens/z-index';

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

/**
 * Builds the SVG overlay style (fixed fullscreen).
 */
export function buildSpotlightOverlayStyle(): CSSStyleObject {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: zIndex.overlay,
    pointerEvents: 'auto',
  };
}

// ---------------------------------------------------------------------------
// Popover panel
// ---------------------------------------------------------------------------

/**
 * Builds the step popover panel style.
 */
export function buildSpotlightPopoverStyle(
  themeColors: ThemeColors,
  _variant: SpotlightTourVariant,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: defaultSpacing.sm,
    padding: defaultSpacing.lg,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: defaultRadii.lg,
    fontFamily: fontFamilyStacks.sans,
    maxWidth: 360,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
    animation: 'wisp-spotlight-in 200ms ease-out',
    zIndex: zIndex.tooltip,
  };
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

/**
 * Builds the title style.
 */
export function buildSpotlightTitleStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.base.fontSize,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: 1.4,
    color: themeColors.text.primary,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Description
// ---------------------------------------------------------------------------

/**
 * Builds the description style.
 */
export function buildSpotlightDescriptionStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.sm.fontSize,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: 1.46,
    color: themeColors.text.secondary,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Builds the footer style (step count + nav buttons).
 */
export function buildSpotlightFooterStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: defaultSpacing.sm,
    marginTop: defaultSpacing.xs,
  };
}

// ---------------------------------------------------------------------------
// Step counter
// ---------------------------------------------------------------------------

/**
 * Builds the step counter text style.
 */
export function buildSpotlightStepCountStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontWeight: defaultTypography.weights.medium,
    color: themeColors.text.muted,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Navigation buttons
// ---------------------------------------------------------------------------

/**
 * Builds the navigation button style (prev/next/finish).
 */
export function buildSpotlightNavButtonStyle(
  themeColors: ThemeColors,
  primary: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    padding: `${defaultSpacing.sm}px ${defaultSpacing.lg}px`,
    fontSize: defaultTypography.sizes.sm.fontSize,
    fontWeight: defaultTypography.weights.medium,
    lineHeight: 1,
    borderRadius: defaultRadii.md,
    border: primary ? 'none' : `1px solid ${themeColors.border.subtle}`,
    backgroundColor: primary ? themeColors.text.primary : 'transparent',
    color: primary ? themeColors.background.canvas : themeColors.text.primary,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'opacity 150ms ease',
  };
}
