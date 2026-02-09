import React, { forwardRef, useMemo } from 'react';
import type { ColorSwatchProps } from '@wisp-ui/core/types/ColorSwatch.types';
import { colorSwatchSizeMap } from '@wisp-ui/core/types/ColorSwatch.types';
import {
  buildSwatchStyle,
  buildCheckerboardStyle,
  buildColorOverlayStyle,
} from '@wisp-ui/core/styles/ColorSwatch.styles';
import { useThemeColors } from '../../providers';

/**
 * ColorSwatch — Displays a color sample for the Wisp design system.
 *
 * @remarks
 * Renders a small colored box or circle to preview a CSS color value.
 * Key features:
 * - Four size presets (`sm`, `md`, `lg`, `xl`) and three shapes (`circle`, `square`, `rounded`).
 * - Optional border for contrast against matching backgrounds.
 * - Checkerboard transparency pattern for semi-transparent colours.
 * - Forwards a ref to the outer `<div>` wrapper.
 *
 * @module primitives/color-swatch
 * @example
 * ```tsx
 * <ColorSwatch color="#3B82F6" />
 * <ColorSwatch color="rgba(59, 130, 246, 0.5)" checkerboard />
 * <ColorSwatch color="#10B981" size="lg" shape="rounded" />
 * ```
 */
export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(function ColorSwatch(
  {
    color,
    size = 'md',
    shape = 'circle',
    bordered = true,
    checkerboard = false,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = colorSwatchSizeMap[size];

  // -----------------------------------------------------------------------
  // Checkerboard mode — outer wrapper with pattern, inner overlay with color
  // -----------------------------------------------------------------------

  const checkerboardWrapperStyle = useMemo(
    () => (checkerboard ? buildCheckerboardStyle(sizeConfig, shape, themeColors) : undefined),
    [checkerboard, sizeConfig, shape, themeColors],
  );

  const colorOverlayStyle = useMemo(
    () => (checkerboard ? buildColorOverlayStyle(color, bordered, themeColors) : undefined),
    [checkerboard, color, bordered, themeColors],
  );

  if (checkerboard) {
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...checkerboardWrapperStyle, ...userStyle }}
        {...rest}
      >
        <div style={colorOverlayStyle} />
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Standard mode — single element with the color
  // -----------------------------------------------------------------------

  const swatchStyle = useMemo(
    () => buildSwatchStyle(sizeConfig, color, shape, bordered, false, themeColors),
    [sizeConfig, color, shape, bordered, themeColors],
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...swatchStyle, ...userStyle }}
      {...rest}
    />
  );
});

ColorSwatch.displayName = 'ColorSwatch';
