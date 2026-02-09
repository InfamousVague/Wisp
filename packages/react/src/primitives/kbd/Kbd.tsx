import React, { forwardRef, useMemo } from 'react';
import type { KbdProps } from '@wisp-ui/core/types/Kbd.types';
import { kbdSizeMap } from '@wisp-ui/core/types/Kbd.types';
import { buildKbdStyle } from '@wisp-ui/core/styles/Kbd.styles';
import { useThemeColors } from '../../providers';

/**
 * Kbd — Keyboard shortcut display primitive for the Wisp design system.
 *
 * @remarks
 * Renders a styled `<kbd>` element that visually represents a keyboard key
 * or key combination. Supports three sizes (`sm`, `md`, `lg`) and adapts to
 * the active theme. A subtle keycap shadow gives the element a physical
 * key appearance.
 *
 * @module primitives/kbd
 * @example
 * ```tsx
 * <Kbd>⌘K</Kbd>
 * <Kbd size="sm">Esc</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  {
    children,
    size = 'md',
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = kbdSizeMap[size];

  const kbdStyle = useMemo(
    () => buildKbdStyle(sizeConfig, themeColors),
    [sizeConfig, themeColors],
  );

  return (
    <kbd
      ref={ref}
      className={className}
      style={{ ...kbdStyle, ...userStyle }}
      {...rest}
    >
      {children}
    </kbd>
  );
});

Kbd.displayName = 'Kbd';
