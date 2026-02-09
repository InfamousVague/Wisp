import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button, Text, VStack } from '@wisp-ui/react';
import { Copy, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import type { ComponentEntry } from '../types';

export const dropdownMenuEntry: ComponentEntry = {
  slug: 'dropdown-menu',
  name: 'DropdownMenu',
  category: 'components',
  description:
    'Context menu with items, separators, icons, keyboard shortcuts, danger actions, and alignment options.',
  variantCount: 1,
  keywords: ['dropdown', 'menu', 'context', 'actions', 'right-click'],

  cardPreview: (
    <div style={{ width: '100%', maxWidth: 200 }}>
      <div style={{ borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)', overflow: 'hidden', fontSize: 13 }}>
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Edit size={13} style={{ opacity: 0.5 }} />
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Edit</span>
        </div>
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Copy size={13} style={{ opacity: 0.5 }} />
          <span style={{ color: 'rgba(255,255,255,0.7)' }}>Copy</span>
        </div>
        <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.08)', margin: '2px 0' }} />
        <div style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trash2 size={13} style={{ opacity: 0.5, color: '#ef4444' }} />
          <span style={{ color: '#ef4444' }}>Delete</span>
        </div>
      </div>
    </div>
  ),

  examples: [
    {
      title: 'Basic',
      render: (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="secondary" size="sm" iconLeft={<MoreHorizontal size={16} />}>Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem icon={<Edit size={14} />} shortcut="⌘E">Edit</DropdownMenuItem>
            <DropdownMenuItem icon={<Copy size={14} />} shortcut="⌘C">Copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<Trash2 size={14} />} danger>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      code: `import { DropdownMenu } from '@wisp-ui/react';

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={<Edit />} shortcut="⌘E">Edit</DropdownMenuItem>
    <DropdownMenuItem icon={<Copy />} shortcut="⌘C">Copy</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash2 />} danger>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      rnCode: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, Button } from '@wisp-ui/react-native';
import { Edit, Copy, Trash2 } from 'lucide-react-native';

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem icon={<Edit />}>Edit</DropdownMenuItem>
    <DropdownMenuItem icon={<Copy />}>Copy</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash2 />} danger>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],

  props: [
    { name: 'open', type: 'boolean', description: 'Controlled open state.' },
    { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open (uncontrolled).' },
    { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open state callback.' },
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Trigger + Content children.' },
  ],
};
