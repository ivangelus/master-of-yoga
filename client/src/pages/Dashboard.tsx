import './Dashboard.css';
import * as tf from '@tensorflow/tfjs';
import React, { useEffect } from 'react';

import { RootState } from '../redux/store';
import { loadModel } from '../redux/classifierSlice';
import { updateRoutines } from '../redux/routinesSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { getRoutines } from '../services/server';

import UserCard from '../containers/UserCard';
import Tracks from '../containers/Tracks';
import Tips from '../containers/Tips';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const routine = useAppSelector((state: RootState) => state.routines);
  const classifierReady = useAppSelector((state) => state.classifier.isReady);

  useEffect(() => {
    if (routine.intermediate.length === 0) {
      (async (): Promise<void> => {
        const data = await getRoutines();
        dispatch(updateRoutines(data));
      })();
    }

    if (!classifierReady) {
      (async () => {
        const classifier = await tf.loadLayersModel('./tfjs_model/model.json');
        await classifier.save('localstorage://master-yoga-classifier'); // saving to local storage

        const response = await fetch('./tfjs_model/labels_index.json');
        const labels = await response.json();

        dispatch(loadModel({ labels: labels.labels_id }));
      })();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-up">
        <UserCard />
        <Tips />
      </div>
      <div className="dashboard-content-down">
        <Tracks title="beginner" />
        <Tracks title="intermediate" />
        <Tracks title="advanced" />
      </div>
    </div>
  );
};

export default Dashboard;
