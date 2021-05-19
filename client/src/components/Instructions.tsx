import React from 'react';
import './Instructions.css';
import arrow from '../assets/Arrow.svg';

const Instructions: React.FC = () => {
  return (
    <div className="main__instructions__container">
      <div className="instructions__container--hard">
        <p className="hard__instructions-text">
          Hard: Looking for a challenge? Then this setting is for you. Perfect
          Poses Only!
        </p>
        <img className="arrow" src={arrow} />
      </div>
      <div className="instructions__container--intermediate">
        <div className="intermediate__instructions-text">
          Intermediate: Choose this setting if are comfortable enough with the
          pose.
        </div>
        <img className="arrow" src={arrow} />
      </div>
      <div className="instructions__container--beginner">
        <div className="beginner__instructions-text">
          Beginner: Room for Improvement is welcomed here, choose this setting
          if you are starting out.
        </div>
        <img className="arrow" src={arrow} />
      </div>
    </div>
  );
};

export default Instructions;
