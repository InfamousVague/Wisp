/**
 * @module CodeBlock
 */
import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import type { CodeBlockProps } from '@wisp-ui/core/types/CodeBlock.types';
import {
  buildCodeBlockWrapperStyle,
  buildCodeBlockHeaderStyle,
  buildCodeBlockPreStyle,
  buildCodeBlockLineStyle,
  buildCodeBlockLineNumberStyle,
  buildCodeBlockCopyButtonStyle,
} from '@wisp-ui/core/styles/CodeBlock.styles';
import { useThemeColors } from '../../providers';

/**
 * CodeBlock — Monospace code display primitive for the Wisp design system.
 *
 * @remarks
 * Renders a `<pre><code>` block with optional line numbers, line highlighting,
 * copy-to-clipboard button, and max-height scrolling.
 *
 * - Two variants: `default` (dark surface) and `outlined` (transparent + border).
 * - No external syntax highlighting dependency — plain monospace text.
 * - Copy button uses the Clipboard API.
 *
 * @module primitives/code-block
 *
 * @example
 * ```tsx
 * <CodeBlock code="const x = 42;" language="TypeScript" copyable />
 *
 * <CodeBlock
 *   code={multiLineCode}
 *   showLineNumbers
 *   highlightLines={[2, 5]}
 *   maxHeight={300}
 * />
 * ```
 */
export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  function CodeBlock(
    {
      code,
      language,
      showLineNumbers = false,
      highlightLines,
      copyable = true,
      maxHeight,
      variant = 'default',
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const [copied, setCopied] = useState(false);

    const highlightSet = useMemo(
      () => new Set(highlightLines ?? []),
      [highlightLines],
    );

    const wrapperStyle = useMemo(
      () => buildCodeBlockWrapperStyle(variant, themeColors, maxHeight),
      [variant, themeColors, maxHeight],
    );

    const headerStyle = useMemo(
      () => buildCodeBlockHeaderStyle(variant, themeColors),
      [variant, themeColors],
    );

    const preStyle = useMemo(
      () => buildCodeBlockPreStyle(maxHeight),
      [maxHeight],
    );

    const lineNumberStyle = useMemo(
      () => buildCodeBlockLineNumberStyle(variant, themeColors),
      [variant, themeColors],
    );

    const copyBtnStyle = useMemo(
      () => buildCodeBlockCopyButtonStyle(variant, themeColors),
      [variant, themeColors],
    );

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback — silent fail
      }
    }, [code]);

    const lines = code.split('\n');
    const showHeader = language || copyable;

    return (
      <div style={{ ...wrapperStyle, ...userStyle }} className={className}>
        {showHeader && (
          <div style={headerStyle}>
            <span>{language ?? ''}</span>
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                style={copyBtnStyle}
                aria-label="Copy code"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
        )}
        <pre ref={ref} style={preStyle} {...rest}>
          <code>
            {lines.map((line: string, i: number) => {
              const lineNum = i + 1;
              const isHighlighted = highlightSet.has(lineNum);
              const lineStyle = buildCodeBlockLineStyle(isHighlighted, variant, themeColors);

              return (
                <div key={i} style={lineStyle}>
                  {showLineNumbers && (
                    <span style={lineNumberStyle}>{lineNum}</span>
                  )}
                  <span style={{ flex: 1 }}>{line || '\n'}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
