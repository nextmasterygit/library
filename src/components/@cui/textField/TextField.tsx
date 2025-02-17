"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import useDivDimensions from "../../../@core/customHooks/useDivDimensions";
import PrefixAndSuffix, { PreSuffixType } from "./function/PrefixAndSuffix";

type ClassNameType = React.ComponentProps<"div">["className"];
type InputElement = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>;
export interface CommonInputType {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: InputElement) => void;
  className?: ClassNameType;
  inputSize?: "0" | "1" | "2" | "3";
  labelInside?: boolean;
  labelClass?: ClassNameType;
}
interface Props extends CommonInputType {
  required?: boolean;
  type?: string;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textarea?: boolean;
  style?: React.CSSProperties;
  wrapperClassName?: ClassNameType;
  maxlength?: string | any;
  max?: number;
  min?: number;
  minLength?: number;
  size?: string | any;
  rows?: number;
  // For React Hook Form compatibility
  register?: any;
  errors?: any;
  // prefix and suffix
  prefixClassName?: ClassNameType;
  suffixClassName?: ClassNameType;
  prefix?: PreSuffixType;
  suffix?: PreSuffixType;
}
const TextField = ({
  id,
  label,
  labelInside,
  required,
  type = "text",
  name,
  placeholder,
  value,
  defaultValue,
  onChange,
  onKeyDown,
  textarea = false,
  className = "",
  style,
  wrapperClassName,
  prefixClassName,
  suffixClassName,
  prefix,
  suffix,
  maxlength,
  max,
  min,
  minLength,
  size,
  labelClass = "text-sm",
  inputSize = "1",
  rows = 4,
  // For React Hook Form compatibility
  register,
  errors,
}: Props) => {
  const prefixDimension = useDivDimensions();
  const suffixDimension = useDivDimensions();
  // states
  const [prefixWidth, setPrefixWidth] = useState<string>("");
  const [suffixWidth, setSuffixWidth] = useState<string>("");
  const [demoValue, setDemoValue] = useState<string>("");

  let InputSize = "py-2";
  if (inputSize === "0") {
    InputSize = "py-0";
  } else if (inputSize === "1") {
    InputSize = "py-1";
  } else if (inputSize === "2") {
    InputSize = "py-2";
  } else if (inputSize === "3") {
    InputSize = "py-3";
  }

  const inputValue = value ?? demoValue;
  let inputProps = {
    id,
    name,
    placeholder: labelInside && label ? label : placeholder,
    value: inputValue,
    defaultValue,
    onChange: onChange
      ? onChange
      : (e: InputElement) => setDemoValue(e.target.value),
    onKeyDown,
    className,
    type: type == "tel" ? "number" : type,
    maxLength: maxlength,
    max,
    min,
    minLength,
    size,
    rows,
  };

  // register is react hook field
  if (register) {
    inputProps = { ...inputProps, ...register(name) };
  }
  const mergedClassName = twMerge(
    `  relative overflow-hidden bordering group focus-within:border-primary select-none   ${
      errors && name && errors[name] && "border !border-red-500"
    } ${type === "tel" ? "input-textfield" : ""}`,
    wrapperClassName
  );

  const InputFieldClass = twMerge(
    ` outline-none !border-none active:border-none focus:border-none font-light  ${
      labelInside ? (inputValue ? "pt-4" : "py-3") : ""
    }`,

    `
    ${className}`
  );
  const InputStype = {
    paddingLeft: `${prefixWidth}px`,
    paddingRight: `${suffixWidth}px`,
    ...style,
  };

  return (
    <div className="flex flex-col">
      {!labelInside && label && (
        <label className={`mb-1 ${labelClass}`}>
          {label} &nbsp;
          {required && <span>*</span>}
        </label>
      )}

      <div className={twMerge(`${mergedClassName} ${InputSize}`)}>
        {textarea ? (
          <textarea
            style={InputStype}
            {...inputProps}
            className={InputFieldClass}
          />
        ) : (
          <input
            style={InputStype}
            {...inputProps}
            className={` ${InputFieldClass} `}
          />
        )}
        {labelInside && inputValue && (
          <label
            htmlFor={id}
            className={twMerge(
              `absolute text-gray-500 top-0 left-1 transform  text-sm Transition`,
              ` ${labelClass}`
            )}
          >
            {label}
          </label>
        )}
        {errors && name && errors[name] && (
          <p className="text-red-500 m-0 p-0 text-sm">{`${errors[name].message}`}</p>
        )}
        {(prefix || suffix) && (
          <PrefixAndSuffix
            prefix={prefix}
            suffix={suffix}
            textarea={textarea}
            suffixClassName={suffixClassName}
            prefixClassName={prefixClassName}
            setPrefixWidth={setPrefixWidth}
            setSuffixWidth={setSuffixWidth}
            prefixDimension={prefixDimension}
            suffixDimension={suffixDimension}
          />
        )}
      </div>
    </div>
  );
};

export default TextField;
