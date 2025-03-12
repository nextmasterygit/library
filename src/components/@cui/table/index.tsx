'use client';
import React from 'react';
import TableMainBody from './main/TableMainBody';
import { TableMainBodyTypes } from './main/TableMainBody';
import Pagination, { PaginationType } from './main/Pagination';
import TableHeader, { HeaderType } from './main/TableHeader';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import FullScreenDom from '../../../@core/tag/FullScreenDom';
import useDivDimensions from '../../../@core/customHooks/useDivDimensions';
import TableTabs, { TabPropsType } from './main/TableTabs';

type ClassNameType = React.ComponentProps<'div'>['className'];

interface TableProps extends TableMainBodyTypes {
  layoutClass?: ClassNameType;
  showPagination?: boolean;
  total: number;
  pagination?: PaginationType;
  header: HeaderType;
  tab?: TabPropsType;
}
const Table = ({
  total,
  columns,
  layoutClass,
  header,
  pagination,
  showPagination = false,
  tab,
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
  const { dimension: headerDimension, divRef: headerRef } = useDivDimensions(
    null,
    fullScreen,
  );
  const { dimension: footerDimension, divRef: footerRef } = useDivDimensions(
    null,
    fullScreen,
  );

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
          {tab && (
            <div>
              <TableTabs
                tabs={tab.tabs}
                tableMain={tableMain}
                activeTab={tab.activeTab}
                setActiveTab={tab.setActiveTab}
                setSelectedRows={setSelectedRows}
                nested={tab.nested}
              />
            </div>
          )}
          {/* {tableMain()} */}
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
