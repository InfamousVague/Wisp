import React from 'react';
import { Text, VStack } from '@wisp-ui/react';
import { entriesByCategory } from '../registry';
import { CategoryGrid } from '../shared/CategoryGrid';

export function PrimitivesPage() {
  const entries = entriesByCategory('primitives');

  return (
    <VStack gap="lg">
      <div>
        <Text size="display-sm" weight="bold">
          Primitives
        </Text>
        <div style={{ marginTop: 6 }}>
          <Text size="md" color="secondary">
            Foundational building blocks — buttons, inputs, toggles, badges, and more.
          </Text>
        </div>
      </div>
      <CategoryGrid entries={entries} />
    </VStack>
  );
}
