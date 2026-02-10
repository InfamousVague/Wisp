import React from 'react';
import { MessageInput, VStack, Text } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const messageInputEntry: ComponentEntry = {
  slug: 'message-input',
  name: 'MessageInput',
  category: 'components',
  description:
    'Rich chat input with auto-expanding textarea, send button, attachment trigger, and built-in emoji picker. Complete message composition experience.',
  variantCount: 1,
  keywords: ['message', 'input', 'chat', 'send', 'compose', 'text', 'attachment', 'emoji', 'textarea'],

  cardPreview: (
    <div style={{ width: '100%', pointerEvents: 'none' }}>
      <MessageInput size="sm" placeholder="Type a message..." />
    </div>
  ),

  examples: [
    {
      title: 'Default',
      render: (
        <VStack gap="md" style={{ width: '100%', maxWidth: 480 }}>
          <MessageInput
            placeholder="Type a message..."
            onSubmit={(val) => console.log('Send:', val)}
          />
        </VStack>
      ),
      code: `import { MessageInput } from '@wisp-ui/react';

// Emoji picker is built-in — click the smiley to open it.
<MessageInput
  placeholder="Type a message..."
  onSubmit={(value) => handleSend(value)}
/>`,
    },
    {
      title: 'Sizes',
      render: (
        <VStack gap="lg" style={{ width: '100%', maxWidth: 480 }}>
          <VStack gap="xs">
            <Text size="xs" color="secondary">sm</Text>
            <MessageInput size="sm" placeholder="Small input..." />
          </VStack>
          <VStack gap="xs">
            <Text size="xs" color="secondary">md</Text>
            <MessageInput size="md" placeholder="Medium input..." />
          </VStack>
          <VStack gap="xs">
            <Text size="xs" color="secondary">lg</Text>
            <MessageInput size="lg" placeholder="Large input..." />
          </VStack>
        </VStack>
      ),
      code: `<MessageInput size="sm" />
<MessageInput size="md" />
<MessageInput size="lg" />`,
    },
    {
      title: 'Minimal',
      render: (
        <VStack gap="md" style={{ width: '100%', maxWidth: 480 }}>
          <MessageInput
            showAttachment={false}
            showEmoji={false}
            placeholder="Just type and send..."
          />
        </VStack>
      ),
      code: `<MessageInput showAttachment={false} showEmoji={false} />`,
    },
    {
      title: 'Skeleton',
      render: (
        <VStack gap="md" style={{ width: '100%', maxWidth: 480 }}>
          <MessageInput skeleton />
        </VStack>
      ),
      code: `<MessageInput skeleton />`,
    },
  ],

  props: [
    { name: 'value', type: 'string', description: 'Controlled input value.' },
    { name: 'defaultValue', type: 'string', description: 'Default input value (uncontrolled).' },
    { name: 'placeholder', type: 'string', default: "'Type a message...'", description: 'Placeholder text.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Called when input changes.' },
    { name: 'onSubmit', type: '(value: string) => void', description: 'Called on Enter or send click.' },
    { name: 'showAttachment', type: 'boolean', default: 'true', description: 'Show attachment button.' },
    { name: 'onAttachmentClick', type: '() => void', description: 'Called when attachment is clicked.' },
    { name: 'showEmoji', type: 'boolean', default: 'true', description: 'Show emoji trigger button.' },
    { name: 'onEmojiClick', type: '() => void', description: 'Called when emoji button is clicked (disables built-in picker).' },
    { name: 'onEmojiSelect', type: '(emoji: string) => void', description: 'Called when an emoji is selected from the built-in picker.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
    { name: 'sending', type: 'boolean', default: 'false', description: 'Show sending state.' },
    { name: 'autoExpand', type: 'boolean', default: 'true', description: 'Auto-expand textarea.' },
    { name: 'skeleton', type: 'boolean', default: 'false', description: 'Show loading skeleton.' },
  ],
};
