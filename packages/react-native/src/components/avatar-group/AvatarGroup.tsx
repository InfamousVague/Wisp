/**
 * @module components/avatar-group
 * @description React Native AvatarGroup for the Wisp design system.
 *
 * Reuses size maps from `@wisp-ui/core`. Renders overlapping Avatar children
 * via `<View>` with negative margins and an optional "+N" overflow indicator.
 */

import React, { forwardRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { AvatarSize } from '@wisp-ui/core/types/Avatar.types';
import { avatarSizeMap } from '@wisp-ui/core/types/Avatar.types';
import { useThemeColors } from '../../providers';
import { defaultTypography } from '@wisp-ui/core/theme/create-theme';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface AvatarGroupProps extends ViewProps {
  /** Maximum number of avatars to display before showing the "+N" overflow indicator. */
  max?: number;
  /** Size preset applied to every avatar in the group. @default 'md' */
  size?: AvatarSize;
  /** Overlap spacing in pixels (negative margin between avatars). @default 8 */
  spacing?: number;
  /** Avatar elements to render in the group. */
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const AvatarGroup = forwardRef<View, AvatarGroupProps>(
  function AvatarGroup(
    {
      children,
      max,
      size = 'md',
      spacing = 8,
      style: userStyle,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();
    const sizeConfig = avatarSizeMap[size];

    const allChildren = React.Children.toArray(children);
    const visibleCount =
      max !== undefined && max < allChildren.length ? max : allChildren.length;
    const overflow = allChildren.length - visibleCount;
    const visibleChildren = allChildren.slice(0, visibleCount);

    const containerStyle = useMemo<ViewStyle>(
      () => ({
        flexDirection: 'row',
        alignItems: 'center',
      }),
      [],
    );

    const overflowContainerStyle = useMemo<ViewStyle>(
      () => ({
        width: sizeConfig.container,
        height: sizeConfig.container,
        borderRadius: sizeConfig.container / 2,
        backgroundColor: themeColors.background.raised,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -spacing,
        borderWidth: 2,
        borderColor: themeColors.background.canvas,
      }),
      [sizeConfig, spacing, themeColors],
    );

    const overflowTextStyle = useMemo<TextStyle>(
      () => ({
        fontSize: sizeConfig.fontSize,
        fontWeight: defaultTypography.weights.semibold,
        color: themeColors.text.onRaised,
      }),
      [sizeConfig, themeColors],
    );

    return (
      <View
        ref={ref}
        accessibilityRole="summary"
        accessibilityLabel="Avatar group"
        style={[containerStyle, userStyle]}
        {...rest}
      >
        {visibleChildren.map((child, index) => {
          const wrapperStyle: ViewStyle = {
            marginLeft: index === 0 ? 0 : -spacing,
            borderRadius: sizeConfig.container / 2,
            borderWidth: 2,
            borderColor: themeColors.background.canvas,
            zIndex: visibleCount - index,
          };

          const cloned = React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { size })
            : child;

          return (
            <View key={index} style={wrapperStyle}>
              {cloned}
            </View>
          );
        })}

        {overflow > 0 && (
          <View
            style={overflowContainerStyle}
            accessibilityLabel={`${overflow} more`}
          >
            <Text style={overflowTextStyle}>+{overflow}</Text>
          </View>
        )}
      </View>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
