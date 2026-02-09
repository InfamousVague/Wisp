import React from 'react';
import type { ComponentEntry } from '../registry/types';
import { PreviewCard } from './PreviewCard';

interface CategoryGridProps {
  entries: ComponentEntry[];
}

/**
 * Responsive grid of PreviewCards.
 * Uses CSS grid with auto-fill for responsive columns.
 */
export function CategoryGrid({ entries }: CategoryGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {entries.map((entry) => (
        <PreviewCard key={entry.slug} entry={entry} />
      ))}
    </div>
  );
}
