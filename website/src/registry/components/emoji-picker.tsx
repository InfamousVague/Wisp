import React from 'react';
import { EmojiPicker, VStack, HStack, Text } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

export const emojiPickerEntry: ComponentEntry = {
  slug: 'emoji-picker',
  name: 'EmojiPicker',
  category: 'components',
  description:
    'Emoji selection panel with category tabs, search filtering, recent emojis, and clickable grid. Pairs with MessageInput and ReactionBar.',
  variantCount: 1,
  keywords: ['emoji', 'picker', 'smiley', 'emoticon', 'chat', 'select', 'grid', 'search', 'category'],

  cardPreview: (
    <div style={{ pointerEvents: 'none', transform: 'scale(0.6)', transformOrigin: 'top left' }}>
      <EmojiPicker size="sm" showSearch={false} />
    </div>
  ),

  examples: [
    {
      title: 'Default',
      render: (
        <EmojiPicker onSelect={(emoji) => console.log('Selected:', emoji)} />
      ),
      code: `import { EmojiPicker } from '@wisp-ui/react';

<EmojiPicker onSelect={(emoji) => handleEmoji(emoji)} />`,
    },
    {
      title: 'Sizes',
      render: (
        <HStack gap="lg" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <VStack gap="xs">
            <Text size="xs" color="secondary">sm</Text>
            <EmojiPicker size="sm" />
          </VStack>
          <VStack gap="xs">
            <Text size="xs" color="secondary">md</Text>
            <EmojiPicker size="md" />
          </VStack>
        </HStack>
      ),
      code: `<EmojiPicker size="sm" />
<EmojiPicker size="md" />
<EmojiPicker size="lg" />`,
    },
    {
      title: 'With Recent Emojis',
      render: (
        <EmojiPicker recent={['😂', '👍', '❤️', '🔥', '🚀']} />
      ),
      code: `<EmojiPicker recent={['😂', '👍', '❤️', '🔥', '🚀']} />`,
    },
    {
      title: 'No Search',
      render: (
        <EmojiPicker showSearch={false} size="sm" />
      ),
      code: `<EmojiPicker showSearch={false} />`,
    },
    {
      title: 'Skeleton',
      render: (
        <EmojiPicker skeleton />
      ),
      code: `<EmojiPicker skeleton />`,
    },
  ],

  props: [
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset.' },
    { name: 'onSelect', type: '(emoji: string) => void', description: 'Called when an emoji is selected.' },
    { name: 'emojis', type: 'EmojiItem[]', description: 'Custom emoji data set.' },
    { name: 'recent', type: 'string[]', description: 'Recently used emojis.' },
    { name: 'searchPlaceholder', type: 'string', default: "'Search emoji...'", description: 'Search placeholder text.' },
    { name: 'showSearch', type: 'boolean', default: 'true', description: 'Show search bar.' },
    { name: 'showCategories', type: 'boolean', default: 'true', description: 'Show category tabs.' },
    { name: 'skeleton', type: 'boolean', default: 'false', description: 'Show loading skeleton.' },
  ],
};
