"use client";
import React, {
  FC,
  useId,
  useState,
} from "react";

import { format, isValid, parse } from "date-fns";
import { Calendar } from "../../../ui/calendar";

import {
  PopOver,
  PopOverContent,
  PopOverTrigger,
} from "../../../../@core/common/popOver/PopOver";
import Shadow from "../../../../@core/tag/Shadow";
import TextField from "../../textField/TextField";

interface Props {
  selectedDate: Date | undefined;
  setSelectedDate: (
    date: Date | undefined,
  ) => void;
}
const InputDatePicker: FC<Props> = ({
  selectedDate,
  setSelectedDate,
}) => {
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const inputId = useId();
  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state

  // Hold the input value in state
  const [inputValue, setInputValue] = useState(
    selectedDate
      ? format(selectedDate, "dd/MM/yyyy")
      : "",
  );

  const handleDayPickerSelect = (
    date: Date | undefined,
  ) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setMonth(date);
      setInputValue(format(date, "dd/MM/yyyy"));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const inputValue = e.target.value.replace(
      /[^\d]/g,
      "",
    ); // Remove non-digit characters
    let formattedValue = "";

    if (inputValue.length <= 2) {
      formattedValue = inputValue;
    } else if (inputValue.length <= 4) {
      formattedValue = `${inputValue.slice(0, 2)}-${inputValue.slice(2)}`;
    } else {
      formattedValue = `${inputValue.slice(0, 2)}-${inputValue.slice(
        2,
        4,
      )}-${inputValue.slice(4, 8)}`;
    }

    setInputValue(formattedValue); // Keep the input value in sync

    if (formattedValue.length === 10) {
      // Only parse if the date format is complete
      const parsedDate = parse(
        formattedValue,
        "dd-MM-yyyy",
        new Date(),
      );

      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        setMonth(parsedDate);
      } else {
        setSelectedDate(undefined);
      }
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <div>
      <PopOver>
        <PopOverTrigger>
          <div className="flex items-center space-x-2">
            <TextField
              id={inputId}
              inputSize="0"
              maxlength="10"
              size="9"
              onChange={handleInputChange}
              type="text"
              value={inputValue}
              placeholder="dd-MM-yyyy"
            />
          </div>
        </PopOverTrigger>
        <PopOverContent>
          <Shadow space="0">
            <Calendar
              month={month}
              onMonthChange={setMonth}
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
              footer={
                <p
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  Selected:{" "}
                  {selectedDate?.toDateString()}
                </p>
              }
            />
          </Shadow>
        </PopOverContent>
      </PopOver>
    </div>
  );
};
export default InputDatePicker;
