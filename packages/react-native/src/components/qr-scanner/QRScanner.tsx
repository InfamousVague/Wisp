import React, { forwardRef, useMemo } from 'react';
import { View, Text as RNText, TouchableOpacity } from 'react-native';
import Svg, { Line, Rect, Circle as SvgCircle } from 'react-native-svg';
import type { QRScannerSize, QRScannerOverlay, QRScanResult } from '@wisp-ui/core/types/QRScanner.types';
import { qrScannerSizeMap } from '@wisp-ui/core/types/QRScanner.types';
import { resolveQRScannerColors } from '@wisp-ui/core/styles/QRScanner.styles';
import { useThemeColors } from '../../providers';

export interface QRScannerProps {
  size?: QRScannerSize;
  onScan: (result: QRScanResult) => void;
  onError?: (error: Error) => void;
  facingMode?: 'user' | 'environment';
  showUpload?: boolean;
  scanInterval?: number;
  paused?: boolean;
  overlay?: QRScannerOverlay;
  style?: object;
  /**
   * Optional camera component provided by the consumer.
   * Pass a `<Camera>` from `react-native-vision-camera` or
   * any other camera component. When omitted, the scanner
   * shows a placeholder with an upload-only mode.
   */
  cameraComponent?: React.ReactNode;
}

/**
 * QRScanner — QR code scanner (React Native).
 *
 * @remarks
 * Provides the visual scanner viewport, overlay, and upload button.
 * Camera integration is handled by the consumer via the `cameraComponent`
 * prop — pass a `<Camera>` from `react-native-vision-camera` with a
 * `CodeScanner` frame processor, or any equivalent.
 *
 * When no camera component is provided, shows a placeholder with an
 * upload button.
 */
export const QRScanner = forwardRef<View, QRScannerProps>(
  function QRScanner(
    {
      size = 'md',
      onScan: _onScan,
      onError: _onError,
      showUpload = true,
      overlay = 'frame',
      cameraComponent,
      style: userStyle,
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const sizeConfig = qrScannerSizeMap[size];

    const colors = useMemo(
      () => resolveQRScannerColors(themeColors),
      [themeColors],
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
          <View style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
            <Svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
              <Line x1={cx - arm} y1={cy} x2={cx + arm} y2={cy} stroke={strokeColor} strokeWidth={2} />
              <Line x1={cx} y1={cy - arm} x2={cx} y2={cy + arm} stroke={strokeColor} strokeWidth={2} />
              <SvgCircle cx={cx} cy={cy} r={arm * 0.7} fill="none" stroke={strokeColor} strokeWidth={1.5} opacity={0.6} />
            </Svg>
          </View>
        );
      }

      // Frame overlay
      const inset = d * 0.15;
      const cornerLen = d * 0.12;
      const sw = 3;
      return (
        <View style={{ position: 'absolute', top: 0, left: 0 }} pointerEvents="none">
          <Svg width={d} height={d} viewBox={`0 0 ${d} ${d}`}>
            {/* Semi-transparent border regions */}
            <Rect x={0} y={0} width={d} height={inset} fill={colors.overlayBg} />
            <Rect x={0} y={d - inset} width={d} height={inset} fill={colors.overlayBg} />
            <Rect x={0} y={inset} width={inset} height={d - 2 * inset} fill={colors.overlayBg} />
            <Rect x={d - inset} y={inset} width={inset} height={d - 2 * inset} fill={colors.overlayBg} />

            {/* Corner brackets */}
            <Line x1={inset} y1={inset} x2={inset + cornerLen} y2={inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={inset} y1={inset} x2={inset} y2={inset + cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={d - inset} y1={inset} x2={d - inset - cornerLen} y2={inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={d - inset} y1={inset} x2={d - inset} y2={inset + cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={inset} y1={d - inset} x2={inset + cornerLen} y2={d - inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={inset} y1={d - inset} x2={inset} y2={d - inset - cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={d - inset} y1={d - inset} x2={d - inset - cornerLen} y2={d - inset} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
            <Line x1={d - inset} y1={d - inset} x2={d - inset} y2={d - inset - cornerLen} stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />
          </Svg>
        </View>
      );
    };

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    return (
      <View
        ref={ref}
        accessibilityRole="none"
        accessibilityLabel="QR code scanner"
        style={[{ alignItems: 'center', gap: 12 }, userStyle]}
      >
        <View
          style={{
            position: 'relative',
            width: sizeConfig.dimension,
            height: sizeConfig.dimension,
            borderRadius: sizeConfig.borderRadius,
            overflow: 'hidden',
            backgroundColor: colors.bg,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {/* Camera or placeholder */}
          {cameraComponent || (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RNText
                style={{
                  fontSize: sizeConfig.fontSize,
                  fontWeight: '500',
                  color: colors.text,
                  textAlign: 'center',
                }}
              >
                Camera preview
              </RNText>
            </View>
          )}

          {/* Overlay */}
          {renderOverlay()}
        </View>

        {/* Upload button */}
        {showUpload && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: sizeConfig.borderRadius / 2,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.buttonBg,
            }}
            accessibilityRole="button"
            accessibilityLabel="Upload image to scan"
          >
            <RNText
              style={{
                fontSize: sizeConfig.fontSize,
                fontWeight: '500',
                color: colors.text,
              }}
            >
              Upload Image
            </RNText>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

QRScanner.displayName = 'QRScanner';
