import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QRCode } from '@wisp-ui/react-native';
import { qrCodeSizes, qrCodeDotStyles, qrCodeErrorLevels } from '@wisp-ui/core/types/QRCode.types';

const meta: Meta<typeof QRCode> = {
  title: 'React Native/Components/Data Display/QRCode',
  component: QRCode,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: [...qrCodeSizes] },
    dotStyle: { control: 'select', options: [...qrCodeDotStyles] },
    errorLevel: { control: 'select', options: [...qrCodeErrorLevels] },
    darkColor: { control: 'color' },
    lightColor: { control: 'color' },
    showQuietZone: { control: 'boolean' },
    logoSize: { control: { type: 'range', min: 0.1, max: 0.4, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof QRCode>;

// ---------------------------------------------------------------------------
// Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'md',
  },
};

// ---------------------------------------------------------------------------
// Circle Style
// ---------------------------------------------------------------------------

export const CircleStyle: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'lg',
    dotStyle: 'circle',
  },
};

// ---------------------------------------------------------------------------
// Rounded Style
// ---------------------------------------------------------------------------

export const RoundedStyle: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'lg',
    dotStyle: 'rounded',
  },
};

// ---------------------------------------------------------------------------
// Custom Colours
// ---------------------------------------------------------------------------

export const CustomColours: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'lg',
    darkColor: '#6366F1',
    lightColor: '#F5F3FF',
    dotStyle: 'rounded',
  },
};
