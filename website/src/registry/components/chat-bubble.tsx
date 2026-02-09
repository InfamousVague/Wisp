import React from 'react';
import { ChatBubble, VStack, HStack, Text } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const chatBubbleEntry: ComponentEntry = {
  slug: 'chat-bubble',
  name: 'ChatBubble',
  category: 'components',
  description:
    'A styled message bubble with one sharp corner indicating direction — iMessage / WhatsApp style. Supports timestamps, delivery status, and emoji reactions.',
  variantCount: 2,
  keywords: ['chat', 'bubble', 'message', 'conversation', 'im', 'messaging', 'text'],

  cardPreview: (
    <VStack gap="xs" style={{ width: '100%', maxWidth: 220, pointerEvents: 'none' }}>
      <div style={{ alignSelf: 'flex-start' }}>
        <ChatBubble align="incoming">Hey there!</ChatBubble>
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <ChatBubble align="outgoing" variant="accent">
          Hi! 👋
        </ChatBubble>
      </div>
    </VStack>
  ),

  examples: [
    {
      title: 'Incoming & Outgoing',
      render: (
        <VStack gap="sm" style={{ maxWidth: 400 }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <ChatBubble align="incoming" timestamp="2:30 PM">
              Hey! How are you?
            </ChatBubble>
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="read">
              Doing great, thanks! 🎉
            </ChatBubble>
          </div>
          <div style={{ alignSelf: 'flex-start' }}>
            <ChatBubble align="incoming" timestamp="2:32 PM">
              Want to grab lunch?
            </ChatBubble>
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <ChatBubble align="outgoing" variant="accent" timestamp="2:32 PM" status="delivered">
              Sure, sounds good!
            </ChatBubble>
          </div>
        </VStack>
      ),
      code: `import { ChatBubble } from '@wisp-ui/react';

<ChatBubble align="incoming" timestamp="2:30 PM">
  Hey! How are you?
</ChatBubble>

<ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="read">
  Doing great, thanks! 🎉
</ChatBubble>`,
      rnCode: `import { ChatBubble } from '@wisp-ui/react-native';

<ChatBubble align="incoming" timestamp="2:30 PM">
  Hey! How are you?
</ChatBubble>

<ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="read">
  Doing great, thanks! 🎉
</ChatBubble>`,
    },
    {
      title: 'Variants',
      render: (
        <VStack gap="sm" style={{ maxWidth: 400 }}>
          <HStack gap="sm" align="start">
            <Text size="xs" color="tertiary" style={{ width: 60, paddingTop: 8 }}>default</Text>
            <VStack gap="xs">
              <ChatBubble align="incoming">Incoming default</ChatBubble>
              <ChatBubble align="outgoing">Outgoing default</ChatBubble>
            </VStack>
          </HStack>
          <HStack gap="sm" align="start">
            <Text size="xs" color="tertiary" style={{ width: 60, paddingTop: 8 }}>accent</Text>
            <VStack gap="xs">
              <ChatBubble align="incoming" variant="accent">Incoming accent</ChatBubble>
              <ChatBubble align="outgoing" variant="accent">Outgoing accent</ChatBubble>
            </VStack>
          </HStack>
        </VStack>
      ),
      code: `<ChatBubble align="incoming">Incoming default</ChatBubble>
<ChatBubble align="outgoing">Outgoing default</ChatBubble>
<ChatBubble align="outgoing" variant="accent">Outgoing accent</ChatBubble>`,
      rnCode: `import { ChatBubble } from '@wisp-ui/react-native';

<ChatBubble align="incoming">Incoming default</ChatBubble>
<ChatBubble align="outgoing">Outgoing default</ChatBubble>
<ChatBubble align="outgoing" variant="accent">Outgoing accent</ChatBubble>`,
    },
    {
      title: 'With Reactions',
      render: (
        <VStack gap="sm" style={{ maxWidth: 400 }}>
          <div style={{ alignSelf: 'flex-start' }}>
            <ChatBubble
              align="incoming"
              timestamp="2:30 PM"
              reactions={[
                { emoji: '👍', count: 3, reacted: true },
                { emoji: '❤️', count: 1 },
                { emoji: '😂', count: 2 },
              ]}
            >
              This is hilarious! Check out this meme 😂
            </ChatBubble>
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <ChatBubble
              align="outgoing"
              variant="accent"
              timestamp="2:31 PM"
              status="read"
              reactions={[
                { emoji: '🔥', count: 1 },
              ]}
            >
              LOL 😂
            </ChatBubble>
          </div>
        </VStack>
      ),
      code: `<ChatBubble
  align="incoming"
  timestamp="2:30 PM"
  reactions={[
    { emoji: '👍', count: 3, reacted: true },
    { emoji: '❤️', count: 1 },
    { emoji: '😂', count: 2 },
  ]}
>
  This is hilarious!
</ChatBubble>`,
      rnCode: `import { ChatBubble } from '@wisp-ui/react-native';

<ChatBubble
  align="incoming"
  timestamp="2:30 PM"
  reactions={[
    { emoji: '👍', count: 3, reacted: true },
    { emoji: '❤️', count: 1 },
    { emoji: '😂', count: 2 },
  ]}
>
  This is hilarious!
</ChatBubble>`,
    },
    {
      title: 'Delivery Status',
      render: (
        <VStack gap="sm" style={{ maxWidth: 400, alignItems: 'flex-end' }}>
          <ChatBubble align="outgoing" variant="accent" timestamp="2:30 PM" status="sent">
            Sent message
          </ChatBubble>
          <ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="delivered">
            Delivered message
          </ChatBubble>
          <ChatBubble align="outgoing" variant="accent" timestamp="2:32 PM" status="read">
            Read message
          </ChatBubble>
        </VStack>
      ),
      code: `<ChatBubble align="outgoing" variant="accent" timestamp="2:30 PM" status="sent">
  Sent message
</ChatBubble>
<ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="delivered">
  Delivered message
</ChatBubble>
<ChatBubble align="outgoing" variant="accent" timestamp="2:32 PM" status="read">
  Read message
</ChatBubble>`,
      rnCode: `import { ChatBubble } from '@wisp-ui/react-native';

<ChatBubble align="outgoing" variant="accent" timestamp="2:30 PM" status="sent">
  Sent message
</ChatBubble>
<ChatBubble align="outgoing" variant="accent" timestamp="2:31 PM" status="delivered">
  Delivered message
</ChatBubble>
<ChatBubble align="outgoing" variant="accent" timestamp="2:32 PM" status="read">
  Read message
</ChatBubble>`,
    },
  ],

  props: [
    { name: 'children', type: 'React.ReactNode', required: true, description: 'Message content.' },
    { name: 'align', type: "'incoming' | 'outgoing'", default: "'incoming'", description: 'Direction of the message. Controls corner radius and alignment.' },
    { name: 'variant', type: "'default' | 'accent'", default: "'default'", description: 'Visual color variant.' },
    { name: 'timestamp', type: 'string', description: 'Timestamp text displayed below the bubble. Suppressed when inside a MessageGroup.' },
    { name: 'status', type: "'sent' | 'delivered' | 'read'", description: 'Delivery status indicator (typically for outgoing).' },
    { name: 'reactions', type: 'ChatBubbleReaction[]', description: 'Array of emoji reactions displayed below the bubble.' },
    { name: 'onReactionClick', type: '(emoji: string) => void', description: 'Callback when a reaction chip is clicked.' },
  ],
};
