/**
 * @module components/spotlight-tour
 * @description Style builders for the Wisp SpotlightTour component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { SpotlightTourVariant } from '../types/SpotlightTour.types';
import { fontFamilyStacks } from '../tokens/shared';

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
    zIndex: 9997,
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
    gap: 8,
    padding: 16,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: 10,
    fontFamily: fontFamilyStacks.sans,
    maxWidth: 360,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
    animation: 'wisp-spotlight-in 200ms ease-out',
    zIndex: 9999,
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
    fontSize: 15,
    fontWeight: 600,
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
    fontSize: 13,
    fontWeight: 400,
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
    gap: 8,
    marginTop: 4,
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
    fontSize: 12,
    fontWeight: 500,
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
    gap: 4,
    padding: '5px 14px',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    borderRadius: 6,
    border: primary ? 'none' : `1px solid ${themeColors.border.subtle}`,
    backgroundColor: primary ? themeColors.text.primary : 'transparent',
    color: primary ? themeColors.background.canvas : themeColors.text.primary,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'opacity 150ms ease',
  };
}
