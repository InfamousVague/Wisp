/**
 * @module primitives/table
 * @description Public API for the Wisp Table primitive and its sub-components.
 */

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
export type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableSize,
  TableVariant,
  TableCellAlignment,
  TableContextValue,
} from '@wisp-ui/core/types/Table.types';
export {
  tableSizes,
  tableVariants,
  tableCellAlignments,
  tableSizePaddingMap,
  tableSizeFontMap,
} from '@wisp-ui/core/types/Table.types';
