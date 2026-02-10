import type React from 'react';

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

/**
 * Tuple of valid QR scanner size literals.
 *
 * @remarks
 * Controls the overall dimension of the scanner viewport.
 */
export const qrScannerSizes = ['sm', 'md', 'lg', 'xl'] as const;

/** Union type derived from {@link qrScannerSizes}. */
export type QRScannerSize = (typeof qrScannerSizes)[number];

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

/**
 * Tuple of valid scanning overlay styles.
 */
export const qrScannerOverlays = ['crosshair', 'frame', 'none'] as const;

/** Union type derived from {@link qrScannerOverlays}. */
export type QRScannerOverlay = (typeof qrScannerOverlays)[number];

// ---------------------------------------------------------------------------
// Size -> dimensions map
// ---------------------------------------------------------------------------

/**
 * Resolved dimension values for a single {@link QRScannerSize}.
 */
export interface QRScannerSizeConfig {
  /** Width / height of the scanner viewport in pixels. */
  dimension: number;
  /** Corner radius for the viewport. */
  borderRadius: number;
  /** Font size for status / upload label. */
  fontSize: number;
}

/**
 * Maps each {@link QRScannerSize} to its {@link QRScannerSizeConfig}.
 */
export const qrScannerSizeMap: Record<QRScannerSize, QRScannerSizeConfig> = {
  sm: { dimension: 200, borderRadius: 8, fontSize: 10 },
  md: { dimension: 300, borderRadius: 12, fontSize: 12 },
  lg: { dimension: 400, borderRadius: 16, fontSize: 14 },
  xl: { dimension: 500, borderRadius: 20, fontSize: 16 },
};

// ---------------------------------------------------------------------------
// Scan result
// ---------------------------------------------------------------------------

/**
 * Result object returned when a QR code is successfully decoded.
 */
export interface QRScanResult {
  /** Decoded string content from the QR code. */
  data: string;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props accepted by the {@link QRScanner} component.
 *
 * @remarks
 * Camera-based QR code scanner with image-upload fallback.
 *
 * **Web** — Uses `getUserMedia` for camera access and `BarcodeDetector`
 * (with `jsQR` fallback) for decoding video frames.
 *
 * **React Native** — Uses `react-native-vision-camera` (optional peer dep)
 * with `CodeScanner` frame processor. Falls back to image upload when camera
 * is unavailable or permission denied.
 */
export interface QRScannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onError'> {
  /**
   * Size variant controlling viewport dimension and border radius.
   *
   * @default 'md'
   */
  size?: QRScannerSize;

  /**
   * Callback fired when a QR code is successfully decoded.
   */
  onScan: (result: QRScanResult) => void;

  /**
   * Callback fired when camera or decoding errors occur.
   */
  onError?: (error: Error) => void;

  /**
   * Which camera to use.
   *
   * @default 'environment'
   */
  facingMode?: 'user' | 'environment';

  /**
   * Whether to show an image-upload button as a fallback.
   *
   * @default true
   */
  showUpload?: boolean;

  /**
   * Milliseconds between scan attempts when processing video frames.
   *
   * @default 250
   */
  scanInterval?: number;

  /**
   * Temporarily pause scanning without unmounting the camera.
   *
   * @default false
   */
  paused?: boolean;

  /**
   * Visual overlay drawn on top of the camera feed.
   *
   * @default 'frame'
   */
  overlay?: QRScannerOverlay;
}
