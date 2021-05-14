import React from 'react';
import './Instructions.css';
import greenArrow from '../assets/greenArrow.svg';
import yellowArrow from '../assets/yellowArrow.svg';
import redArrow from '../assets/redArrow.svg';

const Instructions = () => {
  return (
    <div className="main__instructions__container">
      <div className="instructions__container">
        <div className="hard__instructions-text">
          Hard: Looking for a challenge? Then this setting is for you. Perfect
          Poses Only!
        </div>
        <img className="arrow" src={redArrow} />
      </div>
      <div className="instructions__container">
        <div className="intermediate__instructions-text">
          Intermediate: Choose this setting if are comfortable enough with the
          pose.
        </div>
        <img className="arrow" src={yellowArrow} />
      </div>
      <div className="instructions__container">
        <div className="beginner__instructions-text">
          Beginner: Room for Improvement is welcomed here, choose this setting
          if you are starting out.
        </div>
        <img className="arrow" src={greenArrow} />
      </div>
    </div>
  );
};

export default Instructions;
