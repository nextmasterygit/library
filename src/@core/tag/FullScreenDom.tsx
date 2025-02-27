import React from 'react';
import ReactDOM from 'react-dom';

interface FullScreenDomType {
  open: boolean;
  children: React.ReactNode;
}
const FullScreenDom = ({ open, children }: FullScreenDomType) => {
  return open
    ? ReactDOM.createPortal(
        children,
        document.getElementById('modal-root') ?? document.body,
      )
    : children;
};

export default FullScreenDom;
