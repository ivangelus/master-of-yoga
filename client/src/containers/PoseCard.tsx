import './PoseCard.css';
import React from 'react';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  pose: PoseDTO;
  checked: boolean;
  handleClick: (input: HTMLInputElement, pose: PoseDTO) => void;
}

const PoseCard: React.FC<Props> = ({ pose, checked, handleClick }: Props) => {
  const handleCardClick = () => {
    const checkBox = document.getElementById(pose.id) as HTMLInputElement;
    checkBox.checked = !checkBox.checked;
    handleClick(checkBox, pose);
  };

  return (
    <div className="pose-card" onClick={handleCardClick}>
      <div className="pose-card-choice">
        <input
          id={pose.id}
          type="checkbox"
          value={pose.id}
          defaultChecked={checked}
        />
        <h3>{pose.name.split(' ').slice(0, -1).join(' ')}</h3>
      </div>
      <div className="pose-card-image">
        <img src={pose.imageAddress} />
      </div>
    </div>
  );
};

export default PoseCard;
