/**
 * @module styles/VoiceRecorder
 * @description Pure style-builder functions for the VoiceRecorder component.
 */

import type { CSSStyleObject } from '../types';
import type { ThemeColors } from '../theme/types';
import type { VoiceRecorderState, VoiceRecorderSizeConfig } from '../types/VoiceRecorder.types';

// ---------------------------------------------------------------------------
// Keyframe injection
// ---------------------------------------------------------------------------

let voiceRecorderInjected = false;

export function ensureVoiceRecorderKeyframes(): void {
  if (voiceRecorderInjected || typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = '@keyframes wisp-voice-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.8; } }';
  document.head.appendChild(style);
  voiceRecorderInjected = true;
}

// ---------------------------------------------------------------------------
// Color resolution
// ---------------------------------------------------------------------------

export interface VoiceRecorderColors {
  bg: string;
  border: string;
  recordButton: string;
  recordButtonActive: string;
  icon: string;
  iconOnRecord: string;
  timer: string;
  waveform: string;
  cancelButton: string;
  sendButton: string;
  sendIcon: string;
}

export function resolveVoiceRecorderColors(
  state: VoiceRecorderState,
  themeColors: ThemeColors,
): VoiceRecorderColors {
  return {
    bg: themeColors.background.surface,
    border: themeColors.border.subtle,
    recordButton: themeColors.status.danger,
    recordButtonActive: themeColors.status.danger,
    icon: themeColors.text.secondary,
    iconOnRecord: '#FFFFFF',
    timer: state === 'recording' ? themeColors.status.danger : themeColors.text.secondary,
    waveform: themeColors.accent.primary,
    cancelButton: themeColors.text.muted,
    sendButton: themeColors.accent.primary,
    sendIcon: themeColors.background.surface,
  };
}

// ---------------------------------------------------------------------------
// Style builders
// ---------------------------------------------------------------------------

export function buildVoiceRecorderContainerStyle(
  sizeConfig: VoiceRecorderSizeConfig,
  colors: VoiceRecorderColors,
): CSSStyleObject {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: sizeConfig.gap,
    padding: `0 ${sizeConfig.padding}px`,
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    width: '100%',
  };
}

export function buildRecordButtonStyle(
  sizeConfig: VoiceRecorderSizeConfig,
  colors: VoiceRecorderColors,
  isRecording: boolean,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.buttonSize,
    height: sizeConfig.buttonSize,
    borderRadius: sizeConfig.buttonSize / 2,
    border: 'none',
    backgroundColor: colors.recordButton,
    color: colors.iconOnRecord,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    transition: 'all 150ms ease',
    ...(isRecording ? { animation: 'wisp-voice-pulse 1.5s ease-in-out infinite' } : {}),
  };
}

export function buildTimerStyle(
  sizeConfig: VoiceRecorderSizeConfig,
  colors: VoiceRecorderColors,
): CSSStyleObject {
  return {
    fontSize: sizeConfig.fontSize,
    fontFamily: 'monospace',
    fontWeight: 600,
    color: colors.timer,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    minWidth: 40,
    flexShrink: 0,
  };
}

export function buildActionButtonStyle(
  sizeConfig: VoiceRecorderSizeConfig,
  bgColor: string,
  fgColor: string,
): CSSStyleObject {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.buttonSize - 4,
    height: sizeConfig.buttonSize - 4,
    borderRadius: (sizeConfig.buttonSize - 4) / 2,
    border: 'none',
    backgroundColor: bgColor,
    color: fgColor,
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    transition: 'all 150ms ease',
  };
}

export function buildVoiceRecorderSkeletonStyle(
  sizeConfig: VoiceRecorderSizeConfig,
  themeColors: ThemeColors,
): CSSStyleObject {
  return {
    display: 'block',
    width: '100%',
    height: sizeConfig.height,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: themeColors.border.subtle,
    animation: 'wisp-skeleton-pulse 1.5s ease-in-out infinite',
  };
}
