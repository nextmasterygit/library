import { JSX } from 'react';
import { ColumnType } from '../../../../props';
// component
import FromToDateFilter, {
  FromToDateFilterTypes,
} from '../filters/FromToDateFilter';
import GlobalFilter, { GlobalFilterType } from '../filters/GlobalFilter';
import ShowColumnFilter, {
  ColumnFilterFieldsType,
} from '../component/ShowColumnFilter';

import HeaderFilterList, {
  HeaderColumnFilter,
} from '../filters/HeaderFilterList';

import ColumnHideShow, {
  ColumnHideShowType,
} from '../component/ColumnHideShow';
import FullScreenTable, {
  FullScreenTableType,
} from '../component/FullScreenTable';
import { utility } from '../../../../@core/utility/helpers';

export interface HeaderType extends ColumnHideShowType {
  headerAction?: () => JSX.Element;
  dates: FromToDateFilterTypes;
  globalFilters?: GlobalFilterType;
  columnsFilter?: HeaderColumnFilter;
  showColumnFilterFields?: ColumnFilterFieldsType;
  showFullScreen?: FullScreenTableType;
}

interface Props extends HeaderType {
  columns: ColumnType[];
}
const TableHeader = ({
  dates,
  headerAction,
  globalFilters,
  columns,
  columnsFilter,
  showColumnFilterFields,
  showOnlyColumns,
  setShowOnlyColumns,
  showFullScreen,
}: Props) => {
  const { fromDate, setFromDate, toDate, setToDate } = dates || {};
  const { columnFilter, setColumnFilter } = columnsFilter || {};
  const { setGlobalFilter, globalFilter } = globalFilters || {};
  const { columnFilterField, setColumnFilterFields } =
    showColumnFilterFields || {};

  return (
    <div>
      <div className=" flex flex-col font-semibold">
        <div className="flex items-center justify-between">
          {utility.hasObjectValues(dates) && setFromDate && setToDate && (
            <FromToDateFilter
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
            />
          )}
          <div className="flex items-center space-x-2">
            {setGlobalFilter && (
              <GlobalFilter
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
              />
            )}
            {setColumnFilterFields && (
              <ShowColumnFilter
                columns={showOnlyColumns ?? columns}
                columnFilterField={columnFilterField}
                setColumnFilterFields={setColumnFilterFields}
              />
            )}
            {setShowOnlyColumns && (
              <ColumnHideShow
                allColumns={columns}
                showOnlyColumns={showOnlyColumns}
                setShowOnlyColumns={setShowOnlyColumns}
              />
            )}
            {showFullScreen && (
              <FullScreenTable
                fullScreen={showFullScreen?.fullScreen}
                setFullScreen={showFullScreen?.setFullScreen}
              />
            )}
          </div>
        </div>
        {headerAction && <div className="">{headerAction()}</div>}

        <HeaderFilterList
          columnFilterField={columnFilterField}
          columnFilter={columnFilter}
          setColumnFilter={setColumnFilter}
        />
      </div>
    </div>
  );
};

export default TableHeader;
