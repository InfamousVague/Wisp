import React, { forwardRef, useMemo } from 'react';
import type { EmptyStateProps } from '@wisp-ui/core/types/EmptyState.types';
import { emptyStateSizeMap } from '@wisp-ui/core/types/EmptyState.types';
import {
  buildContainerStyle,
  buildIconStyle,
  buildTitleStyle,
  buildDescriptionStyle,
  buildActionStyle,
} from '@wisp-ui/core/styles/EmptyState.styles';
import { useTheme } from '../../providers';

/**
 * EmptyState -- Placeholder for empty content areas.
 *
 * @remarks
 * Displays a centered composition of icon, title, description, and
 * optional action button. Intended for empty lists, zero-result searches,
 * and initial states. Sizes are controlled via the
 * {@link EmptyStateProps.size | size} prop which maps to
 * {@link emptyStateSizeMap} for icon, title, and description dimensions.
 *
 * Key features:
 * - Centered flex-column layout with configurable minimum height
 * - Optional leading icon with muted theme color
 * - Required title and optional description text
 * - Optional trailing action slot (e.g. a {@link Button})
 * - Three size presets: `sm`, `md`, `lg`
 *
 * @module primitives/empty-state
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<Icon icon={Inbox} size="xl" />}
 *   title="No messages"
 *   description="Your inbox is empty. New messages will appear here."
 *   action={<Button size="sm">Compose</Button>}
 * />
 * ```
 *
 * @example Compact variant
 * ```tsx
 * <EmptyState size="sm" title="No results" description="Try a different query." />
 * ```
 */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    icon,
    title,
    description,
    action,
    size = 'md',
    style: userStyle,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;
  const sizeConfig = emptyStateSizeMap[size];

  const containerStyle = useMemo(
    () => ({ ...buildContainerStyle(sizeConfig, theme), ...userStyle }),
    [sizeConfig, userStyle],
  );

  const iconStyle = useMemo(
    () => buildIconStyle(sizeConfig, theme),
    [sizeConfig, themeColors],
  );

  const titleStyle = useMemo(
    () => buildTitleStyle(sizeConfig, theme),
    [sizeConfig, themeColors],
  );

  const descriptionStyle = useMemo(
    () => buildDescriptionStyle(sizeConfig, theme),
    [sizeConfig, themeColors],
  );

  const actionWrapperStyle = useMemo(() => buildActionStyle(theme), []);

  return (
    <div ref={ref} style={containerStyle} {...rest}>
      {icon && <div style={iconStyle}>{icon}</div>}
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={descriptionStyle}>{description}</p>}
      {action && <div style={actionWrapperStyle}>{action}</div>}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
