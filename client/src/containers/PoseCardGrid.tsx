import React from 'react';
import './PoseCardGrid.css';
import { PoseDTO } from '../interfaces/PoseDTO';

import PoseCard from './PoseCard';
import Footer from '../components/Footer';

interface Props {
  posesArray: PoseDTO[];
  customTrack: PoseDTO[];
  handleOnDrag: (pose: PoseDTO) => void;
  handleOnDrop: (pose: PoseDTO) => void;
  handleClick: (input: HTMLInputElement, pose: PoseDTO) => void;
}

const PoseCardGrid: React.FC<Props> = ({
  posesArray,
  customTrack,
  handleOnDrag,
  handleOnDrop,
  handleClick,
}: Props) => {
  const sortArray = (arrayOfPoses: PoseDTO[]): PoseDTO[] => {
    return arrayOfPoses.sort((a, b) => (a.id > b.id ? 1 : -1));
  };

  return (
    <div className="card-grid">
      {customTrack.length ? <h2>Your Custom Track!</h2> : ''}
      <div className="custom-card-grid">
        {customTrack.map((pose: PoseDTO) => (
          <PoseCard
            key={pose.id}
            pose={pose}
            handleOnDrag={handleOnDrag}
            handleOnDrop={handleOnDrop}
            handleClick={handleClick}
            checked={true}
          />
        ))}
      </div>
      <div className="always-cards-grid">
        {sortArray(posesArray).map((pose: PoseDTO) => (
          <PoseCard
            key={pose.id}
            pose={pose}
            handleOnDrag={handleOnDrag}
            handleOnDrop={handleOnDrop}
            handleClick={handleClick}
            checked={false}
          />
        ))}
      </div>
    </div>
  );
};

export default PoseCardGrid;
