import type { CSSStyleObject } from '../types';
import { fontFamilyStacks } from '../tokens/shared';
import type { ThemeColors } from '../theme/types';
import type { QRScannerSizeConfig } from '../types/QRScanner.types';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

/**
 * Resolved colour tokens for the QRScanner component.
 */
export interface QRScannerColors {
  /** Overlay background (semi-transparent). */
  overlayBg: string;
  /** Overlay line / crosshair colour. */
  overlayLine: string;
  /** Viewport background colour. */
  bg: string;
  /** Viewport border colour. */
  border: string;
  /** Label / button text colour. */
  text: string;
  /** Upload button background colour. */
  buttonBg: string;
}

/**
 * Resolves scanner colours from the current theme.
 *
 * @param themeColors - Current {@link ThemeColors}.
 * @returns A {@link QRScannerColors} object.
 */
export function resolveQRScannerColors(themeColors: ThemeColors): QRScannerColors {
  return {
    overlayBg: 'rgba(0, 0, 0, 0.4)',
    overlayLine: themeColors.data.blue,
    bg: themeColors.background.canvas,
    border: themeColors.border.subtle,
    text: themeColors.text.secondary,
    buttonBg: themeColors.background.raised,
  };
}

// ---------------------------------------------------------------------------
// Wrapper
// ---------------------------------------------------------------------------

/**
 * Builds the outer wrapper style.
 *
 * @param sizeConfig - Resolved {@link QRScannerSizeConfig}.
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerWrapperStyle(
  sizeConfig: QRScannerSizeConfig,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Viewport
// ---------------------------------------------------------------------------

/**
 * Builds the camera viewport container style.
 *
 * @param sizeConfig - Resolved {@link QRScannerSizeConfig}.
 * @param colors - Resolved {@link QRScannerColors}.
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerViewportStyle(
  sizeConfig: QRScannerSizeConfig,
  colors: QRScannerColors,
): CSSStyleObject {
  return {
    position: 'relative',
    width: sizeConfig.dimension,
    height: sizeConfig.dimension,
    borderRadius: sizeConfig.borderRadius,
    overflow: 'hidden',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    flexShrink: 0,
  };
}

// ---------------------------------------------------------------------------
// Video
// ---------------------------------------------------------------------------

/**
 * Builds the style for the `<video>` element inside the viewport.
 *
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerVideoStyle(): CSSStyleObject {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
}

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

/**
 * Builds the scanning overlay style (SVG positioned over video).
 *
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerOverlayStyle(): CSSStyleObject {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };
}

// ---------------------------------------------------------------------------
// Upload button
// ---------------------------------------------------------------------------

/**
 * Builds the upload button style.
 *
 * @param sizeConfig - Resolved {@link QRScannerSizeConfig}.
 * @param colors - Resolved {@link QRScannerColors}.
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerUploadButtonStyle(
  sizeConfig: QRScannerSizeConfig,
  colors: QRScannerColors,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '8px 16px',
    borderRadius: sizeConfig.borderRadius / 2,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.buttonBg,
    color: colors.text,
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
  };
}

// ---------------------------------------------------------------------------
// Status text
// ---------------------------------------------------------------------------

/**
 * Builds the status text style (e.g. "No camera available").
 *
 * @param sizeConfig - Resolved {@link QRScannerSizeConfig}.
 * @param colors - Resolved {@link QRScannerColors}.
 * @returns A {@link CSSStyleObject}.
 */
export function buildQRScannerStatusStyle(
  sizeConfig: QRScannerSizeConfig,
  colors: QRScannerColors,
): CSSStyleObject {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: fontFamilyStacks.sans,
    fontSize: sizeConfig.fontSize,
    fontWeight: 500,
    color: colors.text,
    textAlign: 'center',
    userSelect: 'none',
  };
}
