import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { X } from 'lucide-react';
import type { ChipProps } from '@wisp-ui/core/types/Chip.types';
import { chipSizeMap } from '@wisp-ui/core/types/Chip.types';
import {
  buildChipStyle,
  buildIconWrapperStyle,
  buildRemoveButtonStyle,
  getRemoveButtonHoverBg,
  resolveChipColors,
} from '@wisp-ui/core/styles/Chip.styles';
import { useThemeColors } from '../../providers';

/**
 * Chip — Compact interactive tag/token primitive for the Wisp design system.
 *
 * @remarks
 * Key features:
 * - Five semantic color variants: `default`, `success`, `warning`, `danger`, `info`
 * - Three style variants: `filled`, `outlined`, `subtle`
 * - Three sizes (`sm`, `md`, `lg`) via {@link ChipProps.size}
 * - Optional leading icon via {@link ChipProps.icon}
 * - Removable mode with an X button via {@link ChipProps.removable}
 * - Clickable mode with hover/cursor effects via {@link ChipProps.clickable}
 * - Disabled state dims the chip and blocks interaction
 *
 * @module primitives/chip
 * @example
 * ```tsx
 * <Chip color="success">Active</Chip>
 * <Chip color="danger" removable onRemove={() => {}}>Error</Chip>
 * <Chip clickable icon={<Star size={14} />}>Featured</Chip>
 * ```
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  {
    children,
    size = 'md',
    color = 'default',
    variant = 'filled',
    removable = false,
    onRemove,
    clickable = false,
    icon,
    disabled = false,
    style: userStyle,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = chipSizeMap[size];

  // Resolve variant + color -> final palette
  const colors = useMemo(
    () => resolveChipColors(color, variant, themeColors),
    [color, variant, themeColors],
  );

  // Build container style
  const chipStyle = useMemo(
    () => buildChipStyle({ sizeConfig, colors, clickable, disabled }),
    [sizeConfig, colors, clickable, disabled],
  );

  // Build icon wrapper style
  const iconWrapperStyle = useMemo(
    () => buildIconWrapperStyle(sizeConfig),
    [sizeConfig],
  );

  // Build remove button style
  const removeStyle = useMemo(
    () => buildRemoveButtonStyle(sizeConfig, colors, themeColors),
    [sizeConfig, colors, themeColors],
  );

  // Hover state for the remove button
  const [removeHovered, setRemoveHovered] = useState(false);
  const removeHoverBg = useMemo(
    () => getRemoveButtonHoverBg(themeColors),
    [themeColors],
  );

  const handleRemoveMouseEnter = useCallback(() => setRemoveHovered(true), []);
  const handleRemoveMouseLeave = useCallback(() => setRemoveHovered(false), []);

  // Handle remove click — stop propagation so chip onClick is not triggered
  const handleRemoveClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove(e);
      }
    },
    [disabled, onRemove],
  );

  // Handle chip click
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && clickable && onClick) {
        onClick(e);
      }
    },
    [disabled, clickable, onClick],
  );

  return (
    <div
      ref={ref}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      className={className}
      style={{ ...chipStyle, ...userStyle }}
      onClick={handleClick}
      {...rest}
    >
      {icon && <span style={iconWrapperStyle}>{icon}</span>}

      <span>{children}</span>

      {removable && (
        <button
          type="button"
          aria-label="Remove"
          disabled={disabled}
          style={{
            ...removeStyle,
            backgroundColor: removeHovered && !disabled ? removeHoverBg : 'transparent',
          }}
          onClick={handleRemoveClick}
          onMouseEnter={handleRemoveMouseEnter}
          onMouseLeave={handleRemoveMouseLeave}
        >
          <X size={sizeConfig.removeIconSize} strokeWidth={2} />
        </button>
      )}
    </div>
  );
});

Chip.displayName = 'Chip';
