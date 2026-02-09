import React from 'react';
import { Stack, HStack, VStack, Text, Box } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const stackEntry: ComponentEntry = {
  slug: 'stack',
  name: 'Stack',
  category: 'layouts',
  description:
    'Flex-based layout primitive with horizontal (HStack), vertical (VStack), and configurable gap, alignment, wrapping, and dividers.',
  variantCount: 3,
  keywords: ['stack', 'hstack', 'vstack', 'flex', 'layout', 'gap'],

  cardPreview: (
    <VStack gap="sm" style={{ width: '100%', maxWidth: 200 }}>
      <HStack gap="sm">
        <Box p="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)', flex: 1, height: 32 }} />
        <Box p="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)', flex: 1, height: 32 }} />
      </HStack>
      <Box p="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.08)', height: 32 }} />
    </VStack>
  ),

  examples: [
    {
      title: 'VStack',
      render: (
        <VStack gap="md" style={{ width: '100%', maxWidth: 300 }}>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Item 1</Text>
          </Box>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Item 2</Text>
          </Box>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Item 3</Text>
          </Box>
        </VStack>
      ),
      code: `import { VStack, Box } from '@wisp-ui/react';

<VStack gap="md">
  <Box p="md">Item 1</Box>
  <Box p="md">Item 2</Box>
  <Box p="md">Item 3</Box>
</VStack>`,
      rnCode: `import { VStack, Box } from '@wisp-ui/react-native';

<VStack gap="md">
  <Box p="md">Item 1</Box>
  <Box p="md">Item 2</Box>
  <Box p="md">Item 3</Box>
</VStack>`,
    },
    {
      title: 'HStack',
      render: (
        <HStack gap="md" align="center">
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Left</Text>
          </Box>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Center</Text>
          </Box>
          <Box p="md" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Text size="sm">Right</Text>
          </Box>
        </HStack>
      ),
      code: `<HStack gap="md" align="center">
  <Box p="md">Left</Box>
  <Box p="md">Center</Box>
  <Box p="md">Right</Box>
</HStack>`,
      rnCode: `<HStack gap="md" align="center">
  <Box p="md">Left</Box>
  <Box p="md">Center</Box>
  <Box p="md">Right</Box>
</HStack>`,
    },
    {
      title: 'Alignment & Justify',
      render: (
        <HStack gap="md" justify="between" align="center" style={{ width: '100%', maxWidth: 400 }}>
          <Text size="sm">Start</Text>
          <Text size="sm" color="secondary">Middle</Text>
          <Text size="sm">End</Text>
        </HStack>
      ),
      code: `<HStack gap="md" justify="between" align="center">
  <Text>Start</Text>
  <Text>Middle</Text>
  <Text>End</Text>
</HStack>`,
      rnCode: `<HStack gap="md" justify="between" align="center">
  <Text>Start</Text>
  <Text>Middle</Text>
  <Text>End</Text>
</HStack>`,
    },
    {
      title: 'With Dividers',
      render: (
        <VStack gap="md" divider style={{ width: '100%', maxWidth: 300 }}>
          <Text size="sm">Section A</Text>
          <Text size="sm">Section B</Text>
          <Text size="sm">Section C</Text>
        </VStack>
      ),
      code: `<VStack gap="md" divider>
  <Text>Section A</Text>
  <Text>Section B</Text>
  <Text>Section C</Text>
</VStack>`,
      rnCode: `<VStack gap="md" divider>
  <Text>Section A</Text>
  <Text>Section B</Text>
  <Text>Section C</Text>
</VStack>`,
    },
  ],

  props: [
    { name: 'direction', type: "'horizontal' | 'vertical'", default: "'vertical'", description: 'Flex direction.' },
    { name: 'gap', type: 'ThemeSpacingKey', default: "'md'", description: 'Gap between children.' },
    { name: 'align', type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", default: "'stretch'", description: 'Cross-axis alignment.' },
    { name: 'justify', type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", default: "'start'", description: 'Main-axis distribution.' },
    { name: 'wrap', type: 'boolean', default: 'false', description: 'Allow flex wrapping.' },
    { name: 'reverse', type: 'boolean', default: 'false', description: 'Reverse child order.' },
    { name: 'divider', type: 'boolean', default: 'false', description: 'Insert separator between children.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic root element.' },
  ],
};
