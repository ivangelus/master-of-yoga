import './TrackPose.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  const changeBackground = changeColor();
  const history = useHistory();

  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('#fff');
  const [color3, setColor3] = useState('#fff');

  const handleClick = (): void => {
    history.push(`/pose/${routine.level}/${index}`);
  };
  function changeColor(): any {
    let state = 'unclicked';
    return function changeBackground(num: number): void {
      console.log('This is state -->', state);
      if (num === 1 && state === 'unclicked') {
        setColor1('green');
        state = 'clicked';
        console.log(state);
      } else if (num === 1 && state === 'clicked') {
        setColor1('orange');
        state = 'unclicked';
      }
    };
  }

  return (
    <div className="allTracks__container">
      <div className="track-pose-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
            marginRight: '-3rem',
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
          {/* <button
            onClick={() => changeBackground(1)}
            style={{ backgroundColor: color1 }}
            className="levels__btn easy"
          >
            Easy
          </button>
          <button
            onClick={() => changeBackground(2)}
            style={{ backgroundColor: color2 }}
            className="levels__btn medium"
          >
            Medium
          </button>
          <button
            onClick={() => changeBackground(3)}
            style={{ backgroundColor: color3 }}
            className="levels__btn hard"
          >
            Hard
          </button> */}
          <label>
          EASY
          <input  name="levelOption" className="level__inputs" type="radio"/>
          </label>
          <label>
          MEDIUM
          <input name="levelOption" className="level__inputs" type="radio"/>
          </label>
          <label>
          HARD
          <input name="levelOption" className="level__inputs" type="radio"/>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TrackPose;
