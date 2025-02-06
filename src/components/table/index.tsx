"use client";
import { FC, useEffect, useState } from "react";
import Table from "../@cui/table";
import {
  ActionMenuListType,
  ColumnFilterType,
  ColumnType,
  ExpandingTableType,
} from "./tableInterface";
import TableHeaderAction from "./action/HeaderAction";
interface Props {
  data: Record<string, any>[];
  columns: ColumnType[];
  actionMenuList: ActionMenuListType; // function to generate action menu items based on row data.
  expandable?: boolean;
  multiExpandable?: boolean;
  expandingContent?: ExpandingTableType;
}
import { demoNewActionMenu } from "./headerActionList/demo";
import { TableClassesType } from "../@cui/table/main/TableMainBody";
const MyTable: FC<Props> = ({
  data,
  columns,
  actionMenuList,
  expandable,
  multiExpandable,
  expandingContent,
}) => {
  const [paginationData, setPaginationData] = useState(data);
  //selectedRows
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[] | []>(
    []
  );
  // column Hide Show
  const [showOnlyColumns, setShowOnlyColumns] = useState(columns);

  // filter
  const [columnFilterField, setColumnFilterFields] = useState<ColumnType[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>(new Date());
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilter, setColumnFilter] = useState<ColumnFilterType[]>([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(20);
  const total = data.length;

  useEffect(() => {
    const paginateData = (
      data: any[],
      currentPage: number,
      dataLimit: number
    ) => {
      const skip = (currentPage - 1) * dataLimit;
      return data.slice(skip, skip + dataLimit);
    };

    setPaginationData(paginateData(data, currentPage, dataLimit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataLimit]);
  //<-pagination

  const headerAction = () => {
    return (
      <TableHeaderAction
        actionMenuList={actionMenuList}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        newActionMenu={demoNewActionMenu}
      />
    );
  };
  const tableClasses: TableClassesType = {
    tableWrapperClass: "!max-h-[calc(100vh-350px)] overflow-y-auto",
    tableClass: "",
    tableInsideClass:
      "border border-border shadow-sm shadow-effect-lg text-left px-2 ",
    tHeadClass: "",
    trHeadClass: "bg-accent",
    thHeadClass: "",
    tBodyClass: "",
    trBodyClass: "hover:bg-effect-md hover:text-primary-foreground",
    tdBodyClass: "",
    striped: true,
    stripedClass: "bg-accent ",
  };
  return (
    <Table
      data={paginationData}
      total={total}
      tableClasses={tableClasses}
      columns={columns}
      rowId="id"
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      expandable={expandable}
      multiExpandable={multiExpandable}
      expandingContent={expandingContent}
      //header
      header={{
        headerAction,
        dates: {
          fromDate,
          setFromDate,
          toDate,
          setToDate,
        },
        columnsFilter: {
          //these are filter to filterize data
          columnFilter,
          setColumnFilter,
        },
        globalFilters: {
          setGlobalFilter,
          globalFilter,
        },
        showColumnFilterFields: {
          //these are field that show
          columnFilterField,
          setColumnFilterFields,
        },
        showOnlyColumns,
        setShowOnlyColumns,
      }}
      //pagination
      showPagination={true}
      pagination={{
        currentPage,
        setCurrentPage,
        dataLimit,
        setDataLimit,
      }}
    />
  );
};

export default MyTable;
