import React from 'react';
import './CircularProgressBar.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';

interface Props {
  progress: number;
}

const CircularProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return (
    <div className="progressbar-container">
      <CircularProgressbar
        value={progress}
        text={`${progress} %`}
        circleRatio={0.7}
        styles={{
          trail: {
            strokeLinecap: 'butt',
            transform: 'rotate(-126deg)',
            transformOrigin: 'center center',
          },
          path: {
            strokeLinecap: 'butt',
            transform: 'rotate(-126deg)',
            transformOrigin: 'center center',
            stroke: 'rgb(0, 204, 187)',
          },
          text: {
            fill: 'rgb(0, 204, 187)',
          },
        }}
        strokeWidth={10}
      />
    </div>
  );
};

export default CircularProgressBar;
