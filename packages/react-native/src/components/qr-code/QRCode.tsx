import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Circle as SvgCircle } from 'react-native-svg';
import type { QRCodeSize, QRCodeDotStyle, QRCodeErrorLevel } from '@wisp-ui/core/types/QRCode.types';
import { qrCodeSizeMap } from '@wisp-ui/core/types/QRCode.types';
import {
  computeQRMatrix,
  isFinderPattern,
  getModuleRect,
  isInLogoArea,
} from '@wisp-ui/core/styles/qr-utils';
import { resolveQRCodeColors } from '@wisp-ui/core/styles/QRCode.styles';
import { useThemeColors } from '../../providers';

export interface QRCodeProps {
  value: string;
  size?: QRCodeSize;
  dotStyle?: QRCodeDotStyle;
  errorLevel?: QRCodeErrorLevel;
  darkColor?: string;
  lightColor?: string;
  logo?: React.ReactNode;
  logoSize?: number;
  logoBgColor?: string;
  showQuietZone?: boolean;
  children?: React.ReactNode;
  style?: object;
}

/**
 * QRCode — Stylised QR code generator (React Native).
 *
 * @remarks
 * Renders a QR code using `react-native-svg` with customisable dot shapes
 * and an optional centre logo overlay.
 */
export const QRCode = forwardRef<View, QRCodeProps>(
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

    const effectiveErrorLevel = useMemo(() => {
      if (hasLogo && (errorLevel === 'L' || errorLevel === 'M')) {
        return 'Q' as const;
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
    // Render modules
    // -----------------------------------------------------------------------
    const modules = useMemo(() => {
      const elements: React.ReactElement[] = [];

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (!matrix[row][col]) continue;
          if (hasLogo && isInLogoArea(row, col, moduleCount, logoSize)) continue;

          const { x, y, size: mSize } = getModuleRect(row, col, moduleSize, quietZoneOffset);
          const isFinder = isFinderPattern(row, col, moduleCount);
          const key = `${row}-${col}`;

          if (isFinder || dotStyle === 'square') {
            elements.push(
              <Rect key={key} x={x} y={y} width={mSize} height={mSize} fill={dark} />,
            );
          } else if (dotStyle === 'circle') {
            const r = mSize / 2;
            elements.push(
              <SvgCircle key={key} cx={x + r} cy={y + r} r={r * 0.85} fill={dark} />,
            );
          } else {
            // Rounded
            const rx = mSize * 0.3;
            elements.push(
              <Rect key={key} x={x} y={y} width={mSize} height={mSize} rx={rx} ry={rx} fill={dark} />,
            );
          }
        }
      }

      return elements;
    }, [matrix, moduleCount, moduleSize, quietZoneOffset, hasLogo, logoSize, dotStyle, dark]);

    // Logo background rect
    const logoBgRect = useMemo(() => {
      if (!hasLogo) return null;
      const logoAreaPx = moduleCount * moduleSize * logoSize;
      const logoCx = quietZoneOffset + (moduleCount * moduleSize) / 2;
      const logoCy = logoCx;
      return (
        <Rect
          x={logoCx - logoAreaPx / 2 - 2}
          y={logoCy - logoAreaPx / 2 - 2}
          width={logoAreaPx + 4}
          height={logoAreaPx + 4}
          rx={4}
          ry={4}
          fill={logoBg}
        />
      );
    }, [hasLogo, moduleCount, moduleSize, logoSize, quietZoneOffset, logoBg]);

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
      <View
        ref={ref}
        accessibilityRole="image"
        accessibilityLabel={`QR code encoding: ${value}`}
        style={[{ alignItems: 'center' }, userStyle]}
      >
        <View style={{ position: 'relative', width: sizeConfig.dimension, height: sizeConfig.dimension }}>
          <Svg
            width={sizeConfig.dimension}
            height={sizeConfig.dimension}
            viewBox={`0 0 ${sizeConfig.dimension} ${sizeConfig.dimension}`}
          >
            {/* Background */}
            <Rect x={0} y={0} width={sizeConfig.dimension} height={sizeConfig.dimension} fill={light} />

            {/* QR modules */}
            {modules}

            {/* Logo background */}
            {logoBgRect}
          </Svg>

          {/* Logo / children overlay */}
          {hasLogo && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: sizeConfig.dimension,
                height: sizeConfig.dimension,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              pointerEvents="none"
            >
              {logo || children}
            </View>
          )}
        </View>
      </View>
    );
  },
);

QRCode.displayName = 'QRCode';
