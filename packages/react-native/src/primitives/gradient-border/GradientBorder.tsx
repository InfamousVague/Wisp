/**
 * @module primitives/gradient-border
 * @description Animated gradient border wrapper for the Wisp design system.
 *
 * Renders a rotating/animated gradient border around its children using
 * react-native-svg for the gradient and border rendering.
 *
 * - **Web**: Uses CSS conic-gradient with @property animation.
 * - **Native**: Uses SVG LinearGradient with animated rotation.
 */

import React, { useRef, useEffect, useMemo } from 'react';
import { Animated, Platform, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#8B5CF6'];
const DEFAULT_BORDER_WIDTH = 2;
const DEFAULT_RADIUS = 12;
const DEFAULT_SPEED = 3000;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface GradientBorderProps {
  children: React.ReactNode;
  /**
   * Gradient color stops.
   * @default ['#8B5CF6', '#EC4899', '#3B82F6', '#8B5CF6']
   */
  colors?: string[];
  /**
   * Border width in pixels.
   * @default 2
   */
  width?: number;
  /**
   * Border radius in pixels.
   * @default 12
   */
  radius?: number;
  /**
   * Whether the gradient rotates.
   * @default true
   */
  animated?: boolean;
  /**
   * Duration of one full rotation in milliseconds.
   * @default 3000
   */
  speed?: number;
  /**
   * Whether the border is visible.
   * @default true
   */
  visible?: boolean;
  /** Style applied to the outer container. */
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// CSS keyframes injection for web
// ---------------------------------------------------------------------------

let webKeyframesInjected = false;

function injectWebKeyframes(): void {
  if (webKeyframesInjected || typeof document === 'undefined') return;
  webKeyframesInjected = true;

  const sheet = document.createElement('style');
  sheet.id = 'wisp-gradient-border-keyframes';
  sheet.textContent = [
    '@property --wisp-border-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }',
    '@keyframes wisp-border-rotate { 0% { --wisp-border-angle: 0deg; } 100% { --wisp-border-angle: 360deg; } }',
  ].join('\n');
  document.head.appendChild(sheet);
}

// ---------------------------------------------------------------------------
// Web implementation
// ---------------------------------------------------------------------------

function GradientBorderWeb({
  children,
  colors,
  width: borderWidth,
  radius,
  animated,
  speed,
  visible,
  style,
}: Required<Pick<GradientBorderProps, 'colors' | 'width' | 'radius' | 'animated' | 'speed' | 'visible'>> & GradientBorderProps): React.JSX.Element {
  useEffect(() => {
    if (animated && visible) injectWebKeyframes();
  }, [animated, visible]);

  const conicGradient = `conic-gradient(from var(--wisp-border-angle, 0deg), ${colors.join(', ')})`;

  const containerStyle: any = {
    position: 'relative',
    borderRadius: radius,
    ...style,
  };

  const borderOverlayStyle: any = {
    position: 'absolute',
    inset: 0,
    borderRadius: radius,
    padding: borderWidth,
    background: conicGradient,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    opacity: visible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
    ...(animated && visible
      ? {
          animation: `wisp-border-rotate ${speed}ms linear infinite`,
        }
      : {}),
  };

  return (
    <View style={containerStyle}>
      {children}
      <div style={borderOverlayStyle} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Native implementation — SVG border with animated rotation
// ---------------------------------------------------------------------------

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

function GradientBorderNative({
  children,
  colors,
  width: borderWidth,
  radius,
  animated,
  speed,
  visible,
  style,
}: Required<Pick<GradientBorderProps, 'colors' | 'width' | 'radius' | 'animated' | 'speed' | 'visible'>> & GradientBorderProps): React.JSX.Element {
  const rotation = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (!animated || !visible) return;
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: speed,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, speed, visible, rotation]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible, opacityAnim]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Build gradient stops from colors
  const stops = useMemo(
    () =>
      colors.map((color, i) => ({
        offset: i / Math.max(colors.length - 1, 1),
        color,
      })),
    [colors],
  );

  return (
    <View style={[{ position: 'relative', borderRadius: radius }, style]}>
      {children}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -borderWidth,
          left: -borderWidth,
          right: -borderWidth,
          bottom: -borderWidth,
          opacity: opacityAnim,
          transform: [{ rotate: animated ? rotateInterpolation : '0deg' }],
        }}
      >
        <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <Defs>
            <SvgLinearGradient id="wisp-gb-grad" x1="0" y1="0" x2="1" y2="1">
              {stops.map((s, i) => (
                <Stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </SvgLinearGradient>
          </Defs>
          <Rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width="100%"
            height="100%"
            rx={radius + borderWidth / 2}
            ry={radius + borderWidth / 2}
            stroke="url(#wisp-gb-grad)"
            strokeWidth={borderWidth}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export function GradientBorder(props: GradientBorderProps): React.JSX.Element {
  const {
    colors = DEFAULT_COLORS,
    width = DEFAULT_BORDER_WIDTH,
    radius = DEFAULT_RADIUS,
    animated = true,
    speed = DEFAULT_SPEED,
    visible = true,
    ...rest
  } = props;

  const resolved = { ...rest, colors, width, radius, animated, speed, visible };

  if (Platform.OS === 'web') {
    return <GradientBorderWeb {...resolved} />;
  }
  return <GradientBorderNative {...resolved} />;
}

GradientBorder.displayName = 'GradientBorder';
