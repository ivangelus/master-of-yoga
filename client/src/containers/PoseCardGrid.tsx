import React from 'react';
import './PoseCardGrid.css';
import { PoseDTO } from '../interfaces/PoseDTO';

import PoseCard from './PoseCard';

interface Props {
  posesArray: PoseDTO[];
  customTrack: PoseDTO[];
  handleClick: (input: HTMLInputElement) => void;
}

const PoseCardGrid: React.FC<Props> = ({
  posesArray,
  customTrack,
  handleClick,
}: Props) => {
  const sortArray = (arrayOfPoses: PoseDTO[]): PoseDTO[] => {
    return arrayOfPoses.sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  return (
    <div className="card-grid">
      {customTrack.map((pose: PoseDTO) => (
        <PoseCard key={pose.id} pose={pose} handleClick={handleClick} />
      ))}
      {sortArray(posesArray).map((pose: PoseDTO) => (
        <PoseCard key={pose.id} pose={pose} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default PoseCardGrid;
