/**
 * @module types/MemberList
 * @description Type definitions for the MemberList component —
 * a side panel showing grouped user lists with online/offline status.
 */

import type React from 'react';

// ---------------------------------------------------------------------------
// Supporting types
// ---------------------------------------------------------------------------

/** A member entry in the member list. */
export interface MemberListMember {
  /** Unique identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** Avatar element. */
  avatar?: React.ReactNode;
  /** Online status. */
  status?: 'online' | 'idle' | 'dnd' | 'offline';
  /** Optional role/title text shown below name. */
  roleText?: string;
  /** Custom status text. */
  statusText?: string;
}

/** A section group in the member list (e.g. "Online — 5", "Offline — 12"). */
export interface MemberListSection {
  /** Section identifier. */
  id: string;
  /** Section header label. */
  label: string;
  /** Members in this section. */
  members: MemberListMember[];
  /** Whether the section starts collapsed. @default false */
  collapsed?: boolean;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Props for the MemberList component.
 */
export interface MemberListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grouped sections of members. */
  sections: MemberListSection[];

  /** Called when a member item is clicked. */
  onMemberClick?: (member: MemberListMember) => void;

  /** Panel title. @default 'Members' */
  title?: string;

  /** Called when the close button is clicked. If omitted, no close button. */
  onClose?: () => void;

  /** Whether the panel is in a loading state. @default false */
  loading?: boolean;

  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}
