/**
 * @module VoiceRecorder
 * @description Voice recording button with timer, live indicator, and
 * send/cancel controls for chat voice messages.
 */

import React, { forwardRef, useEffect, useMemo } from 'react';
import { useThemeColors } from '../../providers';
import type { VoiceRecorderProps } from '@wisp-ui/core/types/VoiceRecorder.types';
import { voiceRecorderSizeMap } from '@wisp-ui/core/types/VoiceRecorder.types';
import {
  resolveVoiceRecorderColors,
  buildVoiceRecorderContainerStyle,
  buildRecordButtonStyle,
  buildTimerStyle,
  buildActionButtonStyle,
  buildVoiceRecorderSkeletonStyle,
  ensureVoiceRecorderKeyframes,
} from '@wisp-ui/core/styles/VoiceRecorder.styles';

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function MicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function StopIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function PauseIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v13.72a1 1 0 001.5.86l11.04-6.86a1 1 0 000-1.72L9.5 4.28a1 1 0 00-1.5.86z" />
    </svg>
  );
}

function SendIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function TrashIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Time formatter
// ---------------------------------------------------------------------------

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const VoiceRecorder = forwardRef<HTMLDivElement, VoiceRecorderProps>(function VoiceRecorder(
  {
    state = 'idle',
    size = 'md',
    duration = 0,
    maxDuration = 120,
    waveformData,
    onRecord,
    onStop,
    onPause,
    onResume,
    onSend,
    onCancel,
    skeleton = false,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();
  const sizeConfig = voiceRecorderSizeMap[size];

  useEffect(() => {
    if (state === 'recording') ensureVoiceRecorderKeyframes();
  }, [state]);

  const colors = useMemo(
    () => resolveVoiceRecorderColors(state, themeColors),
    [state, themeColors],
  );

  if (skeleton) {
    const skeletonStyle = buildVoiceRecorderSkeletonStyle(sizeConfig, themeColors);
    return <div aria-hidden className={className} style={{ ...skeletonStyle, ...userStyle }} />;
  }

  const containerStyle = useMemo(
    () => buildVoiceRecorderContainerStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const timerStyle = useMemo(
    () => buildTimerStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  // Idle state — just show the record button
  if (state === 'idle') {
    const recordBtnStyle = buildRecordButtonStyle(sizeConfig, colors, false);
    return (
      <div
        ref={ref}
        className={className}
        style={{ ...containerStyle, justifyContent: 'center', ...userStyle }}
        {...rest}
      >
        <button
          type="button"
          style={recordBtnStyle}
          onClick={onRecord}
          aria-label="Start recording"
        >
          <MicIcon size={sizeConfig.iconSize} />
        </button>
      </div>
    );
  }

  // Recording state
  if (state === 'recording') {
    const recordBtnStyle = buildRecordButtonStyle(sizeConfig, colors, true);
    const pauseBtnStyle = buildActionButtonStyle(sizeConfig, 'transparent', colors.icon);
    const stopBtnStyle = buildActionButtonStyle(sizeConfig, 'transparent', colors.icon);

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...containerStyle, ...userStyle }}
        {...rest}
      >
        <button type="button" style={recordBtnStyle} aria-label="Recording">
          <MicIcon size={sizeConfig.iconSize} />
        </button>
        <span style={timerStyle}>{formatDuration(duration)}</span>
        <div style={{ flex: 1 }} />
        {onPause && (
          <button type="button" style={pauseBtnStyle} onClick={onPause} aria-label="Pause recording">
            <PauseIcon size={sizeConfig.iconSize} />
          </button>
        )}
        <button type="button" style={stopBtnStyle} onClick={onStop} aria-label="Stop recording">
          <StopIcon size={sizeConfig.iconSize} />
        </button>
      </div>
    );
  }

  // Paused state
  if (state === 'paused') {
    const resumeBtnStyle = buildActionButtonStyle(sizeConfig, 'transparent', colors.icon);
    const stopBtnStyle = buildActionButtonStyle(sizeConfig, 'transparent', colors.icon);

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...containerStyle, ...userStyle }}
        {...rest}
      >
        <span style={{ ...timerStyle, color: colors.icon }}>{formatDuration(duration)}</span>
        <span style={{ fontSize: sizeConfig.fontSize - 2, color: colors.icon }}>Paused</span>
        <div style={{ flex: 1 }} />
        <button type="button" style={resumeBtnStyle} onClick={onResume} aria-label="Resume recording">
          <PlayIcon size={sizeConfig.iconSize} />
        </button>
        <button type="button" style={stopBtnStyle} onClick={onStop} aria-label="Stop recording">
          <StopIcon size={sizeConfig.iconSize} />
        </button>
      </div>
    );
  }

  // Preview state (after recording)
  const cancelBtnStyle = buildActionButtonStyle(sizeConfig, 'transparent', colors.cancelButton);
  const sendBtnStyle = buildActionButtonStyle(sizeConfig, colors.sendButton, colors.sendIcon);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...containerStyle, ...userStyle }}
      {...rest}
    >
      <button type="button" style={cancelBtnStyle} onClick={onCancel} aria-label="Delete recording">
        <TrashIcon size={sizeConfig.iconSize} />
      </button>
      <span style={timerStyle}>{formatDuration(duration)}</span>
      <div style={{ flex: 1 }} />
      <button type="button" style={sendBtnStyle} onClick={onSend} aria-label="Send recording">
        <SendIcon size={sizeConfig.iconSize * 0.8} />
      </button>
    </div>
  );
});

VoiceRecorder.displayName = 'VoiceRecorder';
