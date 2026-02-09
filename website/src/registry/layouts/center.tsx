import React from 'react';
import { Center, Text, Box } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const centerEntry: ComponentEntry = {
  slug: 'center',
  name: 'Center',
  category: 'layouts',
  description:
    'Centers children both horizontally and vertically using flexbox. Supports inline mode.',
  variantCount: 1,
  keywords: ['center', 'align', 'middle', 'flex', 'justify'],

  cardPreview: (
    <Center style={{ width: '100%', height: 80, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
      <Text size="xs" color="secondary">Centered</Text>
    </Center>
  ),

  examples: [
    {
      title: 'Basic Center',
      render: (
        <Center style={{ width: '100%', height: 160, backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 8 }}>
          <Text size="md">Centered Content</Text>
        </Center>
      ),
      code: `import { Center } from '@wisp-ui/react';

<Center style={{ height: 160 }}>
  <Text>Centered Content</Text>
</Center>`,
      rnCode: `import { Center } from '@wisp-ui/react-native';

<Center style={{ height: 160 }}>
  <Text>Centered Content</Text>
</Center>`,
    },
    {
      title: 'Inline Center',
      render: (
        <Box display="flex" style={{ gap: 12 }}>
          <Center inline style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <Text size="sm">A</Text>
          </Center>
          <Center inline style={{ width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 8 }}>
            <Text size="sm">B</Text>
          </Center>
        </Box>
      ),
      code: `<Center inline style={{ width: 48, height: 48 }}>A</Center>
<Center inline style={{ width: 48, height: 48 }}>B</Center>`,
      rnCode: `<Center style={{ width: 48, height: 48 }}>A</Center>
<Center style={{ width: 48, height: 48 }}>B</Center>`,
    },
  ],

  props: [
    { name: 'inline', type: 'boolean', default: 'false', description: 'Use inline-flex instead of flex.' },
    { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic root element.' },
    { name: 'children', type: 'React.ReactNode', description: 'Content to center.' },
  ],
};
