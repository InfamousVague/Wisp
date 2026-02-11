/**
 * @module components/message-input
 * @description React Native MessageInput for the Wisp design system.
 *
 * Rich chat input with send, attachment, emoji, voice buttons,
 * reply/edit context bars, attachment previews, and character counter.
 * Uses TextInput + onContentSizeChange for auto-expand.
 */

import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { View, TextInput, Text, Pressable, ScrollView } from 'react-native';
import type { ViewProps, ViewStyle, TextStyle } from 'react-native';
import type {
  MessageInputSize,
  MessageInputReplyContext,
  MessageInputEditContext,
  MessageInputAttachment,
} from '@wisp-ui/core/types/MessageInput.types';
import { messageInputSizeMap } from '@wisp-ui/core/types/MessageInput.types';
import { resolveMessageInputColors } from '@wisp-ui/core/styles/MessageInput.styles';
import { defaultSpacing, defaultRadii, defaultTypography } from '@wisp-ui/core/theme/create-theme';
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
  /** Called when emoji button is pressed (use for external picker). */
  onEmojiClick?: () => void;
  /** Called when an emoji is selected from the built-in picker. */
  onEmojiSelect?: (emoji: string) => void;
  /** Whether the input is disabled. @default false */
  disabled?: boolean;
  /** Whether the message is being sent. @default false */
  sending?: boolean;
  /** Auto-expand text input as user types. @default true */
  autoExpand?: boolean;
  /** Show loading skeleton. @default false */
  skeleton?: boolean;
  /** Reply context — shows reply preview bar above input. */
  replyingTo?: MessageInputReplyContext;
  /** Edit context — shows edit preview bar above input. */
  editing?: MessageInputEditContext;
  /** Show voice record button. @default false */
  showVoice?: boolean;
  /** Called when voice button is pressed. */
  onVoiceClick?: () => void;
  /** Maximum character count with counter display. */
  maxLength?: number;
  /** Queued attachments shown as preview cards above input. */
  attachments?: MessageInputAttachment[];
  /** Called when an attachment preview is removed. */
  onAttachmentRemove?: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
    onEmojiSelect: _onEmojiSelect,
    disabled = false,
    sending = false,
    autoExpand = true,
    skeleton = false,
    replyingTo,
    editing,
    showVoice = false,
    onVoiceClick,
    maxLength,
    attachments,
    onAttachmentRemove,
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

  const wrapperStyle = useMemo<ViewStyle>(() => ({
    width: '100%',
  }), []);

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

  const contextBarStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.sm,
    paddingHorizontal: sizeConfig.padding,
    paddingVertical: defaultSpacing.xs,
    borderLeftWidth: 2,
    borderLeftColor: replyingTo ? themeColors.accent.primary : themeColors.status.warning,
  }), [replyingTo, themeColors, sizeConfig]);

  const contextLabelStyle = useMemo<TextStyle>(() => ({
    fontSize: defaultTypography.sizes.xs.fontSize,
    fontWeight: '600',
    color: replyingTo ? themeColors.accent.primary : themeColors.status.warning,
  }), [replyingTo, themeColors]);

  const contextTextStyle = useMemo<TextStyle>(() => ({
    fontSize: defaultTypography.sizes.xs.fontSize,
    color: themeColors.text.secondary,
  }), [themeColors]);

  const attachmentCardStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: defaultSpacing.xs,
    paddingHorizontal: defaultSpacing.sm,
    paddingVertical: defaultSpacing.xs,
    borderRadius: defaultRadii.md,
    borderWidth: 1,
    borderColor: themeColors.border.subtle,
    backgroundColor: themeColors.background.surface,
    maxWidth: 180,
  }), [themeColors]);

  const overLimit = maxLength !== undefined && value.length > maxLength;

  const counterStyle = useMemo<TextStyle>(() => ({
    fontSize: defaultTypography.sizes['2xs'].fontSize,
    color: overLimit ? themeColors.status.danger : themeColors.text.muted,
    alignSelf: 'flex-end',
    paddingBottom: 2,
  }), [overLimit, themeColors]);

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

  const hasContextBar = Boolean(replyingTo || editing);
  const hasAttachments = attachments && attachments.length > 0;

  return (
    <View ref={ref} style={[wrapperStyle, userStyle as ViewStyle]} {...rest}>
      {/* Reply / Edit context bar */}
      {hasContextBar && (
        <View style={contextBarStyle}>
          <View style={{ flex: 1 }}>
            <Text style={contextLabelStyle}>
              {replyingTo ? `Replying to ${replyingTo.sender}` : 'Editing message'}
            </Text>
            <Text style={contextTextStyle} numberOfLines={1}>
              {replyingTo ? replyingTo.text : editing?.text}
            </Text>
          </View>
          <Pressable
            onPress={replyingTo ? replyingTo.onClear : editing?.onCancel}
            accessibilityLabel={replyingTo ? 'Cancel reply' : 'Cancel edit'}
          >
            <Text style={{ fontSize: 14, color: themeColors.text.muted }}>{'\u{2715}'}</Text>
          </Pressable>
        </View>
      )}

      {/* Attachment previews */}
      {hasAttachments && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: sizeConfig.padding, paddingVertical: defaultSpacing.sm }}
          contentContainerStyle={{ gap: defaultSpacing.sm }}
        >
          {attachments!.map((att) => (
            <View key={att.id} style={attachmentCardStyle}>
              <Text style={{ fontSize: 14 }}>{'\u{1F4C4}'}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: defaultTypography.sizes.xs.fontSize, color: themeColors.text.primary }} numberOfLines={1}>
                  {att.name}
                </Text>
                {att.size !== undefined && (
                  <Text style={{ fontSize: defaultTypography.sizes['2xs'].fontSize, color: themeColors.text.muted }}>
                    {formatFileSize(att.size)}
                  </Text>
                )}
              </View>
              {onAttachmentRemove && (
                <Pressable onPress={() => onAttachmentRemove(att.id)} accessibilityLabel={`Remove ${att.name}`}>
                  <Text style={{ fontSize: 10, color: themeColors.text.muted }}>{'\u{2715}'}</Text>
                </Pressable>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {/* Main input row */}
      <View style={containerStyle}>
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
          maxLength={maxLength}
        />

        {/* Character counter */}
        {maxLength !== undefined && (
          <Text style={counterStyle}>
            {value.length}/{maxLength}
          </Text>
        )}

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

        {/* Voice button */}
        {showVoice && (
          <Pressable
            onPress={onVoiceClick}
            disabled={disabled}
            accessibilityLabel="Voice message"
            style={iconBtnStyle}
          >
            <Text style={iconTextStyle}>{'\u{1F3A4}'}</Text>
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
    </View>
  );
});

MessageInput.displayName = 'MessageInput';
