import React from 'react';
import { Button } from '@wisp-ui/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  onToggle: () => void;
  size?: number;
}

export function ThemeToggle({ mode, onToggle, size = 16 }: ThemeToggleProps) {
  return (
    <Button
      variant="tertiary"
      size="sm"
      iconLeft={mode === 'dark' ? <Sun size={size} /> : <Moon size={size} />}
      onClick={onToggle}
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    />
  );
}
