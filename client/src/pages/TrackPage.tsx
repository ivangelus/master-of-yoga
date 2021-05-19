import './TrackPage.css';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { PoseDTO } from '../interfaces/PoseDTO';
import Footer from '../components/Footer';

import TrackPose from '../containers/TrackPose';

const TrackPage: React.FC = () => {
  const { level } = useParams<{
    level: 'beginner' | 'intermediate' | 'advanced' | 'custom';
  }>();
  const routines = useAppSelector((state: RootState) => state.routines);
  const title = level[0].toUpperCase() + level.slice(1);
  const history = useHistory();
  let description;
  let routine: PoseDTO[] = [];

  if (level !== 'custom') {
    description = routines.descriptions[level];
    routine = routines[level];
  } else {
    const userRoutine = useAppSelector((state) => state.users.customTracks);
    description = 'Your own customized Yoga routine. Enjoy!';
    if (userRoutine) routine = userRoutine;
  }

  const handleClick = (): void => {
    history.push(`/pose/${level}/0`);
  };

  return (
    <div className="track-page-container">
      <div className="title__container">
        <div className="title">{title}</div>
      </div>
      <div className="level-description-paragraph">{description}</div>
      <div className="btn__start__container">
        <button onClick={handleClick} className="btn-start-routine">
          <p>Start {title} Track</p>
        </button>
      </div>
      {routine.map((routine: PoseDTO, index: number) => (
        <TrackPose key={routine.id} routine={routine} index={index} />
      ))}
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
};

export default TrackPage;
