import React, { forwardRef, useMemo } from 'react';
import { View, Pressable, Modal, StyleSheet } from 'react-native';

type OverlayBackdrop = 'dim' | 'blur' | 'transparent';

export interface OverlayProps {
  /** Content to render above the backdrop. */
  children?: React.ReactNode;
  /** Whether the overlay is visible. @default false */
  open?: boolean;
  /** Backdrop style. @default 'dim' */
  backdrop?: OverlayBackdrop;
  /** Center children within the overlay. @default true */
  center?: boolean;
  /** Called when the backdrop area is pressed. */
  onBackdropPress?: () => void;
  /** Whether to use a Modal (presents above everything). @default true */
  useModal?: boolean;
  /** Whether the modal is transparent. @default true */
  transparent?: boolean;
  /** Animation type for the Modal. @default 'fade' */
  animationType?: 'none' | 'slide' | 'fade';
  style?: object;
}

const backdropColors: Record<OverlayBackdrop, string> = {
  dim: 'rgba(0, 0, 0, 0.5)',
  blur: 'rgba(0, 0, 0, 0.3)',
  transparent: 'transparent',
};

export const Overlay = forwardRef<View, OverlayProps>(function Overlay(
  {
    children,
    open = false,
    backdrop = 'dim',
    center = true,
    onBackdropPress,
    useModal = true,
    transparent = true,
    animationType = 'fade',
    style: userStyle,
  },
  ref,
) {
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: backdropColors[backdrop],
        alignItems: center ? ('center' as const) : undefined,
        justifyContent: center ? ('center' as const) : undefined,
      },
      userStyle,
    ],
    [backdrop, center, userStyle],
  );

  if (!open) return null;

  const content = (
    <View ref={ref} style={containerStyle}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={onBackdropPress}
      />
      {children}
    </View>
  );

  if (useModal) {
    return (
      <Modal
        visible={open}
        transparent={transparent}
        animationType={animationType}
        onRequestClose={onBackdropPress}
        statusBarTranslucent
      >
        {content}
      </Modal>
    );
  }

  return content;
});

Overlay.displayName = 'Overlay';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1200,
  },
});
