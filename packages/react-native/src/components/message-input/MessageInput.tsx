/**
 * @module components/message-input
 * @description React Native MessageInput for the Wisp design system.
 *
 * Rich chat input with send, attachment, and emoji buttons.
 * Uses TextInput + onContentSizeChange for auto-expand.
 */

import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type { MessageInputSize } from '@wisp-ui/core/types/MessageInput.types';
import { messageInputSizeMap } from '@wisp-ui/core/types/MessageInput.types';
import { resolveMessageInputColors } from '@wisp-ui/core/styles/MessageInput.styles';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface MessageInputProps extends ViewProps {
  /** Current input value (controlled). */
  value?: string;
  /** Default input value (uncontrolled). */
  defaultValue?: string;
  /** Placeholder text. @default 'Type a message...' */
  placeholder?: string;
  /** Size preset. @default 'md' */
  size?: MessageInputSize;
  /** Called when the value changes. */
  onValueChange?: (value: string) => void;
  /** Called when the user submits the message. */
  onSubmit?: (value: string) => void;
  /** Show attachment button. @default true */
  showAttachment?: boolean;
  /** Called when attachment button is pressed. */
  onAttachmentClick?: () => void;
  /** Show emoji trigger button. @default true */
  showEmoji?: boolean;
  /** Called when emoji button is pressed. */
  onEmojiClick?: () => void;
  /** Whether the input is disabled. @default false */
  disabled?: boolean;
  /** Whether the message is being sent. @default false */
  sending?: boolean;
  /** Auto-expand text input as user types. @default true */
  autoExpand?: boolean;
  /** Show loading skeleton. @default false */
  skeleton?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const MessageInput = forwardRef<View, MessageInputProps>(function MessageInput(
  {
    value: controlledValue,
    defaultValue = '',
    placeholder = 'Type a message...',
    size = 'md',
    onValueChange,
    onSubmit,
    showAttachment = true,
    onAttachmentClick,
    showEmoji = true,
    onEmojiClick,
    disabled = false,
    sending = false,
    autoExpand = true,
    skeleton = false,
    style: userStyle,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;
  const sizeConfig = messageInputSizeMap[size];

  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [inputHeight, setInputHeight] = useState(sizeConfig.minHeight - sizeConfig.padding);

  const colors = useMemo(
    () => resolveMessageInputColors(theme),
    [themeColors],
  );

  if (skeleton) {
    const skeletonStyle: ViewStyle = {
      width: '100%',
      height: sizeConfig.minHeight + sizeConfig.padding,
      borderRadius: sizeConfig.borderRadius,
      backgroundColor: themeColors.border.subtle,
    };
    return <View style={[skeletonStyle, userStyle as ViewStyle]} />;
  }

  const containerStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: sizeConfig.gap,
    paddingHorizontal: sizeConfig.padding,
    paddingVertical: sizeConfig.padding / 2,
    borderRadius: sizeConfig.borderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    width: '100%',
  }), [sizeConfig, colors]);

  const inputStyle = useMemo<TextStyle>(() => ({
    flex: 1,
    minHeight: sizeConfig.minHeight - sizeConfig.padding,
    maxHeight: sizeConfig.maxHeight,
    fontSize: sizeConfig.fontSize,
    color: colors.text,
    padding: 0,
    paddingVertical: sizeConfig.padding / 2,
    lineHeight: sizeConfig.fontSize * 1.4,
    ...(autoExpand ? { height: Math.min(inputHeight, sizeConfig.maxHeight) } : {}),
  }), [sizeConfig, colors, autoExpand, inputHeight]);

  const iconBtnStyle = useMemo<ViewStyle>(() => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconButtonSize,
    height: sizeConfig.iconButtonSize,
    borderRadius: sizeConfig.iconButtonSize / 2,
  }), [sizeConfig]);

  const iconTextStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.iconSize,
    color: colors.icon,
  }), [sizeConfig, colors]);

  const hasContent = value.trim().length > 0;

  const sendBtnStyle = useMemo<ViewStyle>(() => ({
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeConfig.iconButtonSize,
    height: sizeConfig.iconButtonSize,
    borderRadius: sizeConfig.iconButtonSize / 2,
    backgroundColor: hasContent && !sending ? colors.sendBg : colors.sendBgDisabled,
    opacity: hasContent && !sending ? 1 : 0.5,
  }), [sizeConfig, colors, hasContent, sending]);

  const sendIconStyle = useMemo<TextStyle>(() => ({
    fontSize: sizeConfig.iconSize * 0.8,
    color: colors.sendIcon,
  }), [sizeConfig, colors]);

  const handleChangeText = useCallback(
    (text: string) => {
      if (controlledValue === undefined) setInternalValue(text);
      onValueChange?.(text);
    },
    [controlledValue, onValueChange],
  );

  const handleSubmit = useCallback(() => {
    if (!hasContent || sending || disabled) return;
    onSubmit?.(value);
    if (controlledValue === undefined) setInternalValue('');
  }, [hasContent, sending, disabled, value, onSubmit, controlledValue]);

  const handleContentSizeChange = useCallback(
    (e: { nativeEvent: { contentSize: { height: number } } }) => {
      if (autoExpand) {
        setInputHeight(e.nativeEvent.contentSize.height);
      }
    },
    [autoExpand],
  );

  return (
    <View ref={ref} style={[containerStyle, userStyle as ViewStyle]} {...rest}>
      {showAttachment && (
        <Pressable
          onPress={onAttachmentClick}
          disabled={disabled}
          accessibilityLabel="Attach file"
          style={iconBtnStyle}
        >
          <Text style={iconTextStyle}>{'\u{1F4CE}'}</Text>
        </Pressable>
      )}

      <TextInput
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        editable={!disabled && !sending}
        multiline
        onContentSizeChange={handleContentSizeChange}
        style={inputStyle}
        accessibilityLabel="Message"
      />

      {showEmoji && (
        <Pressable
          onPress={onEmojiClick}
          disabled={disabled}
          accessibilityLabel="Add emoji"
          style={iconBtnStyle}
        >
          <Text style={iconTextStyle}>{'\u{1F60A}'}</Text>
        </Pressable>
      )}

      <Pressable
        onPress={handleSubmit}
        disabled={!hasContent || sending || disabled}
        accessibilityLabel="Send message"
        style={sendBtnStyle}
      >
        <Text style={sendIconStyle}>{'\u{27A4}'}</Text>
      </Pressable>
    </View>
  );
});

MessageInput.displayName = 'MessageInput';
