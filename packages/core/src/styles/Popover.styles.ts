/**
 * Style builders for the Wisp Popover primitive.
 *
 * @module primitives/popover/styles
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import { fontFamilyStacks, glassStyle } from '../tokens/shared';
import type { SurfaceVariant } from '../tokens/shared';
import { defaultSpacing, defaultRadii } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Content panel style
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the popover content panel.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @param variant - Surface variant (`'solid'` | `'glass'`). Defaults to `'solid'`.
 * @param userStyle - Optional consumer-provided style overrides.
 * @returns A `CSSStyleObject` object for the content container.
 */
export function buildContentStyle(
  themeColors: ThemeColors,
  variant: SurfaceVariant = 'solid',
  userStyle?: CSSStyleObject,
): CSSStyleObject {
  return {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: defaultRadii.md,
    boxShadow: `0 4px 12px ${themeColors.background.overlay}`,
    padding: defaultSpacing.md,
    boxSizing: 'border-box',
    fontFamily: fontFamilyStacks.sans,
    color: themeColors.text.primary,
    outline: 'none',
    ...(variant === 'glass' ? glassStyle : undefined),
    ...userStyle,
  };
}

// ---------------------------------------------------------------------------
// Click-outside overlay style
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the transparent click-outside overlay.
 *
 * @returns A `CSSStyleObject` object covering the full viewport.
 */
export function buildOverlayStyle(): CSSStyleObject {
  return {
    position: 'fixed',
    inset: 0,
    zIndex: 9998,
    background: 'transparent',
  };
}
