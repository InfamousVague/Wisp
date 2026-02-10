/**
 * @module DropdownMenu.styles
 * @description Style builders for the Wisp DropdownMenu primitive.
 */

import type React from "react";
import type { CSSStyleObject } from "../types";
import type { ThemeColors } from "../theme/types";
import { fontFamilyStacks, glassStyle } from "../tokens/shared";
import type { SurfaceVariant } from "../tokens/shared";

/**
 * Builds the style for the dropdown content panel (the floating menu container).
 *
 * @param themeColors - Resolved theme color tokens.
 * @param variant - Surface variant (`'solid'` | `'glass'`). Defaults to `'solid'`.
 * @returns A `CSSStyleObject` object with absolute positioning, shadow, border, and background.
 */
export function buildContentStyle(
  themeColors: ThemeColors,
  variant: SurfaceVariant = 'solid',
): CSSStyleObject {
  return {
    position: "absolute",
    zIndex: 9999,
    minWidth: 180,
    padding: 4,
    backgroundColor: themeColors.background.canvas,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: 8,
    boxShadow: `0 4px 12px ${themeColors.background.overlay}`,
    outline: "none",
    fontFamily: fontFamilyStacks.sans,
    boxSizing: "border-box",
    color: themeColors.text.primary,
    ...(variant === 'glass' ? glassStyle : undefined),
  };
}

/**
 * Builds the style for an individual dropdown menu item.
 *
 * @param opts - Configuration object.
 * @param opts.themeColors - Resolved theme color tokens.
 * @param opts.disabled - Whether the item is non-interactive.
 * @param opts.danger - Whether the item represents a destructive action.
 * @param opts.isActive - Whether the item is currently hovered or keyboard-focused.
 * @returns A `CSSStyleObject` object with background, text color, cursor, and opacity
 *   adjusted based on the active, disabled, and danger states.
 */
export function buildItemStyle(opts: {
  themeColors: ThemeColors;
  disabled: boolean;
  danger: boolean;
  isActive: boolean;
}): CSSStyleObject {
  const { themeColors, disabled, danger, isActive } = opts;

  let backgroundColor = "transparent";
  let color = themeColors.text.primary;

  if (danger) {
    color = themeColors.status.danger;
    if (isActive && !disabled) {
      backgroundColor = themeColors.status.dangerSurface;
    }
  } else if (isActive && !disabled) {
    backgroundColor = themeColors.accent.highlight;
  }

  if (disabled) {
    color = themeColors.text.muted;
  }

  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "8px 12px",
    margin: 0,
    border: "none",
    borderRadius: 4,
    backgroundColor,
    color,
    fontSize: 14,
    lineHeight: "20px",
    fontFamily: fontFamilyStacks.sans,
    fontWeight: 400,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    outline: "none",
    textAlign: "left",
    textDecoration: "none",
    userSelect: "none",
    boxSizing: "border-box",
    gap: 8,
    transition: "background-color 120ms ease",
  };
}

/**
 * Builds the style for the leading icon slot inside a menu item.
 *
 * @returns A `CSSStyleObject` object that centers and constrains the icon to 16x16px.
 */
export function buildItemIconStyle(): CSSStyleObject {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    flexShrink: 0,
  };
}

/**
 * Builds the style for the trailing keyboard-shortcut label inside a menu item.
 *
 * @param themeColors - Resolved theme color tokens.
 * @returns A `CSSStyleObject` object with muted color and smaller font size.
 */
export function buildShortcutStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    marginLeft: "auto",
    paddingLeft: 16,
    fontSize: 12,
    lineHeight: "16px",
    color: themeColors.text.muted,
    fontFamily: fontFamilyStacks.sans,
    flexShrink: 0,
  };
}

/**
 * Builds the style for a horizontal separator line between menu item groups.
 *
 * @param themeColors - Resolved theme color tokens.
 * @returns A `CSSStyleObject` object rendering a 1px themed divider.
 */
export function buildSeparatorStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    height: 1,
    margin: "4px 0",
    backgroundColor: themeColors.border.subtle,
    border: "none",
  };
}
