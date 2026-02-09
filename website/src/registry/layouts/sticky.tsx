import React from 'react';
import { Sticky, Text, Box, VStack } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const stickyEntry: ComponentEntry = {
  slug: 'sticky',
  name: 'Sticky',
  category: 'layouts',
  description:
    'Position-sticky wrapper with configurable edge (top/bottom), offset, and z-index from theme.',
  variantCount: 2,
  keywords: ['sticky', 'fixed', 'header', 'affix', 'position'],

  cardPreview: (
    <VStack gap="xs" style={{ width: '100%', maxWidth: 200 }}>
      <Box p="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.1)', textAlign: 'center' }}>
        <Text size="xs" weight="medium">Sticky Header</Text>
      </Box>
      <Text size="xs" color="tertiary">Content below…</Text>
    </VStack>
  ),

  examples: [
    {
      title: 'Top Sticky',
      render: (
        <Box style={{ position: 'relative', height: 120, overflow: 'auto', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
          <Sticky edge="top">
            <Box p="sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <Text size="sm" weight="medium">Sticky at top</Text>
            </Box>
          </Sticky>
          <VStack gap="sm" style={{ padding: 12 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <Text key={i} size="sm" color="secondary">Scroll content {i + 1}</Text>
            ))}
          </VStack>
        </Box>
      ),
      code: `import { Sticky } from '@wisp-ui/react';

<Sticky edge="top">
  <Box>Sticky Header</Box>
</Sticky>`,
      rnCode: `import { Sticky } from '@wisp-ui/react-native';

<Sticky edge="top">
  <Box>Sticky Header</Box>
</Sticky>`,
    },
  ],

  props: [
    { name: 'edge', type: "'top' | 'bottom'", default: "'top'", description: 'Sticky edge.' },
    { name: 'offset', type: 'number', default: '0', description: 'Offset from edge in pixels.' },
    { name: 'zIndex', type: 'ZIndexKey', default: "'sticky'", description: 'Z-index layer from theme.' },
    { name: 'zIndexValue', type: 'number', description: 'Custom z-index override.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic root element.' },
  ],
};
