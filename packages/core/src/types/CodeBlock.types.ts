/**
 * @module CodeBlock
 */
import type React from 'react';

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

/** Available code block visual variants. */
export const codeBlockVariants = ['default', 'outlined'] as const;

/** Union of valid code block variant values. */
export type CodeBlockVariant = (typeof codeBlockVariants)[number];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props accepted by the {@link CodeBlock} component.
 *
 * @remarks
 * Renders a `<pre><code>` block with optional line numbers,
 * line highlighting, copy-to-clipboard button, and max-height scrolling.
 * Uses monospace font from the Wisp token system.
 */
export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  /**
   * The code string to display.
   */
  code: string;

  /**
   * Language label displayed in the header (purely cosmetic — no syntax highlighting).
   */
  language?: string;

  /**
   * When `true`, displays line numbers in a left gutter.
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Array of 1-based line numbers to highlight with a subtle background tint.
   */
  highlightLines?: number[];

  /**
   * When `true`, shows a copy button in the top-right corner.
   * @default true
   */
  copyable?: boolean;

  /**
   * Maximum height before the code block becomes scrollable.
   */
  maxHeight?: number | string;

  /**
   * Visual variant.
   * @default 'default'
   */
  variant?: CodeBlockVariant;
}
