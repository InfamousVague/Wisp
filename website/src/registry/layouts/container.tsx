import React from 'react';
import { Container, Text, VStack, Box } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const containerEntry: ComponentEntry = {
  slug: 'container',
  name: 'Container',
  category: 'layouts',
  description:
    'Responsive width-constrained wrapper with 6 size presets (sm–full), auto centering, and horizontal padding.',
  variantCount: 6,
  keywords: ['container', 'wrapper', 'max-width', 'responsive', 'layout'],

  cardPreview: (
    <VStack gap="xs" style={{ width: '100%', maxWidth: 200 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Box key={s} p="xs" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)', textAlign: 'center' }}>
          <Text size="xs">{s}</Text>
        </Box>
      ))}
    </VStack>
  ),

  examples: [
    {
      title: 'Sizes',
      render: (
        <VStack gap="sm" style={{ width: '100%' }}>
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Container key={size} size={size}>
              <Box p="sm" radius="sm" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                <Text size="xs" color="secondary">{size} — {size === 'sm' ? '640px' : size === 'md' ? '768px' : size === 'lg' ? '1024px' : '1280px'}</Text>
              </Box>
            </Container>
          ))}
        </VStack>
      ),
      code: `import { Container } from '@wisp-ui/react';

<Container size="sm">640px max</Container>
<Container size="md">768px max</Container>
<Container size="lg">1024px max</Container>
<Container size="xl">1280px max</Container>`,
      rnCode: `import { Container } from '@wisp-ui/react-native';

<Container size="sm">640px max</Container>
<Container size="md">768px max</Container>
<Container size="lg">1024px max</Container>
<Container size="xl">1280px max</Container>`,
    },
  ],

  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", default: "'lg'", description: 'Maximum width preset.' },
    { name: 'center', type: 'boolean', default: 'true', description: 'Center with auto margins.' },
    { name: 'px', type: 'ThemeSpacingKey', default: "'lg'", description: 'Horizontal padding.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic root element.' },
  ],
};
