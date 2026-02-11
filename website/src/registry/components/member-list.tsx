import React from 'react';
import { MemberList } from '@wisp-ui/react';
import type { MemberListSection } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

const sampleSections: MemberListSection[] = [
  {
    id: 'online',
    label: 'Online',
    members: [
      { id: '1', name: 'Alice Chen', status: 'online', roleText: 'Admin' },
      { id: '2', name: 'Bob Smith', status: 'online', statusText: 'In a meeting' },
      { id: '3', name: 'Carol White', status: 'idle', roleText: 'Moderator' },
    ],
  },
  {
    id: 'offline',
    label: 'Offline',
    members: [
      { id: '4', name: 'Dave Johnson', status: 'offline', roleText: 'Member' },
      { id: '5', name: 'Eve Martinez', status: 'offline' },
    ],
  },
];

const roleSections: MemberListSection[] = [
  {
    id: 'admins',
    label: 'Admins',
    members: [
      { id: '1', name: 'Alice Chen', status: 'online', roleText: 'Server Owner' },
    ],
  },
  {
    id: 'moderators',
    label: 'Moderators',
    members: [
      { id: '2', name: 'Bob Smith', status: 'online', roleText: 'Moderator' },
      { id: '3', name: 'Carol White', status: 'idle', roleText: 'Moderator' },
    ],
  },
  {
    id: 'members',
    label: 'Members',
    members: [
      { id: '4', name: 'Dave Johnson', status: 'online' },
      { id: '5', name: 'Eve Martinez', status: 'dnd', statusText: 'Do not disturb' },
      { id: '6', name: 'Frank Lee', status: 'offline' },
    ],
  },
];

export const memberListEntry: ComponentEntry = {
  slug: 'member-list',
  name: 'MemberList',
  category: 'components',
  description:
    'Side panel showing grouped user lists with online/offline status, collapsible sections, and avatars.',
  variantCount: 4,
  keywords: ['member', 'list', 'users', 'online', 'offline', 'role', 'panel', 'sidebar'],

  cardPreview: (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <MemberList
        sections={[
          {
            id: 'online',
            label: 'Online',
            members: [
              { id: '1', name: 'Alice Chen', status: 'online', roleText: 'Admin' },
              { id: '2', name: 'Bob Smith', status: 'online' },
            ],
          },
          {
            id: 'offline',
            label: 'Offline',
            members: [
              { id: '3', name: 'Dave Johnson', status: 'offline' },
            ],
          },
        ]}
        style={{ width: 240, maxHeight: 280 }}
      />
    </div>
  ),

  examples: [
    {
      title: 'Default',
      render: (
        <MemberList
          sections={sampleSections}
          onMemberClick={() => {}}
          onClose={() => {}}
          style={{ width: 260, maxHeight: 400 }}
        />
      ),
      code: `<MemberList
  sections={[
    {
      id: 'online',
      label: 'Online',
      members: [
        { id: '1', name: 'Alice Chen', status: 'online', roleText: 'Admin' },
        { id: '2', name: 'Bob Smith', status: 'online', statusText: 'In a meeting' },
        { id: '3', name: 'Carol White', status: 'idle', roleText: 'Moderator' },
      ],
    },
    {
      id: 'offline',
      label: 'Offline',
      members: [
        { id: '4', name: 'Dave Johnson', status: 'offline', roleText: 'Member' },
        { id: '5', name: 'Eve Martinez', status: 'offline' },
      ],
    },
  ]}
  onMemberClick={(member) => console.log(member)}
  onClose={() => setOpen(false)}
/>`,
    },
    {
      title: 'With Roles',
      render: (
        <MemberList
          sections={roleSections}
          onMemberClick={() => {}}
          title="Server Members"
          style={{ width: 260, maxHeight: 400 }}
        />
      ),
      code: `<MemberList
  sections={[
    { id: 'admins', label: 'Admins', members: [...] },
    { id: 'moderators', label: 'Moderators', members: [...] },
    { id: 'members', label: 'Members', members: [...] },
  ]}
  onMemberClick={(member) => openProfile(member.id)}
  title="Server Members"
/>`,
    },
    {
      title: 'Loading',
      render: (
        <MemberList
          sections={[]}
          loading
          style={{ width: 260, maxHeight: 300 }}
        />
      ),
      code: `<MemberList sections={[]} loading />`,
    },
    {
      title: 'Skeleton',
      render: (
        <MemberList
          sections={[]}
          skeleton
          style={{ width: 260, maxHeight: 300 }}
        />
      ),
      code: `<MemberList sections={[]} skeleton />`,
    },
  ],

  props: [
    { name: 'sections', type: 'MemberListSection[]', required: true, description: 'Grouped sections of members.' },
    { name: 'onMemberClick', type: '(member: MemberListMember) => void', description: 'Called when a member item is clicked.' },
    { name: 'title', type: 'string', default: "'Members'", description: 'Panel title.' },
    { name: 'onClose', type: '() => void', description: 'Called when the close button is clicked. If omitted, no close button.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Whether the panel is in a loading state.' },
    { name: 'skeleton', type: 'boolean', default: 'false', description: 'Show loading skeleton.' },
  ],
};
