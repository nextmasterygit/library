import { useState, useCallback } from "react";

// use only in tsx
export const useDebounceCallback = <
  T extends (...args: any[]) => void,
>(
  func: T,
  delay: number,
) => {
  // eslint-disable-next-line no-undef
  const [timer, setTimer] =
    useState<NodeJS.Timeout | null>(null);
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer);
      const newTimer = setTimeout(() => {
        func(...args);
      }, delay);
      setTimer(newTimer);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return debouncedCallback;
};

// use anywhere in ts and tsx
export const debounce = <
  T extends (...args: any[]) => void,
>(
  func: T,
  delay: number,
) => {
  let timeoutId: any;

  return function (...args: any) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

//use  debounce and useDebounce // same procedure
//   const debouncedFunction = useDebounceCallback((value: string) => {
//     console.log(value);
//   }, 500);
//     debouncedFunction(value);

//   const debouncedFunction = useDebounceCallback(() => {
//     ...contents
//   }, 500);

//difference useDebounceCallback vs debounce
// useDebounceCallback is React-specific and relies on React hooks (useState, useCallback), making it suited for use within React components where the debounced function needs to be tied to the component’s render cycle.
// debounce is a general-purpose debouncing function that can be used in any JavaScript code, not tied to React, and uses simple variable scoping rather than React’s state.

// detail
// Debouncing is a technique used to limit the rate at which a function is executed. It ensures that the function is only called after a certain amount of time has passed since the last invocation. This is useful for cases where a function is triggered multiple times in quick succession, like handling user input in a search bar.

// For example, if a user types in a search field, instead of making a request every time a key is pressed, debouncing ensures that the request is made only after the user stops typing for a specified period (e.g., 300ms). This improves performance and reduces unnecessary operations.

// In short, debouncing delays the execution of a function until after a certain "quiet" period of no activity.
