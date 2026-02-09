# Wisp Component Conventions

> These rules apply to EVERY component. Do not deviate. Do not repeat these in prompts — reference this file.

## File Structure

Every component lives in its own directory under `src/primitives/` or `src/components/`:

```
src/primitives/text/
├── Text.tsx           # Component logic only — no style definitions
├── Text.styles.ts     # All style maps, size configs, color maps
├── Text.types.ts      # All TypeScript types and prop interfaces
├── Text.stories.tsx   # Storybook stories — one per variant/feature
├── Text.test.tsx      # Vitest unit tests
├── README.md          # Documentation with usage examples, props table
└── index.ts           # Barrel export
```

## Separation of Concerns

### `*.types.ts` — Type Definitions
- All prop interfaces (`TextProps`, `ButtonProps`, etc.)
- **Re-export shared enums** from `../../tokens/shared` — NEVER define sizes/weights/colors locally
- Component-specific config types (e.g., `iconSizeMap`, `TextElement`)
- Export everything — consumed by .styles.ts and .tsx

### Shared Tokens (`src/tokens/shared.ts`)
- **ALL universal enums live here** — sizes, weights, colors, families
- Components import from `../../tokens/shared` and re-export with local aliases
- `resolveSemanticColor(color, themeColors)` — universal color resolver for all components
- Available tokens:
  - `TextSize` (11 steps), `textSizes` (const array)
  - `FontWeightKey` (4 steps), `fontWeightKeys`, `fontWeightValues` (name→number map)
  - `SemanticColor` (10 variants), `semanticColors` (const array)
  - `FontFamilyKey` (2), `fontFamilyKeys`, `fontFamilyStacks` (name→CSS stack map)
  - `ComponentSize` (5 t-shirt sizes), `componentSizes` (const array)

### `*.styles.ts` — Style Logic
- All style maps keyed by variant (sizeStyles, colorStyles, etc.)
- All CSS property computations
- Helper functions that produce `React.CSSProperties`
- Import types from `.types.ts`
- NO React hooks, NO theme access — pure data maps
- Theme-dependent styles are resolved in the component via a `getStyles(mode)` pattern or by passing theme colors as arguments

### `*.tsx` — Component Logic
- Import types from `.types.ts`
- Import styles from `.styles.ts`
- Use `useThemeColors()` to resolve theme-dependent colors
- Use `forwardRef` always
- Merge computed styles with user `style` prop (user wins)
- Handle skeleton state rendering
- Handle icon slot rendering
- Spread `...rest` props onto the DOM element

### `*.stories.tsx` — Stories
- One story per feature/variant:
  - `Sizes` — all size options rendered
  - `Weights` — all weight options rendered
  - `Colors` — all color variants rendered
  - `WithIcons` — icon left, icon right, both
  - `Truncation` — single-line and multi-line
  - `Skeleton` — loading skeleton state
  - `Families` — sans vs mono
  - `Alignment` — left, center, right
  - `AsElements` — different HTML elements via `as` prop
- Use `meta.title = 'Primitives/Text'` format
- Tag with `['autodocs']`
- Use theme colors from `useThemeColors()` in render functions
- Demonstrate both dark and light mode where relevant

### `README.md` — Documentation
- Component description
- Import example
- Basic usage
- Props table (name, type, default, description)
- Examples for every major feature
- Skeleton usage example
- Accessibility notes

### `index.ts` — Barrel Export
```ts
export { Text } from './Text';
export type { TextProps } from './Text.types';
```

## Design Rules

### Colors
- **Zero color in base UI** — everything is black, white, gray
- Color ONLY for semantic status: error (red), warning (amber), success (green)
- Dark mode accent: `#FFFFFF` (pure white)
- Light mode accent: `#0F1219` (near-black)
- All color variants are theme-aware — resolved via `useThemeColors()`

### Color Variant System
Every component with text supports these color variants:
- `primary` — main text (default)
- `secondary` — supporting text
- `tertiary` — muted / placeholder
- `disabled` — faded, non-interactive
- `white` — always white (for dark surfaces)
- `inverse` — opposite of current mode
- `error` — status red
- `warning` — status amber
- `success` — status green
- `brand` — accent color (white on dark, near-black on light)

### Skeleton Loading
- Every component accepts a `skeleton` boolean prop
- When `skeleton={true}`, render a gray shimmer placeholder instead of content
- Skeleton matches the component's size/dimensions
- Uses CSS animation: pulse or shimmer keyframes
- Skeleton color: `neutral[800]` dark / `neutral[200]` light with animated opacity

### Icons
- Use the **Icon primitive** (`<Icon icon={Search} />`) to wrap Lucide React icons
- Pass the Lucide component directly: `icon={Search}` — NOT `icon={<Search />}`
- Icon sizes use `ComponentSize`: xs(14px), sm(16px), md(20px), lg(24px), xl(32px)
- Default color is `'currentColor'` — inherits from parent text
- Can be explicitly colored with any `SemanticColor` or raw hex
- Supports `skeleton` prop for loading state
- Supports `label` prop for accessible icons (otherwise decorative with `aria-hidden`)
- Text's `iconLeft`/`iconRight` should use: `iconLeft={<Icon icon={Search} size="sm" />}`

### Polymorphic Rendering
- Use `as` prop with `React.createElement(Component, ...)`
- Default element varies: Text='span', Button='button', etc.
- Forward ref to the rendered element

### Style Merging
- Computed styles from variants are built first
- User `style` prop is spread last (user always wins)
- `className` is passed through to the DOM element

## Neutral Palette Reference

| Step | Hex | Usage |
|------|-----|-------|
| 0 | `#FFFFFF` | Pure white |
| 50 | `#F7F8FA` | Light canvas |
| 100 | `#F0F1F5` | Light surface |
| 200 | `#E0E4EB` | Light borders |
| 300 | `#D1D6E0` | Light strong borders |
| 400 | `#BFC6D4` | Disabled text (light) |
| 500 | `#667085` | Muted text |
| 600 | `#4E5766` | Secondary text (dark) |
| 700 | `#37404F` | Borders (dark) |
| 800 | `#202531` | Surface (dark) |
| 850 | `#161A24` | Raised (dark) |
| 900 | `#0F1219` | Canvas alt (dark) |
| 950 | `#0A0E15` | Canvas (dark) |
