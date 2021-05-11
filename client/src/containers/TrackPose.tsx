import './TrackPose.css';
import React from 'react';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  routine: PoseDTO;
}

const TrackPose: React.FC<Props> = ({ routine }: Props) => {
  console.log('routine', routine);
  return (
    <div className="track-pose-container">
      <div className="image-container">
        <img src={routine.imageAddress} alt="Yoga Pose" />
      </div>
      <div className="content-container">
        <div>{routine.name}</div>
        <div>{routine.description}</div>
      </div>
    </div>
  );
};

export default TrackPose;
