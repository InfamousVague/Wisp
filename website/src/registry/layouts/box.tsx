import React from 'react';
import { Box, Text } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const boxEntry: ComponentEntry = {
  slug: 'box',
  name: 'Box',
  category: 'layouts',
  description:
    'Low-level layout primitive with theme-aware padding, display, position, sizing, and border-radius props.',
  variantCount: 1,
  keywords: ['box', 'div', 'container', 'layout', 'primitive'],

  cardPreview: (
    <Box p="md" radius="md" style={{ backgroundColor: 'rgba(255,255,255,0.06)', width: '100%', maxWidth: 200 }}>
      <Text size="sm" color="secondary">Box with padding</Text>
    </Box>
  ),

  examples: [
    {
      title: 'Padding',
      render: (
        <Box display="flex" style={{ gap: 12, flexWrap: 'wrap' }}>
          {(['sm', 'md', 'lg'] as const).map((p) => (
            <Box key={p} p={p} radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
              <Text size="xs">p="{p}"</Text>
            </Box>
          ))}
        </Box>
      ),
      code: `import { Box } from '@wisp-ui/react';

<Box p="sm">…</Box>
<Box p="md">…</Box>
<Box p="lg">…</Box>`,
      rnCode: `import { Box } from '@wisp-ui/react-native';

<Box p="sm">…</Box>
<Box p="md">…</Box>
<Box p="lg">…</Box>`,
    },
    {
      title: 'Directional Padding',
      render: (
        <Box px="lg" py="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <Text size="sm">px="lg" py="sm"</Text>
        </Box>
      ),
      code: `<Box px="lg" py="sm">Content</Box>`,
      rnCode: `<Box px="lg" py="sm">Content</Box>`,
    },
    {
      title: 'Display & Position',
      render: (
        <Box display="flex" style={{ gap: 8 }}>
          <Box p="md" radius="sm" display="flex" style={{ backgroundColor: 'rgba(255,255,255,0.06)', flex: 1, justifyContent: 'center' }}>
            <Text size="xs">display="flex"</Text>
          </Box>
          <Box p="md" radius="sm" position="relative" style={{ backgroundColor: 'rgba(255,255,255,0.06)', flex: 1 }}>
            <Text size="xs">position="relative"</Text>
          </Box>
        </Box>
      ),
      code: `<Box display="flex">Flex container</Box>
<Box position="relative">Positioned</Box>`,
      rnCode: `<Box display="flex">Flex container</Box>
<Box position="relative">Positioned</Box>`,
    },
  ],

  props: [
    { name: 'p', type: 'ThemeSpacingKey', description: 'Padding all sides.' },
    { name: 'px', type: 'ThemeSpacingKey', description: 'Horizontal padding.' },
    { name: 'py', type: 'ThemeSpacingKey', description: 'Vertical padding.' },
    { name: 'pt', type: 'ThemeSpacingKey', description: 'Padding top.' },
    { name: 'pr', type: 'ThemeSpacingKey', description: 'Padding right.' },
    { name: 'pb', type: 'ThemeSpacingKey', description: 'Padding bottom.' },
    { name: 'pl', type: 'ThemeSpacingKey', description: 'Padding left.' },
    { name: 'display', type: "'block' | 'flex' | 'grid' | 'inline' | 'inline-flex' | 'none'", description: 'CSS display.' },
    { name: 'position', type: "'relative' | 'absolute' | 'fixed' | 'sticky'", description: 'CSS position.' },
    { name: 'width', type: 'string | number', description: 'Width.' },
    { name: 'height', type: 'string | number', description: 'Height.' },
    { name: 'radius', type: 'ThemeRadiiKey', description: 'Border radius from theme.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic root element.' },
  ],
};
