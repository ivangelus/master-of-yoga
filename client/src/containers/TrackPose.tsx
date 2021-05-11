import './TrackPose.css';
import React from 'react';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  console.log('routine', routine);
  return (
    <div className="track-pose-container">
      <div className="pose-image-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
            borderRadius: '5%',
            boxShadow: '0 0 10px gray',
          }}
          src={routine.imageAddress}
          alt="Yoga Pose"
        />
      </div>
      <div>
        <div className="content-container">
          <div className="routine-name">
            {index + 1}. {routine.name}
          </div>
          <div className="routine-description">{routine.description}</div>
        </div>
        <div className="progress-container">
          <button className="btn-progress-practice">PRACTICE</button>
        </div>
      </div>
    </div>
  );
};

export default TrackPose;
