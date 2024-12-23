import React from 'react';

export type SortOrder = 'asc' | 'desc';

export type SortBy<T> = {
  [K in keyof T]: T[K] extends number | string | null ? K : never;
}[keyof T];

// Generic Column Interface
export interface Column<T, K extends keyof T = keyof T> {
  title: string;
  key: K;
  sorter?: (a: T, b: T) => number;
  render?: (value: T[K], record: T, index: number) => React.ReactNode;
}

// Row Selection Interface
export interface RowSelection<T, K extends keyof T = keyof T> {
  allSelected?: boolean; // Selected row keys
  selectedRows: T[K][]; // Selected row keys
  onChange: (selectedRowKey: T[K]) => void;
  onSelectAll?: () => void;
}

// Pagination Interface
export interface Pagination {
  pageSize: number;
  total: number;
  current?: number; // Current page
  onChange?: (page: number) => void;
}

export interface Sort<T> {
  sortBy: SortBy<T>;
  sortOrder: SortOrder;
  onSort: (sortBy: keyof T) => void;
}

export interface SortOptions<T> {
  dataSource: T[];
  sortBy?: SortBy<T>;
  sortOrder?: SortOrder;
}

// Table Props
export interface TableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  dataIndex: keyof T;
  rowSelection?: RowSelection<T>;
  pagination?: Pagination;
  sort?: Sort<T>;
  className?: string;
  width?: string;
  testId?: string;
  loading?: boolean;
  onRowClick?: (id: T[keyof T]) => void;
}

export interface TableBodyProps<T> {
  paginatedData: T[];
  dataIndex: keyof T;
  columns: Column<T>[];
  loading?: boolean;
  rowSelection?: RowSelection<T>;
  onRowClick?: (id: T[keyof T]) => void;
}

export interface IconProps {
  width: string;
  height: string;
}
