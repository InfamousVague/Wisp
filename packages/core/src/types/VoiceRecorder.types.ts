/**
 * @module types/VoiceRecorder
 * @description Type definitions for the VoiceRecorder component — record
 * button with live waveform preview and timer for chat voice messages.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

export const voiceRecorderStates = ['idle', 'recording', 'paused', 'preview'] as const;
export type VoiceRecorderState = (typeof voiceRecorderStates)[number];

// ---------------------------------------------------------------------------
// Size
// ---------------------------------------------------------------------------

export const voiceRecorderSizes = ['sm', 'md', 'lg'] as const;
export type VoiceRecorderSize = (typeof voiceRecorderSizes)[number];

export interface VoiceRecorderSizeConfig {
  /** Overall height. */
  height: number;
  /** Button size. */
  buttonSize: number;
  /** Icon size. */
  iconSize: number;
  /** Font size for timer. */
  fontSize: number;
  /** Padding. */
  padding: number;
  /** Gap between elements. */
  gap: number;
  /** Border radius. */
  borderRadius: number;
}

export const voiceRecorderSizeMap: Record<VoiceRecorderSize, VoiceRecorderSizeConfig> = {
  sm: { height: 40, buttonSize: 32, iconSize: 16, fontSize: 12, padding: 8, gap: 8, borderRadius: 20 },
  md: { height: 48, buttonSize: 40, iconSize: 20, fontSize: 13, padding: 12, gap: 10, borderRadius: 24 },
  lg: { height: 56, buttonSize: 48, iconSize: 24, fontSize: 14, padding: 16, gap: 12, borderRadius: 28 },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface VoiceRecorderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Current recording state. @default 'idle' */
  state?: VoiceRecorderState;

  /** Size preset. @default 'md' */
  size?: VoiceRecorderSize;

  /** Duration in seconds of the current recording. */
  duration?: number;

  /** Maximum recording duration in seconds. @default 120 */
  maxDuration?: number;

  /** Waveform amplitude data for preview mode (0–1 values). */
  waveformData?: number[];

  /** Called when the record button is pressed. */
  onRecord?: () => void;

  /** Called when stop is pressed. */
  onStop?: () => void;

  /** Called when pause is pressed. */
  onPause?: () => void;

  /** Called when resume is pressed. */
  onResume?: () => void;

  /** Called when send/confirm is pressed. */
  onSend?: () => void;

  /** Called when cancel/delete is pressed. */
  onCancel?: () => void;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
