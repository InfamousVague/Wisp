import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { QRScannerProps, QRScanResult } from '@wisp-ui/core/types/QRScanner.types';
import { qrScannerSizeMap } from '@wisp-ui/core/types/QRScanner.types';
import {
  resolveQRScannerColors,
  buildQRScannerWrapperStyle,
  buildQRScannerViewportStyle,
  buildQRScannerVideoStyle,
  buildQRScannerOverlayStyle,
  buildQRScannerUploadButtonStyle,
  buildQRScannerStatusStyle,
} from '@wisp-ui/core/styles/QRScanner.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// BarcodeDetector type (native API, not in all TS libs)
// ---------------------------------------------------------------------------

interface DetectedBarcode {
  rawValue: string;
  format: string;
}

interface BarcodeDetectorInstance {
  detect: (source: ImageBitmapSource) => Promise<DetectedBarcode[]>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarcodeDetectorClass = typeof window !== 'undefined'
  ? (window as any).BarcodeDetector as (new (opts: { formats: string[] }) => BarcodeDetectorInstance) | undefined
  : undefined;

/**
 * QRScanner — Camera-based QR code reader.
 *
 * @remarks
 * Uses the browser `getUserMedia` API for camera access and decodes
 * QR codes from video frames. Supports the native `BarcodeDetector`
 * API with a `jsQR` fallback.
 *
 * - Configurable scanning overlay (frame / crosshair / none).
 * - Image-upload fallback for desktop or when camera is unavailable.
 * - Pause / resume scanning without unmounting the camera.
 *
 * @see {@link QRScannerProps} for the full prop API.
 *
 * @example
 * ```tsx
 * <QRScanner onScan={({ data }) => console.log(data)} />
 * ```
 */
export const QRScanner = forwardRef<HTMLDivElement, QRScannerProps>(
  function QRScanner(
    {
      size = 'md',
      onScan,
      onError,
      facingMode = 'environment',
      showUpload = true,
      scanInterval = 250,
      paused = false,
      overlay = 'frame',
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const sizeConfig = qrScannerSizeMap[size];

    // -----------------------------------------------------------------------
    // Colours & styles
    // -----------------------------------------------------------------------
    const colors = useMemo(
      () => resolveQRScannerColors(themeColors),
      [themeColors],
    );

    const wrapperStyle = useMemo(
      () => buildQRScannerWrapperStyle(sizeConfig),
      [sizeConfig],
    );

    const viewportStyle = useMemo(
      () => buildQRScannerViewportStyle(sizeConfig, colors),
      [sizeConfig, colors],
    );

    const videoStyle = useMemo(() => buildQRScannerVideoStyle(), []);
    const overlayStyle = useMemo(() => buildQRScannerOverlayStyle(), []);
    const uploadBtnStyle = useMemo(
      () => buildQRScannerUploadButtonStyle(sizeConfig, colors),
      [sizeConfig, colors],
    );

    // -----------------------------------------------------------------------
    // Refs & state
    // -----------------------------------------------------------------------
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const scanTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const detectorRef = useRef<BarcodeDetectorInstance | null>(null);
    const jsQRRef = useRef<typeof import('jsqr').default | null>(null);

    const [cameraReady, setCameraReady] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    // -----------------------------------------------------------------------
    // Decoder initialisation
    // -----------------------------------------------------------------------
    useEffect(() => {
      // Try native BarcodeDetector first
      if (BarcodeDetectorClass) {
        try {
          detectorRef.current = new BarcodeDetectorClass({ formats: ['qr_code'] });
        } catch {
          // fallback to jsQR
        }
      }

      // Lazy-load jsQR as fallback
      if (!detectorRef.current) {
        import('jsqr').then((mod) => {
          jsQRRef.current = mod.default;
        }).catch(() => {
          // jsQR unavailable — scanning won't work
        });
      }
    }, []);

    // -----------------------------------------------------------------------
    // Camera lifecycle
    // -----------------------------------------------------------------------
    useEffect(() => {
      let cancelled = false;

      async function startCamera() {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
          });
          if (cancelled) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            setCameraReady(true);
          }
        } catch (err) {
          if (!cancelled) {
            const error = err instanceof Error ? err : new Error(String(err));
            setCameraError('Camera unavailable');
            onError?.(error);
          }
        }
      }

      startCamera();

      return () => {
        cancelled = true;
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
        setCameraReady(false);
      };
    }, [facingMode, onError]);

    // -----------------------------------------------------------------------
    // Frame scanning loop
    // -----------------------------------------------------------------------
    const scanFrame = useCallback(async () => {
      if (paused) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState < 2) return;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      try {
        // Native BarcodeDetector
        if (detectorRef.current) {
          const barcodes = await detectorRef.current.detect(canvas);
          if (barcodes.length > 0) {
            onScan({ data: barcodes[0].rawValue });
            return;
          }
        }

        // jsQR fallback
        if (jsQRRef.current) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQRRef.current(imageData.data, canvas.width, canvas.height);
          if (code) {
            onScan({ data: code.data });
          }
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        onError?.(error);
      }
    }, [paused, onScan, onError]);

    useEffect(() => {
      if (!cameraReady) return;

      scanTimerRef.current = setInterval(scanFrame, scanInterval);

      return () => {
        if (scanTimerRef.current) {
          clearInterval(scanTimerRef.current);
          scanTimerRef.current = null;
        }
      };
    }, [cameraReady, scanFrame, scanInterval]);

    // -----------------------------------------------------------------------
    // Image upload handler
    // -----------------------------------------------------------------------
    const handleFileUpload = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
          const bitmap = await createImageBitmap(file);
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(bitmap, 0, 0);

          // Native BarcodeDetector
          if (detectorRef.current) {
            const barcodes = await detectorRef.current.detect(canvas);
            if (barcodes.length > 0) {
              onScan({ data: barcodes[0].rawValue });
              return;
            }
          }

          // jsQR fallback
          if (jsQRRef.current) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQRRef.current(imageData.data, canvas.width, canvas.height);
            if (code) {
              onScan({ data: code.data });
              return;
            }
          }

          onError?.(new Error('No QR code found in image'));
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          onError?.(error);
        }

        // Reset input so re-selecting the same file triggers onChange
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      [onScan, onError],
    );

    // -----------------------------------------------------------------------
    // Overlay SVG
    // -----------------------------------------------------------------------
    const renderOverlay = () => {
      if (overlay === 'none') return null;

      const d = sizeConfig.dimension;
      const strokeColor = colors.overlayLine;

      if (overlay === 'crosshair') {
        const cx = d / 2;
        const cy = d / 2;
        const arm = d * 0.15;
        return (
          <svg style={overlayStyle} viewBox={`0 0 ${d} ${d}`}>
            <line x1={cx - arm} y1={cy} x2={cx + arm} y2={cy} stroke={strokeColor} strokeWidth={2} />
            <line x1={cx} y1={cy - arm} x2={cx} y2={cy + arm} stroke={strokeColor} strokeWidth={2} />
            <circle cx={cx} cy={cy} r={arm * 0.7} fill="none" stroke={strokeColor} strokeWidth={1.5} opacity={0.6} />
          </svg>
        );
      }

      // Frame overlay
      const inset = d * 0.15;
      const cornerLen = d * 0.12;
      const sw = 3;
      return (
        <svg style={overlayStyle} viewBox={`0 0 ${d} ${d}`}>
          {/* Semi-transparent border regions */}
          <rect x={0} y={0} width={d} height={inset} fill={colors.overlayBg} />
          <rect x={0} y={d - inset} width={d} height={inset} fill={colors.overlayBg} />
          <rect x={0} y={inset} width={inset} height={d - 2 * inset} fill={colors.overlayBg} />
          <rect x={d - inset} y={inset} width={inset} height={d - 2 * inset} fill={colors.overlayBg} />

          {/* Corner brackets */}
          {/* Top-left */}
          <line x1={inset} y1={inset} x2={inset + cornerLen} y2={inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={inset} y1={inset} x2={inset} y2={inset + cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Top-right */}
          <line x1={d - inset} y1={inset} x2={d - inset - cornerLen} y2={inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={d - inset} y1={inset} x2={d - inset} y2={inset + cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Bottom-left */}
          <line x1={inset} y1={d - inset} x2={inset + cornerLen} y2={d - inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={inset} y1={d - inset} x2={inset} y2={d - inset - cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          {/* Bottom-right */}
          <line x1={d - inset} y1={d - inset} x2={d - inset - cornerLen} y2={d - inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          <line x1={d - inset} y1={d - inset} x2={d - inset} y2={d - inset - cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      );
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...wrapperStyle, ...userStyle }}
        role="region"
        aria-label="QR code scanner"
        {...rest}
      >
        <div style={viewportStyle}>
          {/* Hidden canvas for frame capture */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Camera video */}
          <video
            ref={videoRef}
            style={videoStyle}
            muted
            playsInline
            aria-hidden
          />

          {/* Status message */}
          {cameraError && (
            <div style={buildQRScannerStatusStyle(sizeConfig, colors)}>
              {cameraError}
            </div>
          )}

          {/* Overlay */}
          {cameraReady && renderOverlay()}
        </div>

        {/* Upload button */}
        {showUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              tabIndex={-1}
            />
            <button
              type="button"
              style={uploadBtnStyle}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </button>
          </>
        )}
      </div>
    );
  },
);

QRScanner.displayName = 'QRScanner';
