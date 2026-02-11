/**
 * @module styles/FormatToolbar
 * @description Pure style-builder functions for the FormatToolbar component.
 */

import type { CSSStyleObject } from '../types';
import type { WispTheme } from '../theme/types';
import { durations, easings } from '../tokens/motion';
import { withAlpha } from '../tokens/color-utils';

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface FormatToolbarColors {
  bg: string;
  border: string;
  buttonBg: string;
  buttonBgHover: string;
  buttonBgActive: string;
  buttonText: string;
  buttonTextActive: string;
  buttonTextDisabled: string;
  separatorColor: string;
}

export function resolveFormatToolbarColors(
  theme: WispTheme,
): FormatToolbarColors {
  const { colors } = theme;
  return {
    bg: colors.background.surface,
    border: colors.border.subtle,
    buttonBg: 'transparent',
    buttonBgHover: withAlpha(colors.text.primary, 0.08),
    buttonBgActive: withAlpha(colors.text.primary, 0.14),
    buttonText: colors.text.secondary,
    buttonTextActive: colors.text.primary,
    buttonTextDisabled: colors.text.muted,
    separatorColor: colors.border.subtle,
  };
}

// ---------------------------------------------------------------------------
// Container
// ---------------------------------------------------------------------------

export function buildFormatToolbarContainerStyle(
  colors: FormatToolbarColors,
  theme: WispTheme,
): CSSStyleObject {
  const { radii, spacing } = theme;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    padding: `${spacing.xs}px`,
    borderRadius: radii.md,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    boxSizing: 'border-box',
  };
}

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

interface ButtonSizeConfig {
  size: number;
  iconSize: number;
}

const buttonSizeConfigs: Record<'sm' | 'md', ButtonSizeConfig> = {
  sm: { size: 26, iconSize: 14 },
  md: { size: 30, iconSize: 16 },
};

export function buildFormatButtonStyle(
  colors: FormatToolbarColors,
  active: boolean,
  disabled: boolean,
  size: 'sm' | 'md',
  theme: WispTheme,
): CSSStyleObject {
  const { radii } = theme;
  const cfg = buttonSizeConfigs[size];
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: cfg.size,
    height: cfg.size,
    borderRadius: radii.sm,
    border: 'none',
    backgroundColor: active ? colors.buttonBgActive : colors.buttonBg,
    color: disabled
      ? colors.buttonTextDisabled
      : active
        ? colors.buttonTextActive
        : colors.buttonText,
    cursor: disabled ? 'not-allowed' : 'pointer',
    padding: 0,
    transition: `all ${durations.fast}ms ${easings.easeOut.css}`,
    opacity: disabled ? 0.5 : 1,
    flexShrink: 0,
  };
}

export function getFormatButtonIconSize(size: 'sm' | 'md'): number {
  return buttonSizeConfigs[size].iconSize;
}

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export function buildFormatSeparatorStyle(
  colors: FormatToolbarColors,
  size: 'sm' | 'md',
): CSSStyleObject {
  const cfg = buttonSizeConfigs[size];
  return {
    width: 1,
    height: cfg.size - 8,
    backgroundColor: colors.separatorColor,
    flexShrink: 0,
    margin: '0 2px',
  };
}
