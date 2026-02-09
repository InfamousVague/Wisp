/**
 * @module ActivityFeed
 */
import React, { forwardRef, useMemo } from 'react';
import type { ActivityFeedProps } from '@wisp-ui/core/types/ActivityFeed.types';
import { activityFeedSizeMap } from '@wisp-ui/core/types/ActivityFeed.types';
import {
  buildFeedContainerStyle,
  buildFeedItemStyle,
  buildFeedAvatarStyle,
  buildFeedConnectorStyle,
  buildFeedContentStyle,
  buildFeedTimestampStyle,
} from '@wisp-ui/core/styles/ActivityFeed.styles';
import { useThemeColors } from '../../providers';

/**
 * ActivityFeed — Chronological event list for the Wisp design system.
 *
 * @remarks
 * Displays a vertical list of events with avatar/icon, content, and timestamp.
 * Supports an optional connector line between items.
 *
 * @example
 * ```tsx
 * <ActivityFeed
 *   items={[
 *     { id: '1', content: 'John created a new project', timestamp: '2 hours ago', avatarInitials: 'JD' },
 *     { id: '2', content: 'Jane commented on the task', timestamp: '1 hour ago', avatarInitials: 'JM' },
 *   ]}
 * />
 * ```
 */
export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(function ActivityFeed(
  {
    items,
    size = 'md',
    showConnector = true,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = activityFeedSizeMap[size];

  const containerStyle = useMemo(() => buildFeedContainerStyle(), []);

  return (
    <div
      ref={ref}
      role="feed"
      className={className}
      style={{ ...containerStyle, ...userStyle }}
      {...rest}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const itemStyle = buildFeedItemStyle(sizeConfig);
        const avatarStyle = buildFeedAvatarStyle(sizeConfig, themeColors, item.iconColor);
        const contentStyle = buildFeedContentStyle(sizeConfig, themeColors);
        const timestampStyle = buildFeedTimestampStyle(sizeConfig, themeColors);
        const Icon = item.icon;

        return (
          <div key={item.id} role="article" style={itemStyle}>
            {/* Connector */}
            {showConnector && !isLast && (
              <div style={buildFeedConnectorStyle(sizeConfig, themeColors)} />
            )}

            {/* Avatar / Icon */}
            <div style={avatarStyle}>
              {item.avatarUrl ? (
                <img
                  src={item.avatarUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : Icon ? (
                <Icon size={sizeConfig.avatarSize * 0.5} color="currentColor" strokeWidth={2} />
              ) : item.avatarInitials ? (
                <span>{item.avatarInitials}</span>
              ) : null}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={contentStyle}>{item.content}</div>
              <div style={timestampStyle}>{item.timestamp}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

ActivityFeed.displayName = 'ActivityFeed';
