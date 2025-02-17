import React, { FC } from "react";
import TableMainBody from "./main/TableMainBody";
import { TableMainBodyTypes } from "./main/TableMainBody";
import Pagination, { PaginationType } from "./main/Pagination";
import TableHeader, { HeaderType } from "./main/TableHeader";

type ClassNameType = React.ComponentProps<"div">["className"];

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
  layoutClass = "p-4 py-10 shadow-2xl shadow-border border border-border rounded-[20px] space-y-2",
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

  return (
    <div className={`${layoutClass}`}>
      <TableHeader
        dates={header?.dates}
        columnsFilter={header?.columnsFilter}
        globalFilters={header?.globalFilters}
        showColumnFilterFields={header?.showColumnFilterFields}
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
  );
};

export default Table;
