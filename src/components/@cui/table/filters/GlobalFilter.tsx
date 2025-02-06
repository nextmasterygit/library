import React, { ChangeEvent } from "react";
import TextField from "../../../../components/@cui/textField/TextField";
import Iconify from "../../../../@core/common/icon";
export interface GlobalFilterType {
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
}
const GlobalFilter = ({ globalFilter, setGlobalFilter }: GlobalFilterType) => {
  const handleGlobalFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (setGlobalFilter) {
      setGlobalFilter(value);
    }
  };
  const prefix = () => <Iconify icon="material-symbols-light:search" />;
  return (
    <TextField
      value={globalFilter}
      placeholder="search..."
      onChange={handleGlobalFilter}
      prefix={prefix}
    />
  );
};

export default GlobalFilter;
