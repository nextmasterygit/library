import Iconify from '../../../../@core/common/icon';
import { ColumnType, ExpandingTableType } from '../../../../props';
interface ExtendableArrowType {
  setSelectAll: (bool: boolean) => void;
  setSelectedRows: (rows: Record<string, any>[]) => void;
  openExpandableRow: number | number[];
  index: number;
  setOpenExpandableRow: (index: number | number[]) => void;
  multiExpandable?: boolean;
}
export const ExtendableArrow = ({
  setSelectAll,
  setSelectedRows,
  openExpandableRow,
  setOpenExpandableRow,
  index,
  multiExpandable,
}: ExtendableArrowType) => {
  const handleExpandRow = (index: number) => {
    setSelectAll(false);
    setSelectedRows([]);

    const toggleSingleExpand = () => {
      setOpenExpandableRow(index === openExpandableRow ? -1 : index);
    };

    const toggleMultiExpand = () => {
      //@ts-ignore
      setOpenExpandableRow((prev) => {
        if (Array.isArray(prev) && prev.includes(index)) {
          return prev.filter((v) => v !== index);
        }
        return Array.isArray(prev) ? [...prev, index] : [index];
      });
    };

    if (multiExpandable) {
      toggleMultiExpand();
    } else {
      toggleSingleExpand();
    }
  };
  // console.log(isExpandable(openExpandableRow, index, multiExpandable));
  return (
    <td className="relative h-0 cursor-pointer">
      <span className="" onClick={() => handleExpandRow(index)}>
        {isExpandable(openExpandableRow, index, multiExpandable) ? (
          <Iconify icon="mingcute:down-fill" />
        ) : (
          <Iconify icon="mingcute:right-fill" />
        )}
      </span>
    </td>
  );
};

interface ExtentableContentType {
  item: Record<string, any>;
  data: Record<string, any>[];
  index: number;
  columns: ColumnType[];
  expandingContent?: ExpandingTableType;
  expandableWidth?: string | number;
}
export const ExtentableContent = ({
  item,
  data,
  index,
  columns,
  expandableWidth,
  expandingContent,
}: ExtentableContentType) => {
  return (
    <tr className="" key={index}>
      <td colSpan={columns.length + 2}>
        <div
          style={{
            width: `${expandableWidth}px`,
          }}
        >
          {expandingContent &&
            expandingContent({
              row: item,
              index,
              data,
            })}
        </div>
      </td>
    </tr>
  );
};

export const isExpandable = (
  openExpandableRow: number | number[],
  index: number,
  multiExpandable?: boolean,
  expandingContent?: any,
) => {
  return multiExpandable
    ? Array.isArray(openExpandableRow) && openExpandableRow.includes(index)
    : openExpandableRow === index;
};
