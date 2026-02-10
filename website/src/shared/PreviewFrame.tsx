import React, { useState, useEffect } from 'react';
import { Card, WispProvider, useThemeColors, useTheme, Text } from '@wisp-ui/react';
import { Sun, Moon } from 'lucide-react';

interface PreviewFrameProps {
  label?: string;
  children: React.ReactNode;
  defaultMode?: 'light' | 'dark';
  /** If true, hides the light/dark toggle. */
  hideToggle?: boolean;
}

/**
 * Isolated preview frame with its own WispProvider + theme toggle.
 * Each frame renders children in a nested theme context with injectCssVars={false}.
 */
export function PreviewFrame({
  label,
  children,
  defaultMode = 'dark',
  hideToggle = false,
}: PreviewFrameProps) {
  const { mode: globalMode } = useTheme();
  const [frameMode, setFrameMode] = useState<'light' | 'dark'>(defaultMode ?? globalMode);
  const colors = useThemeColors();

  // Sync with global theme when it changes (unless user manually toggled this frame)
  useEffect(() => {
    setFrameMode(globalMode);
  }, [globalMode]);

  return (
    <Card variant="outlined" padding="none" radius="lg" style={{ overflow: 'hidden' }}>
      {/* Header bar */}
      {(label || !hideToggle) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: `1px solid ${colors.border.subtle}`,
          }}
        >
          <Text size="xs" weight="semibold" color="secondary">
            {label ?? ''}
          </Text>
          {!hideToggle && (
            <div
              onClick={() => setFrameMode((m) => (m === 'dark' ? 'light' : 'dark'))}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                borderRadius: 6,
              }}
              title={frameMode === 'dark' ? 'Switch to light' : 'Switch to dark'}
            >
              {frameMode === 'dark' ? (
                <Sun size={14} color={colors.text.secondary} />
              ) : (
                <Moon size={14} color={colors.text.secondary} />
              )}
            </div>
          )}
        </div>
      )}

      {/* Isolated preview area */}
      <WispProvider mode={frameMode} injectCssVars={false}>
        <PreviewContent>{children}</PreviewContent>
      </WispProvider>
    </Card>
  );
}

/** Inner component that reads from the nested provider's context. */
function PreviewContent({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: colors.background.canvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
      }}
    >
      {children}
    </div>
  );
}
