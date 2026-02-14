/**
 * ActiveCallPanel — Main in-call UI with remote video, local PiP, controls, and timer.
 */

import React, { forwardRef, useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { Text } from '../../primitives';
import { CallTimer } from '../../primitives/call-timer';
import { VideoTile } from '../video-tile';
import {
  resolveCallPanelBackground,
  resolveCallPanelBorder,
} from '@coexist/wisp-core/styles/ActiveCallPanel.styles';
import { useTheme } from '../../providers';

export interface ActiveCallPanelProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  callerName: string;
  callerAvatar?: string;
  callType: 'voice' | 'video';
  isMuted: boolean;
  isCameraOff: boolean;
  connectedAt: number | null;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onEndCall: () => void;
  onSwitchCamera?: () => void;
  onMinimize?: () => void;
  style?: ViewStyle;
}

export const ActiveCallPanel = forwardRef<View, ActiveCallPanelProps>(function ActiveCallPanel(
  {
    localStream,
    remoteStream,
    callerName,
    callType,
    isMuted,
    isCameraOff,
    connectedAt,
    onToggleMute,
    onToggleCamera,
    onEndCall,
    onSwitchCamera,
    onMinimize,
    style: userStyle,
  },
  ref,
) {
  const { theme } = useTheme();
  const tc = theme.colors;
  const bgColor = resolveCallPanelBackground(theme);
  const borderColor = resolveCallPanelBorder(theme);

  const isVideo = callType === 'video';

  const containerStyle = useMemo<ViewStyle>(() => ({
    backgroundColor: bgColor,
    borderRadius: 12,
    borderWidth: 1,
    borderColor,
    overflow: 'hidden',
  }), [bgColor, borderColor]);

  const videoAreaStyle = useMemo<ViewStyle>(() => ({
    position: 'relative',
    aspectRatio: isVideo ? 16 / 9 : undefined,
    height: isVideo ? undefined : 120,
    backgroundColor: tc.surface.primary,
  }), [isVideo, tc]);

  const pipStyle = useMemo<ViewStyle>(() => ({
    position: 'absolute',
    top: 8,
    right: 8,
    width: 120,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    zIndex: 10,
  }), []);

  const voiceFallbackStyle = useMemo<ViewStyle>(() => ({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  }), []);

  const voiceNameStyle = useMemo<TextStyle>(() => ({
    fontSize: 18,
    fontWeight: '600',
    color: tc.text.primary,
  }), [tc]);

  const controlsBarStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
  }), []);

  const controlButtonStyle = useMemo(() => (active: boolean): ViewStyle => ({
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: active ? tc.text.secondary : 'rgba(255,255,255,0.1)',
  }), [tc]);

  const endButtonStyle = useMemo<ViewStyle>(() => ({
    width: 52,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tc.status.danger,
  }), [tc]);

  const controlTextStyle = useMemo<TextStyle>(() => ({
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  }), []);

  const timerBarStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: borderColor,
  }), [borderColor]);

  const timerLabelStyle = useMemo<TextStyle>(() => ({
    fontSize: 12,
    color: tc.text.secondary,
  }), [tc]);

  return (
    <View ref={ref} style={[containerStyle, userStyle]}>
      {/* Video area */}
      <View style={videoAreaStyle}>
        {isVideo ? (
          <>
            {/* Remote video (main) */}
            <VideoTile
              stream={remoteStream}
              displayName={callerName}
              isMuted={false}
              isCameraOff={!remoteStream}
              size="full"
              showOverlay={false}
            />
            {/* Local video (PiP) */}
            <View style={pipStyle}>
              <VideoTile
                stream={localStream}
                isMuted={isMuted}
                isCameraOff={isCameraOff}
                mirror
                size="sm"
                showOverlay={false}
              />
            </View>
          </>
        ) : (
          <View style={voiceFallbackStyle}>
            <Text style={voiceNameStyle}>{callerName}</Text>
            {connectedAt ? (
              <CallTimer startedAt={connectedAt} size="md" />
            ) : (
              <Text style={timerLabelStyle}>Connecting...</Text>
            )}
          </View>
        )}
      </View>

      {/* Controls bar */}
      <View style={controlsBarStyle}>
        <Pressable
          style={controlButtonStyle(isMuted)}
          onPress={onToggleMute}
          accessibilityLabel={isMuted ? 'Unmute' : 'Mute'}
        >
          <Text style={controlTextStyle}>{isMuted ? 'MIC' : 'MIC'}</Text>
        </Pressable>

        {isVideo && (
          <Pressable
            style={controlButtonStyle(isCameraOff)}
            onPress={onToggleCamera}
            accessibilityLabel={isCameraOff ? 'Turn on camera' : 'Turn off camera'}
          >
            <Text style={controlTextStyle}>CAM</Text>
          </Pressable>
        )}

        {isVideo && onSwitchCamera && (
          <Pressable
            style={controlButtonStyle(false)}
            onPress={onSwitchCamera}
            accessibilityLabel="Switch camera"
          >
            <Text style={controlTextStyle}>FLIP</Text>
          </Pressable>
        )}

        <Pressable
          style={endButtonStyle}
          onPress={onEndCall}
          accessibilityLabel="End call"
        >
          <Text style={controlTextStyle}>END</Text>
        </Pressable>

        {onMinimize && (
          <Pressable
            style={controlButtonStyle(false)}
            onPress={onMinimize}
            accessibilityLabel="Minimize"
          >
            <Text style={controlTextStyle}>MIN</Text>
          </Pressable>
        )}
      </View>

      {/* Timer bar (video calls only, when connected) */}
      {isVideo && connectedAt && (
        <View style={timerBarStyle}>
          <Text style={timerLabelStyle}>{callerName}</Text>
          <CallTimer startedAt={connectedAt} size="sm" />
        </View>
      )}
    </View>
  );
});

ActiveCallPanel.displayName = 'ActiveCallPanel';
