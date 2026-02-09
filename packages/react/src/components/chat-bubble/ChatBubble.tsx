/**
 * @module ChatBubble
 */
import React, { forwardRef, useMemo, useCallback } from 'react';
import type {
  ChatBubbleProps,
  ChatBubbleStatus,
  ChatBubbleReaction,
} from '@wisp-ui/core/types/ChatBubble.types';
import {
  resolveChatBubbleColors,
  buildChatBubbleStyle,
  buildFooterStyle,
  buildTimestampStyle,
  buildStatusStyle,
  buildReactionsContainerStyle,
  buildReactionChipStyle,
} from '@wisp-ui/core/styles/ChatBubble.styles';
import { useThemeColors } from '../../providers';

// ---------------------------------------------------------------------------
// Inline SVG status icons
// ---------------------------------------------------------------------------

function CheckIcon({ size = 12, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CheckCheckIcon({ size = 12, color }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? 'currentColor'} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-9.5 9.5L10 17" />
    </svg>
  );
}

/** @internal Status icon used by ChatBubble and MessageGroup. */
export function StatusIcon({ status, color, readColor }: { status: ChatBubbleStatus; color: string; readColor: string }) {
  switch (status) {
    case 'sent':
      return <CheckIcon color={color} />;
    case 'delivered':
      return <CheckCheckIcon color={color} />;
    case 'read':
      return <CheckCheckIcon color={readColor} />;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// ChatBubble
// ---------------------------------------------------------------------------

/**
 * ChatBubble — A styled message bubble for chat interfaces.
 *
 * @remarks
 * Key features:
 * - iMessage / WhatsApp style with one sharp corner indicating direction.
 * - `incoming` messages have a sharp bottom-left corner (left-aligned).
 * - `outgoing` messages have a sharp bottom-right corner (right-aligned).
 * - Optional timestamp, delivery status, and emoji reactions.
 * - Two variants: `default` (theme surface) and `accent` (brand color).
 *
 * @example
 * ```tsx
 * <ChatBubble align="outgoing" variant="accent" timestamp="2:34 PM" status="read">
 *   Hey! How's it going?
 * </ChatBubble>
 *
 * <ChatBubble
 *   align="incoming"
 *   timestamp="2:35 PM"
 *   reactions={[{ emoji: '👍', count: 2, reacted: true }]}
 * >
 *   Pretty good, thanks!
 * </ChatBubble>
 * ```
 */
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  function ChatBubble(
    {
      align = 'incoming',
      variant = 'default',
      timestamp,
      status,
      reactions,
      onReactionClick,
      _inGroup = false,
      children,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();

    const colors = useMemo(
      () => resolveChatBubbleColors(align, variant, themeColors),
      [align, variant, themeColors],
    );

    const bubbleStyle = useMemo(
      () => buildChatBubbleStyle(align, colors),
      [align, colors],
    );

    const footerStyle = useMemo(
      () => buildFooterStyle(align),
      [align],
    );

    const timestampStyle = useMemo(
      () => buildTimestampStyle(colors),
      [colors],
    );

    const statusIconStyle = useMemo(
      () => buildStatusStyle(colors),
      [colors],
    );

    const reactionsContainerStyle = useMemo(
      () => buildReactionsContainerStyle(),
      [],
    );

    const handleReactionClick = useCallback(
      (emoji: string) => {
        onReactionClick?.(emoji);
      },
      [onReactionClick],
    );

    // When in a group, the parent MessageGroup renders the footer instead.
    const showFooter = !_inGroup && (timestamp || status);
    const hasReactions = reactions && reactions.length > 0;

    return (
      <div ref={ref} className={className} style={{ display: 'inline-flex', flexDirection: 'column' }} {...rest}>
        {/* Bubble */}
        <div style={{ ...bubbleStyle, ...userStyle }}>
          <div>{children}</div>

          {/* Reactions live inside the bubble */}
          {hasReactions && (
            <div style={reactionsContainerStyle}>
              {reactions!.map((reaction) => (
                <ReactionChip
                  key={reaction.emoji}
                  reaction={reaction}
                  themeColors={themeColors}
                  onClick={handleReactionClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Timestamp + Status footer rendered BELOW the bubble */}
        {showFooter && (
          <div style={footerStyle}>
            {timestamp && <span style={timestampStyle}>{timestamp}</span>}
            {status && (
              <span style={statusIconStyle}>
                <StatusIcon
                  status={status}
                  color={colors.timestamp}
                  readColor={'#0C0C0E'}
                />
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

ChatBubble.displayName = 'ChatBubble';

// ---------------------------------------------------------------------------
// ReactionChip (internal)
// ---------------------------------------------------------------------------

function ReactionChip({
  reaction,
  themeColors,
  onClick,
}: {
  reaction: ChatBubbleReaction;
  themeColors: ReturnType<typeof useThemeColors>;
  onClick: (emoji: string) => void;
}) {
  const chipStyle = useMemo(
    () => buildReactionChipStyle(reaction.reacted ?? false, themeColors),
    [reaction.reacted, themeColors],
  );

  return (
    <button
      type="button"
      onClick={() => onClick(reaction.emoji)}
      style={chipStyle}
      aria-label={`${reaction.emoji} ${reaction.count}`}
    >
      <span>{reaction.emoji}</span>
      <span>{reaction.count}</span>
    </button>
  );
}
