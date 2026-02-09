/**
 * @module AvatarGroup
 */
import React, { forwardRef, useMemo } from 'react';
import type { AvatarGroupProps } from '@wisp-ui/core/types/AvatarGroup.types';
import { avatarSizeMap } from '@wisp-ui/core/types/Avatar.types';
import {
  buildGroupStyle,
  buildAvatarWrapperStyle,
  buildOverflowStyle,
} from '@wisp-ui/core/styles/AvatarGroup.styles';
import { useThemeColors } from '../../providers';

/**
 * AvatarGroup — Displays a stack of overlapping avatars with an optional
 * "+N" overflow indicator.
 *
 * @remarks
 * Key features:
 * - Overlapping layout with configurable spacing.
 * - Automatic overflow count when children exceed `max`.
 * - Passes `size` down to each Avatar child via `cloneElement`.
 * - Forwards a ref to the outer `<div>` wrapper.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3} size="md">
 *   <Avatar name="Alice" />
 *   <Avatar name="Bob" />
 *   <Avatar name="Carol" />
 *   <Avatar name="Dave" />
 *   <Avatar name="Eve" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(
    {
      children,
      max,
      size = 'md',
      spacing = 8,
      style: userStyle,
      className,
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

    const groupStyle = useMemo(() => buildGroupStyle(), []);

    const overflowStyle = useMemo(
      () => buildOverflowStyle(sizeConfig, spacing, themeColors),
      [sizeConfig, spacing, themeColors],
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Avatar group"
        className={className}
        style={{ ...groupStyle, ...userStyle }}
        {...rest}
      >
        {visibleChildren.map((child, index) => {
          const wrapperStyle = buildAvatarWrapperStyle(
            spacing,
            index,
            visibleCount,
            themeColors,
          );

          // Clone each Avatar child to inject the group's size prop
          const cloned = React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { size })
            : child;

          return (
            <div key={index} style={wrapperStyle}>
              {cloned}
            </div>
          );
        })}

        {overflow > 0 && (
          <div style={overflowStyle} aria-label={`${overflow} more`}>
            +{overflow}
          </div>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
