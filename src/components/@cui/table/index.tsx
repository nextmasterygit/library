'use client';
import React, { useState } from 'react';
import TableMainBody from './main/TableMainBody';
import { TableMainBodyTypes } from './main/TableMainBody';
import Pagination, { PaginationType } from './main/Pagination';
import TableHeader, { HeaderType } from './main/TableHeader';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import ReactDOM from 'react-dom';
import FullScreenDom from '../../../@core/tag/FullScreenDom';

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
  const fullScreen = header?.showFullScreen?.fullScreen ?? false;
  return (
    <FullScreenDom open={fullScreen}>
      <div
        className={twMerge(
          clsx(
            'p-4 py-10 shadow-2xl shadow-border border border-border rounded-[20px] space-y-2',
            {
              'fixed inset-0 bg-background top-0 left-0 w-full min-h-screen h-full z-modal':
                fullScreen,
            },
            layoutClass,
          ),
        )}
      >
        {/* {fullScreen && (
        <div className="absolute inset-0 bg-background/90 "></div> // Background overlay with z-index
      )} */}

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
        {tableMain()}
        {showPagination && pagination && (
          <Pagination
            currentPage={pagination?.currentPage}
            setCurrentPage={pagination?.setCurrentPage}
            dataLimit={pagination?.dataLimit}
            setDataLimit={pagination?.setDataLimit}
            total={total}
          />
        )}
      </div>
    </FullScreenDom>
  );
};

export default Table;
