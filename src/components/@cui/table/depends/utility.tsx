import { utility } from '../../../../@core/utility/helpers';
import Checkbox from '../../../../components/@cui/textField/Checkbox';

// Function to toggle selection of a single row
export const toggleRowSelection = (
  row: Record<string, any>,
  idProperty: string,
  selectedRows: Record<string, any>[] | [],
  setSelectedRows: (rows: Record<string, any>[]) => void,
) => {
  const id = utility.getNestedProperty(row, idProperty);
  const toggle = () => {
    if (
      selectedRows?.some((s) => utility.getNestedProperty(s, idProperty) === id)
    ) {
      setSelectedRows(
        selectedRows?.filter(
          (item) => utility.getNestedProperty(item, idProperty) !== id,
        ),
      );
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  return (
    <Checkbox
      onChange={toggle}
      checked={selectedRows.some(
        (s) => utility.getNestedProperty(s, idProperty) === id,
      )}
      // checked={selectedRows?.some((s) => s[idProperty] === id)}
    />
  );
};
