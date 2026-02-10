import React from 'react';
import { CodeBlock } from '@wisp-ui/react';
import type { ComponentEntry } from '../types';

const sampleCode = `import { Button, Card, Text } from '@wisp-ui/react';

function App() {
  return (
    <Card variant="elevated" padding="lg">
      <Text size="lg" weight="bold">
        Hello Wisp
      </Text>
      <Button variant="primary" size="md">
        Get Started
      </Button>
    </Card>
  );
}`;

const shortCode = `const greeting = 'Hello, Wisp!';
console.log(greeting);`;

export const codeBlockEntry: ComponentEntry = {
  slug: 'code-block',
  name: 'CodeBlock',
  category: 'primitives',
  description:
    'Monospace code display with optional syntax highlighting, line numbers, line highlighting, copy-to-clipboard, and max-height scrolling. Pass a SyntaxHighlighter function to enable coloured tokens. Two variants: default (dark surface) and outlined.',
  variantCount: 2,
  keywords: ['code', 'codeblock', 'pre', 'snippet', 'source', 'mono'],

  cardPreview: (
    <CodeBlock code={shortCode} language="JavaScript" copyable={false} />
  ),

  examples: [
    {
      title: 'Default',
      render: (
        <CodeBlock code={sampleCode} language="TypeScript" />
      ),
      code: `import { CodeBlock } from '@wisp-ui/react';

<CodeBlock code={myCode} language="TypeScript" />`,
      rnCode: `// Not yet available in React Native`,
    },
    {
      title: 'Outlined',
      render: (
        <CodeBlock code={sampleCode} language="TypeScript" variant="outlined" />
      ),
      code: `<CodeBlock code={myCode} language="TypeScript" variant="outlined" />`,
      rnCode: `// Not yet available in React Native`,
    },
    {
      title: 'Line Numbers',
      render: (
        <CodeBlock code={sampleCode} language="TypeScript" showLineNumbers />
      ),
      code: `<CodeBlock code={myCode} language="TypeScript" showLineNumbers />`,
      rnCode: `// Not yet available in React Native`,
    },
    {
      title: 'Highlighted Lines',
      render: (
        <CodeBlock
          code={sampleCode}
          language="TypeScript"
          showLineNumbers
          highlightLines={[3, 4, 5, 6, 7, 8]}
        />
      ),
      code: `<CodeBlock
  code={myCode}
  showLineNumbers
  highlightLines={[3, 4, 5, 6, 7, 8]}
/>`,
      rnCode: `// Not yet available in React Native`,
    },
    {
      title: 'Max Height',
      render: (
        <CodeBlock
          code={sampleCode}
          language="TypeScript"
          showLineNumbers
          maxHeight={120}
        />
      ),
      code: `<CodeBlock code={myCode} showLineNumbers maxHeight={120} />`,
      rnCode: `// Not yet available in React Native`,
    },
  ],

  props: [
    { name: 'code', type: 'string', description: 'The code string to display.' },
    { name: 'language', type: 'string', description: 'Language identifier shown in the header and passed to the highlighter.' },
    { name: 'highlighter', type: 'SyntaxHighlighter', description: 'Optional function that tokenises code for syntax highlighting. Use createShikiHighlighter for a ready-made Shiki adapter.' },
    { name: 'showLineNumbers', type: 'boolean', default: 'false', description: 'Displays line numbers in a left gutter.' },
    { name: 'highlightLines', type: 'number[]', description: 'Array of 1-based line numbers to highlight.' },
    { name: 'copyable', type: 'boolean', default: 'true', description: 'Shows a copy-to-clipboard button.' },
    { name: 'maxHeight', type: 'number | string', description: 'Maximum height before scrolling.' },
    { name: 'variant', type: "'default' | 'outlined'", default: "'default'", description: 'Visual style variant.' },
  ],
};
