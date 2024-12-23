import './styles.css';

// Export the Table component
export { default as Table } from './components/Table';

// Export types (if applicable)
export type {
  TableProps,
  Column,
  Pagination,
  RowSelection,
  SortOrder,
  SortBy,
} from './types';

export { useSortTable } from './hooks/useSortTable';

export {};
