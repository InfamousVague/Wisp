/**
 * Style builders for the Wisp Accordion primitive.
 *
 * @module primitives/accordion/styles
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import { defaultSpacing, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Accordion root
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the root accordion container.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @param userStyle - Optional consumer-provided style overrides.
 * @returns A `CSSStyleObject` object for the accordion root.
 */
export function buildAccordionStyle(
  themeColors: ThemeColors,
  userStyle?: CSSStyleObject,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    ...userStyle,
  };
}

// ---------------------------------------------------------------------------
// AccordionItem
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for an individual accordion item wrapper.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the item element.
 */
export function buildItemStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    borderBottom: '1px solid ' + themeColors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// AccordionTrigger
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the accordion trigger button.
 *
 * @param isOpen - Whether the parent item is currently expanded.
 * @param isDisabled - Whether the item is disabled.
 * @param isHovered - Whether the button is currently hovered.
 * @param themeColors - Resolved theme colour tokens.
 * @param userStyle - Optional consumer-provided style overrides.
 * @returns A `CSSStyleObject` object for the trigger button.
 */
export function buildTriggerStyle(
  isOpen: boolean,
  isDisabled: boolean,
  isHovered: boolean,
  themeColors: ThemeColors,
  userStyle?: CSSStyleObject,
): CSSStyleObject {
  const color = isDisabled
    ? themeColors.text.primary
    : isHovered
      ? themeColors.text.secondary
      : themeColors.text.primary;

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${defaultSpacing.md}px 0`,
    background: 'none',
    border: 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    color,
    fontWeight: defaultTypography.weights.medium,
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: 1.43,
    gap: defaultSpacing.sm,
    opacity: isDisabled ? 0.5 : 1,
    outline: 'none',
    textAlign: 'left',
    transition: 'color 150ms ease',
    userSelect: 'none',
    ...userStyle,
  };
}

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the default chevron icon, rotating it when open.
 *
 * @param isOpen - Whether the parent item is currently expanded.
 * @returns A `CSSStyleObject` object for the chevron SVG wrapper.
 */
export function buildChevronStyle(
  isOpen: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'transform 200ms ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };
}

// ---------------------------------------------------------------------------
// AccordionContent
// ---------------------------------------------------------------------------

/**
 * Builds inline styles for the collapsible content region, animating
 * `max-height` between `0` and the measured content height.
 *
 * @param isOpen - Whether the parent item is currently expanded.
 * @param measuredHeight - The measured `scrollHeight` of the content in pixels.
 * @param themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the content wrapper.
 */
export function buildContentStyle(
  isOpen: boolean,
  measuredHeight: number,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    overflow: 'hidden',
    transition:
      'max-height 250ms cubic-bezier(0.4, 0, 0.2, 1), padding-bottom 250ms cubic-bezier(0.4, 0, 0.2, 1)',
    maxHeight: isOpen ? measuredHeight : 0,
    paddingBottom: isOpen ? 12 : 0,
    color: themeColors.text.secondary,
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: 1.57,
  };
}
