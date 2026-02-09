/**
 * Sheet -- Mobile-style bottom sheet primitive for the Wisp design system.
 *
 * @remarks
 * - Slides up from the bottom of the viewport with a drag-handle pill.
 * - Drag the handle downward past the dismiss threshold to close.
 * - Supports overlay backdrop, Escape-to-close, and overlay-click-to-close.
 * - Locks body scroll while open.
 * - Animated mount/unmount via CSS transitions.
 *
 * @module primitives/sheet
 * @example
 * ```tsx
 * <Sheet open={isOpen} onClose={() => setIsOpen(false)} size="md">
 *   <div style={{ padding: 24 }}>Sheet content</div>
 * </Sheet>
 * ```
 */
import React, { forwardRef, useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { SheetProps } from '@wisp-ui/core/types/Sheet.types';
import type { CSSStyleObject } from '@wisp-ui/core/types';
import {
  buildOverlayStyle,
  buildSheetStyle,
  buildHandleBarStyle,
  buildHandlePillStyle,
} from '@wisp-ui/core/styles/Sheet.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Drag dismiss threshold — if user drags more than this distance, close
// ---------------------------------------------------------------------------

/** Minimum downward drag distance (in pixels) required to dismiss the sheet. */
const DISMISS_THRESHOLD = 100; // px

/**
 * Sheet -- Bottom sheet panel with drag-to-dismiss, overlay backdrop, and
 * animated slide-up transition.
 *
 * @remarks
 * Rendered in a React portal attached to `document.body`. Manages its own
 * mount/animate lifecycle so the exit animation completes before unmounting.
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  {
    open,
    onClose,
    size = 'md',
    variant = 'solid',
    overlay = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    children,
    className,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const internalRef = useRef<HTMLDivElement>(null);
  const sheetRef = (ref as React.RefObject<HTMLDivElement>) ?? internalRef;

  // -------------------------------------------------------------------------
  // Mount / animate state
  // -------------------------------------------------------------------------
  const [mounted, setMounted] = useState(open);
  const [animateOpen, setAnimateOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateOpen(true);
        });
      });
    } else {
      setAnimateOpen(false);
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // -------------------------------------------------------------------------
  // Drag state
  // -------------------------------------------------------------------------
  const [dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientY - dragStartYRef.current;
    // Only allow dragging downward (positive delta)
    setDragOffset(Math.max(0, delta));
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (dragOffset > DISMISS_THRESHOLD) {
      // Dismiss
      onClose();
    }
    // Snap back
    setDragOffset(0);
  }, [dragOffset, onClose]);

  // -------------------------------------------------------------------------
  // Escape key
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // -------------------------------------------------------------------------
  // Lock body scroll when open
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // -------------------------------------------------------------------------
  // Overlay click
  // -------------------------------------------------------------------------
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose],
  );

  // -------------------------------------------------------------------------
  // Memoised styles
  // -------------------------------------------------------------------------
  const overlayStyle = useMemo(
    () => ({
      ...buildOverlayStyle(themeColors),
      opacity: animateOpen ? 1 : 0,
    }),
    [themeColors, animateOpen],
  );

  const sheetStyle = useMemo(
    () => buildSheetStyle(size, animateOpen, dragOffset, themeColors, variant, userStyle as CSSStyleObject),
    [size, animateOpen, dragOffset, themeColors, variant, userStyle],
  );

  const handleBarStyle = useMemo(
    () => buildHandleBarStyle(themeColors),
    [themeColors],
  );

  const handlePillStyle = useMemo(
    () => buildHandlePillStyle(themeColors),
    [themeColors],
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  if (!mounted) return null;

  const sheetContent = (
    <>
      {/* Overlay */}
      {overlay && (
        <div
          style={overlayStyle}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Sheet panel */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className={className}
        style={sheetStyle}
        tabIndex={-1}
        {...rest}
      >
        {/* Drag handle */}
        <div
          style={handleBarStyle}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div style={handlePillStyle} />
        </div>

        {/* Content */}
        {children}
      </div>
    </>
  );

  if (typeof document === 'undefined') return sheetContent;
  return createPortal(sheetContent, document.body);
});

Sheet.displayName = 'Sheet';
