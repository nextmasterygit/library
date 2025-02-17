import React from "react";
import IconDropdown, { ContentItem } from "../../dropDown/IconDropdown";
import { ColumnType } from "../../../../components/table/tableInterface";

export interface ColumnFilterFieldsType {
  columnFilterField?: ColumnType[];
  setColumnFilterFields?: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}
interface Props extends ColumnFilterFieldsType {
  columns: ColumnType[];
}
const ShowColumnFilter = ({
  columns,
  columnFilterField,
  setColumnFilterFields,
}: Props) => {
  const handleShowsFilter = (item: ColumnType) => {
    if (setColumnFilterFields) {
      if (columnFilterField?.some((v) => v.filterId === item.filterId)) {
        // Remove the item if it is already included
        setColumnFilterFields((prev) =>
          prev.filter((v) => v.filterId !== item.filterId)
        );
      } else {
        // Add the item if it is not included
        setColumnFilterFields((prev) => [...prev, item]);
      }
    }
  };
  const contents: ContentItem[] = columns
    .filter((column) => column.filterId)
    .map((column) => ({
      title: column.title,
      click: () => handleShowsFilter(column),
      className: `  ${
        columnFilterField?.some((v) => v.filterId === column.filterId)
          ? "bg-effect-2xl hover:bg-yellow-600"
          : ""
      }`,
    }));
  return (
    <div>
      <IconDropdown
        icon="mdi:filter-check"
        contents={contents}
        style="dropdown"
        contentClass={`pr-8 border border-border`}
        mouseTrigger={true}
        toggleOnContent={false}
      />
    </div>
  );
};

export default ShowColumnFilter;
