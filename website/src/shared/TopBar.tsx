import React from 'react';
import { useTheme, useThemeColors, Text, Separator } from '@wisp-ui/react';
import { Search } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface TopBarProps {
  onSearchOpen?: () => void;
}

export function TopBar({ onSearchOpen }: TopBarProps) {
  const { mode, toggleMode } = useTheme();
  const colors = useThemeColors();

  return (
    <div
      style={{
        height: 52,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 20px',
        gap: 8,
        borderBottom: `1px solid ${colors.border.subtle}`,
      }}
    >
      {/* Search trigger */}
      <div
        onClick={onSearchOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          borderRadius: 8,
          border: `1px solid ${colors.border.subtle}`,
          cursor: 'pointer',
          marginRight: 'auto',
        }}
      >
        <Search size={14} color={colors.text.muted} />
        <Text size="sm" color="tertiary">
          Search…
        </Text>
        <Text size="xs" color="muted" family="mono">
          ⌘K
        </Text>
      </div>

      {/* Site theme toggle */}
      <ThemeToggle mode={mode} onToggle={toggleMode} />
    </div>
  );
}
