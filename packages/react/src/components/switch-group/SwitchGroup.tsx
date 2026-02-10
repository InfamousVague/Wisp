import React, { forwardRef, useMemo, useCallback, useState } from 'react';
import type { SwitchGroupProps, CheckboxGroupProps } from '@wisp-ui/core/types/SwitchGroup.types';
import type { CSSStyleObject } from '@wisp-ui/core/types';
import {
  buildGroupStyle,
  buildGroupLabelStyle,
  buildGroupDescriptionStyle,
  buildOptionsStyle,
  buildOptionStyle,
  buildOptionLabelStyle,
  buildOptionDescriptionStyle,
  buildErrorStyle,
} from '@wisp-ui/core/styles/SwitchGroup.styles';
import { useThemeColors } from '../../providers';
import { Toggle } from '../../primitives/toggle';
import { Checkbox } from '../../primitives/checkbox';
import { defaultSpacing } from '@wisp-ui/core/theme/create-theme';

// ---------------------------------------------------------------------------
// SwitchGroup
// ---------------------------------------------------------------------------

/**
 * SwitchGroup — A group of Toggle switches for the Wisp design system.
 *
 * @remarks
 * Key features:
 * - Controlled and uncontrolled modes via {@link SwitchGroupProps.value} / {@link SwitchGroupProps.defaultValue}
 * - Renders {@link Toggle} components for each option in {@link SwitchGroupProps.options}
 * - Per-option labels, descriptions, and disabled states
 * - Vertical or horizontal layout via {@link SwitchGroupProps.orientation}
 * - Optional group-level label, description, and error message
 *
 * @module primitives/switch-group
 * @example
 * ```tsx
 * <SwitchGroup
 *   label="Notifications"
 *   options={[
 *     { value: 'email', label: 'Email' },
 *     { value: 'push', label: 'Push' },
 *     { value: 'sms', label: 'SMS' },
 *   ]}
 *   defaultValue={['email']}
 *   onChange={(vals) => console.log(vals)}
 * />
 * ```
 */
export const SwitchGroup = forwardRef<HTMLDivElement, SwitchGroupProps>(function SwitchGroup(
  {
    label,
    description,
    options,
    value: controlledValue,
    defaultValue = [],
    onChange,
    orientation = 'vertical',
    disabled = false,
    error,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();

  // ---------------------------------------------------------------------------
  // Controlled / uncontrolled state
  // ---------------------------------------------------------------------------
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;

  // ---------------------------------------------------------------------------
  // Toggle handler
  // ---------------------------------------------------------------------------
  const handleToggle = useCallback(
    (optionValue: string, checked: boolean) => {
      const next = checked
        ? [...selected, optionValue]
        : selected.filter((v) => v !== optionValue);

      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [selected, isControlled, onChange],
  );

  // ---------------------------------------------------------------------------
  // Memoised styles
  // ---------------------------------------------------------------------------
  const groupStyle = useMemo(
    () => buildGroupStyle(orientation, themeColors, userStyle as CSSStyleObject),
    [orientation, themeColors, userStyle],
  );

  const labelStyle = useMemo(
    () => buildGroupLabelStyle(themeColors),
    [themeColors],
  );

  const descriptionStyle = useMemo(
    () => buildGroupDescriptionStyle(themeColors),
    [themeColors],
  );

  const optionsStyle = useMemo(
    () => buildOptionsStyle(orientation),
    [orientation],
  );

  const optionItemStyle = useMemo(
    () => buildOptionStyle(themeColors),
    [themeColors],
  );

  const errorStyle = useMemo(
    () => buildErrorStyle(themeColors),
    [themeColors],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={className}
      style={groupStyle}
      {...rest}
    >
      {/* Group header */}
      {(label || description) && (
        <div>
          {label && <p style={labelStyle}>{label}</p>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
      )}

      {/* Options */}
      <div style={optionsStyle}>
        {options.map((option) => {
          const isOptionDisabled = disabled || option.disabled;
          const isChecked = selected.includes(option.value);

          return (
            <div key={option.value} style={optionItemStyle}>
              <Toggle
                checked={isChecked}
                onChange={(checked) => handleToggle(option.value, checked)}
                disabled={isOptionDisabled}
                size="sm"
                label={option.label}
              />
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: defaultSpacing['2xs'], minWidth: 0, cursor: isOptionDisabled ? 'not-allowed' : 'pointer' }}
                onClick={() => {
                  if (!isOptionDisabled) {
                    handleToggle(option.value, !isChecked);
                  }
                }}
              >
                <span style={buildOptionLabelStyle(isOptionDisabled ?? false, themeColors)}>
                  {option.label}
                </span>
                {option.description && (
                  <span style={buildOptionDescriptionStyle(themeColors)}>
                    {option.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Error */}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
});

SwitchGroup.displayName = 'SwitchGroup';

// ---------------------------------------------------------------------------
// CheckboxGroup
// ---------------------------------------------------------------------------

/**
 * CheckboxGroup — A group of Checkbox controls for the Wisp design system.
 *
 * @remarks
 * Shares the same API surface as {@link SwitchGroup} but renders
 * {@link Checkbox} components instead of Toggle switches. Manages an array of
 * selected values with controlled and uncontrolled support.
 *
 * Key features:
 * - Controlled and uncontrolled modes via {@link CheckboxGroupProps.value} / {@link CheckboxGroupProps.defaultValue}
 * - Vertical or horizontal layout via {@link CheckboxGroupProps.orientation}
 * - Per-option labels, descriptions, and disabled states
 * - Optional group-level label, description, and error message
 *
 * @module primitives/switch-group
 * @example
 * ```tsx
 * <CheckboxGroup
 *   label="Interests"
 *   options={[
 *     { value: 'design', label: 'Design' },
 *     { value: 'engineering', label: 'Engineering' },
 *     { value: 'marketing', label: 'Marketing' },
 *   ]}
 *   defaultValue={['design']}
 *   onChange={(vals) => console.log(vals)}
 * />
 * ```
 */
export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  {
    label,
    description,
    options,
    value: controlledValue,
    defaultValue = [],
    onChange,
    orientation = 'vertical',
    disabled = false,
    error,
    style: userStyle,
    className,
    ...rest
  },
  ref,
) {
  const themeColors = useThemeColors();

  // ---------------------------------------------------------------------------
  // Controlled / uncontrolled state
  // ---------------------------------------------------------------------------
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selected = isControlled ? controlledValue : internalValue;

  // ---------------------------------------------------------------------------
  // Toggle handler
  // ---------------------------------------------------------------------------
  const handleToggle = useCallback(
    (optionValue: string, checked: boolean) => {
      const next = checked
        ? [...selected, optionValue]
        : selected.filter((v) => v !== optionValue);

      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [selected, isControlled, onChange],
  );

  // ---------------------------------------------------------------------------
  // Memoised styles
  // ---------------------------------------------------------------------------
  const groupStyle = useMemo(
    () => buildGroupStyle(orientation, themeColors, userStyle as CSSStyleObject),
    [orientation, themeColors, userStyle],
  );

  const labelStyle = useMemo(
    () => buildGroupLabelStyle(themeColors),
    [themeColors],
  );

  const descriptionStyle = useMemo(
    () => buildGroupDescriptionStyle(themeColors),
    [themeColors],
  );

  const optionsStyle = useMemo(
    () => buildOptionsStyle(orientation),
    [orientation],
  );

  const errorStyle = useMemo(
    () => buildErrorStyle(themeColors),
    [themeColors],
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={className}
      style={groupStyle}
      {...rest}
    >
      {/* Group header */}
      {(label || description) && (
        <div>
          {label && <p style={labelStyle}>{label}</p>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>
      )}

      {/* Options */}
      <div style={optionsStyle}>
        {options.map((option) => {
          const isOptionDisabled = disabled || option.disabled;
          const isChecked = selected.includes(option.value);

          return (
            <Checkbox
              key={option.value}
              checked={isChecked}
              onChange={(checked) => handleToggle(option.value, checked)}
              disabled={isOptionDisabled}
              size="md"
              label={option.label}
              description={option.description}
            />
          );
        })}
      </div>

      {/* Error */}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';
