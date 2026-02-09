/**
 * @module providers/WispProvider
 * @description Root context provider for the Wisp design system (React Native).
 *
 * Supplies the resolved theme (colors, spacing, typography, radii, shadows)
 * to every Wisp RN component in the tree. Manages theme-mode toggling.
 *
 * Unlike the React DOM provider this version does NOT:
 * - Inject CSS custom properties
 * - Set `data-wisp-mode` on the document
 * - Integrate haptics via lazy require
 */

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ThemeColors, ThemeMode, WispTheme } from '@wisp-ui/core/theme/types';
import { createTheme, type ThemeOverrides } from '@wisp-ui/core/theme/create-theme';

// ---------------------------------------------------------------------------
// Context value shape (identical to React DOM)
// ---------------------------------------------------------------------------

export interface WispThemeContextValue {
  theme: WispTheme;
  mode: ThemeMode;
  colors: ThemeColors;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export const WispThemeContext = createContext<WispThemeContextValue | null>(null);
WispThemeContext.displayName = 'WispThemeContext';

// ---------------------------------------------------------------------------
// Provider Props
// ---------------------------------------------------------------------------

export interface WispProviderProps {
  /** @defaultValue `'dark'` */
  mode?: ThemeMode;
  overrides?: Omit<ThemeOverrides, 'mode'>;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WispProvider({
  mode: initialMode = 'dark',
  overrides,
  children,
}: WispProviderProps): React.JSX.Element {
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    setModeState(initialMode);
  }, [initialMode]);

  const theme = useMemo<WispTheme>(
    () => createTheme({ ...overrides, mode }),
    [mode, overrides],
  );

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const contextValue = useMemo<WispThemeContextValue>(
    () => ({ theme, mode, colors: theme.colors, toggleMode, setMode }),
    [theme, mode, toggleMode, setMode],
  );

  return (
    <WispThemeContext.Provider value={contextValue}>
      {children}
    </WispThemeContext.Provider>
  );
}
