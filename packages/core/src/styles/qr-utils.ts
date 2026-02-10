import qrcode from 'qrcode-generator';
import type { QRCodeErrorLevel } from '../types/QRCode.types';

// ---------------------------------------------------------------------------
// QR matrix computation
// ---------------------------------------------------------------------------

/**
 * Result of computing a QR code matrix.
 */
export interface QRMatrix {
  /** 2-D boolean grid — `true` means a dark module. */
  matrix: boolean[][];
  /** Number of modules along each edge (rows === cols). */
  moduleCount: number;
}

/**
 * Generates a boolean matrix from the given string using `qrcode-generator`.
 *
 * @param value - The data to encode.
 * @param errorLevel - Error correction level (`'L'` | `'M'` | `'Q'` | `'H'`).
 * @returns A {@link QRMatrix}.
 */
export function computeQRMatrix(
  value: string,
  errorLevel: QRCodeErrorLevel = 'M',
): QRMatrix {
  const qr = qrcode(0, errorLevel);
  qr.addData(value);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const matrix: boolean[][] = [];

  for (let row = 0; row < moduleCount; row++) {
    const rowArr: boolean[] = [];
    for (let col = 0; col < moduleCount; col++) {
      rowArr.push(qr.isDark(row, col));
    }
    matrix.push(rowArr);
  }

  return { matrix, moduleCount };
}

// ---------------------------------------------------------------------------
// Finder-pattern detection
// ---------------------------------------------------------------------------

/**
 * Returns `true` if the module at `(row, col)` falls within one of the
 * three 7×7 finder patterns (top-left, top-right, bottom-left) including
 * their one-module separator border.
 *
 * @param row - Zero-based row index.
 * @param col - Zero-based column index.
 * @param moduleCount - Total modules per edge.
 * @returns Whether the module is part of a finder pattern area.
 */
export function isFinderPattern(
  row: number,
  col: number,
  moduleCount: number,
): boolean {
  const finderSize = 7;
  const separatorSize = 1;
  const total = finderSize + separatorSize; // 8

  // Top-left finder + separator
  if (row < total && col < total) return true;
  // Top-right finder + separator
  if (row < total && col >= moduleCount - total) return true;
  // Bottom-left finder + separator
  if (row >= moduleCount - total && col < total) return true;

  return false;
}

// ---------------------------------------------------------------------------
// Module positioning helpers
// ---------------------------------------------------------------------------

/**
 * Computes the pixel position and size of a single module within the QR SVG.
 *
 * @param row - Module row index.
 * @param col - Module column index.
 * @param moduleSize - Pixel size per module.
 * @param quietZoneOffset - Pixel offset for quiet zone.
 * @returns `{ x, y, size }` in pixels.
 */
export function getModuleRect(
  row: number,
  col: number,
  moduleSize: number,
  quietZoneOffset: number,
): { x: number; y: number; size: number } {
  return {
    x: quietZoneOffset + col * moduleSize,
    y: quietZoneOffset + row * moduleSize,
    size: moduleSize,
  };
}

// ---------------------------------------------------------------------------
// Logo area clearing
// ---------------------------------------------------------------------------

/**
 * Returns `true` if the module at `(row, col)` falls within the logo
 * clearing area (centred square).
 *
 * @param row - Module row index.
 * @param col - Module column index.
 * @param moduleCount - Total modules per edge.
 * @param logoFraction - Fraction of the QR width to clear (0–1).
 * @returns Whether the module should be cleared for the logo.
 */
export function isInLogoArea(
  row: number,
  col: number,
  moduleCount: number,
  logoFraction: number,
): boolean {
  const clearModules = Math.ceil(moduleCount * logoFraction);
  const start = Math.floor((moduleCount - clearModules) / 2);
  const end = start + clearModules;
  return row >= start && row < end && col >= start && col < end;
}
