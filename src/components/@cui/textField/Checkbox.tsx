'use client';
import React, { useEffect, useState } from 'react';
type ClassNameType = React.ComponentProps<'div'>['className'];

interface Props {
  checked?: boolean;
  onChange?: (e: boolean) => void;
  className?: ClassNameType;
}
const Checkbox = ({ checked = false, onChange, className }: Props) => {
  const [check, setChecked] = useState<boolean>();
  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const handleChange = () => {
    // const newChecked = !check; // toggle the check state
    // setChecked(newChecked); // update local state
    if (onChange) {
      // onChange(newChecked)
      onChange(!checked);
    }
  };
  return (
    <input
      className={`cursor-pointer checkbox ${className} `}
      type="checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
