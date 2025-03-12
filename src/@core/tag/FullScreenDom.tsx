'use client';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ClassNameType } from '../../props';
import { twMerge } from 'tailwind-merge';

interface FullScreenDomType {
  open: boolean;
  children: React.ReactNode;
  className?: ClassNameType;
}
const FullScreenDom = ({ open, children, className }: FullScreenDomType) => {
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden'; // Disable HTML scroll
    } else {
      document.documentElement.style.overflow = ''; // Restore HTML scroll
    }

    return () => {
      document.documentElement.style.overflow = ''; // Cleanup on unmount
    };
  }, [open]);

  return open
    ? ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-background z-modal">
          {/* ✅ Wrap with a relative div so measurements work */}
          <div
            className={twMerge(
              'relative w-full h-full overflow-auto',
              className,
            )}
          >
            {children}
          </div>
        </div>,
        document.getElementById('modal-root') ?? document.body,
      )
    : children;
};

export default FullScreenDom;
