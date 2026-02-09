import React, { forwardRef, useMemo } from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { BreadcrumbSize } from '@wisp-ui/core/types/Breadcrumb.types';
import { breadcrumbSizeMap } from '@wisp-ui/core/types/Breadcrumb.types';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

export interface BreadcrumbProps {
  /** Custom separator element rendered between items. Defaults to a chevron icon. */
  separator?: React.ReactNode;
  /** Size preset controlling font size. @default 'md' */
  size?: BreadcrumbSize;
  /** One or more BreadcrumbItem elements. */
  children: React.ReactNode;
  style?: object;
}

export const Breadcrumb = forwardRef<View, BreadcrumbProps>(function Breadcrumb(
  { separator, size = 'md', children, style: userStyle },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = breadcrumbSizeMap[size];
  const items = React.Children.toArray(children);

  const defaultSeparator = useMemo(
    () => (
      <Svg width={sizeConfig.fontSize} height={sizeConfig.fontSize} viewBox="0 0 24 24">
        <Path
          d="M9 18l6-6-6-6"
          stroke={themeColors.text.muted}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    ),
    [sizeConfig.fontSize, themeColors.text.muted],
  );

  return (
    <View
      ref={ref}
      accessibilityRole="header"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        userStyle,
      ]}
    >
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <View style={{ paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' }}>
              {separator || defaultSeparator}
            </View>
          )}
          {child}
        </React.Fragment>
      ))}
    </View>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

// ---------------------------------------------------------------------------
// BreadcrumbItem
// ---------------------------------------------------------------------------

export interface BreadcrumbItemProps {
  /** Marks this item as the current page. @default false */
  active?: boolean;
  /** Optional icon displayed before the label text. */
  icon?: React.ReactNode;
  /** Item label content. */
  children: React.ReactNode;
  /** Click handler. */
  onPress?: () => void;
  style?: object;
}

export const BreadcrumbItem = forwardRef<View, BreadcrumbItemProps>(function BreadcrumbItem(
  { active = false, icon, children, onPress, style: userStyle },
  ref,
) {
  const themeColors = useThemeColors();

  const textColor = active ? themeColors.text.primary : themeColors.text.secondary;
  const fontWeight = active ? ('500' as const) : ('400' as const);

  const content = (
    <View
      ref={!onPress || active ? ref : undefined}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: 4 }, userStyle]}
    >
      {icon && <View style={{ alignItems: 'center', justifyContent: 'center' }}>{icon}</View>}
      <RNText style={{ color: textColor, fontWeight }}>
        {children}
      </RNText>
    </View>
  );

  if (active || !onPress) {
    return content;
  }

  return (
    <Pressable ref={ref} onPress={onPress} style={userStyle}>
      {content}
    </Pressable>
  );
});

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ---------------------------------------------------------------------------
// BreadcrumbSeparator
// ---------------------------------------------------------------------------

export interface BreadcrumbSeparatorProps {
  /** Custom separator content. */
  children?: React.ReactNode;
  style?: object;
}

export const BreadcrumbSeparator = forwardRef<View, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ children, style: userStyle }, ref) {
    const themeColors = useThemeColors();

    return (
      <View
        ref={ref}
        style={[{ paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center' }, userStyle]}
      >
        {children || (
          <RNText style={{ color: themeColors.text.muted }}>/</RNText>
        )}
      </View>
    );
  },
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
