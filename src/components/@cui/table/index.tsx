'use client';
import React, { useEffect } from 'react';
import TableMainBody from './main/TableMainBody';
import { TableMainBodyTypes } from './main/TableMainBody';
import Pagination, { PaginationType } from './main/Pagination';
import TableHeader, { HeaderType } from './main/TableHeader';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import FullScreenDom from '../../../@core/tag/FullScreenDom';
import useDivDimensions from '../../../@core/customHooks/useDivDimensions';
import useDivSize from '../../../@core/customHooks/useDivSize';

type ClassNameType = React.ComponentProps<'div'>['className'];

interface TableProps extends TableMainBodyTypes {
  layoutClass?: ClassNameType;
  showPagination?: boolean;
  total: number;
  pagination?: PaginationType;
  header: HeaderType;
}
const Table = ({
  total,
  columns,
  layoutClass,
  header,
  pagination,
  showPagination = false,

  //tableMain
  data,
  rowId,
  selectedRows,
  setSelectedRows,
  tableClasses,
  expandable,
  multiExpandable,
  expandingContent,
}: TableProps) => {
  const fullScreen = header?.showFullScreen?.fullScreen ?? false;
  const { size: headerDimension, divRef: headerRef } = useDivSize(fullScreen);
  const { size: footerDimension, divRef: footerRef } = useDivSize(fullScreen);

  const tableMain = () => (
    <TableMainBody
      data={data}
      rowId={rowId}
      columns={header.showOnlyColumns ? header.showOnlyColumns : columns}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      tableClasses={tableClasses}
      expandable={expandable}
      multiExpandable={multiExpandable}
      expandingContent={expandingContent}
    />
  );
  console.log(headerDimension);
  return (
    <FullScreenDom open={fullScreen} className="overflow-hidden">
      <div
        className={twMerge(
          clsx(
            { 'p-4 py-10': !fullScreen }, // Apply when not fullScreen
            'shadow-2xl shadow-border border border-border rounded-[20px] space-y-2',
            { 'p-0 m-0 space-y-0': fullScreen }, // Apply when fullScreen
            layoutClass,
          ),
        )}
      >
        <div ref={headerRef}>
          <TableHeader
            dates={header?.dates}
            columnsFilter={header?.columnsFilter}
            globalFilters={header?.globalFilters}
            showColumnFilterFields={header?.showColumnFilterFields}
            showFullScreen={header.showFullScreen}
            showOnlyColumns={header?.showOnlyColumns}
            setShowOnlyColumns={header?.setShowOnlyColumns}
            headerAction={header?.headerAction}
            columns={columns}
          />
        </div>
        <div
          style={
            fullScreen && headerDimension && footerDimension
              ? {
                  height: `calc(100vh - ${headerDimension.height + footerDimension.height}px)`,
                  overflow: 'auto',
                }
              : { overflow: 'auto' }
          }
        >
          {tableMain()}
        </div>

        {showPagination && pagination && (
          <div
            style={{ height: footerDimension?.height || 'auto' }}
            ref={footerRef}
          >
            <Pagination
              currentPage={pagination?.currentPage}
              setCurrentPage={pagination?.setCurrentPage}
              dataLimit={pagination?.dataLimit}
              setDataLimit={pagination?.setDataLimit}
              total={total}
            />
          </div>
        )}
      </div>
    </FullScreenDom>
  );
};

export default Table;
