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
      <h1>This is the track pose component</h1>
    </div>
  );
};

export default TrackPose;
