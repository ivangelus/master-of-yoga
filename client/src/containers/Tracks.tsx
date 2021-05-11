import './Tracks.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props {
  title: string;
}

const Tracks: React.FC<Props> = ({ title }: Props) => {
  const history = useHistory();
  const handleClick = (): void => {
    history.push(`trackPage/${title}`)
  };

  return (
    <div className="tracks-container">
      <h2>{title}</h2>
      <div className="progressbar-container">
        <CircularProgressbar
          value={70}
          text={`${70} %`}
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
              stroke: '	#32CD32',
            },
            text: {
              fill: '#808080',
            },
          }}
          strokeWidth={10}
        />
      </div>
      <button onClick={handleClick} className="btn-start">
        START
      </button>
    </div>
  );
};

export default Tracks;
