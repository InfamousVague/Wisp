/**
 * @module ContextMenu
 */
import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import { fontFamilyStacks } from '../tokens/shared';

// ---------------------------------------------------------------------------
// Content (dropdown panel)
// ---------------------------------------------------------------------------

export function buildContextMenuContentStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    position: 'fixed',
    zIndex: 9999,
    minWidth: 180,
    padding: '4px 0',
    backgroundColor: themeColors.background.raised,
    border: `1px solid ${themeColors.accent.dividerRaised}`,
    borderRadius: 8,
    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
    fontFamily: fontFamilyStacks.sans,
    outline: 'none',
  };
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

export function buildContextMenuItemStyle(
  destructive: boolean,
  disabled: boolean,
  themeColors: ThemeColors,
): CSSStyleObject {
  const textColor = destructive
    ? themeColors.status.danger
    : themeColors.text.onRaised;

  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 12px',
    fontSize: 13,
    lineHeight: 1.4,
    fontFamily: fontFamilyStacks.sans,
    color: disabled ? themeColors.text.muted : textColor,
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    transition: 'background-color 100ms ease',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    opacity: disabled ? 0.5 : 1,
  };
}

export function buildContextMenuItemHoverStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    backgroundColor: themeColors.accent.highlightRaised,
  };
}

// ---------------------------------------------------------------------------
// Shortcut label
// ---------------------------------------------------------------------------

export function buildContextMenuShortcutStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    marginLeft: 'auto',
    fontSize: 11,
    color: themeColors.accent.mutedRaised,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function buildContextMenuSeparatorStyle(
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    height: 1,
    margin: '4px 0',
    backgroundColor: themeColors.accent.dividerRaised,
  };
}
