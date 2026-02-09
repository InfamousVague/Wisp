/**
 * @module Indicator
 */
import React, { forwardRef, useMemo, useEffect } from 'react';
import type { IndicatorProps } from '@wisp-ui/core/types/Indicator.types';
import { indicatorSizeMap } from '@wisp-ui/core/types/Indicator.types';
import {
  resolveIndicatorColor,
  buildIndicatorDotStyle,
  buildIndicatorContainerStyle,
} from '@wisp-ui/core/styles/Indicator.styles';
import { useThemeColors } from '../../providers';

// Inject pulse keyframe once
let pulseInjected = false;
function injectPulseKeyframe() {
  if (pulseInjected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `@keyframes wisp-indicator-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`;
  document.head.appendChild(style);
  pulseInjected = true;
}

/**
 * Indicator — Status dot primitive for the Wisp design system.
 *
 * @remarks
 * A small colored circle for conveying semantic status at a glance.
 * Supports five color variants, three animation states (idle, active, inactive),
 * and three sizes.
 *
 * @example
 * ```tsx
 * <Indicator variant="success" />
 * <Indicator variant="danger" state="active" size="md" />
 * <Indicator variant="info" state="inactive" label="Disconnected" />
 * ```
 */
export const Indicator = forwardRef<HTMLSpanElement, IndicatorProps>(function Indicator(
  {
    variant = 'success',
    state = 'idle',
    size = 'sm',
    label,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();

  useEffect(() => {
    if (state === 'active') injectPulseKeyframe();
  }, [state]);

  const sizeConfig = indicatorSizeMap[size];
  const color = useMemo(() => resolveIndicatorColor(variant, themeColors), [variant, themeColors]);

  const containerStyle = useMemo(() => buildIndicatorContainerStyle(), []);
  const dotStyle = useMemo(
    () => buildIndicatorDotStyle(sizeConfig, color, state),
    [sizeConfig, color, state],
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ ...containerStyle, ...userStyle }}
      {...rest}
    >
      <span aria-hidden="true" style={dotStyle} />
      {label && (
        <span
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
});

Indicator.displayName = 'Indicator';
