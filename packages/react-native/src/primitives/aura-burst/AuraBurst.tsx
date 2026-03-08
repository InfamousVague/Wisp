/**
 * @module primitives/aura-burst
 * @description Psychedelic border-burst effect for the Wisp design system.
 *
 * Renders multiple neon-colored border rings that burst outward from the
 * wrapped element's edge with a shaking motion, then fade away. Each ring
 * starts perfectly flush with the element border and scales outward using
 * CSS transform, ensuring pixel-perfect alignment. Random per-ring jitter
 * and rapid translate oscillations create an organic, chromatic-aberration
 * feel.
 *
 * - **Web**: CSS keyframes with per-ring custom-property offsets.
 * - **Native**: `Animated.parallel` with scale, translate shake & opacity.
 *
 * Respects `prefers-reduced-motion` — skips the animation entirely when set.
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Animated, Platform, View, Easing } from 'react-native';
import type { ViewStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_COLORS = [
  '#FF3333', // Neon Red
  '#DFFF00', // Acid Yellow
  '#0066FF', // Electric Blue
  '#7B2FFF', // UV Purple
  '#39FF14', // Nuclear Green
];

const DEFAULT_RADIUS = 16;
const DEFAULT_BORDER_WIDTH = 1.5;
const DEFAULT_DURATION = 700; // ms
const DEFAULT_DELAY = 120; // ms before burst starts
const DEFAULT_BLUR = 1.5; // px — subtle colored glow

// Per-ring peak scale factors (how far each ring expands outward).
// These are multiplied by the element size so the rings stay proportional.
// e.g. 1.008 on a 760px-wide modal ≈ 3px expansion per side.
const RING_SCALES = [1.006, 1.01, 1.015, 1.012, 1.02];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AuraBurstProps {
  children: React.ReactNode;
  /**
   * Trigger the burst. Each false→true transition fires one burst.
   * @default false
   */
  active?: boolean;
  /**
   * Ring colors (one border per color).
   * @default ['#FF3333','#DFFF00','#0066FF','#7B2FFF','#39FF14']
   */
  colors?: string[];
  /**
   * Border radius to match the wrapped element.
   * @default 16
   */
  radius?: number;
  /**
   * Border width of each ring in px.
   * @default 1.5
   */
  width?: number;
  /**
   * Total burst duration in ms (expand → shake → fade).
   * @default 700
   */
  duration?: number;
  /**
   * Delay in ms before the burst starts after `active` becomes true.
   * @default 120
   */
  delay?: number;
  /**
   * Blur radius for the colored glow on each ring (px).
   * @default 1.5
   */
  blur?: number;
  /** Style applied to the outer container. */
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Small random value in [-range, +range]. */
function jitter(range: number): number {
  return (Math.random() - 0.5) * 2 * range;
}

// ---------------------------------------------------------------------------
// Web — CSS keyframes
// ---------------------------------------------------------------------------

const KEYFRAMES_ID = 'wisp-aura-burst-keyframes';
let webKeyframesInjected = false;

function injectWebKeyframes(): void {
  if (webKeyframesInjected || typeof document === 'undefined') return;
  webKeyframesInjected = true;

  // Ring animation: starts flush with card, scales outward with shake, fades.
  // --ab-scale: peak scale (e.g. 1.015)
  // --ab-jx, --ab-jy: random jitter offset (px)
  const css = `
@keyframes wisp-aura-burst {
  0% {
    transform: scale(1) translate(0px, 0px);
    opacity: 0;
  }
  8% {
    transform: scale(1) translate(0px, 0px);
    opacity: 0.7;
  }
  18% {
    transform: scale(var(--ab-scale)) translate(var(--ab-jx), var(--ab-jy));
    opacity: 0.75;
  }
  28% {
    transform: scale(var(--ab-scale)) translate(calc(var(--ab-jx) * -0.7), calc(var(--ab-jy) * -0.8));
    opacity: 0.65;
  }
  38% {
    transform: scale(var(--ab-scale)) translate(calc(var(--ab-jx) * 0.5), calc(var(--ab-jy) * 0.6));
    opacity: 0.5;
  }
  50% {
    transform: scale(var(--ab-scale)) translate(calc(var(--ab-jx) * -0.35), calc(var(--ab-jy) * -0.4));
    opacity: 0.35;
  }
  65% {
    transform: scale(var(--ab-scale)) translate(calc(var(--ab-jx) * 0.15), calc(var(--ab-jy) * 0.2));
    opacity: 0.18;
  }
  80% {
    transform: scale(var(--ab-scale)) translate(0px, 0px);
    opacity: 0.06;
  }
  100% {
    transform: scale(var(--ab-scale)) translate(0px, 0px);
    opacity: 0;
  }
}`;

  const sheet = document.createElement('style');
  sheet.id = KEYFRAMES_ID;
  sheet.textContent = css;
  document.head.appendChild(sheet);
}

/** Check prefers-reduced-motion on web. */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// ---------------------------------------------------------------------------
// Web component
// ---------------------------------------------------------------------------

function AuraBurstWeb({
  children,
  active,
  colors,
  radius,
  width: borderWidth,
  duration,
  delay,
  blur,
  style,
}: Required<Omit<AuraBurstProps, 'children' | 'style'>> & Pick<AuraBurstProps, 'children' | 'style'>): React.JSX.Element {
  // Track activation count to force re-render of ring divs (replays animation)
  const [burstKey, setBurstKey] = useState(0);
  const prevActive = useRef(false);

  // Generate random jitter offsets per ring (regenerated each burst)
  const ringJitter = useRef<Array<{ jx: number; jy: number }>>([]);

  useEffect(() => {
    if (active && !prevActive.current) {
      injectWebKeyframes();
      // Generate fresh jitter for each ring
      ringJitter.current = colors.map(() => ({
        jx: jitter(2.5),
        jy: jitter(2.5),
      }));
      setBurstKey((k) => k + 1);
    }
    prevActive.current = active;
  }, [active, colors.length]);

  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const showRings = burstKey > 0 && !reducedMotion;

  return (
    <View style={[{ position: 'relative' } as ViewStyle, style]}>
      {children}
      {showRings &&
        colors.map((color, i) => {
          const peakScale = RING_SCALES[i % RING_SCALES.length];
          const j = ringJitter.current[i] || { jx: 0, jy: 0 };
          const ringStyle: any = {
            position: 'absolute',
            // Start flush with the element edge
            inset: -borderWidth,
            borderRadius: radius,
            border: `${borderWidth}px solid ${color}`,
            boxShadow: `0 0 ${blur}px ${blur * 0.5}px ${color}`,
            pointerEvents: 'none',
            opacity: 0,
            // Per-ring custom properties for the keyframe
            '--ab-scale': peakScale,
            '--ab-jx': `${j.jx}px`,
            '--ab-jy': `${j.jy}px`,
            animation: `wisp-aura-burst ${duration}ms ease-out ${delay}ms forwards`,
          };
          return <div key={`${burstKey}-${i}`} style={ringStyle} />;
        })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Native component
// ---------------------------------------------------------------------------

function AuraBurstNative({
  children,
  active,
  colors,
  radius,
  width: borderWidth,
  duration,
  delay,
  blur: _blur,
  style,
}: Required<Omit<AuraBurstProps, 'children' | 'style'>> & Pick<AuraBurstProps, 'children' | 'style'>): React.JSX.Element {
  // One Animated.Value per ring for main progress (scale + opacity)
  const anims = useRef(colors.map(() => new Animated.Value(0))).current;
  // Separate values for shake oscillation
  const shakeX = useRef(colors.map(() => new Animated.Value(0))).current;
  const shakeY = useRef(colors.map(() => new Animated.Value(0))).current;
  const prevActive = useRef(false);
  const [jitters, setJitters] = useState(() =>
    colors.map(() => ({ jx: jitter(2.5), jy: jitter(2.5) })),
  );

  useEffect(() => {
    if (active && !prevActive.current) {
      // Reset all values
      anims.forEach((a) => a.setValue(0));
      shakeX.forEach((a) => a.setValue(0));
      shakeY.forEach((a) => a.setValue(0));

      // Fresh jitter
      const newJitters = colors.map(() => ({ jx: jitter(2.5), jy: jitter(2.5) }));
      setJitters(newJitters);

      // Build animation for all rings simultaneously
      const ringAnims = colors.map((_, i) => {
        const j = newJitters[i];

        // Main progress 0→1: drives scale up and opacity flash→fade
        const mainAnim = Animated.timing(anims[i], {
          toValue: 1,
          duration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        });

        // Shake: rapid oscillation on translate that decays
        const shakeDur = duration * 0.12; // each shake step ~80ms
        const shakeAnim = Animated.sequence([
          // Brief pause to let ring flash in
          Animated.delay(duration * 0.08),
          // Shake to jitter offset
          Animated.parallel([
            Animated.timing(shakeX[i], { toValue: j.jx, duration: shakeDur, useNativeDriver: true }),
            Animated.timing(shakeY[i], { toValue: j.jy, duration: shakeDur, useNativeDriver: true }),
          ]),
          // Shake opposite
          Animated.parallel([
            Animated.timing(shakeX[i], { toValue: j.jx * -0.7, duration: shakeDur, useNativeDriver: true }),
            Animated.timing(shakeY[i], { toValue: j.jy * -0.8, duration: shakeDur, useNativeDriver: true }),
          ]),
          // Shake back smaller
          Animated.parallel([
            Animated.timing(shakeX[i], { toValue: j.jx * 0.4, duration: shakeDur, useNativeDriver: true }),
            Animated.timing(shakeY[i], { toValue: j.jy * 0.5, duration: shakeDur, useNativeDriver: true }),
          ]),
          // Settle
          Animated.parallel([
            Animated.timing(shakeX[i], { toValue: 0, duration: shakeDur * 1.5, useNativeDriver: true }),
            Animated.timing(shakeY[i], { toValue: 0, duration: shakeDur * 1.5, useNativeDriver: true }),
          ]),
        ]);

        return Animated.parallel([mainAnim, shakeAnim]);
      });

      // Fire all rings simultaneously after delay
      setTimeout(() => {
        Animated.parallel(ringAnims).start();
      }, delay);
    }
    prevActive.current = active;
  }, [active]);

  return (
    <View style={[{ position: 'relative' } as ViewStyle, style]}>
      {children}
      {colors.map((color, i) => {
        const peakScale = RING_SCALES[i % RING_SCALES.length];

        // Scale: 1.0 → peakScale (fast rise then hold)
        const scale = anims[i].interpolate({
          inputRange: [0, 0.15, 1],
          outputRange: [1, peakScale, peakScale],
          extrapolate: 'clamp',
        });

        // Opacity: 0 → 0.75 (quick flash) → 0 (fade out)
        const opacity = anims[i].interpolate({
          inputRange: [0, 0.08, 0.2, 0.5, 0.8, 1],
          outputRange: [0, 0.7, 0.75, 0.35, 0.1, 0],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            pointerEvents="none"
            style={{
              position: 'absolute',
              // Start flush with element edge
              top: -borderWidth,
              left: -borderWidth,
              right: -borderWidth,
              bottom: -borderWidth,
              borderRadius: radius,
              borderWidth,
              borderColor: color,
              opacity,
              transform: [
                { scale },
                { translateX: shakeX[i] },
                { translateY: shakeY[i] },
              ],
            }}
          />
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export function AuraBurst(props: AuraBurstProps): React.JSX.Element {
  const {
    active = false,
    colors = DEFAULT_COLORS,
    radius = DEFAULT_RADIUS,
    width = DEFAULT_BORDER_WIDTH,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    blur = DEFAULT_BLUR,
    ...rest
  } = props;

  const resolved = { ...rest, active, colors, radius, width, duration, delay, blur };

  if (Platform.OS === 'web') {
    return <AuraBurstWeb {...resolved} />;
  }
  return <AuraBurstNative {...resolved} />;
}

AuraBurst.displayName = 'AuraBurst';
