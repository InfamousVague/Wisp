/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QRScanner } from './QRScanner';
import { WispProvider } from '../../providers';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <WispProvider mode="dark">{children}</WispProvider>
);

const noop = () => {};

describe('QRScanner (RN) — rendering', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Wrapper>
        <QRScanner onScan={noop} />
      </Wrapper>,
    );
    expect(container).toBeTruthy();
  });

  it('renders upload button by default', () => {
    render(
      <Wrapper>
        <QRScanner onScan={noop} />
      </Wrapper>,
    );
    expect(screen.getByText('Upload Image')).toBeInTheDocument();
  });

  it('renders camera placeholder text', () => {
    render(
      <Wrapper>
        <QRScanner onScan={noop} />
      </Wrapper>,
    );
    expect(screen.getByText('Camera preview')).toBeInTheDocument();
  });

  it('handles different sizes', () => {
    const { container } = render(
      <Wrapper>
        <QRScanner onScan={noop} size="lg" />
      </Wrapper>,
    );
    expect(container).toBeTruthy();
  });

  it('renders frame overlay SVG', () => {
    const { container } = render(
      <Wrapper>
        <QRScanner onScan={noop} overlay="frame" />
      </Wrapper>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render overlay when overlay is "none"', () => {
    const { container } = render(
      <Wrapper>
        <QRScanner onScan={noop} overlay="none" />
      </Wrapper>,
    );
    expect(container.querySelector('svg')).toBeNull();
  });
});
