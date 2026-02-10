import React, { forwardRef, useMemo } from 'react';
import { View, Text as RNText } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { ActivityCirclesSize, ActivityCirclesRing } from '@wisp-ui/core/types/ActivityCircles.types';
import { activityCirclesSizeMap } from '@wisp-ui/core/types/ActivityCircles.types';
import { thicknessValues, type Thickness } from '@wisp-ui/core/tokens/shared';
import { computeRingGeometry } from '@wisp-ui/core/styles/chart-utils';
import {
  resolveRingColor,
  resolveActivityCirclesColors,
} from '@wisp-ui/core/styles/ActivityCircles.styles';
import { useThemeColors } from '../../providers';

export interface ActivityCirclesProps {
  rings: ActivityCirclesRing[];
  size?: ActivityCirclesSize;
  thickness?: Thickness;
  showLabels?: boolean;
  animated?: boolean;
  children?: React.ReactNode;
  style?: object;
}

/**
 * ActivityCircles — Apple-Watch-style concentric progress rings (React Native).
 */
export const ActivityCircles = forwardRef<View, ActivityCirclesProps>(
  function ActivityCircles(
    {
      rings,
      size = 'md',
      thickness,
      showLabels = false,
      animated = false,
      children,
      style: userStyle,
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const baseSizeConfig = activityCirclesSizeMap[size];

    const sizeConfig = useMemo(() => {
      if (!thickness) return baseSizeConfig;
      return { ...baseSizeConfig, strokeWidth: thicknessValues[thickness] };
    }, [baseSizeConfig, thickness]);

    const colors = useMemo(
      () => resolveActivityCirclesColors(themeColors),
      [themeColors],
    );

    const ringColors = useMemo(
      () => rings.map((ring, i) => ring.color || resolveRingColor(i, themeColors)),
      [rings, themeColors],
    );

    const geometry = useMemo(
      () => computeRingGeometry(rings, sizeConfig.diameter, sizeConfig.strokeWidth, sizeConfig.gap),
      [rings, sizeConfig],
    );

    const viewBoxSize = sizeConfig.diameter;
    const center = viewBoxSize / 2;

    return (
      <View
        ref={ref}
        accessibilityRole="image"
        accessibilityLabel={
          rings
            .map((r, i) => {
              const pct = r.max > 0 ? Math.round((Math.min(Math.max(r.value, 0), r.max) / r.max) * 100) : 0;
              return `${r.label || `Ring ${i + 1}`}: ${pct}%`;
            })
            .join(', ')
        }
        style={[
          { alignItems: 'center', gap: showLabels ? 12 : 0 },
          userStyle,
        ]}
      >
        <View style={{ width: sizeConfig.diameter, height: sizeConfig.diameter, position: 'relative' }}>
          <Svg
            width={sizeConfig.diameter}
            height={sizeConfig.diameter}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          >
            {geometry.map((geo, i) => (
              <React.Fragment key={i}>
                {/* Track */}
                <Circle
                  cx={center}
                  cy={center}
                  r={geo.radius}
                  stroke={colors.track}
                  strokeWidth={sizeConfig.strokeWidth}
                  fill="none"
                />
                {/* Progress */}
                <Circle
                  cx={center}
                  cy={center}
                  r={geo.radius}
                  stroke={ringColors[i]}
                  strokeWidth={sizeConfig.strokeWidth}
                  fill="none"
                  strokeDasharray={`${geo.circumference}`}
                  strokeDashoffset={geo.dashOffset}
                  strokeLinecap="round"
                  rotation={-90}
                  origin={`${center}, ${center}`}
                />
              </React.Fragment>
            ))}
          </Svg>

          {/* Centre content */}
          {children != null && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </View>
          )}
        </View>

        {/* Legend */}
        {showLabels && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {rings.map((ring, i) =>
              ring.label ? (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: ringColors[i],
                    }}
                  />
                  <RNText
                    style={{
                      fontSize: sizeConfig.fontSize,
                      fontWeight: '500',
                      color: colors.labelText,
                    }}
                  >
                    {ring.label}
                  </RNText>
                </View>
              ) : null,
            )}
          </View>
        )}
      </View>
    );
  },
);

ActivityCircles.displayName = 'ActivityCircles';
