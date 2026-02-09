import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Text,
  Badge,
} from '@wisp-ui/react';
import type { PropDef } from '../registry/types';

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <Table size="sm" variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell>
              <Text size="sm" weight="semibold" family="mono">
                {prop.name}
              </Text>
              {prop.required && (
                <Badge size="sm" variant="danger" style={{ marginLeft: 6 }}>
                  required
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Text size="xs" family="mono" color="secondary">
                {prop.type}
              </Text>
            </TableCell>
            <TableCell>
              <Text size="xs" family="mono" color="tertiary">
                {prop.default ?? '—'}
              </Text>
            </TableCell>
            <TableCell>
              <Text size="sm" color="secondary">
                {prop.description}
              </Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
