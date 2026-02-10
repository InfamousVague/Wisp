import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QRCode, qrCodeSizes, qrCodeDotStyles, qrCodeErrorLevels } from '@wisp-ui/react';

const meta: Meta<typeof QRCode> = {
  title: 'React/Components/Data Display/QRCode',
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
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {qrCodeSizes.map((size) => (
        <QRCode key={size} value="https://wisp.dev" size={size} />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot Styles
// ---------------------------------------------------------------------------

export const DotStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {qrCodeDotStyles.map((style) => (
        <div key={style} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <QRCode value="https://wisp.dev" size="md" dotStyle={style} />
          <span style={{ fontSize: 12, opacity: 0.6 }}>{style}</span>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Logo
// ---------------------------------------------------------------------------

export const WithLogo: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'lg',
    errorLevel: 'H',
    children: (
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
    ),
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

// ---------------------------------------------------------------------------
// Circle Style
// ---------------------------------------------------------------------------

export const CircleStyle: Story = {
  args: {
    value: 'https://example.com/my-page',
    size: 'lg',
    dotStyle: 'circle',
    darkColor: '#0EA5E9',
  },
};

// ---------------------------------------------------------------------------
// No Quiet Zone
// ---------------------------------------------------------------------------

export const NoQuietZone: Story = {
  args: {
    value: 'https://wisp.dev',
    size: 'lg',
    showQuietZone: false,
  },
};
