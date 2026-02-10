import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QRScanner, qrScannerSizes, qrScannerOverlays } from '@wisp-ui/react';

const meta: Meta<typeof QRScanner> = {
  title: 'React/Components/Data Display/QRScanner',
  component: QRScanner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: [...qrScannerSizes] },
    overlay: { control: 'select', options: [...qrScannerOverlays] },
    facingMode: { control: 'select', options: ['user', 'environment'] },
    showUpload: { control: 'boolean' },
    scanInterval: { control: 'number' },
    paused: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof QRScanner>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    onScan: (result) => alert(`Scanned: ${result.data}`),
  },
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {qrScannerSizes.map((size) => (
        <QRScanner
          key={size}
          size={size}
          onScan={(result) => console.log(result.data)}
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Crosshair Overlay
// ---------------------------------------------------------------------------

export const CrosshairOverlay: Story = {
  args: {
    size: 'lg',
    overlay: 'crosshair',
    onScan: (result) => console.log(result.data),
  },
};

// ---------------------------------------------------------------------------
// No Overlay
// ---------------------------------------------------------------------------

export const NoOverlay: Story = {
  args: {
    size: 'lg',
    overlay: 'none',
    onScan: (result) => console.log(result.data),
  },
};

// ---------------------------------------------------------------------------
// No Upload Button
// ---------------------------------------------------------------------------

export const NoUploadButton: Story = {
  args: {
    size: 'lg',
    showUpload: false,
    onScan: (result) => console.log(result.data),
  },
};
