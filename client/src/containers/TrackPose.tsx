import './TrackPose.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import Instructions from '../components/Instructions';
import Arrow from '../assets/BlackArrow.svg';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useAppSelector } from '../redux/hooks';

interface Props {
  routine: PoseDTO;
  index: number;
}

const TrackPose: React.FC<Props> = ({ routine, index }: Props) => {
  const history = useHistory();

  // const [sliderValue, setSliderValue] = useState(50);
  // const [instructions, setInstructions] = useState(false);

  const posesCompletion = useAppSelector(
    (state) => state.users.posesCompletion
  );

  // const posesCompletion = [
  //   {
  //     id: 'heroPose',
  //     level: 'beginner',
  //     percentage: 87,
  //   },
  //   {
  //     id: 'catPose',
  //     level: 'beginner',
  //     percentage: 17,
  //   },
  //   {
  //     id: 'cobraPose',
  //     level: 'beginner',
  //     percentage: 100,
  //   },
  //   {
  //     id: 'fireLogPose',
  //     level: 'intermediate',
  //     percentage: 65,
  //   },
  //   {
  //     id: 'noosePose',
  //     level: 'intermediate',
  //     percentage: 45,
  //   },
  //   {
  //     id: 'bigToePose',
  //     level: 'intermediate',
  //     percentage: 10,
  //   },
  //   {
  //     id: 'fireflyPose',
  //     level: 'advanced',
  //     percentage: 17,
  //   },
  //   {
  //     id: 'sideRecliningLegLiftPose',
  //     level: 'advanced',
  //     percentage: 28,
  //   },
  //   {
  //     id: 'peacockPose',
  //     level: 'advanced',
  //     percentage: 34,
  //   },
  // ];

  const handleClick = (): void => {
    history.push(`/pose/${routine.level}/${index}`);
  };

  // const handleChange = (event: any) => {
  //   setSliderValue(event.target.value);
  // };

  // const renderInstructions = () => {
  //   setTimeout(() => {
  //     setInstructions((instructions) => !instructions);
  //   }, 1000);
  // };

  // const removeInstructions = () => {
  //   setTimeout(() => {
  //     setInstructions((instructions) => !instructions);
  //   }, 500);
  // };

  let completionPercentage = 0;
  for (let i = 0; i < posesCompletion.length; i++) {
    if (posesCompletion[i].id === routine.id) {
      completionPercentage = posesCompletion[i].percentage;
    }
  }

  return (
    <div className="allTracks__container">
      <div className="track-pose-container">
        <img
          style={{
            height: '300px',
            width: '400px',
            objectFit: 'cover',
            borderRadius: '2rem',
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
        <div className="progressBar-container">
          <CircularProgressbar
            value={completionPercentage}
            text={`${completionPercentage} %`}
            circleRatio={0.7}
            styles={{
              trail: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
              },
              path: {
                strokeLinecap: 'butt',
                transform: 'rotate(-126deg)',
                transformOrigin: 'center center',
                stroke: 'rgb(0, 204, 187)',
              },
              text: {
                fill: 'rgb(0, 204, 187)',
              },
            }}
            strokeWidth={10}
          />
        </div>
        {/* <div className="levels__container">
          <div className="levels__container__instructions">
            {instructions ? (
              <Instructions />
            ) : (
              <div className="SelectLevel__Container">
                <p>Select level of strictness</p>
                <img src={Arrow} />
              </div>
            )}
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
        </div> */}
      </div>
    </div>
  );
};

export default TrackPose;
