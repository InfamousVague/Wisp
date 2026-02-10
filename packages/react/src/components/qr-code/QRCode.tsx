import React, { forwardRef, useMemo } from 'react';
import type { QRCodeProps } from '@wisp-ui/core/types/QRCode.types';
import { qrCodeSizeMap } from '@wisp-ui/core/types/QRCode.types';
import {
  computeQRMatrix,
  isFinderPattern,
  getModuleRect,
  isInLogoArea,
} from '@wisp-ui/core/styles/qr-utils';
import {
  resolveQRCodeColors,
  buildQRCodeWrapperStyle,
  buildQRCodeSvgStyle,
  buildQRCodeLogoOverlayStyle,
} from '@wisp-ui/core/styles/QRCode.styles';
import { useThemeColors } from '../../providers';

/**
 * QRCode — Stylised QR code generator.
 *
 * @remarks
 * Renders a QR code using raw SVG with customisable dot shapes, colours,
 * and an optional centre logo. Uses `qrcode-generator` internally.
 *
 * - Supports square, circle, and rounded dot styles.
 * - Finder patterns always render as standard squares for scannability.
 * - Logo area automatically clears centre modules.
 * - Theme-aware default colours.
 *
 * @see {@link QRCodeProps} for the full prop API.
 *
 * @example
 * ```tsx
 * <QRCode value="https://example.com" size="lg" dotStyle="circle" />
 * ```
 */
export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
  function QRCode(
    {
      value,
      size = 'md',
      dotStyle = 'square',
      errorLevel = 'M',
      darkColor,
      lightColor,
      logo,
      logoSize = 0.2,
      logoBgColor,
      showQuietZone = true,
      children,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const sizeConfig = qrCodeSizeMap[size];

    // -----------------------------------------------------------------------
    // Colours
    // -----------------------------------------------------------------------
    const defaultColors = useMemo(
      () => resolveQRCodeColors(themeColors),
      [themeColors],
    );

    const dark = darkColor || defaultColors.dark;
    const light = lightColor || defaultColors.light;
    const logoBg = logoBgColor || light;

    // -----------------------------------------------------------------------
    // QR matrix
    // -----------------------------------------------------------------------
    const hasLogo = !!(logo || children);

    // Auto-upgrade error level when logo is present
    const effectiveErrorLevel = useMemo(() => {
      if (hasLogo && (errorLevel === 'L' || errorLevel === 'M')) {
        return 'Q';
      }
      return errorLevel;
    }, [hasLogo, errorLevel]);

    const qrData = useMemo(
      () => computeQRMatrix(value, effectiveErrorLevel),
      [value, effectiveErrorLevel],
    );

    const { matrix, moduleCount } = qrData;

    // -----------------------------------------------------------------------
    // Layout calculations
    // -----------------------------------------------------------------------
    const quietZoneModules = showQuietZone ? sizeConfig.quietZone : 0;
    const totalModules = moduleCount + 2 * quietZoneModules;
    const moduleSize = sizeConfig.dimension / totalModules;
    const quietZoneOffset = quietZoneModules * moduleSize;

    // -----------------------------------------------------------------------
    // Styles
    // -----------------------------------------------------------------------
    const wrapperStyle = useMemo(() => buildQRCodeWrapperStyle(), []);
    const svgStyle = useMemo(() => buildQRCodeSvgStyle(sizeConfig), [sizeConfig]);

    // -----------------------------------------------------------------------
    // Render helpers
    // -----------------------------------------------------------------------
    const renderModule = (row: number, col: number) => {
      if (!matrix[row][col]) return null;

      // Clear logo area
      if (hasLogo && isInLogoArea(row, col, moduleCount, logoSize)) {
        return null;
      }

      const { x, y, size: mSize } = getModuleRect(row, col, moduleSize, quietZoneOffset);
      const isFinder = isFinderPattern(row, col, moduleCount);
      const key = `${row}-${col}`;

      // Finder patterns always use square style
      if (isFinder || dotStyle === 'square') {
        return <rect key={key} x={x} y={y} width={mSize} height={mSize} fill={dark} />;
      }

      if (dotStyle === 'circle') {
        const r = mSize / 2;
        return <circle key={key} cx={x + r} cy={y + r} r={r * 0.85} fill={dark} />;
      }

      // Rounded
      const rx = mSize * 0.3;
      return <rect key={key} x={x} y={y} width={mSize} height={mSize} rx={rx} ry={rx} fill={dark} />;
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...wrapperStyle, ...userStyle }}
        role="img"
        aria-label={`QR code encoding: ${value}`}
        {...rest}
      >
        <div style={svgStyle}>
          <svg
            viewBox={`0 0 ${sizeConfig.dimension} ${sizeConfig.dimension}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: sizeConfig.dimension, height: sizeConfig.dimension, display: 'block' }}
          >
            {/* Background */}
            <rect x={0} y={0} width={sizeConfig.dimension} height={sizeConfig.dimension} fill={light} />

            {/* QR modules */}
            {matrix.map((row, rowIdx) =>
              row.map((_, colIdx) => renderModule(rowIdx, colIdx)),
            )}

            {/* Logo background circle */}
            {hasLogo && (() => {
              const logoAreaPx = moduleCount * moduleSize * logoSize;
              const logoCx = quietZoneOffset + (moduleCount * moduleSize) / 2;
              const logoCy = logoCx;
              return (
                <rect
                  x={logoCx - logoAreaPx / 2 - 2}
                  y={logoCy - logoAreaPx / 2 - 2}
                  width={logoAreaPx + 4}
                  height={logoAreaPx + 4}
                  rx={4}
                  ry={4}
                  fill={logoBg}
                />
              );
            })()}
          </svg>

          {/* Logo / children overlay */}
          {hasLogo && (
            <div style={buildQRCodeLogoOverlayStyle(sizeConfig)}>
              {logo || children}
            </div>
          )}
        </div>
      </div>
    );
  },
);

QRCode.displayName = 'QRCode';
