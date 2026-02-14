/**
 * GroupCallPanel — Full-screen group call UI with video grid, top bar, and controls.
 */

import React, { forwardRef, useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../providers';
import { VideoGrid } from '../video-grid/VideoGrid';
import { CallTimer } from '../../primitives/call-timer/CallTimer';
import type { GroupCallPanelProps } from '@coexist/wisp-core/types/GroupCallPanel.types';
import {
  resolveGroupCallBackground,
  resolveGroupCallBorder,
  resolveControlBarBackground,
} from '@coexist/wisp-core/styles/GroupCallPanel.styles';

// ---------------------------------------------------------------------------
// GroupCallPanel
// ---------------------------------------------------------------------------

export const GroupCallPanel = forwardRef<View, GroupCallPanelProps>(
  function GroupCallPanel(
    {
      participants,
      localStream,
      screenShareStream,
      screenShareDid,
      groupName,
      isMuted,
      isCameraOff,
      isScreenSharing,
      localDid,
      activeSpeakerDid,
      connectedAt,
      onToggleMute,
      onToggleCamera,
      onEndCall,
      onSwitchCamera,
      onToggleScreenShare,
    },
    ref,
  ) {
    const { mode } = useTheme();
    const isDark = mode === 'dark';

    const bgColor = resolveGroupCallBackground(isDark);
    const borderColor = resolveGroupCallBorder(isDark);
    const controlBarBg = resolveControlBarBackground(isDark);

    // -- Styles -------------------------------------------------------------

    const containerStyle = useMemo<ViewStyle>(() => ({
      flex: 1,
      backgroundColor: bgColor,
    }), [bgColor]);

    const topBarStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    }), [borderColor]);

    const groupNameStyle = useMemo<TextStyle>(() => ({
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
    }), []);

    const participantCountStyle = useMemo<TextStyle>(() => ({
      fontSize: 13,
      color: 'rgba(255,255,255,0.6)',
      marginLeft: 8,
    }), []);

    const topBarLeftStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
    }), []);

    const controlBarStyle = useMemo<ViewStyle>(() => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: controlBarBg,
      borderTopWidth: 1,
      borderTopColor: borderColor,
    }), [controlBarBg, borderColor]);

    const controlButtonBase = useMemo(() => ({
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    }), []);

    const controlButtonDefault = useMemo<ViewStyle>(() => ({
      ...controlButtonBase,
      backgroundColor: 'rgba(255,255,255,0.1)',
    }), [controlButtonBase]);

    const controlButtonActive = useMemo<ViewStyle>(() => ({
      ...controlButtonBase,
      backgroundColor: 'rgba(255,255,255,0.3)',
    }), [controlButtonBase]);

    const endCallButtonStyle = useMemo<ViewStyle>(() => ({
      ...controlButtonBase,
      backgroundColor: '#ef4444',
    }), [controlButtonBase]);

    const controlIconStyle = useMemo<TextStyle>(() => ({
      fontSize: 16,
      fontWeight: '700',
      color: '#ffffff',
    }), []);

    // -- Render -------------------------------------------------------------

    return (
      <View ref={ref} style={containerStyle}>
        {/* Top bar */}
        <View style={topBarStyle}>
          <View style={topBarLeftStyle}>
            <Text style={groupNameStyle}>{groupName}</Text>
            <Text style={participantCountStyle}>
              {participants.length}
            </Text>
          </View>
          {connectedAt != null && (
            <CallTimer startedAt={connectedAt} size="sm" color="rgba(255,255,255,0.6)" />
          )}
        </View>

        {/* Video grid */}
        <VideoGrid
          participants={participants}
          localStream={localStream}
          screenShareStream={screenShareStream}
          screenShareDid={screenShareDid}
          localDid={localDid}
          activeSpeakerDid={activeSpeakerDid}
        />

        {/* Bottom control bar */}
        <View style={controlBarStyle}>
          {/* Mute toggle */}
          <Pressable
            style={isMuted ? controlButtonActive : controlButtonDefault}
            onPress={onToggleMute}
            accessibilityLabel={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            accessibilityRole="button"
          >
            <Text style={controlIconStyle}>{isMuted ? 'm' : 'M'}</Text>
          </Pressable>

          {/* Camera toggle */}
          <Pressable
            style={isCameraOff ? controlButtonActive : controlButtonDefault}
            onPress={onToggleCamera}
            accessibilityLabel={isCameraOff ? 'Turn on camera' : 'Turn off camera'}
            accessibilityRole="button"
          >
            <Text style={controlIconStyle}>{isCameraOff ? 'c' : 'C'}</Text>
          </Pressable>

          {/* Screen share toggle */}
          <Pressable
            style={isScreenSharing ? controlButtonActive : controlButtonDefault}
            onPress={onToggleScreenShare}
            accessibilityLabel={isScreenSharing ? 'Stop screen sharing' : 'Share screen'}
            accessibilityRole="button"
          >
            <Text style={controlIconStyle}>{isScreenSharing ? 's' : 'S'}</Text>
          </Pressable>

          {/* Flip camera */}
          <Pressable
            style={controlButtonDefault}
            onPress={onSwitchCamera}
            accessibilityLabel="Switch camera"
            accessibilityRole="button"
          >
            <Text style={controlIconStyle}>F</Text>
          </Pressable>

          {/* End call */}
          <Pressable
            style={endCallButtonStyle}
            onPress={onEndCall}
            accessibilityLabel="End call"
            accessibilityRole="button"
          >
            <Text style={controlIconStyle}>X</Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

GroupCallPanel.displayName = 'GroupCallPanel';
