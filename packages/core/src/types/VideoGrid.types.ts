/**
 * VideoGrid component type definitions.
 */

export const VIDEO_GRID_LAYOUTS = ['grid', 'spotlight', 'sidebar'] as const;
export type VideoGridLayout = (typeof VIDEO_GRID_LAYOUTS)[number];

export interface VideoGridParticipant {
  did: string;
  displayName: string;
  avatarUri?: string;
  stream: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
  isSpeaking?: boolean;
}

export interface VideoGridProps {
  /** All participants including self */
  participants: VideoGridParticipant[];
  /** Local camera stream */
  localStream: MediaStream | null;
  /** Screen share stream (takes main area when active) */
  screenShareStream?: MediaStream | null;
  /** Who is screen sharing */
  screenShareDid?: string | null;
  /** Layout mode — 'grid' auto-tiles, 'spotlight' shows focused + strip */
  layout?: VideoGridLayout;
  /** DID of the active speaker (highlighted in spotlight mode) */
  activeSpeakerDid?: string | null;
  /** Current user's DID (for mirroring local video) */
  localDid?: string;
  /** DID of the participant that is manually focused (pinned) */
  focusedDid?: string | null;
  /** Called when a participant tile is clicked (to focus/pin them) */
  onFocusParticipant?: (did: string | null) => void;
  /** Gap between tiles in pixels (default 6) */
  gap?: number;
  /** Border radius for individual tiles (default 10) */
  tileBorderRadius?: number;
}
