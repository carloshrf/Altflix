import React from 'react';

import Backdrop from './Backdrop';
import ModalWindow from './Modal';

export default function Modal({
  children, show, modalClosed,
}) {
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <ModalWindow show={show}>
        { children }
      </ModalWindow>
    </>
  );
}
