"use client";
import { usePathname } from "next/navigation";
import React from "react";
interface Props {
  path: string;
  children: React.ReactNode;

  className?: React.ComponentProps<"div">["className"];
  notMatchClass?: React.ComponentProps<"div">["className"];
}
const IfPathname = ({
  path,
  children,
  className = "hidden",
}: Props) => {
  const pathname = usePathname();
  const match = pathname !== path;
  return (
    <div
      className={`${match ? `${className}` : ``}`}
    >
      {children}
    </div>
  );
};

export default IfPathname;
