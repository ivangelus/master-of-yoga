import './TrackPose.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  const history = useHistory();

  const [color1, setColor1] = useState('#f5f6fa');
  const [color2, setColor2] = useState('#f5f6fa');
  const [color3, setColor3] = useState('#f5f6fa');
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);

  const handleClick = (): void => {
    history.push(`/pose/${routine.level}/${index}`);
  };

  const handleChange = (event: any) => {
    setSliderValue(event.target.value);
  };

  // function changeColor(num: number, state: boolean) {
  //   if (num === 1) {
  //     setColor1('#27ae60');
  //     setColor2('#f5f6fa');
  //     setColor3('#f5f6fa');
  //     setClicked1(!state);
  //     return;
  //   } else if (num === 2) {
  //     setColor1('#f5f6fa');
  //     setColor2('#f1c40f');
  //     setColor3('#f5f6fa');
  //     setClicked2(!state);
  //     return;
  //   } else {
  //     setColor1('#f5f6fa');
  //     setColor2('#f5f6fa');
  //     setColor3('#c0392b');
  //     setClicked3(!state);
  //   }
  // }
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
          <div className="levels__container--labels">
            <p>Hard</p>
            <p>Intermediate</p>
            <p>Beginner</p>
          </div>
          <div className="levels__container--slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleChange}
              className="levels__container--rangeSlider"
            />
          </div>
        </div>
        {/* <div className="levels__container"> */}
        {/* <input type="range" min="0" max="100" value={sliderValue} onChange={handleChange} className="range__slider"/> */}
        {/* <button
            onClick={() => changeColor(1, clicked1)}
            style={{ backgroundColor: color1 }}
            className="levels__btn easy"
          >
            <p className="btn__text">Easy</p>
          </button>
          <button
            onClick={() => changeColor(2, clicked2)}
            style={{ backgroundColor: color2 }}
            className="levels__btn medium"
          >
            <p className="btn__text">Medium</p>
          </button>
          <button
            onClick={() => changeColor(3, clicked3)}
            style={{ backgroundColor: color3 }}
            className="levels__btn hard"
          >
            <p className="btn__text">Hard</p>
          </button> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default TrackPose;
