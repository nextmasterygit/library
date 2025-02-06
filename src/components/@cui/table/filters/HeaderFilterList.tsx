import React, { ChangeEvent, FC, useState } from "react";
import { useDebounceCallback } from "../../../../@core/customHooks/useDebounce";

import {
  ColumnFilterType,
  ColumnType,
} from "../../../../components/table/tableInterface";
import SearchTextField from "../../../../components/@cui/textField/SearchTextField";

export interface HeaderColumnFilter {
  columnFilter?: ColumnFilterType[];
  setColumnFilter?: React.Dispatch<React.SetStateAction<ColumnFilterType[]>>;
}
interface HeaderFilterListType extends HeaderColumnFilter {
  columnFilterField?: ColumnType[];
}

const HeaderFilterList: FC<HeaderFilterListType> = ({
  columnFilterField,
  columnFilter,
  setColumnFilter,
}) => {
  const handleColumnFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (setColumnFilter) {
      setColumnFilter((prevFilters) => {
        const filterExists = prevFilters.some((filter) => filter.id === name);

        if (value === "") {
          // Remove the filter if its value is empty
          return prevFilters.filter((filter) => filter.id !== name);
        }

        if (filterExists) {
          // Update the filter value if it already exists
          return prevFilters.map((filter) =>
            filter.id === name ? { ...filter, value } : filter
          );
        }

        // Add a new filter if it does not exist
        return [...prevFilters, { id: name, value }];
      });
    }
  };

  // Properly map columns and apply filters
  const showFilterColumns = columnFilterField?.map((item) => {
    const matchingFilter = columnFilter?.find(
      (filterItem) => filterItem.id === item.filterId
    );
    return {
      ...item,
      value: matchingFilter ? matchingFilter.value : "", // Provide default empty string if no matching filter
    };
  });
  return (
    <div className="flex flex-wrap space-x-2">
      {showFilterColumns?.map((column, index) => (
        <SearchTextField
          key={index}
          value={column.value}
          name={column.filterId}
          onChange={handleColumnFilter}
          label={column.title}
          labelInside={true}
          inputSize="0"
          className="max-w-40 text-sm"
        />
      ))}
    </div>
  );
};

export default HeaderFilterList;
