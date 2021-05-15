import './TrackPose.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import Instructions from '../components/Instructions';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  const history = useHistory();

  // const [color1, setColor1] = useState('#f5f6fa');
  // const [color2, setColor2] = useState('#f5f6fa');
  // const [color3, setColor3] = useState('#f5f6fa');
  // const [clicked1, setClicked1] = useState(false);
  // const [clicked2, setClicked2] = useState(false);
  // const [clicked3, setClicked3] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [instructions, setInstructions] = useState(false);

  const handleClick = (): void => {
    history.push(`/pose/${routine.level}/${index}`);
  };

  const handleChange = (event: any) => {
    setSliderValue(event.target.value);
  };

  const renderInstructions = () => {
    setTimeout(() => {
      setInstructions((instructions) => !instructions);
    }, 1000);
  };

  const removeInstructions = () => {
    setTimeout(() => {
      setInstructions((instructions) => !instructions);
    }, 500);
  };

  return (
    <div className="allTracks__container">
      <div className="track-pose-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
            borderRadius: '50%',
          }}
          src={routine.imageAddress}
          alt="Yoga Pose"
        />
        <div className="pose-content-container">
          <div className="routine-name">
            {index + 1}. {routine.name}
          </div>
          <div className="routine-description">{routine.description}</div>
          <button onClick={handleClick} className="btn-progress-practice">
            PRACTICE
          </button>
        </div>
        <div className="levels__container">
          <div className="levels__container__instructions">
            {instructions ? <Instructions /> : ''}
          </div>
          <input
            onMouseEnter={renderInstructions}
            onMouseLeave={removeInstructions}
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleChange}
            className="levels__container--rangeSlider"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackPose;
