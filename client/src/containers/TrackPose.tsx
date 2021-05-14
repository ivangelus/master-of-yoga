import './TrackPose.css';
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  routine: PoseDTO;
  index: number;
  /*setClicked: Dispatch<
    SetStateAction<('easy' | 'medium' | 'hard' | 'unclicked')[]>
  >;
  clicked: ('easy' | 'medium' | 'hard' | 'unclicked')[];*/
}

const TrackPose: React.FC<Props> = ({
  routine,
  index,
}: /*setClicked,
  clicked,*/
Props) => {
  const history = useHistory();

  const [color1, setColor1] = useState('#fff');
  const [color2, setColor2] = useState('#fff');
  const [color3, setColor3] = useState('#fff');
  //const [clicked, setClicked] = useState(false);
  const handleClick = (): void => {
    history.push(`/pose/${routine.level}/${index}`);
  };

  function changeColor1(num: number) {
    if (num === 1) {
      setColor1('green');
      setColor2('#fff');
      setColor3('#fff');
    } else if (num === 2) {
      setColor1('#fff');
      setColor2('yellow');
      setColor3('#fff');
    } else if (num === 3) {
      setColor1('#fff');
      setColor2('#fff');
      setColor3('red');
    }
  }

  /*function changeColor(num: number): void {
    setClicked((oldClicked) => {
      const newState = oldClicked.slice();
      if (num === 1) newState[index] = 'easy';
      if (num === 2) newState[index] = 'medium';
      if (num === 3) newState[index] = 'hard';
      return newState;
    });
    if (num === 1) {
      setColor1('green');
      setColor2('#fff');
      setColor3('#fff');
    } else if (num === 2) {
      setColor1('#fff');
      setColor2('yellow');
      setColor3('#fff');
    } else if (num === 3) {
      setColor1('#fff');
      setColor2('#fff');
      setColor3('red');
    }
  }*/

  return (
    <div className="allTracks__container">
      <div className="track-pose-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
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
          <button
            onClick={() => changeColor1(1)}
            style={{ backgroundColor: color1 }}
            className="levels__btn easy"
          >
            Easy
          </button>
          <button
            onClick={() => changeColor1(2)}
            style={{ backgroundColor: color2 }}
            className="levels__btn medium"
          >
            Medium
          </button>
          <button
            onClick={() => changeColor1(3)}
            style={{ backgroundColor: color3 }}
            className="levels__btn hard"
          >
            Hard
          </button>
          {/* <label>
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
          </label> */}
        </div>
      </div>
    </div>
  );
};

export default TrackPose;
