import './GetReadyMarker.css';
import React from 'react';

interface Props {
  isHidden: boolean;
}

const GetReadyMarker: React.FC<Props> = ({ isHidden }: Props) => {
  return <div className="getReady_marker"></div>;
};

export default GetReadyMarker;
