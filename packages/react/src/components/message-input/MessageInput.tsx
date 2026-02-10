/**
 * @module MessageInput
 * @description Rich chat input with auto-expanding textarea, send button,
 * attachment trigger, and emoji trigger.
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTheme } from '../../providers';
import type { MessageInputProps } from '@wisp-ui/core/types/MessageInput.types';
import { messageInputSizeMap } from '@wisp-ui/core/types/MessageInput.types';
import {
  resolveMessageInputColors,
  buildMessageInputContainerStyle,
  buildMessageInputTextareaStyle,
  buildMessageInputIconButtonStyle,
  buildMessageInputSendButtonStyle,
  buildMessageInputSkeletonStyle,
} from '@wisp-ui/core/styles/MessageInput.styles';

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function PaperclipIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SmileIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

function SendIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const MessageInput = forwardRef<HTMLDivElement, MessageInputProps>(function MessageInput(
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
    className,
    ...rest
  },
  ref,
) {
  const { theme } = useTheme();
  const themeColors = theme.colors;
  const sizeConfig = messageInputSizeMap[size];
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const colors = useMemo(
    () => resolveMessageInputColors(theme),
    [theme],
  );

  if (skeleton) {
    const skeletonStyle = buildMessageInputSkeletonStyle(sizeConfig, theme);
    return <div aria-hidden className={className} style={{ ...skeletonStyle, ...userStyle }} />;
  }

  const containerStyle = useMemo(
    () => buildMessageInputContainerStyle(sizeConfig, colors, theme),
    [sizeConfig, colors, theme],
  );

  const textareaStyle = useMemo(
    () => buildMessageInputTextareaStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const iconBtnStyle = useMemo(
    () => buildMessageInputIconButtonStyle(sizeConfig, colors),
    [sizeConfig, colors],
  );

  const hasContent = value.trim().length > 0;

  const sendBtnStyle = useMemo(
    () => buildMessageInputSendButtonStyle(sizeConfig, colors, hasContent && !sending),
    [sizeConfig, colors, hasContent, sending],
  );

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta || !autoExpand) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, sizeConfig.maxHeight)}px`;
  }, [value, autoExpand, sizeConfig.maxHeight]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      if (controlledValue === undefined) setInternalValue(v);
      onValueChange?.(v);
    },
    [controlledValue, onValueChange],
  );

  const handleSubmit = useCallback(() => {
    if (!hasContent || sending || disabled) return;
    onSubmit?.(value);
    if (controlledValue === undefined) setInternalValue('');
  }, [hasContent, sending, disabled, value, onSubmit, controlledValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...containerStyle, ...userStyle }}
      {...rest}
    >
      {showAttachment && (
        <button
          type="button"
          style={iconBtnStyle}
          onClick={onAttachmentClick}
          aria-label="Attach file"
          disabled={disabled}
        >
          <PaperclipIcon size={sizeConfig.iconSize} />
        </button>
      )}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || sending}
        rows={1}
        style={textareaStyle}
        aria-label="Message"
      />

      {showEmoji && (
        <button
          type="button"
          style={iconBtnStyle}
          onClick={onEmojiClick}
          aria-label="Add emoji"
          disabled={disabled}
        >
          <SmileIcon size={sizeConfig.iconSize} />
        </button>
      )}

      <button
        type="button"
        style={sendBtnStyle}
        onClick={handleSubmit}
        aria-label="Send message"
        disabled={!hasContent || sending || disabled}
      >
        <SendIcon size={sizeConfig.iconSize * 0.8} />
      </button>
    </div>
  );
});

MessageInput.displayName = 'MessageInput';
