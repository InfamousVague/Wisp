import type { ComponentEntry, ComponentCategory } from './types';
import { tokenEntries } from './tokens';
import { primitiveEntries } from './primitives';
import { layoutEntries } from './layouts';
import { componentEntries } from './components';

/** All registry entries across every category. */
export const allEntries: ComponentEntry[] = [
  ...tokenEntries,
  ...primitiveEntries,
  ...layoutEntries,
  ...componentEntries,
];

/** Lookup a single entry by category + slug. */
export function findEntry(
  category: ComponentCategory,
  slug: string,
): ComponentEntry | undefined {
  return allEntries.find((e) => e.category === category && e.slug === slug);
}

/** Get all entries for a given category. */
export function entriesByCategory(category: ComponentCategory): ComponentEntry[] {
  return allEntries.filter((e) => e.category === category);
}

export type { ComponentEntry, ComponentCategory, PropDef, ExampleDef } from './types';
