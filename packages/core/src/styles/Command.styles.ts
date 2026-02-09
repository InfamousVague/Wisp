/**
 * Style builders for the Wisp Command palette primitive.
 *
 * @module primitives/command/styles
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { CommandSize } from '../types/Command.types';
import { commandSizeMap } from '../types/Command.types';
import { fontFamilyStacks, glassStyle } from '../tokens/shared';
import type { SurfaceVariant } from '../tokens/shared';

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

export function buildOverlayStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1300,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '20vh',
    backgroundColor: themeColors.background.overlay,
  };
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

export function buildPanelStyle(
  size: CommandSize,
  themeColors: ThemeColors,
  variant: SurfaceVariant = 'solid',
): CSSStyleObject {
  const base: CSSStyleObject = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: commandSizeMap[size],
    maxHeight: 420,
    backgroundColor: themeColors.background.raised,
    border: `1px solid ${themeColors.border.subtle}`,
    borderRadius: 12,
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
    outline: 'none',
    overflow: 'hidden',
    fontFamily: fontFamilyStacks.sans,
  };

  if (variant === 'glass') {
    return { ...base, ...glassStyle, borderRadius: 12, overflow: 'hidden' };
  }

  return base;
}

// ---------------------------------------------------------------------------
// Input wrapper
// ---------------------------------------------------------------------------

export function buildInputWrapperStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: '12px 16px',
    borderBottom: `1px solid ${themeColors.border.subtle}`,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

export function buildInputStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: themeColors.text.onRaised,
    fontSize: 16,
    lineHeight: '24px',
    fontFamily: fontFamilyStacks.sans,
    padding: 0,
    margin: 0,
  };
}

// ---------------------------------------------------------------------------
// Input icon
// ---------------------------------------------------------------------------

export function buildInputIconStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: themeColors.text.onRaisedSecondary,
  };
}

// ---------------------------------------------------------------------------
// List container
// ---------------------------------------------------------------------------

export function buildListStyle(): CSSStyleObject {
  return {
    overflowY: 'auto',
    maxHeight: 320,
    padding: '8px 0',
    flex: 1,
  };
}

// ---------------------------------------------------------------------------
// Group heading
// ---------------------------------------------------------------------------

export function buildGroupHeadingStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    padding: '8px 16px 4px',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: '16px',
    color: themeColors.text.onRaisedSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: fontFamilyStacks.sans,
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

export function buildItemStyle(
  themeColors: ThemeColors,
  isActive: boolean,
  isDisabled: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    cursor: isDisabled ? 'default' : 'pointer',
    backgroundColor: isActive ? themeColors.accent.highlightRaised : 'transparent',
    color: isDisabled ? themeColors.text.onRaisedSecondary : themeColors.text.onRaised,
    opacity: isDisabled ? 0.5 : 1,
    transition: 'background-color 100ms ease',
    fontFamily: fontFamilyStacks.sans,
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Item icon
// ---------------------------------------------------------------------------

export function buildItemIconStyle(
  themeColors: ThemeColors,
  isDisabled: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: 20,
    height: 20,
    color: isDisabled ? themeColors.text.onRaisedSecondary : themeColors.text.onRaisedSecondary,
  };
}

// ---------------------------------------------------------------------------
// Item label area
// ---------------------------------------------------------------------------

export function buildItemLabelStyle(): CSSStyleObject {
  return {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };
}

// ---------------------------------------------------------------------------
// Item description
// ---------------------------------------------------------------------------

export function buildItemDescriptionStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    fontSize: 12,
    lineHeight: '16px',
    color: themeColors.text.onRaisedSecondary,
  };
}

// ---------------------------------------------------------------------------
// Item shortcut
// ---------------------------------------------------------------------------

export function buildItemShortcutStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    marginLeft: 'auto',
    fontSize: 12,
    lineHeight: '16px',
    color: themeColors.text.onRaisedSecondary,
    fontFamily: fontFamilyStacks.sans,
    display: 'flex',
    gap: 4,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Shortcut key
// ---------------------------------------------------------------------------

export function buildShortcutKeyStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 20,
    height: 20,
    padding: '0 4px',
    fontSize: 11,
    fontWeight: 500,
    lineHeight: '20px',
    borderRadius: 4,
    backgroundColor: themeColors.accent.dividerRaised,
    color: themeColors.text.onRaisedSecondary,
  };
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function buildSeparatorStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    height: 1,
    margin: '4px 0',
    backgroundColor: themeColors.accent.dividerRaised,
  };
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

export function buildEmptyStyle(themeColors: ThemeColors): CSSStyleObject {
  return {
    padding: '32px 16px',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: '20px',
    color: themeColors.text.onRaisedSecondary,
    fontFamily: fontFamilyStacks.sans,
  };
}

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

export function buildLoadingStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
  };
}
