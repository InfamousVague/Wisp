/**
 * @module MessageGroup
 */
import React, { forwardRef, useMemo, Children, isValidElement, cloneElement } from 'react';
import type { MessageGroupProps } from '@wisp-ui/core/types/MessageGroup.types';
import type { ChatBubbleStatus } from '@wisp-ui/core/types/ChatBubble.types';
import {
  buildMessageGroupStyle,
  buildSenderNameStyle,
  buildContentRowStyle,
  buildBubblesContainerStyle,
  buildGroupFooterStyle,
  buildGroupTimestampStyle,
  buildGroupStatusStyle,
} from '@wisp-ui/core/styles/MessageGroup.styles';
import { useThemeColors } from '../../providers';
import { StatusIcon, ChatBubble } from '../chat-bubble/ChatBubble';

/**
 * MessageGroup — Groups consecutive chat bubbles from the same sender.
 *
 * @remarks
 * Key features:
 * - Displays avatar and sender name once at the top of the group.
 * - Stacks child `<ChatBubble>` elements with tight vertical spacing.
 * - Renders timestamp and delivery status once below the entire group.
 * - Automatically injects `_inGroup` into child ChatBubbles so they
 *   suppress their own footers.
 * - Supports `incoming` (left-aligned) and `outgoing` (right-aligned) layouts.
 *
 * @example
 * ```tsx
 * <MessageGroup
 *   align="incoming"
 *   sender="Alice"
 *   avatar={<Avatar name="Alice" size="sm" />}
 *   timestamp="2:30 PM"
 * >
 *   <ChatBubble align="incoming">Hey there!</ChatBubble>
 *   <ChatBubble align="incoming">How's the project going?</ChatBubble>
 * </MessageGroup>
 * ```
 */
export const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  function MessageGroup(
    {
      align = 'incoming',
      sender,
      avatar,
      timestamp,
      status,
      children,
      style: userStyle,
      className,
      ...rest
    },
    ref,
  ) {
    const themeColors = useThemeColors();

    const groupStyle = useMemo(
      () => buildMessageGroupStyle(align),
      [align],
    );

    const senderNameStyle = useMemo(
      () => buildSenderNameStyle(themeColors),
      [themeColors],
    );

    const contentRowStyle = useMemo(
      () => buildContentRowStyle(align),
      [align],
    );

    const bubblesStyle = useMemo(
      () => buildBubblesContainerStyle(align),
      [align],
    );

    const footerStyle = useMemo(
      () => buildGroupFooterStyle(align),
      [align],
    );

    const timestampStyle = useMemo(
      () => buildGroupTimestampStyle(themeColors),
      [themeColors],
    );

    const statusIconStyle = useMemo(
      () => buildGroupStatusStyle(themeColors),
      [themeColors],
    );

    const showFooter = timestamp || status;

    // Inject _inGroup={true} into each child ChatBubble so it suppresses
    // its own footer rendering. Only inject into ChatBubble elements to
    // avoid passing unknown props to native DOM elements.
    const injectedChildren = useMemo(
      () =>
        Children.map(children, (child) => {
          if (isValidElement(child) && child.type === ChatBubble) {
            return cloneElement(child as React.ReactElement<{ _inGroup?: boolean }>, {
              _inGroup: true,
            });
          }
          return child;
        }),
      [children],
    );

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...groupStyle, ...userStyle }}
        {...rest}
      >
        {/* Sender name above the content row */}
        {sender && <span style={senderNameStyle}>{sender}</span>}

        {/* Avatar + Bubbles side-by-side */}
        <div style={contentRowStyle}>
          {avatar}
          <div style={bubblesStyle}>
            {injectedChildren}
          </div>
        </div>

        {/* Group-level footer: timestamp + status */}
        {showFooter && (
          <div style={footerStyle} data-testid="group-footer">
            {timestamp && <span style={timestampStyle}>{timestamp}</span>}
            {status && (
              <span style={statusIconStyle}>
                <StatusIcon
                  status={status}
                  color={themeColors.text.muted}
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

MessageGroup.displayName = 'MessageGroup';
