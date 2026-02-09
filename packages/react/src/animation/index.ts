/**
 * @module animation
 * @description React animation hooks and components for Wisp.
 *
 * Combines React-specific animation hooks with shared presets and
 * constants re-exported from `@wisp-ui/core`.
 */
export { Presence } from './Presence';
export type { PresenceProps } from './Presence';
export { useAnimatedValue } from './use-animated-value';
export { usePressAnimation } from './use-press-animation';
export { useSpring } from './use-spring';
export { useTransition } from './use-transition';
export type { TransitionPhase } from './use-transition';

// Re-export shared presets and constants from core
export * from '@wisp-ui/core/animation/presets';
export * from '@wisp-ui/core/animation/constants';
