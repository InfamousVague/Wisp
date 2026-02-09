/**
 * @module ToastProvider
 */
import type { CSSStyleObject } from '../types';
import type { ToastPosition } from '../types/ToastProvider.types';

// ---------------------------------------------------------------------------
// Container positioning
// ---------------------------------------------------------------------------

export function buildToastContainerStyle(
  position: ToastPosition,
): CSSStyleObject {
  const base: CSSStyleObject = {
    position: 'fixed',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
    pointerEvents: 'none',
    maxWidth: 420,
    width: '100%',
    boxSizing: 'border-box',
  };

  switch (position) {
    case 'top-right':
      return { ...base, top: 0, right: 0 };
    case 'top-left':
      return { ...base, top: 0, left: 0 };
    case 'top-center':
      return { ...base, top: 0, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-left':
      return { ...base, bottom: 0, left: 0 };
    case 'bottom-center':
      return { ...base, bottom: 0, left: '50%', transform: 'translateX(-50%)' };
    case 'bottom-right':
    default:
      return { ...base, bottom: 0, right: 0 };
  }
}

// ---------------------------------------------------------------------------
// Individual toast wrapper (for pointer events + animation)
// ---------------------------------------------------------------------------

export function buildToastItemWrapperStyle(): CSSStyleObject {
  return {
    pointerEvents: 'auto',
    transition: 'opacity 200ms ease, transform 200ms ease',
  };
}
