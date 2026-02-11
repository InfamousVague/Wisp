/**
 * @module ThreadPanel
 * @description Side panel for threaded message replies.
 */
import React, { forwardRef, useMemo, useCallback, useState, useRef } from 'react';
import type { ThreadPanelProps, ThreadMessage } from '@wisp-ui/core/types/ThreadPanel.types';
import {
  resolveThreadPanelColors,
  buildThreadPanelContainerStyle,
  buildThreadPanelHeaderStyle,
  buildThreadPanelTitleStyle,
  buildThreadPanelCloseStyle,
  buildThreadPanelBodyStyle,
  buildThreadMessageStyle,
  buildThreadMessageContentStyle,
  buildThreadMessageSenderStyle,
  buildThreadMessageNameStyle,
  buildThreadMessageTimestampStyle,
  buildThreadMessageTextStyle,
  buildThreadDividerStyle,
  buildThreadDividerLineStyle,
  buildThreadInputAreaStyle,
  buildThreadLoadingStyle,
} from '@wisp-ui/core/styles/ThreadPanel.styles';
import { useTheme } from '../../providers';

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function CloseIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon({ size = 16, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Default Avatar
// ---------------------------------------------------------------------------

function DefaultAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 600,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// ThreadPanel
// ---------------------------------------------------------------------------

export const ThreadPanel = forwardRef<HTMLDivElement, ThreadPanelProps>(
  function ThreadPanel(
    {
      parentMessage,
      replies,
      replyCount,
      onClose,
      onReply,
      title = 'Thread',
      sending = false,
      placeholder = 'Reply...',
      loading = false,
      renderMessage,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const { theme } = useTheme();
    const [replyText, setReplyText] = useState('');
    const bodyRef = useRef<HTMLDivElement>(null);

    const colors = useMemo(
      () => resolveThreadPanelColors(theme),
      [theme],
    );

    const containerStyle = useMemo(
      () => buildThreadPanelContainerStyle(colors, theme),
      [colors, theme],
    );

    const headerStyle = useMemo(
      () => buildThreadPanelHeaderStyle(colors, theme),
      [colors, theme],
    );

    const titleStyle = useMemo(
      () => buildThreadPanelTitleStyle(colors, theme),
      [colors, theme],
    );

    const closeStyle = useMemo(
      () => buildThreadPanelCloseStyle(colors, theme),
      [colors, theme],
    );

    const bodyStyle = useMemo(
      () => buildThreadPanelBodyStyle(),
      [],
    );

    const messageStyle = useMemo(
      () => buildThreadMessageStyle(colors, theme),
      [colors, theme],
    );

    const contentAreaStyle = useMemo(
      () => buildThreadMessageContentStyle(),
      [],
    );

    const senderRowStyle = useMemo(
      () => buildThreadMessageSenderStyle(colors, theme),
      [colors, theme],
    );

    const nameStyle = useMemo(
      () => buildThreadMessageNameStyle(colors, theme),
      [colors, theme],
    );

    const tsStyle = useMemo(
      () => buildThreadMessageTimestampStyle(colors, theme),
      [colors, theme],
    );

    const textStyle = useMemo(
      () => buildThreadMessageTextStyle(colors, theme),
      [colors, theme],
    );

    const dividerStyle = useMemo(
      () => buildThreadDividerStyle(colors, theme),
      [colors, theme],
    );

    const dividerLineStyle = useMemo(
      () => buildThreadDividerLineStyle(colors),
      [colors],
    );

    const inputAreaStyle = useMemo(
      () => buildThreadInputAreaStyle(colors, theme),
      [colors, theme],
    );

    const loadingStyle = useMemo(
      () => buildThreadLoadingStyle(colors, theme),
      [colors, theme],
    );

    const displayCount = replyCount ?? replies.length;

    const handleSubmit = useCallback(() => {
      const trimmed = replyText.trim();
      if (trimmed && onReply) {
        onReply(trimmed);
        setReplyText('');
      }
    }, [replyText, onReply]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSubmit();
        }
      },
      [handleSubmit],
    );

    const renderThreadMessage = useCallback(
      (msg: ThreadMessage) => {
        if (renderMessage) return renderMessage(msg);
        return (
          <div style={messageStyle}>
            <div style={{ flexShrink: 0 }}>
              {msg.avatar || <DefaultAvatar name={msg.sender} />}
            </div>
            <div style={contentAreaStyle}>
              <div style={senderRowStyle}>
                <span style={nameStyle}>{msg.sender}</span>
                <span style={tsStyle}>{msg.timestamp}</span>
              </div>
              <p style={textStyle}>{msg.content}</p>
            </div>
          </div>
        );
      },
      [messageStyle, contentAreaStyle, senderRowStyle, nameStyle, tsStyle, textStyle, renderMessage],
    );

    return (
      <div
        ref={ref}
        role="complementary"
        aria-label={title}
        className={className}
        style={{ ...containerStyle, ...userStyle }}
        {...rest}
      >
        {/* Header */}
        <div style={headerStyle}>
          <span style={titleStyle}>{title}</span>
          {onClose && (
            <button
              type="button"
              aria-label="Close thread"
              style={closeStyle}
              onClick={onClose}
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>

        {/* Body */}
        <div ref={bodyRef} style={bodyStyle}>
          {/* Parent message */}
          {renderThreadMessage(parentMessage)}

          {/* Divider */}
          <div style={dividerStyle}>
            <div style={dividerLineStyle} />
            <span>{displayCount} {displayCount === 1 ? 'reply' : 'replies'}</span>
            <div style={dividerLineStyle} />
          </div>

          {/* Loading */}
          {loading && (
            <div style={loadingStyle}>Loading replies…</div>
          )}

          {/* Replies */}
          {!loading && replies.map((reply) => (
            <div key={reply.id}>
              {renderThreadMessage(reply)}
            </div>
          ))}
        </div>

        {/* Input */}
        {onReply && (
          <div style={inputAreaStyle}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              border: `1px solid ${colors.border}`,
              borderRadius: theme.radii.md,
              padding: '8px 12px',
              backgroundColor: colors.bg,
            }}>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={sending}
                rows={1}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: colors.messageText,
                  fontFamily: 'inherit',
                  fontSize: theme.typography.sizes.sm.fontSize,
                  lineHeight: `${theme.typography.sizes.sm.lineHeight}px`,
                  resize: 'none',
                  padding: 0,
                  margin: 0,
                }}
              />
              <button
                type="button"
                aria-label="Send reply"
                disabled={sending || !replyText.trim()}
                onClick={handleSubmit}
                style={{
                  ...closeStyle,
                  opacity: replyText.trim() ? 1 : 0.4,
                  color: replyText.trim() ? colors.headerText : colors.messageTextMuted,
                }}
              >
                <SendIcon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

ThreadPanel.displayName = 'ThreadPanel';
