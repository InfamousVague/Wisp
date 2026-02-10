/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QRCode } from './QRCode';
import { qrCodeSizes, qrCodeSizeMap } from '.';
import { WispProvider } from '../../providers';

// ---------------------------------------------------------------------------
// Wrapper
// ---------------------------------------------------------------------------

const Dark = ({ children }: { children: React.ReactNode }) => (
  <WispProvider mode="dark">{children}</WispProvider>
);

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('QRCode — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Dark>
        <QRCode value="hello" />
      </Dark>,
    );
    expect(container).toBeTruthy();
  });

  it('renders an SVG element', () => {
    const { container } = render(
      <Dark>
        <QRCode value="https://example.com" />
      </Dark>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders dark modules as rect elements', () => {
    const { container } = render(
      <Dark>
        <QRCode value="test" dotStyle="square" />
      </Dark>,
    );
    const svg = container.querySelector('svg')!;
    // Background rect + QR module rects
    const rects = svg.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(1);
  });

  it('renders circles when dotStyle is "circle"', () => {
    const { container } = render(
      <Dark>
        <QRCode value="test" dotStyle="circle" />
      </Dark>,
    );
    const svg = container.querySelector('svg')!;
    const circles = svg.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });

  it('renders with role="img" and accessible aria-label', () => {
    render(
      <Dark>
        <QRCode value="https://wisp.dev" />
      </Dark>,
    );
    const el = screen.getByRole('img');
    expect(el).toBeInTheDocument();
    expect(el.getAttribute('aria-label')).toContain('https://wisp.dev');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Dark>
        <QRCode ref={ref} value="test" />
      </Dark>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes className through', () => {
    const { container } = render(
      <Dark>
        <QRCode className="my-qr" value="test" />
      </Dark>,
    );
    expect(container.firstChild).toHaveClass('my-qr');
  });
});

// ---------------------------------------------------------------------------
// Size variants
// ---------------------------------------------------------------------------

describe('QRCode — sizes', () => {
  it('exports all expected size values', () => {
    expect(qrCodeSizes).toEqual(['sm', 'md', 'lg', 'xl']);
  });

  it.each(qrCodeSizes)('renders at size="%s" without errors', (size) => {
    const { container } = render(
      <Dark>
        <QRCode value="test" size={size} />
      </Dark>,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const config = qrCodeSizeMap[size];
    expect(svg!.getAttribute('viewBox')).toBe(
      `0 0 ${config.dimension} ${config.dimension}`,
    );
  });
});

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

describe('QRCode — features', () => {
  it('renders logo children in the centre', () => {
    render(
      <Dark>
        <QRCode value="test" errorLevel="H">
          <span data-testid="logo">LOGO</span>
        </QRCode>
      </Dark>,
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('renders logo prop in the centre', () => {
    render(
      <Dark>
        <QRCode value="test" errorLevel="H" logo={<span data-testid="logo2">L</span>} />
      </Dark>,
    );
    expect(screen.getByTestId('logo2')).toBeInTheDocument();
  });

  it('applies custom dark and light colours', () => {
    const { container } = render(
      <Dark>
        <QRCode value="test" darkColor="#FF0000" lightColor="#00FF00" />
      </Dark>,
    );
    const svg = container.querySelector('svg')!;
    // First rect is the background
    const bgRect = svg.querySelector('rect');
    expect(bgRect?.getAttribute('fill')).toBe('#00FF00');
  });

  it('renders with different error levels', () => {
    const { container: l } = render(<Dark><QRCode value="test" errorLevel="L" /></Dark>);
    const { container: h } = render(<Dark><QRCode value="test" errorLevel="H" /></Dark>);
    // Both should render valid SVGs
    expect(l.querySelector('svg')).toBeInTheDocument();
    expect(h.querySelector('svg')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe('QRCode — edge cases', () => {
  it('handles empty string value', () => {
    const { container } = render(
      <Dark>
        <QRCode value="" />
      </Dark>,
    );
    // Should still render SVG (qrcode-generator handles empty strings)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('handles long URL value', () => {
    const longUrl = 'https://example.com/' + 'a'.repeat(200);
    const { container } = render(
      <Dark>
        <QRCode value={longUrl} />
      </Dark>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders without quiet zone when showQuietZone is false', () => {
    const { container } = render(
      <Dark>
        <QRCode value="test" showQuietZone={false} />
      </Dark>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
