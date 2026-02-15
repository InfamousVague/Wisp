/**
 * VideoGrid — Responsive grid of video participants with click-to-focus.
 *
 * Layouts:
 *   - **grid** (default): Equal-sized tiles that auto-scale for any group size.
 *     Clicking a tile focuses it (promoted to main view with thumbnail strip below).
 *     Clicking the focused tile again returns to grid view.
 *   - **spotlight**: Active speaker (or `focusedDid`) takes main area,
 *     everyone else in a horizontal thumbnail strip below.
 *   - **sidebar**: Screen share or focused video in the main area,
 *     participants in a vertical sidebar strip on the right.
 *
 * Supports screen sharing (always takes the main area regardless of layout).
 */

import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import type { ViewStyle } from 'react-native';
import { useTheme } from '../../providers';
import { VideoTile } from '../video-tile/VideoTile';
import type { VideoGridProps, VideoGridParticipant } from '@coexist/wisp-core/types/VideoGrid.types';
import {
  resolveGridColumns,
  resolveGridBackground,
  THUMBNAIL_STRIP_HEIGHT,
} from '@coexist/wisp-core/styles/VideoGrid.styles';

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_GAP = 6;
const DEFAULT_TILE_RADIUS = 10;

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
    focusedDid: controlledFocused,
    onFocusParticipant,
    gap = DEFAULT_GAP,
    tileBorderRadius = DEFAULT_TILE_RADIUS,
  },
  ref,
) {
  const { theme } = useTheme();
  const isDark =
    theme.colors.background.canvas === '#000000' ||
    theme.colors.background.canvas === '#0a0a0a';

  const bgColor = useMemo(() => resolveGridBackground(isDark), [isDark]);

  // Internal focused state (used when uncontrolled)
  const [internalFocused, setInternalFocused] = useState<string | null>(null);
  const focusedDid = controlledFocused !== undefined ? controlledFocused : internalFocused;

  const handleTilePress = useCallback((did: string) => {
    const next = did === focusedDid ? null : did;
    if (onFocusParticipant) {
      onFocusParticipant(next);
    } else {
      setInternalFocused(next);
    }
  }, [focusedDid, onFocusParticipant]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------

  const streamFor = useCallback((p: VideoGridParticipant) => {
    return p.did === localDid ? localStream : p.stream;
  }, [localDid, localStream]);

  const isLocal = useCallback((p: VideoGridParticipant) => p.did === localDid, [localDid]);

  // -------------------------------------------------------------------------
  // Screen share layout — always takes priority
  // -------------------------------------------------------------------------
  if (screenShareStream) {
    const shareOwner = participants.find((p) => p.did === screenShareDid);

    return (
      <View ref={ref} style={[rootStyle, { backgroundColor: bgColor }]}>
        {/* Main: screen share */}
        <View style={mainAreaStyle}>
          <VideoTile
            stream={screenShareStream}
            displayName={shareOwner?.displayName ?? 'Screen'}
            fit="contain"
            size="full"
            style={{ borderRadius: tileBorderRadius }}
          />
        </View>

        {/* Thumbnail strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[stripContentStyle, { gap }]}
          style={[stripContainerStyle, { height: THUMBNAIL_STRIP_HEIGHT + 12 }]}
        >
          {participants.map((p) => (
            <Pressable
              key={p.did}
              onPress={() => handleTilePress(p.did)}
              style={[
                thumbnailWrapperStyle,
                { borderRadius: tileBorderRadius - 2 },
                p.isSpeaking && speakingBorderStyle,
              ]}
            >
              <VideoTile
                stream={streamFor(p)}
                displayName={p.displayName}
                isMuted={p.isMuted}
                isCameraOff={p.isCameraOff}
                isSpeaking={p.isSpeaking}
                mirror={isLocal(p)}
                size="sm"
                style={{ borderRadius: tileBorderRadius - 2 }}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  // -------------------------------------------------------------------------
  // Spotlight / focused layout
  // -------------------------------------------------------------------------
  const effectiveFocused = focusedDid ?? (layout === 'spotlight' ? activeSpeakerDid : null);
  const hasFocused = effectiveFocused && participants.some((p) => p.did === effectiveFocused);

  if (hasFocused) {
    const focused = participants.find((p) => p.did === effectiveFocused)!;
    const others = participants.filter((p) => p.did !== effectiveFocused);

    // Sidebar layout: main + vertical strip on the right
    if (layout === 'sidebar') {
      return (
        <View ref={ref} style={[sidebarRootStyle, { backgroundColor: bgColor }]}>
          <Pressable
            style={[mainAreaStyle, { padding: gap / 2 }]}
            onPress={() => handleTilePress(focused.did)}
          >
            <VideoTile
              stream={streamFor(focused)}
              displayName={focused.displayName}
              isMuted={focused.isMuted}
              isCameraOff={focused.isCameraOff}
              isSpeaking={focused.isSpeaking}
              mirror={isLocal(focused)}
              fit="cover"
              size="full"
              style={{ borderRadius: tileBorderRadius }}
            />
          </Pressable>

          {others.length > 0 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[verticalStripContentStyle, { gap }]}
              style={verticalStripStyle}
            >
              {others.map((p) => (
                <Pressable
                  key={p.did}
                  onPress={() => handleTilePress(p.did)}
                  style={[
                    sidebarThumbStyle,
                    { borderRadius: tileBorderRadius - 2 },
                    p.isSpeaking && speakingBorderStyle,
                  ]}
                >
                  <VideoTile
                    stream={streamFor(p)}
                    displayName={p.displayName}
                    isMuted={p.isMuted}
                    isCameraOff={p.isCameraOff}
                    isSpeaking={p.isSpeaking}
                    mirror={isLocal(p)}
                    size="sm"
                    style={{ borderRadius: tileBorderRadius - 2 }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          )}
        </View>
      );
    }

    // Default spotlight: main area + horizontal thumbnail strip below
    return (
      <View ref={ref} style={[rootStyle, { backgroundColor: bgColor }]}>
        {/* Main focused view */}
        <Pressable
          style={[mainAreaStyle, { padding: gap }]}
          onPress={() => handleTilePress(focused.did)}
        >
          <VideoTile
            stream={streamFor(focused)}
            displayName={focused.displayName}
            isMuted={focused.isMuted}
            isCameraOff={focused.isCameraOff}
            isSpeaking={focused.isSpeaking}
            mirror={isLocal(focused)}
            fit="cover"
            size="full"
            style={{ borderRadius: tileBorderRadius }}
          />
        </Pressable>

        {/* Horizontal thumbnail strip */}
        {others.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[stripContentStyle, { gap, paddingHorizontal: gap }]}
            style={[stripContainerStyle, { height: THUMBNAIL_STRIP_HEIGHT + gap * 2 }]}
          >
            {others.map((p) => (
              <Pressable
                key={p.did}
                onPress={() => handleTilePress(p.did)}
                style={[
                  thumbnailWrapperStyle,
                  { borderRadius: tileBorderRadius - 2 },
                  p.did === activeSpeakerDid && speakingBorderStyle,
                ]}
              >
                <VideoTile
                  stream={streamFor(p)}
                  displayName={p.displayName}
                  isMuted={p.isMuted}
                  isCameraOff={p.isCameraOff}
                  isSpeaking={p.isSpeaking}
                  mirror={isLocal(p)}
                  size="sm"
                  style={{ borderRadius: tileBorderRadius - 2 }}
                />
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  // -------------------------------------------------------------------------
  // Grid layout (default — no one focused)
  // -------------------------------------------------------------------------
  const count = participants.length;
  const cols = resolveGridColumns(count);
  const rows = Math.ceil(count / cols);

  const tileWidth = `${100 / cols}%` as unknown as number;
  const tileHeight = `${100 / rows}%` as unknown as number;

  return (
    <View ref={ref} style={[gridContainerStyle, { backgroundColor: bgColor, padding: gap / 2 }]}>
      {participants.map((p) => (
        <Pressable
          key={p.did}
          onPress={() => handleTilePress(p.did)}
          style={{
            width: tileWidth,
            height: tileHeight,
            padding: gap / 2,
          }}
        >
          <VideoTile
            stream={streamFor(p)}
            displayName={p.displayName}
            isMuted={p.isMuted}
            isCameraOff={p.isCameraOff}
            isSpeaking={p.isSpeaking}
            mirror={isLocal(p)}
            fit="cover"
            size="full"
            style={{ borderRadius: tileBorderRadius }}
          />
        </Pressable>
      ))}
    </View>
  );
});

VideoGrid.displayName = 'VideoGrid';

// ---------------------------------------------------------------------------
// Static styles
// ---------------------------------------------------------------------------

const rootStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
};

const sidebarRootStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
};

const mainAreaStyle: ViewStyle = {
  flex: 1,
};

const gridContainerStyle: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignContent: 'center',
};

// Horizontal thumbnail strip
const stripContainerStyle: ViewStyle = {
  flexGrow: 0,
  flexShrink: 0,
};

const stripContentStyle: ViewStyle = {
  alignItems: 'center',
  paddingVertical: 6,
  paddingHorizontal: 6,
};

const thumbnailWrapperStyle: ViewStyle = {
  width: THUMBNAIL_STRIP_HEIGHT * (16 / 9),
  height: THUMBNAIL_STRIP_HEIGHT,
  overflow: 'hidden',
};

// Vertical sidebar strip
const verticalStripStyle: ViewStyle = {
  width: 180,
  flexGrow: 0,
  flexShrink: 0,
};

const verticalStripContentStyle: ViewStyle = {
  padding: 4,
};

const sidebarThumbStyle: ViewStyle = {
  height: 100,
  overflow: 'hidden',
};

const speakingBorderStyle: ViewStyle = {
  borderWidth: 2,
  borderColor: '#22c55e',
};
