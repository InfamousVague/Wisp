import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';

// ---------------------------------------------------------------------------
// Divider container
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the new-message divider wrapper.
 *
 * Renders as a horizontal line with a centered label.
 */
export function buildNewMessageDividerStyle(): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 0',
  };
}

// ---------------------------------------------------------------------------
// Line segment
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for one of the two line segments flanking the label.
 *
 * @param color - Line color (typically `status.danger`).
 */
export function buildLineStyle(color: string): CSSStyleObject {
  return {
    flex: 1,
    height: 1,
    backgroundColor: color,
  };
}

// ---------------------------------------------------------------------------
// Label text
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the centered label text (e.g. "New").
 *
 * @param color - Label text color (typically matches the line color).
 */
export function buildLabelStyle(color: string): CSSStyleObject {
  return {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 600,
    fontFamily: fontFamilyStacks.sans,
    color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    flexShrink: 0,
    userSelect: 'none',
  };
}
