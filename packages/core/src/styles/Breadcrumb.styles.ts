import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { BreadcrumbSizeConfig } from '../types/Breadcrumb.types';
import { defaultSpacing, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Nav wrapper style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the breadcrumb `nav` wrapper.
 *
 * @returns A `CSSStyleObject` object for the `nav` element.
 */
export function buildNavStyle(): CSSStyleObject {
  return {
    display: 'block',
  };
}

// ---------------------------------------------------------------------------
// Ordered list style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the breadcrumb ordered list (`ol`).
 *
 * @param sizeConfig - Size configuration containing font-size values.
 * @returns A `CSSStyleObject` object for the `ol` element.
 */
export function buildListStyle(
  sizeConfig: BreadcrumbSizeConfig,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontSize: sizeConfig.fontSize,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Item wrapper (li) style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for a breadcrumb item `li` wrapper.
 *
 * @returns A `CSSStyleObject` object for the `li` element.
 */
export function buildItemStyle(): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
  };
}

// ---------------------------------------------------------------------------
// Link style (non-active items)
// ---------------------------------------------------------------------------

/**
 * Builds the default (non-hovered) style for a clickable breadcrumb item.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the inner `a` or `button`.
 */
export function buildLinkStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    color: themeColors.text.secondary,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    margin: 0,
    font: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
  };
}

// ---------------------------------------------------------------------------
// Link hover style
// ---------------------------------------------------------------------------

/**
 * Builds the hover-state style overrides for a clickable breadcrumb item.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object merged on top of the base link style on hover.
 */
export function buildLinkHoverStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    color: themeColors.text.primary,
  };
}

// ---------------------------------------------------------------------------
// Active item style (current page)
// ---------------------------------------------------------------------------

/**
 * Builds the style for the active breadcrumb item representing the current page.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the active `span`.
 */
export function buildActiveStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    color: themeColors.text.primary,
    fontWeight: defaultTypography.weights.medium,
    display: 'inline-flex',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    cursor: 'default',
  };
}

// ---------------------------------------------------------------------------
// Separator style
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for a breadcrumb separator element.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the separator `li`.
 */
export function buildSeparatorStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    color: themeColors.text.muted,
    padding: '0 6px',
    display: 'inline-flex',
    alignItems: 'center',
    userSelect: 'none',
  };
}
