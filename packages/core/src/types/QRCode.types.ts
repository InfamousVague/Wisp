import type React from 'react';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

/**
 * Tuple of valid QR code size literals.
 *
 * @remarks
 * Controls the overall dimension of the QR code SVG.
 */
export const qrCodeSizes = ['sm', 'md', 'lg', 'xl'] as const;

/** Union type derived from {@link qrCodeSizes}. */
export type QRCodeSize = (typeof qrCodeSizes)[number];

// ---------------------------------------------------------------------------
// Dot style
// ---------------------------------------------------------------------------

/**
 * Tuple of valid dot-style variants for QR code modules.
 */
export const qrCodeDotStyles = ['square', 'circle', 'rounded'] as const;

/** Union type derived from {@link qrCodeDotStyles}. */
export type QRCodeDotStyle = (typeof qrCodeDotStyles)[number];

// ---------------------------------------------------------------------------
// Error correction level
// ---------------------------------------------------------------------------

/**
 * Tuple of valid error-correction levels (per QR spec).
 *
 * - `'L'` — ~7 % recovery
 * - `'M'` — ~15 % recovery
 * - `'Q'` — ~25 % recovery
 * - `'H'` — ~30 % recovery
 */
export const qrCodeErrorLevels = ['L', 'M', 'Q', 'H'] as const;

/** Union type derived from {@link qrCodeErrorLevels}. */
export type QRCodeErrorLevel = (typeof qrCodeErrorLevels)[number];

// ---------------------------------------------------------------------------
// Size -> dimensions map
// ---------------------------------------------------------------------------

/**
 * Resolved dimension values for a single {@link QRCodeSize}.
 */
export interface QRCodeSizeConfig {
  /** Width / height of the SVG in pixels. */
  dimension: number;
  /** Number of quiet-zone modules around the QR code. */
  quietZone: number;
  /** Font size for optional metadata text below the code. */
  fontSize: number;
}

/**
 * Maps each {@link QRCodeSize} to its {@link QRCodeSizeConfig}.
 */
export const qrCodeSizeMap: Record<QRCodeSize, QRCodeSizeConfig> = {
  sm: { dimension: 128, quietZone: 4, fontSize: 10 },
  md: { dimension: 200, quietZone: 4, fontSize: 12 },
  lg: { dimension: 300, quietZone: 4, fontSize: 14 },
  xl: { dimension: 400, quietZone: 4, fontSize: 16 },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props accepted by the {@link QRCode} component.
 *
 * @remarks
 * Renders a stylised QR code using raw SVG. Supports custom dot shapes,
 * theme-aware colours, and an optional centre logo or content overlay.
 *
 * - Uses `qrcode-generator` internally to compute the module matrix.
 * - Finder patterns always render as standard squares for scannability.
 * - When a logo is used, prefer error-correction level `'Q'` or `'H'`.
 */
export interface QRCodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * The data to encode into the QR code.
   */
  value: string;

  /**
   * Size variant controlling dimension and quiet zone.
   *
   * @default 'md'
   */
  size?: QRCodeSize;

  /**
   * Visual style for data modules (not finder patterns).
   *
   * @default 'square'
   */
  dotStyle?: QRCodeDotStyle;

  /**
   * Error correction level.
   *
   * @default 'M'
   */
  errorLevel?: QRCodeErrorLevel;

  /**
   * Override colour for dark (active) modules.
   * When omitted, defaults to the current theme's `text.primary`.
   */
  darkColor?: string;

  /**
   * Override colour for the QR code background.
   * When omitted, defaults to the current theme's `background.surface`.
   */
  lightColor?: string;

  /**
   * Custom content rendered in the centre of the QR code (e.g. a logo).
   * Alias for `children`.
   */
  logo?: React.ReactNode;

  /**
   * Diameter of the cleared logo area as a fraction of the QR code width.
   * Only applies when `logo` or `children` is provided.
   *
   * @default 0.2
   */
  logoSize?: number;

  /**
   * Background colour behind the logo.
   * When omitted, defaults to the `lightColor` (or theme surface).
   */
  logoBgColor?: string;

  /**
   * Whether to include a quiet-zone margin around the code.
   *
   * @default true
   */
  showQuietZone?: boolean;

  /**
   * Arbitrary content rendered in the centre of the QR code.
   */
  children?: React.ReactNode;
}
