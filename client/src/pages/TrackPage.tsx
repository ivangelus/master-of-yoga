import './TrackPage.css';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import faceBookLogo from '../assets/facebook-32.png';
import twitterLogo from '../assets/twitter-32.png';
import instagramLogo from '../assets/instagram-32.png';
import linkedinLogo from '../assets/linkedin-32.png';
import { PoseDTO } from '../interfaces/PoseDTO';

import TrackPose from '../containers/TrackPose';

const TrackPage: React.FC = () => {
  const { level } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced';
  }>();
  const routines = useAppSelector((state: RootState) => state.routines);
  const description = routines.descriptions[level];
  const routine = routines[level];

  const [clicked, setClicked] = useState<
    ('easy' | 'medium' | 'hard' | 'unclicked')[]
  >([]);

  const title = level[0].toUpperCase() + level.slice(1);

  const history = useHistory();

  const handleClick = (): void => {
    history.push(`/pose/${level}/0`);
  };

  useEffect(() => {
    const newClickedState: ('easy' | 'medium' | 'hard' | 'unclicked')[] = [];
    routine.forEach((el) => {
      newClickedState.push('unclicked');
    });
    setClicked(newClickedState);
  }, []);
  return (
    <div className="track-page-container">
      <div className="title__container">
        <div className="title">{title}</div>
      </div>
      <div className="level-description-paragraph">{description}</div>
      <div className="btn__start__container">
        <button onClick={handleClick} className="btn-start-routine">
          START
        </button>
      </div>
      {routine.map((routine: PoseDTO, index: number) => (
        <TrackPose
          clicked={clicked}
          setClicked={setClicked}
          key={routine.id}
          routine={routine}
          index={index}
        />
      ))}
    </div>
  );
};

export default TrackPage;
