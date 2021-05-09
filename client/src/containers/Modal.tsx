import './Modal.css';
import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { closeModal } from '../redux/modalSlice';

interface Props {
  children?: ReactNode;
}

const Modal: React.FC<Props> = ({ children }: Props) => {
  const portalDiv = document.getElementById('portal');
  if (!portalDiv) return null;

  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.value);
  if (!modal) return null;

  const handleClick = () => {
    dispatch(closeModal());
  };

  return ReactDom.createPortal(
    <>
      <div className="modal-overlay" onClick={handleClick} />
      <div className="modal-style">
        <button className="modal-close" onClick={handleClick}>
          X
        </button>
        {children}
      </div>
    </>,
    portalDiv
  );
};

export default Modal;
