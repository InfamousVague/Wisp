/**
 * GroupCallPanel component type definitions.
 */

export interface GroupCallParticipant {
  did: string;
  displayName: string;
  stream: MediaStream | null;
  isMuted: boolean;
  isCameraOff: boolean;
  isSpeaking?: boolean;
}

export interface GroupCallPanelProps {
  /** All participants including self */
  participants: GroupCallParticipant[];
  /** Local camera stream */
  localStream: MediaStream | null;
  /** Screen share stream */
  screenShareStream?: MediaStream | null;
  /** Who is screen sharing */
  screenShareDid?: string | null;
  /** Group name */
  groupName: string;
  /** Whether local mic is muted */
  isMuted: boolean;
  /** Whether local camera is off */
  isCameraOff: boolean;
  /** Whether screen sharing is active */
  isScreenSharing: boolean;
  /** Current user's DID */
  localDid?: string;
  /** DID of active speaker */
  activeSpeakerDid?: string | null;
  /** Call start time (unix ms) */
  connectedAt: number | null;
  /** Toggle mute */
  onToggleMute: () => void;
  /** Toggle camera */
  onToggleCamera: () => void;
  /** End/leave call */
  onEndCall: () => void;
  /** Switch camera */
  onSwitchCamera: () => void;
  /** Toggle screen sharing */
  onToggleScreenShare: () => void;
}
