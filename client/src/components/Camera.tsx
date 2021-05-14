import { initClassifier, initPoseNet } from '../utilities/initModels';
import { Classifier } from '../interfaces/ClassifierDTO';
import React, { useRef, useEffect, useState } from 'react';
import { detect } from '../utilities/cameraHelpers';
import { useAppSelector } from '../redux/hooks';
import type { MutableRefObject } from 'react';
import { RootState } from '../redux/store';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './Camera.css';
interface Props {
  poseName: string;
}

const Camera: React.FC<Props> = ({ poseName }: Props): React.ReactElement => {
  const webcamRef: MutableRefObject<any> = useRef(null);
  const canvasRef: MutableRefObject<any> = useRef(null);
  const classifier: Classifier = useAppSelector(
    (state: RootState) => state.classifier
  );
  const classifierLabels: string[] = classifier.labels;
  const classifierKey = classifier.storageKey;
  let poseNetModel: any = undefined;
  let classifierModel: tf.LayersModel | undefined = undefined;
  let interval: NodeJS.Timer;

  useEffect(() => {
    async function init() {
      poseNetModel = await initPoseNet();
      classifierModel = await initClassifier(classifierKey);
    }
    init();
    interval = setInterval(
      () =>
        detect(
          poseNetModel,
          classifierModel,
          webcamRef,
          classifierLabels,
          canvasRef,
          poseName
        ),
      300
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const videoConstraints = {
    width: window.innerWidth / 2,
    height: window.innerHeight,
    facingMode: 'user',
  };

  return (
    <div>
      <div className="webcam__container">
        <Webcam
          audio={false}
          className="webcam__screen"
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <canvas ref={canvasRef} className="webcam__screen" />
      </div>
    </div>
  );
};

export default Camera;
