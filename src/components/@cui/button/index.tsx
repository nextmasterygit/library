import React from "react";
import { twMerge } from "tailwind-merge";

// Define your base button classes and specific variant classes
const baseButtonClasses =
  "select-none inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ";

export const buttonVariant = {
  primaryClasses:
    "bg-primary text-primary-foreground hover:bg-primary/90 Transition",
  secondaryClasses:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 Transition",
  dangerClasses:
    "bg-destructive text-destructive-foreground hover:bg-destructive/80 Transition",
  successClasses:
    "bg-green-600 text-primary-foreground hover:bg-green-500 Transition",
  warningClasses:
    "bg-amber-600 text-primary-foreground hover:bg-amber-600/90 Transition",
  accentClass:
    "bg-background hover:bg-accent border border-border",
};

// Utility function to get the merged classes for a button variant

export const getButtonClasses = (
  variant:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "accent",
) => {
  switch (variant) {
    case "primary":
      return twMerge(
        baseButtonClasses,
        buttonVariant.primaryClasses,
      );
    case "secondary":
      return twMerge(
        baseButtonClasses,
        buttonVariant.secondaryClasses,
      );
    case "danger":
      return twMerge(
        baseButtonClasses,
        buttonVariant.dangerClasses,
      );
    case "success":
      return twMerge(
        baseButtonClasses,
        buttonVariant.successClasses,
      );
    case "warning":
      return twMerge(
        baseButtonClasses,
        buttonVariant.warningClasses,
      );
    case "accent":
      return twMerge(
        baseButtonClasses,
        buttonVariant.accentClass,
      );
    default:
      return baseButtonClasses;
  }
};

type VariantType =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "accent";
interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  props?: React.ComponentPropsWithoutRef<"button">;
  size?: "1" | "2" | "3";
  variant?: VariantType;
  disabled?: boolean;
}

const Button = ({
  children,
  className,
  size = "2",
  variant = "primary",
  ...props
}: Props) => {
  let sizeClassName = "";
  if (size === "1") {
    sizeClassName = "px-4 p-1";
  } else if (size === "2") {
    sizeClassName = "px-4 p-2";
  } else if (size === "3") {
    sizeClassName = "px-4 py-3";
  }
  return (
    <div>
      <button
        disabled={props.disabled}
        className={` ${twMerge(`${getButtonClasses(variant)} ${sizeClassName}`, `${className}`)} `}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
