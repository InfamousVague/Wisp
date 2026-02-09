# React Native Component Parity Checklist

> Tracking `@wisp-ui/react-native` implementation progress toward parity with `@wisp-ui/react`.

## Status Legend

- [ ] Not started
- [x] Complete

---

## Phase 1 — Core 5 Primitives (DONE)

- [x] **Text** — Typography with sizes, weights, semantic colors, truncation, icon slots
- [x] **Badge** — Status badge with variants (default/success/warning/danger/info), sizes, shapes, dot
- [x] **Button** — 16 variants, 3 shapes, 5 sizes, loading/disabled, icon slots, fullWidth
- [x] **Input** — Text input with label, hint, error/warning, sizes, icon slots, fullWidth
- [x] **Toggle** — Switch with sizes, slim variant, custom checkedColor, animated knob

### Phase 1 Infrastructure (DONE)

- [x] **WispProvider** — Theme context (mode, colors, toggleMode, setMode)
- [x] **useTheme / useThemeColors** — Theme access hooks
- [x] **stripWebProps** — Remove CSS-only properties from core style objects
- [x] **toRNShadow** — Convert CSS box-shadow to RN shadow props
- [x] **Storybook stories** — All 5 primitives with react-native-web

---

## Phase 2 — Remaining Primitives (24 components)

### Form Controls
- [x] **Checkbox** — Checkbox with size variants, animated check mark
- [x] **Radio** — Radio button primitive
- [x] **RadioGroup** — Radio group container with value management
- [x] **Slider** — Range slider with thumb, track, size variants
- [x] **TextArea** — Multi-line text input with auto-resize
- [x] **NumberInput** — Numeric input with increment/decrement buttons
- [x] **PinInput** — PIN code input (array of single-char inputs)
- [x] **TagInput** — Multi-tag input with add/remove
- [x] **Stepper** — Numeric stepper with +/- buttons
- [x] **ColorPicker** — Color selection (simplified for mobile)

### Display
- [x] **Icon** — Icon wrapper with size mapping and color
- [x] **Avatar** — User avatar with initials, image, sizes, shapes, status indicator
- [x] **Chip** — Interactive chip with colors and variants
- [x] **Tag** — Text tag/label
- [x] **Kbd** — Keyboard shortcut display (web-only or simplified)
- [x] **ColorSwatch** — Color preview with shapes
- [x] **Indicator** — Status indicator dot with variants and states

### Feedback
- [x] **Spinner** — Loading spinner with animated rotation
- [x] **Progress** — Linear progress bar with sizes
- [x] **CircularProgress** — Circular/ring progress with SVG
- [x] **Skeleton** — Loading placeholder with pulse animation
- [x] **Alert** — Alert message with icon, variants (info/success/warning/danger)
- [x] **Toast** — Toast notification (integrate with RN toast libraries)
- [x] **Rating** — Star rating with half-star support
- [x] **Meter** — Meter/gauge display

---

## Phase 3 — Layouts (19 components)

### Core Layout
- [x] **Stack** — Flex layout with direction, gap, alignment
- [x] **HStack** — Horizontal stack (shorthand)
- [x] **VStack** — Vertical stack (shorthand)
- [x] **Box** — Generic container with spacing, border-radius, padding
- [x] **Center** — Center content horizontally and vertically
- [x] **Spacer** — Flexible spacing component

### Containers
- [x] **Container** — Responsive container with max-width
- [x] **ScrollArea** — Scrollable area (maps to RN ScrollView)
- [x] **Card** — Card with variants (elevated/outlined/filled/ghost), padding, radius
- [x] **AspectRatio** — Maintain aspect ratio container

### Grid & Structure
- [x] **Grid** — Grid layout (flex-wrap based for RN)
- [x] **GridItem** — Grid item with span support
- [x] **Separator** — Visual divider with orientation and variants
- [x] **FormField** — Form field wrapper with label, hint, error

### Navigation & Chrome
- [x] **Breadcrumb** — Breadcrumb navigation
- [x] **ListItem** — List item with icon, text, trailing content
- [x] **EmptyState** — Empty state with icon, title, description, action
- [x] **Sidebar** — Navigation sidebar (drawer pattern on mobile)

### Animation
- [x] **Collapse** — Animated expand/collapse with LayoutAnimation or Animated
- [x] **Overlay** — Backdrop overlay with opacity/blur
- [x] **Sticky** — Sticky positioning (limited on RN, use ScrollView stickyHeaders)

---

## Phase 4 — Compound Components (33 components) (DONE)

### Overlays & Modals
- [x] **Dialog** — Modal dialog with size variants
- [x] **Sheet** — Bottom sheet / side drawer
- [x] **Popover** — Popover overlay with placement
- [x] **Tooltip** — Tooltip (press-and-hold on mobile)
- [x] **DropdownMenu** — Dropdown/context menu

### Navigation
- [x] **Tabs / TabList / Tab / TabPanel** — Tabbed interface
- [x] **Accordion / AccordionItem / AccordionTrigger / AccordionContent** — Collapsible sections
- [x] **Pagination** — Page navigation
- [x] **SegmentedControl** — Segmented button group

### Data Entry
- [x] **Select** — Dropdown select (Modal + FlatList on mobile)
- [x] **Combobox** — Searchable select/autocomplete
- [x] **SwitchGroup** — Group of toggle switches
- [x] **CheckboxGroup** — Group of checkboxes
- [x] **ButtonGroup** — Button group with variants

### Data Display
- [x] **Table / TableHeader / TableBody / TableRow / TableHead / TableCell** — Data table (horizontal scroll on mobile)
- [x] **DataTable** — Advanced data table with sort/filter/pagination
- [x] **TreeView** — Hierarchical tree view

### Command & Search
- [x] **Command / CommandInput / CommandList / CommandGroup / CommandItem** — Command palette

### Toolbar
- [x] **Toolbar / ToolbarGroup / ToolbarSeparator** — Toolbar

### Specialized
- [x] **Banner** — Alert banner with variants
- [x] **ProgressSteps** — Step progress indicator
- [x] **ActivityFeed** — Activity timeline
- [x] **FileUploader** — File upload (stub with onPickFile callback)
- [x] **Timeline / TimelineItem** — Timeline display
- [x] **Calendar** — Date calendar
- [x] **DatePicker** — Date selection
- [x] **TimePicker** — Time selection
- [x] **DateRangePicker** — Date range selection
- [x] **LocalePicker** — Locale/language picker
- [x] **Carousel** — Image/content carousel (FlatList-based)
- [x] **SocialButton** — Social login buttons
- [x] **CopyButton** — Copy to clipboard
- [x] **PingMeter** — Network quality indicator

---

## Phase 5 — Hooks & Animation

### Hooks
- [x] **useLoading** — Loading state management
- [x] **useControllable** — Controlled/uncontrolled pattern
- [x] **useFocusVisible** — Focus visibility (simplified stub for native)
- [x] **useBreakpoint** — Responsive breakpoint detection (Dimensions API)
- [x] **usePlatform** — Platform detection (iOS/Android/web)
- [x] **useId** — Unique ID generation

### Animation
- [x] **usePressAnimation** — Press animation state (Animated.spring based)
- [x] **useSpring** — Spring animation (Animated.spring)
- [x] **useTransition** — Transition animation (Animated.timing)
- [x] **useAnimatedValue** — Animated value management (Animated.timing)
- [x] **Presence** — Mount/unmount animation wrapper (Animated.View)

---

## Storybook Stories (react-native-web)

### Phase 1 (DONE)
- [x] Text.stories.tsx
- [x] Badge.stories.tsx
- [x] Button.stories.tsx
- [x] Input.stories.tsx
- [x] Toggle.stories.tsx

### Phase 2
- [ ] Checkbox.stories.tsx
- [ ] Radio.stories.tsx
- [ ] Slider.stories.tsx
- [ ] TextArea.stories.tsx
- [ ] NumberInput.stories.tsx
- [ ] PinInput.stories.tsx
- [ ] TagInput.stories.tsx
- [ ] Stepper.stories.tsx
- [ ] Icon.stories.tsx
- [ ] Avatar.stories.tsx
- [ ] Chip.stories.tsx
- [ ] Tag.stories.tsx
- [ ] Spinner.stories.tsx
- [ ] Progress.stories.tsx
- [ ] CircularProgress.stories.tsx
- [ ] Skeleton.stories.tsx
- [ ] Alert.stories.tsx
- [ ] Toast.stories.tsx
- [ ] Rating.stories.tsx
- [ ] Indicator.stories.tsx
- [ ] Meter.stories.tsx
- [ ] ColorSwatch.stories.tsx

### Phase 3
- [ ] Stack.stories.tsx
- [ ] Box.stories.tsx
- [ ] Center.stories.tsx
- [ ] Card.stories.tsx
- [ ] Separator.stories.tsx
- [ ] ScrollArea.stories.tsx
- [ ] Grid.stories.tsx
- [ ] Collapse.stories.tsx
- [ ] FormField.stories.tsx
- [ ] ListItem.stories.tsx
- [ ] EmptyState.stories.tsx
- [ ] Spacer.stories.tsx

### Phase 4
- [ ] Dialog.stories.tsx
- [ ] Sheet.stories.tsx
- [ ] Tabs.stories.tsx
- [ ] Accordion.stories.tsx
- [ ] Select.stories.tsx
- [ ] SegmentedControl.stories.tsx
- [ ] Popover.stories.tsx
- [ ] Tooltip.stories.tsx
- [ ] DropdownMenu.stories.tsx
- [ ] ButtonGroup.stories.tsx
- [ ] Banner.stories.tsx
- [ ] ProgressSteps.stories.tsx
- [ ] Timeline.stories.tsx
- [ ] Calendar.stories.tsx

---

## Summary

| Phase | Category | Count | Status |
|-------|----------|-------|--------|
| 1 | Core Primitives | 5 | DONE |
| 2 | Remaining Primitives | 24 | **DONE** |
| 3 | Layouts | 19 | **DONE** |
| 4 | Compound Components | 33 | **DONE** |
| 5 | Hooks & Animation | 11 | **DONE** |
| — | **Total** | **92** | **92 / 92** |
