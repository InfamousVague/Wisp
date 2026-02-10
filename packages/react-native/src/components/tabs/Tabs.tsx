import React, { forwardRef, useMemo, useState, useCallback, useRef, createContext, useContext, useEffect } from 'react';
import { View, Pressable, ScrollView, Animated, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import { useThemeColors } from '../../providers';
import { defaultSpacing, defaultRadii } from '@wisp-ui/core/theme/create-theme';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: TabsOrientation;
  style?: ViewStyle;
}

export interface TabListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface TabProps {
  children?: React.ReactNode;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  activeValue: string;
  onChange: (value: string) => void;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('[Wisp] Tab sub-components must be used within <Tabs>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Tabs (root)
// ---------------------------------------------------------------------------

export const Tabs = forwardRef<View, TabsProps>(function Tabs(
  {
    children,
    value: controlledValue,
    defaultValue = '',
    onChange,
    orientation = 'horizontal',
    style: userStyle,
  },
  ref,
) {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );

  const ctxValue = useMemo<TabsContextValue>(
    () => ({ activeValue, onChange: handleChange, orientation }),
    [activeValue, handleChange, orientation],
  );

  return (
    <TabsContext.Provider value={ctxValue}>
      <View ref={ref} style={userStyle}>
        {children}
      </View>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

// ---------------------------------------------------------------------------
// TabList
// ---------------------------------------------------------------------------

interface TabLayout {
  x: number;
  width: number;
}

export const TabList = forwardRef<View, TabListProps>(function TabList(
  { children, style: userStyle },
  ref,
) {
  const { activeValue, orientation } = useTabsContext();
  const themeColors = useThemeColors();
  const [tabLayouts, setTabLayouts] = useState<Record<string, TabLayout>>({});
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;
  const hasMounted = useRef(false);

  const activeLayout = tabLayouts[activeValue];

  useEffect(() => {
    if (!activeLayout) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      indicatorX.setValue(activeLayout.x);
      indicatorW.setValue(activeLayout.width);
      return;
    }
    Animated.parallel([
      Animated.timing(indicatorX, { toValue: activeLayout.x, duration: 200, useNativeDriver: false }),
      Animated.timing(indicatorW, { toValue: activeLayout.width, duration: 200, useNativeDriver: false }),
    ]).start();
  }, [activeLayout]);

  const registerLayout = useCallback((value: string, layout: TabLayout) => {
    setTabLayouts((prev) => {
      if (prev[value]?.x === layout.x && prev[value]?.width === layout.width) return prev;
      return { ...prev, [value]: layout };
    });
  }, []);

  const isHorizontal = orientation === 'horizontal';

  const listStyle = useMemo<ViewStyle>(
    () => ({
      flexDirection: isHorizontal ? 'row' : 'column',
      borderBottomWidth: isHorizontal ? 1 : 0,
      borderLeftWidth: !isHorizontal ? 1 : 0,
      borderColor: themeColors.border.subtle,
      position: 'relative',
    }),
    [isHorizontal, themeColors],
  );

  const childrenWithLayout = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<any>, {
      _registerLayout: registerLayout,
    });
  });

  return (
    <View ref={ref} style={[listStyle, userStyle]}>
      {childrenWithLayout}
      {activeLayout && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: indicatorX,
            width: indicatorW,
            height: 2,
            backgroundColor: themeColors.accent.primary,
            borderRadius: defaultRadii.sm,
          }}
        />
      )}
    </View>
  );
});

TabList.displayName = 'TabList';

// ---------------------------------------------------------------------------
// Tab
// ---------------------------------------------------------------------------

export const Tab = forwardRef<View, TabProps & { _registerLayout?: (value: string, layout: TabLayout) => void }>(
  function Tab(
    { children, value, disabled = false, icon, style: userStyle, _registerLayout },
    ref,
  ) {
    const { activeValue, onChange } = useTabsContext();
    const themeColors = useThemeColors();
    const isActive = activeValue === value;

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        const { x, width } = e.nativeEvent.layout;
        _registerLayout?.(value, { x, width });
      },
      [value, _registerLayout],
    );

    const tabStyle = useMemo<ViewStyle>(
      () => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: defaultSpacing.sm,
        paddingVertical: defaultSpacing.md,
        paddingHorizontal: defaultSpacing.lg,
        opacity: disabled ? 0.4 : 1,
      }),
      [disabled],
    );

    const labelStyle = useMemo<TextStyle>(
      () => ({
        fontSize: 14,
        fontWeight: isActive ? '600' : '400',
        color: isActive ? themeColors.text.primary : themeColors.text.secondary,
      }),
      [isActive, themeColors],
    );

    return (
      <Pressable
        ref={ref}
        onLayout={handleLayout}
        onPress={() => !disabled && onChange(value)}
        disabled={disabled}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive, disabled }}
        style={[tabStyle, userStyle]}
      >
        {icon}
        {children != null && <RNText style={labelStyle}>{children}</RNText>}
      </Pressable>
    );
  },
);

Tab.displayName = 'Tab';

// ---------------------------------------------------------------------------
// TabPanel
// ---------------------------------------------------------------------------

export const TabPanel = forwardRef<View, TabPanelProps>(function TabPanel(
  { children, value, style: userStyle },
  ref,
) {
  const { activeValue } = useTabsContext();

  if (activeValue !== value) return null;

  return (
    <View ref={ref} accessibilityRole="summary" style={userStyle}>
      {children}
    </View>
  );
});

TabPanel.displayName = 'TabPanel';
