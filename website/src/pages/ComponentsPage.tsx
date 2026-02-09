import React from 'react';
import { Text, VStack } from '@wisp-ui/react';
import { entriesByCategory } from '../registry';
import { CategoryGrid } from '../shared/CategoryGrid';

export function ComponentsPage() {
  const entries = entriesByCategory('components');

  return (
    <VStack gap="lg">
      <div>
        <Text size="display-sm" weight="bold">
          Components
        </Text>
        <div style={{ marginTop: 6 }}>
          <Text size="md" color="secondary">
            Compound UI components — tabs, dialogs, command palettes, data tables, and more.
          </Text>
        </div>
      </div>
      <CategoryGrid entries={entries} />
    </VStack>
  );
}
