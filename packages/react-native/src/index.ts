/**
 * @wisp-ui/react-native
 *
 * React Native adapter for the Wisp design system.
 * Provides primitives, layout components, and the WispProvider for theme management.
 */

// ---------------------------------------------------------------------------
// Providers & Hooks
// ---------------------------------------------------------------------------
export { WispProvider } from './providers';
export type { WispProviderProps, WispThemeContextValue } from './providers';
export { WispThemeContext } from './providers';
export { useTheme, useThemeColors } from './providers';
export type { UseThemeReturn } from './providers';

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------
export {
  Text, Badge, Button, Input, Toggle,
  Spinner, Progress, Checkbox, Radio, RadioGroup,
  Slider, TextArea, NumberInput, PinInput, Stepper,
  Toast, ColorSwatch, Meter, Kbd, Icon,
  Avatar, Chip, Tag, Indicator,
  Alert, Skeleton, Rating, CircularProgress,
  TagInput, ColorPicker,
  NotificationBadge, ReadReceipt, WispImage, Beacon,
} from './primitives';
export type {
  TextProps, BadgeProps, ButtonProps, InputProps, ToggleProps,
  SpinnerProps, ProgressProps, CheckboxProps, RadioProps, RadioGroupProps,
  SliderProps, TextAreaProps, NumberInputProps, PinInputProps, StepperProps,
  ToastProps, ColorSwatchProps, MeterProps, KbdProps, IconProps,
  AvatarProps, ChipProps, TagProps, IndicatorProps,
  AlertProps, SkeletonProps, RatingProps, CircularProgressProps,
  TagInputProps, ColorPickerProps,
  NotificationBadgeProps, ReadReceiptProps, WispImageProps, BeaconProps,
} from './primitives';

// ---------------------------------------------------------------------------
// Layouts
// ---------------------------------------------------------------------------
export {
  Stack, HStack, VStack, Box, Card, Center, Separator, Spacer, Container, ScrollArea,
  AspectRatio, Grid, GridItem, FormField,
  Breadcrumb, BreadcrumbItem, BreadcrumbSeparator,
  ListItem, EmptyState,
  Sidebar, SidebarSection, SidebarItem,
  Collapse, Overlay, Sticky,
  Floating,
} from './layouts';
export type {
  StackProps,
  StackDirection,
  StackGap,
  StackAlign,
  StackJustify,
  BoxProps,
  SpacingToken,
  RadiusToken,
  CardProps,
  CardVariant,
  CardPadding,
  CardRadius,
  CenterProps,
  SeparatorProps,
  SeparatorOrientation,
  SeparatorVariant,
  SeparatorSpacing,
  SpacerProps,
  SpacerSize,
  ContainerProps,
  ContainerSize,
  ScrollAreaProps,
  ScrollAreaDirection,
  AspectRatioProps,
  GridProps,
  GridItemProps,
  FormFieldProps,
  FormFieldOrientation,
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
  ListItemProps,
  EmptyStateProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
  CollapseProps,
  OverlayProps,
  StickyProps,
  FloatingProps,
} from './layouts';

// ---------------------------------------------------------------------------
// Components (Compound)
// ---------------------------------------------------------------------------
export {
  // Wave 1: Simple Layouts
  Banner, ButtonGroup, Toolbar, ToolbarGroup, ToolbarSeparator,
  SwitchGroup, CheckboxGroup,
  // Wave 2: Navigation & Display
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Tabs, TabList, Tab, TabPanel,
  SegmentedControl, Pagination, Timeline, ActivityFeed,
  ProgressSteps, TreeView,
  // Wave 3: Overlays & Modals
  Dialog, Sheet, Popover, PopoverTrigger, PopoverContent,
  Tooltip, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  // Wave 4: Data Entry
  Select, Combobox, LocalePicker, DEFAULT_LOCALE_OPTIONS,
  // Wave 5: Tables
  Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell,
  DataTable,
  // Wave 6: Date/Time & Carousel
  Calendar, DatePicker, TimePicker, DateRangePicker, Carousel,
  // Wave 7: Utilities
  SocialButton, CopyButton, PingMeter,
  Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandSeparator, CommandEmpty,
  FileUploader,
  // Wave 8: Chat
  ChatBubble, StatusIcon, MessageGroup, NewMessageDivider, TypingIndicator,
  // Wave 9: Charts
  ActivityCircles, RadarChart,
  // Wave 10: QR
  QRCode,
  // Wave 11: Parity catch-up
  AvatarGroup,
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  SearchInput, MessageInput, VoiceRecorder, StatCard, EmojiPicker,
  Sparkline, AudioWaveform, CodeBlock,
  AchievementCard, QuestTracker, AchievementUnlock,
  ToastProvider, useToast,
  ThemeEditor, ThemeEditorField,
} from './components';
export type {
  // Wave 1
  BannerProps, ButtonGroupProps,
  ToolbarProps, ToolbarGroupProps, ToolbarSeparatorProps,
  SwitchGroupProps, CheckboxGroupProps,
  // Wave 2
  AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps,
  TabsProps, TabListProps, TabProps, TabPanelProps,
  SegmentedControlProps, PaginationProps,
  TimelineProps, TimelineItem,
  ActivityFeedProps, ActivityFeedItem,
  ProgressStepsProps, ProgressStep,
  TreeViewProps, TreeNode,
  // Wave 3
  DialogProps, SheetProps,
  PopoverProps, PopoverTriggerProps, PopoverContentProps,
  TooltipProps,
  DropdownMenuProps, DropdownMenuTriggerProps, DropdownMenuContentProps,
  DropdownMenuItemProps, DropdownMenuSeparatorProps,
  // Wave 4
  SelectProps, SelectOption,
  ComboboxProps, LocalePickerProps, LocaleOption,
  // Wave 5
  TableProps, TableHeaderProps, TableBodyProps, TableFooterProps,
  TableRowProps, TableHeadProps, TableCellProps,
  DataTableProps, DataTableColumn, SortState,
  // Wave 6
  CalendarProps, DatePickerProps, TimePickerProps,
  DateRangePickerProps, DateRange, CarouselProps,
  // Wave 7
  SocialButtonProps, CopyButtonProps, PingMeterProps,
  CommandProps, CommandInputProps, CommandListProps, CommandGroupProps,
  CommandItemProps, CommandSeparatorProps, CommandEmptyProps,
  FileUploaderProps,
  // Wave 8: Chat
  ChatBubbleProps, MessageGroupProps, NewMessageDividerProps, TypingIndicatorProps,
  // Wave 9: Charts
  ActivityCirclesProps, RadarChartProps,
  // Wave 10: QR
  QRCodeProps,
  // Wave 11: Parity catch-up
  AvatarGroupProps,
  NavbarProps, NavbarBrandProps, NavbarContentProps, NavbarItemProps,
  SearchInputProps, MessageInputProps, VoiceRecorderProps, StatCardProps, EmojiPickerProps,
  SparklineProps, AudioWaveformProps, CodeBlockProps,
  AchievementCardProps, QuestTrackerProps, AchievementUnlockProps,
  ToastProviderProps,
} from './components';

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------
export { LoadingContext } from './contexts/LoadingContext';

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------
export {
  useLoading, useControllable, useFocusVisible,
  useBreakpoint, breakpoints, usePlatform, useId,
} from './hooks';
export type {
  UseControllableConfig, UseFocusVisibleReturn,
  Breakpoint, PlatformType, UsePlatformReturn,
} from './hooks';

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------
export {
  Presence, useAnimatedValue, usePressAnimation,
  useSpring, useTransition,
} from './animation';
export type {
  PresenceProps, PresenceAnimation,
  AnimatedValueConfig, AnimatedValueResult,
  PressAnimationConfig, PressAnimationResult,
  SpringResult, TransitionPhase, TransitionConfig, TransitionResult,
} from './animation';

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
export { stripWebProps, toRNShadow } from './utils';
