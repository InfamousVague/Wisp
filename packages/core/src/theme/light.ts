/**
 * @module theme/light
 * @description Light-mode color tokens for the Wisp design system.
 *
 * Clean white canvas with cool gray accents. Dark surfaces for cards
 * and raised elements maintain the monochrome aesthetic. Black accent
 * system for interactive elements.
 */

import type { ThemeColors } from './types';

export const lightColors: ThemeColors = {
  // ---------------------------------------------------------------------------
  // Background / elevation — white canvas, dark surfaces
  // ---------------------------------------------------------------------------
  background: {
    /** Root-level light canvas — pure white. */
    canvas: '#FFFFFF',
    /** Card / panel surface — near-black. */
    surface: '#09090B',
    /** Elevated elements (popovers, tooltips) — dark. */
    raised: '#111113',
    /** Semi-transparent scrim for modals and drawers. */
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // ---------------------------------------------------------------------------
  // Foreground / text
  // ---------------------------------------------------------------------------
  text: {
    /** Default body text on canvas — near-black. */
    primary: '#0C0C0E',
    /** Secondary text on canvas — medium gray, clearly readable. */
    secondary: '#71717A',
    /** Muted / disabled text — lighter gray. */
    muted: '#A1A1AA',
    /** Inverse text — pure white, used on dark surfaces. */
    inverse: '#FFFFFF',
    /** Link / interactive text — near-black on canvas. */
    link: '#0C0C0E',
    /** Primary text on raised (dark) surfaces — pure white. */
    onRaised: '#FFFFFF',
    /** Secondary text on raised (dark) surfaces — readable on dark. */
    onRaisedSecondary: '#A1A1AA',
  },

  // ---------------------------------------------------------------------------
  // Borders & outlines
  // ---------------------------------------------------------------------------
  border: {
    /** Low-contrast divider — light gray. */
    subtle: '#E4E4E7',
    /** High-contrast border — medium gray. */
    strong: '#D4D4D8',
    /** Focus ring — near-black for max visibility on white. */
    focus: '#0C0C0E',
    /** Active / pressed border — dark. */
    active: '#18181B',
  },

  // ---------------------------------------------------------------------------
  // Accent / interactive — monochrome black on white canvas
  // ---------------------------------------------------------------------------
  accent: {
    /** Primary accent — near-black. */
    primary: '#0C0C0E',
    /** Primary hover — slightly lighter. */
    primaryHover: '#18181B',
    /** Primary active / pressed — charcoal. */
    primaryActive: '#27272A',
    /** Secondary accent — medium gray. */
    secondary: '#71717A',
    /** Selection / highlight tint — black at low opacity. */
    highlight: 'rgba(0, 0, 0, 0.04)',
    /** Hover highlight on raised (dark) surfaces — white tint. */
    highlightRaised: 'rgba(255, 255, 255, 0.08)',
    /** Muted foreground on raised (dark) surfaces. */
    mutedRaised: 'rgba(255, 255, 255, 0.45)',
    /** Low-contrast divider on raised (dark) surfaces. */
    dividerRaised: 'rgba(255, 255, 255, 0.10)',
  },

  // ---------------------------------------------------------------------------
  // Status / feedback — vivid on white
  // ---------------------------------------------------------------------------
  status: {
    success: '#16A34A',
    successSurface: 'rgba(22, 163, 74, 0.06)',
    successBorder: 'rgba(22, 163, 74, 0.16)',
    warning: '#D97706',
    warningSurface: 'rgba(217, 119, 6, 0.06)',
    warningBorder: 'rgba(217, 119, 6, 0.16)',
    danger: '#DC2626',
    dangerSurface: 'rgba(220, 38, 38, 0.06)',
    dangerBorder: 'rgba(220, 38, 38, 0.16)',
    info: '#2563EB',
    infoSurface: 'rgba(37, 99, 235, 0.06)',
    infoBorder: 'rgba(37, 99, 235, 0.16)',
  },

  // ---------------------------------------------------------------------------
  // Brand
  // ---------------------------------------------------------------------------
  brand: {
    /** Main brand purple — vivid on white. */
    primary: '#7C3AED',
    /** Hover — deeper. */
    hover: '#6D28D9',
    /** Active / pressed — darkest. */
    active: '#5B21B6',
    /** Tinted brand surface on white. */
    surface: 'rgba(124, 58, 237, 0.06)',
    /** Subtle brand border on white. */
    border: 'rgba(124, 58, 237, 0.16)',
    /** Text on brand backgrounds — white. */
    text: '#FFFFFF',
  },

  // ---------------------------------------------------------------------------
  // Data visualization — rich on white
  // ---------------------------------------------------------------------------
  data: {
    blue: '#2563EB',
    violet: '#7C3AED',
    amber: '#D97706',
    emerald: '#16A34A',
    cyan: '#0891B2',
  },
};
