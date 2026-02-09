# React Native Component Implementation — Restart Prompt

> Copy this entire prompt into a new Claude session to resume React Native component work.

---

## Context

You are working on **Wisp**, a monochrome cross-platform UI kit. The codebase is a pnpm monorepo at `~/Development/Wisp/` with three packages:

- **`packages/core/`** — Framework-agnostic design tokens, types, style builders, and theme system
- **`packages/react/`** — React DOM components (90+ components, fully complete)
- **`packages/react-native/`** — React Native adapter (currently 5 primitives, expanding to full parity)

### Architecture

The design system follows a **three-layer pattern**:

1. **Core types** (`packages/core/src/types/Component.types.ts`) — Shared prop types, variant unions, size maps
2. **Core styles** (`packages/core/src/styles/Component.styles.ts`) — Pure functions that return `CSSStyleObject` given theme colors + props
3. **Platform implementation** — React DOM (`packages/react/src/`) or React Native (`packages/react-native/src/`)

Each RN component should:
- Import types and size maps from `@wisp-ui/core/types/Component.types`
- Import style builder functions from `@wisp-ui/core/styles/Component.styles`
- Use `useThemeColors()` from `../../providers` to get theme-aware colors
- Use `forwardRef` with proper RN ref types (`View`, `TextInput`, `Text`, etc.)
- Use `Pressable` instead of `<button>`, `TextInput` instead of `<input>`
- Use `Animated` API or `LayoutAnimation` for animations (no CSS keyframes)
- Use `stripWebProps()` or manually filter when consuming core style objects
- Use `toRNShadow()` to convert CSS box-shadow strings to RN shadow props

### Key Differences from React DOM

| Web (React DOM) | React Native |
|---|---|
| `<button onClick>` | `<Pressable onPress>` |
| `<input onChange>` | `<TextInput onChangeText>` |
| `className` | `style` prop (ViewStyle/TextStyle) |
| CSS `transition`/`animation` | `Animated` API or `LayoutAnimation` |
| `cursor: 'pointer'` | Strip (not supported) |
| `box-shadow` | `toRNShadow()` helper |
| `overflow: 'hidden'` | Works on RN |
| `display: 'flex'` | Default on RN (strip) |
| CSS `gap` | `gap` prop (RN 0.71+) |
| `border-radius` shorthand | Individual `borderRadius` |
| `outline`/`boxSizing` | Strip (use `stripWebProps`) |
| `data-*` attributes | Strip |
| Polymorphic `as` prop | Not applicable |
| `::before`/`::after` | Use extra `<View>` elements |

### File Structure for New Components

```
packages/react-native/src/primitives/
  component-name/
    ComponentName.tsx    # Main component implementation
    index.ts           # Re-export: export { ComponentName } from './ComponentName';
                       #            export type { ComponentNameProps } from './ComponentName';
```

After creating the component:
1. Add export to `packages/react-native/src/primitives/index.ts`
2. Add export to `packages/react-native/src/index.ts`
3. Create story at `stories/react-native/ComponentName.stories.tsx`

### Existing RN Implementation Reference

**Button** — Best reference for interactive components:
- File: `packages/react-native/src/primitives/button/Button.tsx`
- Uses: `Pressable`, `ActivityIndicator`, `forwardRef<View>`, `useMemo` for styles
- Imports core types: `ButtonVariant`, `ButtonShape`, `buttonSizeMap`, `shapeRadiusMap`
- Imports core styles: `resolveVariantColors`, `getDisabledColors`
- Pattern: Computes `baseStyle` via `useMemo`, uses `Pressable` callback style for press states

**Text** — Best reference for display components:
- File: `packages/react-native/src/primitives/text/Text.tsx`
- Uses: `RNText`, `View` for icon wrappers, `forwardRef<RNText>`
- Imports core styles: `resolveTextColor`, `sizeMap`
- Pattern: Maps font weights to RN string weights, computes `textStyle` via `useMemo`

**Input** — Best reference for form inputs:
- File: `packages/react-native/src/primitives/input/Input.tsx`
- Uses: `TextInput`, `View` for wrapper, `forwardRef<TextInput>`
- Pattern: Wrapper View with border, TextInput inside, optional label/hint/error Text above/below

**Toggle** — Best reference for animated components:
- File: `packages/react-native/src/primitives/toggle/Toggle.tsx`
- Uses: `Pressable`, `Animated.Value`, `Animated.timing` for knob slide
- Pattern: `useRef(new Animated.Value())` for animation, `useEffect` to trigger

### Storybook Setup (already configured)

- Stories go in `stories/react-native/ComponentName.stories.tsx`
- Use `title: 'React Native/ComponentName'` for sidebar grouping
- Import from `@wisp-ui/react-native` (aliased via Vite to source)
- `react-native` is aliased to `react-native-web` in `.storybook/main.ts`
- Both `WispProvider` (React DOM) and `RNWispProvider` (RN) are wrapped in `.storybook/preview.tsx`
- Run with: `pnpm storybook` (port 6009)

### Story Pattern

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@wisp-ui/react-native';

const meta: Meta<typeof ComponentName> = {
  title: 'React Native/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info'] },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: { /* default props */ },
};

// Additional stories showing variants, sizes, states, etc.
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {/* Render component in different variants */}
    </div>
  ),
};
```

### Theme System

The theme provides colors through `useThemeColors()`:

```typescript
colors.background.canvas    // Main background
colors.background.raised    // Elevated surface
colors.background.overlay   // Overlay/modal background
colors.border.subtle        // Default borders
colors.border.strong        // Emphasized borders
colors.border.focus         // Focus ring color
colors.text.primary         // Primary text
colors.text.secondary       // Secondary text
colors.text.muted           // Muted/disabled text
colors.text.tertiary        // Tertiary text
colors.text.inverse         // Inverse (for dark-on-light)
colors.status.success.*     // Green status (bg, border, text, subtle)
colors.status.warning.*     // Amber status
colors.status.danger.*      // Red status
colors.status.info.*        // Blue status
colors.brand.*              // Brand colors
```

### Core Type/Style Import Paths

```typescript
// Types (variant unions, size maps, prop interfaces)
import type { ComponentSize } from '@wisp-ui/core/tokens/shared';
import type { ButtonVariant, ButtonShape } from '@wisp-ui/core/types/Button.types';
import { buttonSizeMap, shapeRadiusMap } from '@wisp-ui/core/types/Button.types';

// Style builders (pure functions → CSSStyleObject)
import { resolveVariantColors } from '@wisp-ui/core/styles/Button.styles';
import { resolveTextColor, sizeMap } from '@wisp-ui/core/styles/Text.styles';

// Tokens
import { spacing } from '@wisp-ui/core/tokens/spacing';
import { radii } from '@wisp-ui/core/tokens/radii';
import { shadows } from '@wisp-ui/core/tokens/shadows';
```

### Current Progress

**Completed:**
- Phase 1: Core 5 Primitives (Text, Badge, Button, Input, Toggle)
- WispProvider, useTheme, useThemeColors hooks
- Utility functions (stripWebProps, toRNShadow)
- Storybook stories for all 5 primitives
- Storybook configured with react-native-web aliases
- TypeScript passes (`pnpm --filter @wisp-ui/react-native typecheck`)

**Checklist file:** `REACT_NATIVE_CHECKLIST.md` at the repo root tracks all components.

---

## Task

Continue implementing React Native components following the checklist in `REACT_NATIVE_CHECKLIST.md`. Work through the phases in order:

1. **Read the checklist** to see what's next
2. **Read the React DOM version** of the component at `packages/react/src/primitives/` (or `/layouts/` or `/components/`)
3. **Read the core types** at `packages/core/src/types/Component.types.ts`
4. **Read the core styles** at `packages/core/src/styles/Component.styles.ts`
5. **Implement the RN version** at `packages/react-native/src/primitives/component-name/ComponentName.tsx`
6. **Export it** from the primitives index and package index
7. **Create a Storybook story** at `stories/react-native/ComponentName.stories.tsx`
8. **Typecheck** with `pnpm --filter @wisp-ui/react-native typecheck`
9. **Update the checklist** — mark the component as done

For each component, examine the core types/styles to understand what can be reused vs what needs RN-specific implementation. Maximize reuse from `@wisp-ui/core` — types, size maps, color resolvers, and variant definitions should all come from core. Only the rendering layer (JSX, RN-specific APIs) should be RN-specific.

### Priority Order Within Phase 2

1. Checkbox, Radio, RadioGroup (form controls needed for many compound components)
2. Spinner, Progress (feedback primitives)
3. Avatar, Chip, Tag, Indicator (display primitives used in many places)
4. Slider (form control)
5. TextArea, NumberInput (form controls)
6. Alert, Skeleton (feedback)
7. Rating, Meter (data display)
8. Remaining: PinInput, TagInput, Stepper, ColorPicker, ColorSwatch, Kbd, Toast, Icon, CircularProgress

### Batch Size

Implement **3-5 components per session**, including stories. After each batch:
- Run `pnpm --filter @wisp-ui/react-native typecheck`
- Verify stories render in Storybook (port 6009)
- Update the checklist

---

## Quick Reference Commands

```bash
# Typecheck RN package
pnpm --filter @wisp-ui/react-native typecheck

# Run Storybook (react-native-web)
cd /Users/infamousvague/Development/Wisp && pnpm storybook

# Check what's exported
cat packages/react-native/src/index.ts

# See the React DOM version of a component
cat packages/react/src/primitives/ComponentName.tsx

# See core types for a component
cat packages/core/src/types/ComponentName.types.ts

# See core styles for a component
cat packages/core/src/styles/ComponentName.styles.ts
```
