import React, { useEffect, useRef, useState } from 'react';
import { TableProps } from '../../types';
import { cx, getUniqueId, sortData } from '../../utils';
import Pagination from '../Pagination';
import { SortIcon } from '../IconSort';
import { TableBody } from './TableBody';
import { RowCheckbox } from '../RowCheckbox';

// Table Component
const Table = <T,>({
  columns = [],
  dataSource = [],
  rowSelection,
  pagination,
  dataIndex,
  className,
  width,
  testId,
  sort,
  loading,
  onRowClick,
}: TableProps<T>) => {
  const containerRef: React.Ref<HTMLDivElement> = useRef(null);

  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrollStarted, setIsScrollStarted] = useState(false);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtEnd =
        container.scrollLeft + container.clientWidth >= container.scrollWidth;
      setIsScrollStarted(container.scrollLeft > 0);
      setIsScrolledToEnd(isAtEnd);
    }
  };

  const [currentPage, setCurrentPage] = useState(pagination?.current || 1);

  const pageSize = pagination?.pageSize || dataSource.length;

  // Sorted Data
  const sortedData = sortData({
    dataSource,
    sortBy: sort?.sortBy,
    sortOrder: sort?.sortOrder,
  });

  // Paginate data
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    pagination?.onChange?.(page);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      handleScroll(); // Initial check
    }
  }, []);

  return (
    <div className={className} data-testid={testId}>
      <div className="tabulify-wrapper">
        <div
          className={cx([
            'tabulify-container',
            width && 'has-scroll',
            isScrolledToEnd && 'hide-right-shadow',
            !isScrollStarted && 'hide-left-shadow',
          ])}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <table className="tabulify-table" style={{ width: width ?? '100%' }}>
            <thead className="tabulify-head">
              <tr>
                {rowSelection?.selectedRows && (
                  <th className="tabulify-cell">
                    {rowSelection?.onSelectAll && (
                      <RowCheckbox
                        name="select-all"
                        isChecked={rowSelection?.allSelected}
                        onChange={rowSelection.onSelectAll}
                      />
                    )}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    className={cx([
                      'tabulify-cell',
                      Boolean(sort) && 'has-hover',
                    ])}
                    key={getUniqueId(column.key)}
                    data-testid="table-head-row"
                    onClick={() => sort?.onSort(column.key)}
                  >
                    <div
                      className="tabulify-head-cell-content-wrapper"
                      data-id="table-head-row-column"
                    >
                      <div>{column.title}</div>
                      <div className="icon-wrapper">
                        {sort && sort?.sortBy === column.key && (
                          <SortIcon sortOrder={sort.sortOrder} />
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabulify-body">
              <TableBody
                paginatedData={paginatedData}
                dataIndex={dataIndex}
                columns={columns}
                loading={loading}
                rowSelection={rowSelection}
                onRowClick={onRowClick}
              />
            </tbody>
          </table>
        </div>
      </div>
      {pagination && (
        <div className="tabulify-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            total={pagination.total}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
