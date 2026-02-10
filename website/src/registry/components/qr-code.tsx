import React from 'react';
import { QRCode } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const qrCodeEntry: ComponentEntry = {
  slug: 'qr-code',
  name: 'QRCode',
  category: 'components',
  description:
    'Stylised QR code generator with custom SVG rendering, dot shapes (square, circle, rounded), theme-aware colours, and optional centre logo support.',
  variantCount: 3,
  keywords: ['qr', 'code', 'barcode', 'svg', 'data', 'encoding', 'scan', 'link'],
  props: [
    { name: 'value', type: 'string', required: true, description: 'The data to encode into the QR code.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size variant controlling dimension.' },
    { name: 'dotStyle', type: "'square' | 'circle' | 'rounded'", default: "'square'", description: 'Visual style for data modules.' },
    { name: 'errorLevel', type: "'L' | 'M' | 'Q' | 'H'", default: "'M'", description: 'Error correction level.' },
    { name: 'darkColor', type: 'string', description: 'Override colour for dark modules.' },
    { name: 'lightColor', type: 'string', description: 'Override background colour.' },
    { name: 'logo', type: 'ReactNode', description: 'Custom content rendered in the centre.' },
    { name: 'logoSize', type: 'number', default: '0.2', description: 'Logo area fraction of QR width.' },
    { name: 'showQuietZone', type: 'boolean', default: 'true', description: 'Include quiet-zone margin.' },
  ],

  cardPreview: (
    <div style={{ pointerEvents: 'none' }}>
      <QRCode value="https://wisp.dev" size="sm" />
    </div>
  ),

  examples: [
    {
      title: 'Default',
      render: (
        <QRCode value="https://wisp.dev" size="lg" />
      ),
      code: `import { QRCode } from '@wisp-ui/react';

<QRCode value="https://wisp.dev" size="lg" />`,
      rnCode: `import { QRCode } from '@wisp-ui/react-native';

<QRCode value="https://wisp.dev" size="lg" />`,
    },
    {
      title: 'Circle Dots',
      render: (
        <QRCode value="https://wisp.dev" size="lg" dotStyle="circle" />
      ),
      code: `import { QRCode } from '@wisp-ui/react';

<QRCode
  value="https://wisp.dev"
  size="lg"
  dotStyle="circle"
/>`,
      rnCode: `import { QRCode } from '@wisp-ui/react-native';

<QRCode
  value="https://wisp.dev"
  size="lg"
  dotStyle="circle"
/>`,
    },
    {
      title: 'Rounded with Custom Colours',
      render: (
        <QRCode
          value="https://wisp.dev"
          size="lg"
          dotStyle="rounded"
          darkColor="#6366F1"
          lightColor="#F5F3FF"
        />
      ),
      code: `import { QRCode } from '@wisp-ui/react';

<QRCode
  value="https://wisp.dev"
  size="lg"
  dotStyle="rounded"
  darkColor="#6366F1"
  lightColor="#F5F3FF"
/>`,
      rnCode: `import { QRCode } from '@wisp-ui/react-native';

<QRCode
  value="https://wisp.dev"
  size="lg"
  dotStyle="rounded"
  darkColor="#6366F1"
  lightColor="#F5F3FF"
/>`,
    },
    {
      title: 'With Logo',
      render: (
        <QRCode value="https://wisp.dev" size="lg" errorLevel="H">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: '#6366F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            W
          </div>
        </QRCode>
      ),
      code: `import { QRCode } from '@wisp-ui/react';

<QRCode value="https://wisp.dev" size="lg" errorLevel="H">
  <div style={{
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: '#6366F1', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  }}>
    W
  </div>
</QRCode>`,
      rnCode: `import { QRCode } from '@wisp-ui/react-native';
import { View, Text } from 'react-native';

<QRCode value="https://wisp.dev" size="lg" errorLevel="H">
  <View style={{
    width: 40, height: 40, borderRadius: 8,
    backgroundColor: '#6366F1', alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Text style={{ color: '#fff', fontWeight: 'bold' }}>W</Text>
  </View>
</QRCode>`,
    },
  ],
};
