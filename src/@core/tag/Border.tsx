import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  props?: React.ComponentPropsWithoutRef<"div">;
  className?: React.ComponentProps<"div">["className"];
  children: React.ReactNode;
  space?: "1" | "2";
}
const Border = ({
  children,
  className,
  space,
  ...props
}: Props) => {
  let spacing = "p-1";
  if (space === "1") {
    spacing = "p-4 py-10";
  } else if (space === "2") {
    spacing = "p-6 py-12";
  }
  const mergedClassName = twMerge(
    `bg-card rounded-lg text-card-foreground border border-border ${spacing}`,
    className,
  );
  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
};

export default Border;
