'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { usePopOver } from '../../customHooks/usePopOver';
import Iconify from '../icon';

interface PopOverProps {
  children: ReactNode;
  toggle?: boolean;
  style?: 'dropdown' | 'popover';
  layout?: 'open' | 'fixed' | 'close';
  mouseTrigger?: boolean;
  setIsOpen?: (b: boolean) => void;
}

export const PopOver: FC<PopOverProps> = ({
  children,
  toggle,
  style,
  layout,
  mouseTrigger,
  setIsOpen,
}) => {
  const {
    open,
    divRef,
    setOpen,
    dropdownPositionClass,
    dropdownLeftPositionClass,
    shouldOpenUpwards,
  } = usePopOver();
  useEffect(() => {
    if (layout === 'open') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [layout, setOpen]);
  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  }, [open, setOpen]);
  return (
    <div
      className="relative "
      ref={divRef}
      onMouseLeave={() => {
        if (mouseTrigger && setOpen) setOpen(false);
        if (mouseTrigger && setIsOpen) setIsOpen(false);
      }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            setOpen,
            open,
            divRef,
            dropdownPositionClass,
            shouldOpenUpwards,
            dropdownLeftPositionClass,
            toggle,
            style,
            layout,
            mouseTrigger,
            setIsOpen,
          } as any);
        }
        return child;
      })}
    </div>
  );
};

interface PopOverTriggerProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  shouldOpenUpwards: boolean;
  style?: string;
  divRef: React.RefObject<HTMLDivElement>;
  mouseTrigger: boolean;
  setIsOpen?: (b: boolean) => void;
}

export const PopOverTrigger: FC<Partial<PopOverTriggerProps>> = ({
  children,
  open,
  setOpen,
  shouldOpenUpwards,
  style,
  mouseTrigger,
  setIsOpen,
}) => {
  const handleTrigger = () => {
    if (setOpen) {
      setOpen(!open);
      if (setIsOpen) {
        setIsOpen(!open);
      }
    }
  };
  const content = () => (
    <div className=" cursor-pointer ">
      {style === 'dropdown' ? null : (
        <>
          {open && !shouldOpenUpwards && (
            <div className=" absolute top-[80%] ">
              <Iconify
                fontSize="2rem"
                icon="iconamoon:arrow-up-2-thin"
                className="text-shadow-md opacity-50 iconPrimary "
              />
            </div>
          )}
          {open && shouldOpenUpwards && (
            <div className=" absolute bottom-[80%]">
              <Iconify
                fontSize="2rem"
                icon="iconamoon:arrow-down-2-thin"
                className="text-shadow-md opacity-50 iconPrimary"
              />
            </div>
          )}
        </>
      )}
      <div>{children}</div>
    </div>
  );
  return (
    <div className="relative">
      <div
        onClick={handleTrigger}
        onMouseEnter={mouseTrigger ? handleTrigger : undefined}
      >
        {content()}
      </div>
    </div>
  );
};

interface PopOverContentProps {
  children: ReactNode;
  divRef: React.RefObject<HTMLDivElement>;
  open: boolean;
  setOpen: (open: boolean) => void;
  dropdownPositionClass: string;
  dropdownLeftPositionClass: string;
  toggle?: boolean;
  style?: string;
  layout?: string;
  mouseTrigger?: boolean;
  toggleOnContent?: boolean;
}

export const PopOverContent: FC<Partial<PopOverContentProps>> = ({
  children,
  open,
  setOpen,
  dropdownPositionClass,
  dropdownLeftPositionClass,
  toggle,
  style,
  layout,
  mouseTrigger,
  toggleOnContent = true,
}) => {
  return open || layout === 'fixed' ? (
    <div
      onMouseLeave={() =>
        toggleOnContent && mouseTrigger && setOpen ? setOpen(false) : {}
      }
      onClick={() =>
        toggleOnContent && toggle ? setOpen && setOpen(false) : null
      }
    >
      <div
        className={` absolute min-w-max z-popOver  ${
          style === 'dropdown' ? 'w-max' : `w-auto my-3 `
        } ${dropdownLeftPositionClass}  ${dropdownPositionClass} `}
      >
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
