import React from 'react';
import { Spacer, HStack, VStack, Text, Box } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const spacerEntry: ComponentEntry = {
  slug: 'spacer',
  name: 'Spacer',
  category: 'layouts',
  description:
    'Flexible whitespace utility that fills available space or applies a fixed theme-based size.',
  variantCount: 2,
  keywords: ['spacer', 'gap', 'whitespace', 'flex', 'fill'],

  cardPreview: (
    <HStack gap="sm" align="center" style={{ width: '100%', maxWidth: 200 }}>
      <Text size="xs">Left</Text>
      <Spacer flex />
      <Text size="xs">Right</Text>
    </HStack>
  ),

  examples: [
    {
      title: 'Flex Spacer',
      render: (
        <HStack align="center" style={{ width: '100%', maxWidth: 400, padding: '8px 0' }}>
          <Text size="sm">Logo</Text>
          <Spacer flex />
          <Text size="sm" color="secondary">Menu Item</Text>
        </HStack>
      ),
      code: `import { Spacer, HStack } from '@wisp-ui/react';

<HStack align="center">
  <Text>Logo</Text>
  <Spacer flex />
  <Text>Menu Item</Text>
</HStack>`,
      rnCode: `import { Spacer, HStack } from '@wisp-ui/react-native';

<HStack align="center">
  <Text>Logo</Text>
  <Spacer flex />
  <Text>Menu Item</Text>
</HStack>`,
    },
    {
      title: 'Fixed Size',
      render: (
        <VStack style={{ width: '100%', maxWidth: 300 }}>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Above</Text>
          </Box>
          <Spacer size="xl" />
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Below (xl space)</Text>
          </Box>
        </VStack>
      ),
      code: `<Box>Above</Box>
<Spacer size="xl" />
<Box>Below</Box>`,
      rnCode: `<Box>Above</Box>
<Spacer size="xl" />
<Box>Below</Box>`,
    },
  ],

  props: [
    { name: 'size', type: 'ThemeSpacingKey', description: 'Fixed size from theme spacing.' },
    { name: 'flex', type: 'number | boolean', default: 'false', description: 'Flex grow (true = 1).' },
  ],
};
