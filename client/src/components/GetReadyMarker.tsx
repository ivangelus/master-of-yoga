import './GetReadyMarker.css';
import React from 'react';

interface Props {
  isHidden: boolean;
}

const GetReadyMarker: React.FC<Props> = ({ isHidden }: Props) => {
  function renderMarker() {
    if (isHidden) return '';
    else return 'getReady_marker';
  }
  function renderText() {
    if (isHidden) return 'hidden';
    else return 'getReady_text';
  }
  return (
    <div className="container">
      <div className={renderText()}>
        Get ready for the next pose
        <div className={renderMarker()}></div>
      </div>
    </div>
  );
};

export default GetReadyMarker;
