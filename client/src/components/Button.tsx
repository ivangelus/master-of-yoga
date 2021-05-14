import './Button.css';
import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
  styles?: React.CSSProperties;
}

const Button: React.FC<Props> = ({ label, onClick, styles }: Props) => {
  return (
    <button className="btn-main" style={styles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
