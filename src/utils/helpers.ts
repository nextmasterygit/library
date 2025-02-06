import { format } from "date-fns";
export const formatDate = (
  date: Date | string,
  formatting: string = "dd-MM-yyyy"
) => {
  return format(date, formatting);
};

export const currencyFormatter = (
  value: number,
  currency: "PKR" | "SAR" | "EUR" | "JPY" | "USD" | "INR" | null = null,
  format: "en-PK" | "en-US" | "de-DE" | "ja-JP" | "en-IN" = "en-US"
): string => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
  };

  if (currency) {
    options.style = "currency";
    options.currency = currency;
  }

  const numberFormatter = new Intl.NumberFormat(format, options);

  // We format the absolute value of the provided number to handle both positive and negative values.
  let formattedValue = numberFormatter.format(Math.abs(value));

  // If the value is negative, adjust the formatting
  if (value < 0) {
    if (currency) {
      formattedValue = formattedValue.replace(/^(\D+)/, "$1-");
    } else {
      formattedValue = `-${formattedValue}`;
    }
  }

  return formattedValue;
};

export const getNestedProperty = (
  obj: Record<string, any>,
  propertyKey: string
) => {
  return propertyKey.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export const hasObjectValues = (obj: Record<string, any>) => {
  return obj && Object.keys(obj).length > 0;
};
