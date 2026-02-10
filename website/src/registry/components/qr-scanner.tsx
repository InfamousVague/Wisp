import React from 'react';
import { QRScanner } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const qrScannerEntry: ComponentEntry = {
  slug: 'qr-scanner',
  name: 'QRScanner',
  category: 'components',
  description:
    'Camera-based QR code scanner with image-upload fallback. Uses BarcodeDetector API with jsQR fallback on web, and react-native-vision-camera on React Native.',
  variantCount: 3,
  keywords: ['qr', 'scanner', 'camera', 'barcode', 'decode', 'read', 'scan'],
  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Size variant controlling viewport dimensions.' },
    { name: 'onScan', type: '(result: QRScanResult) => void', required: true, description: 'Callback fired when a QR code is decoded.' },
    { name: 'onError', type: '(error: Error) => void', description: 'Callback fired on camera or decode errors.' },
    { name: 'facingMode', type: "'user' | 'environment'", default: "'environment'", description: 'Which camera to use.' },
    { name: 'showUpload', type: 'boolean', default: 'true', description: 'Show image-upload fallback button.' },
    { name: 'scanInterval', type: 'number', default: '250', description: 'Milliseconds between scan attempts.' },
    { name: 'paused', type: 'boolean', default: 'false', description: 'Temporarily pause scanning.' },
    { name: 'overlay', type: "'crosshair' | 'frame' | 'none'", default: "'frame'", description: 'Visual overlay style.' },
  ],

  cardPreview: (
    <div style={{ pointerEvents: 'none' }}>
      <QRScanner
        size="sm"
        onScan={() => {}}
        overlay="frame"
      />
    </div>
  ),

  examples: [
    {
      title: 'Default Scanner',
      render: (
        <QRScanner
          size="lg"
          onScan={(result) => alert(`Scanned: ${result.data}`)}
        />
      ),
      code: `import { QRScanner } from '@wisp-ui/react';

<QRScanner
  size="lg"
  onScan={(result) => alert(\`Scanned: \${result.data}\`)}
/>`,
      rnCode: `import { QRScanner } from '@wisp-ui/react-native';

<QRScanner
  size="lg"
  onScan={(result) => console.log(result.data)}
/>`,
    },
    {
      title: 'Crosshair Overlay',
      render: (
        <QRScanner
          size="lg"
          overlay="crosshair"
          onScan={(result) => console.log(result.data)}
        />
      ),
      code: `import { QRScanner } from '@wisp-ui/react';

<QRScanner
  size="lg"
  overlay="crosshair"
  onScan={(result) => console.log(result.data)}
/>`,
      rnCode: `import { QRScanner } from '@wisp-ui/react-native';

<QRScanner
  size="lg"
  overlay="crosshair"
  onScan={(result) => console.log(result.data)}
/>`,
    },
    {
      title: 'No Overlay',
      render: (
        <QRScanner
          size="lg"
          overlay="none"
          showUpload={false}
          onScan={(result) => console.log(result.data)}
        />
      ),
      code: `import { QRScanner } from '@wisp-ui/react';

<QRScanner
  size="lg"
  overlay="none"
  showUpload={false}
  onScan={(result) => console.log(result.data)}
/>`,
      rnCode: `import { QRScanner } from '@wisp-ui/react-native';

<QRScanner
  size="lg"
  overlay="none"
  showUpload={false}
  onScan={(result) => console.log(result.data)}
/>`,
    },
  ],
};
