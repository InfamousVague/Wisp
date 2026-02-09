/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeBlock } from './CodeBlock';
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

describe('CodeBlock — rendering', () => {
  it('renders code content', () => {
    render(
      <Dark>
        <CodeBlock code="const x = 42;" />
      </Dark>,
    );
    expect(screen.getByText('const x = 42;')).toBeInTheDocument();
  });

  it('renders inside a <pre> element', () => {
    const { container } = render(
      <Dark>
        <CodeBlock code="hello" />
      </Dark>,
    );
    expect(container.querySelector('pre')).toBeInTheDocument();
  });

  it('renders inside a <code> element', () => {
    const { container } = render(
      <Dark>
        <CodeBlock code="hello" />
      </Dark>,
    );
    expect(container.querySelector('code')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Language label
// ---------------------------------------------------------------------------

describe('CodeBlock — language', () => {
  it('renders language label when provided', () => {
    render(
      <Dark>
        <CodeBlock code="const x = 1;" language="TypeScript" />
      </Dark>,
    );
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

describe('CodeBlock — variants', () => {
  (['default', 'outlined'] as const).forEach((variant) => {
    it(`renders variant="${variant}" without crashing`, () => {
      render(
        <Dark>
          <CodeBlock code="test" variant={variant} />
        </Dark>,
      );
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });
});

// ---------------------------------------------------------------------------
// Line numbers
// ---------------------------------------------------------------------------

describe('CodeBlock — line numbers', () => {
  it('shows line numbers when showLineNumbers is true', () => {
    render(
      <Dark>
        <CodeBlock code={'line1\nline2\nline3'} showLineNumbers />
      </Dark>,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show line numbers by default', () => {
    render(
      <Dark>
        <CodeBlock code={'line1\nline2'} />
      </Dark>,
    );
    // Line numbers should not be present
    // The text "1" would exist as part of "line1", so check there's no standalone "1"
    const spans = screen.queryAllByText('1');
    // Should not have a standalone "1" span that is a line number
    expect(spans.every((el) => el.textContent !== '1' || el.closest('code'))).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Copy button
// ---------------------------------------------------------------------------

describe('CodeBlock — copy button', () => {
  it('renders copy button by default', () => {
    render(
      <Dark>
        <CodeBlock code="test" />
      </Dark>,
    );
    expect(screen.getByLabelText('Copy code')).toBeInTheDocument();
  });

  it('hides copy button when copyable is false', () => {
    render(
      <Dark>
        <CodeBlock code="test" copyable={false} language="JS" />
      </Dark>,
    );
    expect(screen.queryByLabelText('Copy code')).not.toBeInTheDocument();
  });

  it('calls clipboard API when copy button is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    render(
      <Dark>
        <CodeBlock code="const x = 1;" />
      </Dark>,
    );

    fireEvent.click(screen.getByLabelText('Copy code'));
    expect(writeText).toHaveBeenCalledWith('const x = 1;');
  });
});

// ---------------------------------------------------------------------------
// className passthrough
// ---------------------------------------------------------------------------

describe('CodeBlock — className', () => {
  it('passes className through to the wrapper', () => {
    const { container } = render(
      <Dark>
        <CodeBlock code="test" className="custom-code" />
      </Dark>,
    );
    expect(container.querySelector('.custom-code')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Ref forwarding
// ---------------------------------------------------------------------------

describe('CodeBlock — ref forwarding', () => {
  it('forwards ref to the <pre> element', () => {
    const ref = React.createRef<HTMLPreElement>();
    render(
      <Dark>
        <CodeBlock ref={ref} code="test" />
      </Dark>,
    );
    expect(ref.current).toBeInstanceOf(HTMLPreElement);
  });
});
