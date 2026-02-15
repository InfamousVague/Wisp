/**
 * VideoGrid — Renders a responsive grid of VideoTile components.
 *
 * Supports grid, spotlight, and screen-share layouts. The local participant's
 * tile is automatically mirrored.
 */

import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../../providers';
import { VideoTile } from '../video-tile/VideoTile';
import type { VideoGridProps } from '@coexist/wisp-core/types/VideoGrid.types';
import {
  resolveGridColumns,
  resolveGridRows,
  resolveGridBackground,
} from '@coexist/wisp-core/styles/VideoGrid.styles';

// ---------------------------------------------------------------------------
// Static styles (no dynamic values)
// ---------------------------------------------------------------------------

const mainAreaStyle: ViewStyle = { flex: 1 };

const stripStyle: ViewStyle = { width: 180, gap: 4, padding: 4 };

// ---------------------------------------------------------------------------
// Dynamic style builders
// ---------------------------------------------------------------------------

function buildSplitContainerStyle(bg: string): ViewStyle {
  return {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: bg,
  };
}

function buildGridContainerStyle(bg: string): ViewStyle {
  return {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: bg,
  };
}

function buildTileWrapperStyle(w: string, h: string): ViewStyle {
  return {
    width: w as unknown as number,
    height: h as unknown as number,
    padding: 2,
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const VideoGrid = forwardRef<View, VideoGridProps>(function VideoGrid(
  {
    participants,
    localStream,
    screenShareStream = null,
    screenShareDid = null,
    layout = 'grid',
    activeSpeakerDid = null,
    localDid,
  },
  ref,
) {
  const { theme } = useTheme();
  const isDark =
    theme.colors.background.canvas === '#000000' ||
    theme.colors.background.canvas === '#0a0a0a';

  const bgColor = useMemo(() => resolveGridBackground(isDark), [isDark]);

  // -----------------------------------------------------------------------
  // Screen-share layout: main + sidebar strip
  // -----------------------------------------------------------------------
  if (screenShareStream) {
    return (
      <View ref={ref} style={buildSplitContainerStyle(bgColor)}>
        {/* Main area: screen share */}
        <View style={mainAreaStyle}>
          <VideoTile
            stream={screenShareStream}
            displayName={
              participants.find((p) => p.did === screenShareDid)?.displayName ??
              'Screen'
            }
            fit="contain"
            size="full"
          />
        </View>

        {/* Sidebar strip */}
        <View style={stripStyle}>
          {participants.map((p) => (
            <VideoTile
              key={p.did}
              stream={p.did === localDid ? localStream : p.stream}
              displayName={p.displayName}
              isMuted={p.isMuted}
              isCameraOff={p.isCameraOff}
              isSpeaking={p.isSpeaking}
              mirror={p.did === localDid}
              size="sm"
            />
          ))}
        </View>
      </View>
    );
  }

  // -----------------------------------------------------------------------
  // Spotlight layout: active speaker main + strip
  // -----------------------------------------------------------------------
  if (layout === 'spotlight') {
    const speaker =
      participants.find((p) => p.did === activeSpeakerDid) ?? participants[0];
    const others = participants.filter((p) => p.did !== speaker?.did);

    return (
      <View ref={ref} style={buildSplitContainerStyle(bgColor)}>
        {/* Main area: active speaker */}
        {speaker && (
          <View style={mainAreaStyle}>
            <VideoTile
              stream={speaker.did === localDid ? localStream : speaker.stream}
              displayName={speaker.displayName}
              isMuted={speaker.isMuted}
              isCameraOff={speaker.isCameraOff}
              isSpeaking={speaker.isSpeaking}
              mirror={speaker.did === localDid}
              fit="cover"
              size="full"
            />
          </View>
        )}

        {/* Sidebar strip */}
        {others.length > 0 && (
          <View style={stripStyle}>
            {others.map((p) => (
              <VideoTile
                key={p.did}
                stream={p.did === localDid ? localStream : p.stream}
                displayName={p.displayName}
                isMuted={p.isMuted}
                isCameraOff={p.isCameraOff}
                isSpeaking={p.isSpeaking}
                mirror={p.did === localDid}
                size="sm"
              />
            ))}
          </View>
        )}
      </View>
    );
  }

  // -----------------------------------------------------------------------
  // Grid layout (default)
  // -----------------------------------------------------------------------
  const count = participants.length;
  const cols = resolveGridColumns(count);
  const rows = resolveGridRows(count);

  const tileWidth = `${100 / cols}%`;
  const tileHeight = `${100 / rows}%`;

  return (
    <View ref={ref} style={buildGridContainerStyle(bgColor)}>
      {participants.map((p) => (
        <View key={p.did} style={buildTileWrapperStyle(tileWidth, tileHeight)}>
          <VideoTile
            stream={p.did === localDid ? localStream : p.stream}
            displayName={p.displayName}
            isMuted={p.isMuted}
            isCameraOff={p.isCameraOff}
            isSpeaking={p.isSpeaking}
            mirror={p.did === localDid}
            fit="cover"
            size="full"
          />
        </View>
      ))}
    </View>
  );
});

VideoGrid.displayName = 'VideoGrid';
