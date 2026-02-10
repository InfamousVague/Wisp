/**
 * @module Carousel.styles
 * @description Inline-style builder functions for the Wisp Carousel component.
 *
 * Every function returns a `CSSStyleObject` object -- no CSS files are
 * used anywhere in the Wisp component library.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import { defaultSpacing, defaultRadii } from '../theme/create-theme';

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the outermost carousel wrapper.
 *
 * @param aspectRatio - Optional CSS `aspect-ratio` value (e.g. `'16/9'`).
 * @returns A `CSSStyleObject` object for the container `div`.
 */
export function buildCarouselContainerStyle(
  aspectRatio?: string,
): CSSStyleObject {
  return {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: defaultRadii.lg,
    ...(aspectRatio ? { aspectRatio } : {}),
  };
}

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the sliding track that holds all slides.
 *
 * @param offset  - The current horizontal translation percentage (e.g. `100` = second slide).
 * @param animate - Whether to apply a CSS transition.
 * @returns A `CSSStyleObject` object for the track `div`.
 */
export function buildCarouselTrackStyle(
  offset: number,
  animate: boolean,
): CSSStyleObject {
  return {
    display: 'flex',
    transform: `translateX(-${offset}%)`,
    transition: animate
      ? 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none',
  };
}

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for an individual slide wrapper.
 *
 * @returns A `CSSStyleObject` object for the slide `div`.
 */
export function buildCarouselSlideStyle(): CSSStyleObject {
  return {
    flex: '0 0 100%',
    width: '100%',
    overflow: 'hidden',
  };
}

// ---------------------------------------------------------------------------
// Arrow buttons
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for a navigation arrow button.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @param side        - Which side of the carousel the arrow sits on.
 * @param isHovered   - Whether the pointer is currently over the button.
 * @returns A `CSSStyleObject` object for the arrow `button`.
 */
export function buildCarouselArrowStyle(
  themeColors: ThemeColors,
  side: 'left' | 'right',
  isHovered: boolean,
): CSSStyleObject {
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    ...(side === 'left' ? { left: 12 } : { right: 12 }),
    width: 36,
    height: 36,
    borderRadius: defaultRadii.full,
    backgroundColor: isHovered
      ? themeColors.background.surface
      : themeColors.background.surface + 'CC', // 80% opacity
    color: themeColors.text.onRaised,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    border: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: 0,
    outline: 'none',
    transition: 'background-color 200ms ease',
  };
}

// ---------------------------------------------------------------------------
// Dots container
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the dot-indicator container.
 *
 * @returns A `CSSStyleObject` object for the dots wrapper `div`.
 */
export function buildCarouselDotsContainerStyle(): CSSStyleObject {
  return {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'row',
    gap: defaultSpacing.sm,
    zIndex: 2,
  };
}

// ---------------------------------------------------------------------------
// Individual dot
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for a single dot indicator.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @param isActive    - Whether this dot represents the current slide.
 * @returns A `CSSStyleObject` object for the dot `button`.
 */
export function buildCarouselDotStyle(
  themeColors: ThemeColors,
  isActive: boolean,
): CSSStyleObject {
  return {
    width: isActive ? 24 : 8,
    height: 8,
    borderRadius: defaultRadii.sm,
    backgroundColor: isActive
      ? '#FFFFFF'
      : 'rgba(255, 255, 255, 0.5)',
    transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    padding: 0,
    outline: 'none',
  };
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------

/**
 * Builds the inline style for the skeleton loading placeholder.
 *
 * @param themeColors - Resolved theme colour tokens.
 * @param aspectRatio - Optional CSS `aspect-ratio` value.
 * @returns A `CSSStyleObject` object for the skeleton `div`.
 */
export function buildCarouselSkeletonStyle(
  themeColors: ThemeColors,
  aspectRatio?: string,
): CSSStyleObject {
  return {
    width: '100%',
    borderRadius: defaultRadii.lg,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
    ...(aspectRatio ? { aspectRatio } : { height: 200 }),
  };
}
