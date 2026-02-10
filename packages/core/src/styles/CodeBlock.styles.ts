/**
 * @module CodeBlock
 */
import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { CodeBlockVariant } from '../types/CodeBlock.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Wrapper style (<div> around everything)
// ---------------------------------------------------------------------------

/**
 * Builds the outer wrapper style for the code block.
 */
export function buildCodeBlockWrapperStyle(
  variant: CodeBlockVariant,
  themeColors: ThemeColors,
  maxHeight?: number | string,
): CSSStyleObject {
  const base: CSSStyleObject = {
    position: 'relative',
    borderRadius: defaultRadii.md,
    overflow: 'hidden',
    fontFamily: fontFamilyStacks.mono,
    fontSize: defaultTypography.sizes.sm.fontSize,
    lineHeight: 1.6,
  };

  if (variant === 'outlined') {
    return {
      ...base,
      backgroundColor: 'transparent',
      border: `1px solid ${themeColors.border.strong}`,
      color: themeColors.text.primary,
    };
  }

  // default
  return {
    ...base,
    backgroundColor: themeColors.background.raised,
    border: 'none',
    color: themeColors.text.onRaised,
  };
}

// ---------------------------------------------------------------------------
// Header style (language label row)
// ---------------------------------------------------------------------------

/**
 * Builds styles for the optional header row showing language label.
 */
export function buildCodeBlockHeaderStyle(
  variant: CodeBlockVariant,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${defaultSpacing.sm}px ${defaultSpacing.md}px`,
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontWeight: defaultTypography.weights.medium,
    fontFamily: fontFamilyStacks.sans,
    color: variant === 'outlined'
      ? themeColors.text.secondary
      : themeColors.text.onRaisedSecondary,
    borderBottom: variant === 'outlined'
      ? `1px solid ${themeColors.border.subtle}`
      : `1px solid ${themeColors.accent.dividerRaised}`,
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Pre / code area style
// ---------------------------------------------------------------------------

/**
 * Builds styles for the `<pre>` element containing the code.
 */
export function buildCodeBlockPreStyle(
  maxHeight?: number | string,
): CSSStyleObject {
  return {
    margin: 0,
    padding: `${defaultSpacing.md}px ${defaultSpacing.lg}px`,
    overflow: 'auto',
    maxHeight: maxHeight ?? undefined,
    tabSize: 2,
  };
}

// ---------------------------------------------------------------------------
// Line style
// ---------------------------------------------------------------------------

/**
 * Builds style for a single line of code.
 */
export function buildCodeBlockLineStyle(
  highlighted: boolean,
  variant: CodeBlockVariant,
  themeColors: ThemeColors,
): CSSStyleObject {
  if (!highlighted) {
    return {
      display: 'flex',
      minHeight: '1.6em',
    };
  }

  return {
    display: 'flex',
    minHeight: '1.6em',
    backgroundColor: variant === 'outlined'
      ? themeColors.accent.highlight
      : themeColors.accent.highlightRaised,
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: defaultSpacing.lg,
    paddingRight: defaultSpacing.lg,
    borderLeft: `2px solid ${variant === 'outlined' ? themeColors.accent.primary : themeColors.accent.primary}`,
  };
}

// ---------------------------------------------------------------------------
// Line number style
// ---------------------------------------------------------------------------

/**
 * Builds style for the line number gutter element.
 */
export function buildCodeBlockLineNumberStyle(
  variant: CodeBlockVariant,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-block',
    width: '3ch',
    marginRight: defaultSpacing.lg,
    textAlign: 'right',
    userSelect: 'none',
    color: variant === 'outlined'
      ? themeColors.text.muted
      : themeColors.accent.mutedRaised,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Copy button style
// ---------------------------------------------------------------------------

/**
 * Builds style for the copy-to-clipboard button.
 */
export function buildCodeBlockCopyButtonStyle(
  variant: CodeBlockVariant,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${defaultSpacing.xs}px ${defaultSpacing.sm}px`,
    border: 'none',
    borderRadius: defaultRadii.sm,
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontFamily: fontFamilyStacks.sans,
    fontWeight: defaultTypography.weights.medium,
    cursor: 'pointer',
    backgroundColor: variant === 'outlined'
      ? themeColors.accent.highlight
      : themeColors.accent.highlightRaised,
    color: variant === 'outlined'
      ? themeColors.text.secondary
      : themeColors.text.onRaisedSecondary,
    transition: 'background-color 150ms ease, color 150ms ease',
    outline: 'none',
    lineHeight: 1,
  };
}
