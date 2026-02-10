import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QRScanner } from '@wisp-ui/react-native';
import { qrScannerSizes, qrScannerOverlays } from '@wisp-ui/core/types/QRScanner.types';

const meta: Meta<typeof QRScanner> = {
  title: 'React Native/Components/Data Display/QRScanner',
  component: QRScanner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: [...qrScannerSizes] },
    overlay: { control: 'select', options: [...qrScannerOverlays] },
    showUpload: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof QRScanner>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    onScan: (result) => console.log(result.data),
  },
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
