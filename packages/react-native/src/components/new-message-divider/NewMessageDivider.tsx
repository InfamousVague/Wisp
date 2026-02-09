/**
 * @module components/new-message-divider
 * @description React Native NewMessageDivider for the Wisp design system.
 *
 * Horizontal divider marking the boundary between read and unread messages.
 */

import React, { forwardRef, useMemo } from 'react';
import { View, Text } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface NewMessageDividerProps extends ViewProps {
  /** Label text centered on the divider. @default 'New' */
  label?: string;
  /** Override color for line and label. Defaults to theme danger color. */
  color?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const NewMessageDivider = forwardRef<View, NewMessageDividerProps>(function NewMessageDivider(
  {
    label = 'New',
    color,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const resolvedColor = color ?? themeColors.status.danger;

  const containerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  }), []);

  const lineStyle = useMemo<ViewStyle>(() => ({
    flex: 1,
    height: 1,
    backgroundColor: resolvedColor,
    opacity: 0.4,
  }), [resolvedColor]);

  const labelStyle = useMemo<TextStyle>(() => ({
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: resolvedColor,
  }), [resolvedColor]);

  return (
    <View
      ref={ref}
      style={[containerStyle, userStyle]}
      accessibilityRole="none"
      accessibilityLabel="New messages"
      {...rest}
    >
      <View style={lineStyle} />
      <Text style={labelStyle}>{label}</Text>
      <View style={lineStyle} />
    </View>
  );
});

NewMessageDivider.displayName = 'NewMessageDivider';
