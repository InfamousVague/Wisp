/**
 * Style builders for the Wisp Dialog primitive.
 *
 * @module primitives/dialog/styles
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { DialogSize } from '../types/Dialog.types';
import { dialogSizeMap } from '../types/Dialog.types';
import { fontFamilyStacks, glassStyle } from '../tokens/shared';
import type { SurfaceVariant } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';
import { zIndex } from '../tokens/z-index';
import { durations, easings } from '../tokens/motion';

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the full-viewport overlay backdrop.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the overlay element.
 */
export function buildOverlayStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: zIndex.modal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.background.overlay,
    padding: defaultSpacing.xl,
  };
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the dialog panel container.
 *
 * @param size - The width preset (maps to a max-width value).
 * @param themeColors - Resolved theme colour tokens.
 * @param variant - Surface variant (`'solid'` | `'glass'`). Defaults to `'solid'`.
 * @returns A `CSSStyleObject` object for the panel element.
 */
export function buildPanelStyle(
  size: DialogSize,
  themeColors: ThemeColors,
  variant: SurfaceVariant = 'solid',
  forceMode?: boolean,
): CSSStyleObject {
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: dialogSizeMap[size],
    maxHeight: 'calc(100vh - 48px)',
    // When forceMode is active the dialog creates its own theme context;
    // use the deepest `canvas` background instead of `raised` so the
    // panel appears as a true root surface of that context.
    backgroundColor: forceMode
      ? themeColors.background.canvas
      : themeColors.background.raised,
    border: '1px solid ' + themeColors.accent.dividerRaised,
    borderRadius: defaultRadii.xl,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    outline: 'none',
    overflow: 'hidden',
    ...(variant === 'glass' ? glassStyle : undefined),
  };
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the dialog header row (title + close button).
 *
 * @returns A `CSSStyleObject` object for the header container.
 */
export function buildHeaderStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: `${defaultSpacing.xl}px ${defaultSpacing.xl}px ${defaultSpacing.lg}px ${defaultSpacing.xl}px`,
    gap: defaultSpacing.md,
    flexShrink: 0,
  };
}

/**
 * Builds inline styles for the dialog title heading.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the title element.
 */
export function buildTitleStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    margin: 0,
    fontFamily: fontFamilyStacks.sans,
    fontSize: defaultTypography.sizes.lg.fontSize,
    fontWeight: defaultTypography.weights.semibold,
    lineHeight: defaultTypography.sizes.lg.lineHeight,
    color: themeColors.text.onRaised,
  };
}

/**
 * Builds inline styles for the optional description paragraph below the title.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the description element.
 */
export function buildDescriptionStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    margin: `${defaultSpacing.xs}px 0 0 0`,
    fontFamily: fontFamilyStacks.sans,
    fontSize: defaultTypography.sizes.sm.fontSize,
    fontWeight: defaultTypography.weights.regular,
    lineHeight: defaultTypography.sizes.sm.lineHeight,
    color: themeColors.text.onRaisedSecondary,
  };
}

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the close (X) button in its default state.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the close button.
 */
export function buildCloseButtonStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 0,
    margin: 0,
    border: 'none',
    borderRadius: defaultRadii.md,
    backgroundColor: 'transparent',
    color: themeColors.text.onRaisedSecondary,
    cursor: 'pointer',
    flexShrink: 0,
    marginLeft: defaultSpacing.sm,
    transition: `background-color ${durations.fast}ms ${easings.easeOut.css}, color ${durations.fast}ms ${easings.easeOut.css}`,
  };
}

/**
 * Builds inline style overrides for the close button on hover.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object to merge on hover.
 */
export function buildCloseButtonHoverStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    backgroundColor: themeColors.accent.highlight,
    color: themeColors.text.onRaised,
  };
}

// ---------------------------------------------------------------------------
// Body
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the scrollable body area of the dialog.
 *
 * @returns A `CSSStyleObject` object for the body container.
 */
export function buildBodyStyle(): CSSStyleObject {
  return {
    padding: defaultSpacing.xl,
    overflowY: 'auto',
    flex: 1,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the dialog footer (action buttons row).
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the footer container.
 */
export function buildFooterStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: defaultSpacing.sm,
    padding: `${defaultSpacing.lg}px ${defaultSpacing.xl}px`,
    borderTop: '1px solid ' + themeColors.accent.dividerRaised,
    flexShrink: 0,
  };
}
