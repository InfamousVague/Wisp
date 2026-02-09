/**
 * @module theme/dark
 * @description Dark-mode color tokens for the Wisp design system.
 *
 * Cool blue-black palette with subtle navy undertones. White accent
 * system for a monochrome, high-contrast dark mode.
 */

import type { ThemeColors } from './types';

export const darkColors: ThemeColors = {
  // ---------------------------------------------------------------------------
  // Background / elevation — cool blue-black layers
  // ---------------------------------------------------------------------------
  background: {
    /** Root-level dark canvas — true black. */
    canvas: '#000000',
    /** Card / panel surface — near-black. */
    surface: '#0A0A0A',
    /** Elevated elements (popovers, tooltips, dropdowns). */
    raised: '#161616',
    /** Semi-transparent scrim for modals and drawers. */
    overlay: 'rgba(0, 0, 0, 0.75)',
  },

  // ---------------------------------------------------------------------------
  // Foreground / text
  // ---------------------------------------------------------------------------
  text: {
    /** Default body text — near-white for high contrast. */
    primary: '#F5F5F5',
    /** Secondary supporting text — neutral gray. */
    secondary: '#A0A0A0',
    /** Muted / disabled text — subdued neutral. */
    muted: '#555555',
    /** Inverse text used on light-colored surfaces (e.g. white buttons). */
    inverse: '#0A0A0A',
    /** Link / interactive text — pure white (monochrome accent). */
    link: '#FFFFFF',
    /** Primary text on raised surfaces — near-white. */
    onRaised: '#F5F5F5',
    /** Secondary text on raised surfaces — readable neutral gray. */
    onRaisedSecondary: '#A0A0A0',
  },

  // ---------------------------------------------------------------------------
  // Borders & outlines
  // ---------------------------------------------------------------------------
  border: {
    /** Low-contrast divider — neutral dark gray. */
    subtle: '#2A2A2A',
    /** High-contrast border — medium neutral gray. */
    strong: '#3D3D3D',
    /** Focus ring — pure white for maximum visibility. */
    focus: '#FFFFFF',
    /** Active / pressed border — near-white. */
    active: '#F5F5F5',
  },

  // ---------------------------------------------------------------------------
  // Accent / interactive — monochrome white on dark
  // ---------------------------------------------------------------------------
  accent: {
    /** Primary accent — pure white. */
    primary: '#FFFFFF',
    /** Primary hover — slightly dimmed off-white. */
    primaryHover: '#E8E8E8',
    /** Primary active / pressed — dimmed white. */
    primaryActive: '#D0D0D0',
    /** Secondary accent — neutral gray. */
    secondary: '#A0A0A0',
    /** Selection / highlight tint — white at low opacity. */
    highlight: 'rgba(255, 255, 255, 0.08)',
    /** Hover highlight on raised surfaces — subtle white tint. */
    highlightRaised: 'rgba(255, 255, 255, 0.06)',
    /** Muted foreground on raised surfaces. */
    mutedRaised: 'rgba(255, 255, 255, 0.45)',
    /** Low-contrast divider on raised surfaces. */
    dividerRaised: 'rgba(255, 255, 255, 0.08)',
  },

  // ---------------------------------------------------------------------------
  // Status / feedback
  // ---------------------------------------------------------------------------
  status: {
    success: '#22C55E',
    successSurface: 'rgba(34, 197, 94, 0.10)',
    successBorder: 'rgba(34, 197, 94, 0.20)',
    warning: '#F59E0B',
    warningSurface: 'rgba(245, 158, 11, 0.10)',
    warningBorder: 'rgba(245, 158, 11, 0.20)',
    danger: '#EF4444',
    dangerSurface: 'rgba(239, 68, 68, 0.10)',
    dangerBorder: 'rgba(239, 68, 68, 0.20)',
    info: '#3B82F6',
    infoSurface: 'rgba(59, 130, 246, 0.10)',
    infoBorder: 'rgba(59, 130, 246, 0.20)',
  },

  // ---------------------------------------------------------------------------
  // Brand
  // ---------------------------------------------------------------------------
  brand: {
    /** Main brand purple — vivid on dark. */
    primary: '#8B5CF6',
    /** Hover — lighter violet. */
    hover: '#A78BFA',
    /** Active / pressed — saturated. */
    active: '#7C3AED',
    /** Tinted brand surface. */
    surface: 'rgba(139, 92, 246, 0.10)',
    /** Subtle brand border. */
    border: 'rgba(139, 92, 246, 0.20)',
    /** Text on brand backgrounds — white. */
    text: '#FFFFFF',
  },

  // ---------------------------------------------------------------------------
  // Data visualization
  // ---------------------------------------------------------------------------
  data: {
    blue: '#3B82F6',
    violet: '#8B5CF6',
    amber: '#F59E0B',
    emerald: '#10B981',
    cyan: '#06B6D4',
  },
};
