import './Modal.css';
import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { closeModal } from '../redux/modalSlice';

import Button from '../components/Button';

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
        {children}
        <Button label="Close" onClick={handleClick} />
        {/* <button onClick={handleClick}>Close</button> */}
      </div>
    </>,
    portalDiv
  );
};

export default Modal;
