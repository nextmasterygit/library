import React, { FC } from "react";
import TextField from "./TextField";
import Iconify from "../../../@core/common/icon";

import { CommonInputType } from "./TextField";
interface SearchTextFieldProps extends CommonInputType {
  side?: "left" | "right";
  icon?: string;
}
const SearchTextField: FC<SearchTextFieldProps> = ({
  id,
  name,
  onChange,
  placeholder = "search...",
  label,
  labelClass,
  labelInside,
  value,
  inputSize,
  className,
  side = "right",
  icon = "material-symbols-light:search",
}) => {
  const prefixSuffix = () => (
    <div className="h-full flex items-center justify-center bg-primary Transition hover:bg-primary/80 ">
      <Iconify icon={icon} />
    </div>
  );

  return (
    <>
      <TextField
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        label={label}
        labelClass={labelClass}
        labelInside={labelInside}
        value={value}
        prefix={side === "left" ? prefixSuffix : undefined}
        suffix={side === "right" ? prefixSuffix : undefined}
        prefixClassName="p-0"
        inputSize={inputSize}
        className={className}
      />
    </>
  );
};

export default SearchTextField;
