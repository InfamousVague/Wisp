import React, { forwardRef, useMemo, useState, useCallback, createContext, useContext } from 'react';
import { View, Pressable, Modal, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(): DropdownMenuContextValue {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) throw new Error('[Wisp] DropdownMenu sub-components must be used within <DropdownMenu>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface DropdownMenuContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface DropdownMenuItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export interface DropdownMenuSeparatorProps {
  style?: ViewStyle;
}

// ---------------------------------------------------------------------------
// DropdownMenu (root)
// ---------------------------------------------------------------------------

export const DropdownMenu = forwardRef<View, DropdownMenuProps>(function DropdownMenu(
  { children, open: controlledOpen, defaultOpen = false, onOpenChange },
  ref,
) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const ctxValue = useMemo<DropdownMenuContextValue>(
    () => ({ open, setOpen }),
    [open, setOpen],
  );

  return (
    <DropdownMenuContext.Provider value={ctxValue}>
      <View ref={ref}>{children}</View>
    </DropdownMenuContext.Provider>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

// ---------------------------------------------------------------------------
// DropdownMenuTrigger
// ---------------------------------------------------------------------------

export const DropdownMenuTrigger = forwardRef<View, DropdownMenuTriggerProps>(function DropdownMenuTrigger(
  { children, style: userStyle },
  ref,
) {
  const { open, setOpen } = useDropdownMenuContext();

  return (
    <Pressable
      ref={ref}
      onPress={() => setOpen(!open)}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      style={userStyle}
    >
      {children}
    </Pressable>
  );
});

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// ---------------------------------------------------------------------------
// DropdownMenuContent
// ---------------------------------------------------------------------------

export const DropdownMenuContent = forwardRef<View, DropdownMenuContentProps>(function DropdownMenuContent(
  { children, style: userStyle },
  ref,
) {
  const { open, setOpen } = useDropdownMenuContext();
  const themeColors = useThemeColors();

  const contentStyle = useMemo<ViewStyle>(
    () => ({
      backgroundColor: themeColors.background.raised,
      borderRadius: 12,
      paddingVertical: 6,
      minWidth: 180,
      maxWidth: 280,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 6,
    }),
    [themeColors],
  );

  if (!open) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => setOpen(false)}
      statusBarTranslucent
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView>
            <Pressable onPress={(e) => e.stopPropagation()} ref={ref} style={[contentStyle, userStyle]}>
              {children}
            </Pressable>
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

// ---------------------------------------------------------------------------
// DropdownMenuItem
// ---------------------------------------------------------------------------

export const DropdownMenuItem = forwardRef<View, DropdownMenuItemProps>(function DropdownMenuItem(
  { children, onSelect, disabled = false, danger = false, icon, style: userStyle },
  ref,
) {
  const { setOpen } = useDropdownMenuContext();
  const themeColors = useThemeColors();

  const handlePress = useCallback(() => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
  }, [disabled, onSelect, setOpen]);

  const textColor = danger ? themeColors.status.danger : themeColors.text.onRaised;

  const itemStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <Pressable
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="menuitem"
      style={({ pressed }) => [
        itemStyle,
        pressed ? { backgroundColor: themeColors.accent.highlight } : undefined,
        userStyle,
      ]}
    >
      {icon && <View style={{ flexShrink: 0 }}>{icon}</View>}
      <RNText style={{ fontSize: 14, color: textColor, flex: 1 } as TextStyle}>{children}</RNText>
    </Pressable>
  );
});

DropdownMenuItem.displayName = 'DropdownMenuItem';

// ---------------------------------------------------------------------------
// DropdownMenuSeparator
// ---------------------------------------------------------------------------

export const DropdownMenuSeparator = forwardRef<View, DropdownMenuSeparatorProps>(
  function DropdownMenuSeparator({ style: userStyle }, ref) {
    const themeColors = useThemeColors();
    return (
      <View
        ref={ref}
        style={[
          { height: 1, backgroundColor: themeColors.border.subtle, marginVertical: 4, marginHorizontal: 6 },
          userStyle,
        ]}
      />
    );
  },
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
