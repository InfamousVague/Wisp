/**
 * @module primitives/beacon
 * @description React Native Beacon primitive for the Wisp design system.
 *
 * A pulsing dot/button that draws attention. In RN, the popover behavior
 * is not included — the component renders as a simple animated indicator
 * with an optional onPress callback.
 */

import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import { View, Pressable, Animated } from 'react-native';
import type { ViewProps, ViewStyle } from 'react-native';
import type { BeaconVariant, BeaconSize } from '@wisp-ui/core/types/Beacon.types';
import { beaconSizeMap } from '@wisp-ui/core/types/Beacon.types';
import { resolveBeaconColor } from '@wisp-ui/core/styles/Beacon.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface BeaconProps extends ViewProps {
  /** Size preset for the beacon button. @default 'md' */
  size?: BeaconSize;
  /** Colour variant controlling the beacon's tint. @default 'info' */
  variant?: BeaconVariant;
  /** Whether the beacon pulses to draw attention. @default true */
  pulsing?: boolean;
  /** Called when the beacon is pressed. */
  onPress?: () => void;
  /** Content rendered alongside or inside the beacon (optional). */
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Beacon = forwardRef<View, BeaconProps>(
  function Beacon(
    {
      size = 'md',
      variant = 'info',
      pulsing = true,
      onPress,
      children,
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const sizeConfig = beaconSizeMap[size];
    const accentColor = useMemo(
      () => resolveBeaconColor(variant, themeColors),
      [variant, themeColors],
    );

    // Pulse animation
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (pulsing) {
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ]),
        );
        animation.start();
        return () => animation.stop();
      } else {
        pulseAnim.setValue(0);
      }
    }, [pulsing, pulseAnim]);

    const buttonStyle = useMemo<ViewStyle>(() => ({
      width: sizeConfig.buttonSize,
      height: sizeConfig.buttonSize,
      borderRadius: sizeConfig.borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: accentColor,
    }), [sizeConfig, accentColor]);

    const pulseScale = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.4],
    });

    const pulseOpacity = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0],
    });

    const pulseRingStyle = useMemo<ViewStyle>(() => ({
      position: 'absolute',
      width: sizeConfig.buttonSize,
      height: sizeConfig.buttonSize,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: accentColor,
    }), [sizeConfig, accentColor]);

    const containerStyle = useMemo<ViewStyle>(() => ({
      alignItems: 'center',
      justifyContent: 'center',
    }), []);

    return (
      <View ref={ref} style={[containerStyle, userStyle]} {...rest}>
        {pulsing && (
          <Animated.View
            style={[
              pulseRingStyle,
              {
                transform: [{ scale: pulseScale }],
                opacity: pulseOpacity,
              },
            ]}
            pointerEvents="none"
          />
        )}
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          accessibilityLabel="Beacon"
          style={buttonStyle}
        >
          {children}
        </Pressable>
      </View>
    );
  },
);

Beacon.displayName = 'Beacon';
