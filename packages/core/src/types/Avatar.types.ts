import type React from 'react';
import type { ComponentSize } from '../tokens/shared';

/** Available avatar size presets. */
export const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/** Union of allowed avatar size values. */
export type AvatarSize = (typeof avatarSizes)[number];

/** Available avatar shape options. */
export const avatarShapes = ['circle', 'square'] as const;

/** Union of allowed avatar shape values. */
export type AvatarShape = (typeof avatarShapes)[number];

/** Available avatar status indicator states. */
export const avatarStatuses = ['online', 'offline', 'busy', 'away'] as const;

/** Union of allowed avatar status values. */
export type AvatarStatus = (typeof avatarStatuses)[number];

/**
 * Pixel-level dimension configuration for a single {@link AvatarSize} preset.
 */
export interface AvatarSizeConfig {
  /** Overall width and height of the avatar container in pixels. */
  container: number;
  /** Font size for initials text in pixels. */
  fontSize: number;
  /** Size of the fallback icon in pixels. */
  iconSize: number;
  /** Diameter of the status indicator dot in pixels. */
  statusSize: number;
  /** Border width around the status indicator dot in pixels. */
  statusBorder: number;
  /** Border radius applied when {@link AvatarShape} is `'square'`. */
  squareRadius: number;
}

/**
 * Maps each {@link AvatarSize} to its corresponding {@link AvatarSizeConfig}.
 */
export const avatarSizeMap: Record<AvatarSize, AvatarSizeConfig> = {
  xs: { container: 24, fontSize: 10, iconSize: 12, statusSize: 8, statusBorder: 1.5, squareRadius: 4 },
  sm: { container: 32, fontSize: 12, iconSize: 16, statusSize: 10, statusBorder: 2, squareRadius: 6 },
  md: { container: 40, fontSize: 14, iconSize: 20, statusSize: 12, statusBorder: 2, squareRadius: 8 },
  lg: { container: 48, fontSize: 16, iconSize: 24, statusSize: 14, statusBorder: 2, squareRadius: 10 },
  xl: { container: 64, fontSize: 20, iconSize: 28, statusSize: 16, statusBorder: 2.5, squareRadius: 12 },
};

/**
 * Props accepted by the {@link Avatar} component.
 *
 * @remarks
 * Extends the native `HTMLDivElement` attributes so any standard `div` prop
 * (e.g. `data-*`, event handlers) is also accepted.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL for the avatar. Falls back to initials or icon on error. */
  src?: string;
  /** Accessible alt text for the avatar image. */
  alt?: string;
  /** Full name used to derive initials when no image is available. */
  name?: string;
  /** Size preset for the avatar. @default 'md' */
  size?: AvatarSize;
  /** Shape of the avatar container. @default 'circle' */
  shape?: AvatarShape;
  /** Custom icon component rendered when no image or initials are available. @default User */
  fallbackIcon?: React.ComponentType<{ size?: number | string; color?: string; strokeWidth?: number }>;
  /** Optional status indicator displayed at the bottom-right corner. */
  status?: AvatarStatus;
  /** When `true`, renders a pulsing skeleton placeholder instead of content. @default false */
  skeleton?: boolean;
  /** Additional CSS class name applied to the outermost element. */
  className?: string;
  /** Inline style overrides merged onto the outermost element. */
  style?: React.CSSProperties;
}
