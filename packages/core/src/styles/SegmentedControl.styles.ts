import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { SegmentedControlSize, SegmentedControlSizeConfig } from '../types/SegmentedControl.types';
import { segmentedControlSizeMap } from '../types/SegmentedControl.types';
import { fontFamilyStacks } from '../tokens/shared';
import { defaultSpacing, defaultRadii, defaultTypography } from '../theme/create-theme';
import { durations, easings } from '../tokens/motion';

/**
 * Builds the inline style for the {@link SegmentedControl} root container.
 *
 * @param opts - Configuration object.
 * @param opts.fullWidth   - Whether the control fills its parent width.
 * @param opts.themeColors - Resolved theme colour tokens.
 * @param opts.userStyle   - Optional consumer-supplied style overrides.
 * @returns A `CSSStyleObject` object for the container `div`.
 */
export function buildContainerStyle(opts: {
  fullWidth: boolean;
  themeColors: ThemeColors;
  userStyle?: CSSStyleObject;
}): CSSStyleObject {
  return {
    display: opts.fullWidth ? 'flex' : 'inline-flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: opts.themeColors.border.subtle,
    borderRadius: defaultRadii.lg,
    padding: defaultSpacing.xs,
    boxSizing: 'border-box' as const,
    width: opts.fullWidth ? '100%' : undefined,
    gap: 0,
    ...opts.userStyle,
  };
}

/**
 * Builds the inline style for the sliding active-segment indicator.
 *
 * @param opts - Configuration object.
 * @param opts.offsetX     - Horizontal pixel offset from the container start.
 * @param opts.width       - Width of the active segment in pixels.
 * @param opts.height      - Height of the indicator in pixels.
 * @param opts.animate     - Whether to apply a CSS transition (disabled on first render).
 * @param opts.themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the indicator element.
 */
export function buildIndicatorStyle(opts: {
  offsetX: number;
  width: number;
  height: number;
  animate: boolean;
  themeColors: ThemeColors;
}): CSSStyleObject {
  return {
    position: 'absolute',
    top: 3,
    left: 0,
    height: opts.height,
    width: opts.width,
    borderRadius: defaultRadii.md,
    backgroundColor: opts.themeColors.accent.primary,
    transform: `translateX(${opts.offsetX}px)`,
    transition: opts.animate
      ? 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), width 250ms cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none',
    pointerEvents: 'none',
    zIndex: 0,
  };
}

/**
 * Builds the inline style for an individual segment button.
 *
 * @param opts - Configuration object.
 * @param opts.size        - Size preset key (`'sm'` | `'md'` | `'lg'`).
 * @param opts.isActive    - Whether this segment is currently selected.
 * @param opts.isDisabled  - Whether this segment is disabled.
 * @param opts.isHovered   - Whether the pointer is over this segment.
 * @param opts.fullWidth   - Whether segments should stretch equally.
 * @param opts.themeColors - Resolved theme colour tokens.
 * @returns A `CSSStyleObject` object for the segment `button`.
 */
export function buildSegmentStyle(opts: {
  size: SegmentedControlSize;
  isActive: boolean;
  isDisabled: boolean;
  isHovered: boolean;
  fullWidth: boolean;
  themeColors: ThemeColors;
}): CSSStyleObject {
  const sizeConfig: SegmentedControlSizeConfig = segmentedControlSizeMap[opts.size];

  return {
    margin: 0,
    border: 'none',
    outline: 'none',
    background: 'none',
    padding: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: defaultSpacing.sm,
    height: sizeConfig.height,
    paddingLeft: sizeConfig.paddingX,
    paddingRight: sizeConfig.paddingX,
    flex: opts.fullWidth ? 1 : undefined,
    boxSizing: 'border-box' as const,
    borderRadius: defaultRadii.md,
    backgroundColor: 'transparent',
    color: opts.isActive
      ? opts.themeColors.text.inverse
      : opts.isHovered && !opts.isDisabled
        ? opts.themeColors.text.primary
        : opts.themeColors.text.secondary,
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    fontWeight: defaultTypography.weights.medium,
    lineHeight: 1,
    whiteSpace: 'nowrap' as const,
    cursor: opts.isDisabled ? 'not-allowed' : 'pointer',
    opacity: opts.isDisabled ? 0.4 : 1,
    userSelect: 'none' as const,
    position: 'relative',
    zIndex: 1,
    transition: `color ${durations.normal}ms ${easings.easeOut.css}`,
  };
}
