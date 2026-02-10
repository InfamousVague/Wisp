/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QRScanner } from './QRScanner';
import { qrScannerSizes, qrScannerSizeMap } from '.';
import { WispProvider } from '../../providers';

// ---------------------------------------------------------------------------
// Wrapper
// ---------------------------------------------------------------------------

const Dark = ({ children }: { children: React.ReactNode }) => (
  <WispProvider mode="dark">{children}</WispProvider>
);

const noop = () => {};

// ---------------------------------------------------------------------------
// Mock getUserMedia (not available in jsdom)
// ---------------------------------------------------------------------------

beforeAll(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    value: {
      getUserMedia: vi.fn().mockRejectedValue(new Error('Not supported in test')),
    },
    writable: true,
  });
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('QRScanner — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Dark>
        <QRScanner onScan={noop} />
      </Dark>,
    );
    expect(container).toBeTruthy();
  });

  it('renders a video element for camera feed', () => {
    const { container } = render(
      <Dark>
        <QRScanner onScan={noop} />
      </Dark>,
    );
    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('renders with role="region" and accessible aria-label', () => {
    render(
      <Dark>
        <QRScanner onScan={noop} />
      </Dark>,
    );
    const el = screen.getByRole('region');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('aria-label')).toContain('scanner');
  });

  it('renders upload button by default', () => {
    render(
      <Dark>
        <QRScanner onScan={noop} />
      </Dark>,
    );
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('hides upload button when showUpload is false', () => {
    render(
      <Dark>
        <QRScanner onScan={noop} showUpload={false} />
      </Dark>,
    );
    expect(screen.queryByText('Upload Image')).not.toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Dark>
        <QRScanner ref={ref} onScan={noop} />
      </Dark>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes className through', () => {
    const { container } = render(
      <Dark>
        <QRScanner className="my-scanner" onScan={noop} />
      </Dark>,
    );
    expect(container.firstChild).toHaveClass('my-scanner');
  });
});

// ---------------------------------------------------------------------------
// Size variants
// ---------------------------------------------------------------------------

describe('QRScanner — sizes', () => {
  it('exports all expected size values', () => {
    expect(qrScannerSizes).toEqual(['sm', 'md', 'lg', 'xl']);
  });

  it.each(qrScannerSizes)('renders at size="%s" without errors', (size) => {
    const { container } = render(
      <Dark>
        <QRScanner onScan={noop} size={size} />
      </Dark>,
    );
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Overlay
// ---------------------------------------------------------------------------

describe('QRScanner — overlay', () => {
  it('does not render overlay SVG when overlay is "none"', () => {
    const { container } = render(
      <Dark>
        <QRScanner onScan={noop} overlay="none" />
      </Dark>,
    );
    // No overlay SVG — only the hidden canvas
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(0);
  });
});
