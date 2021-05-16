import { initClassifier, initPoseNet } from '../utilities/initModels';
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import { Classifier } from '../interfaces/ClassifierDTO';
import React, { useRef, useEffect } from 'react';
import { detect } from '../utilities/cameraHelpers';
import { useAppSelector } from '../redux/hooks';
import type { MutableRefObject } from 'react';
import { RootState } from '../redux/store';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './Camera.css';
import speak from '../utilities/speech';
interface Props {
  poseName: string;
  setPoseOK: any;
}

const Camera: React.FC<Props> = ({
  poseName,
  setPoseOK,
}: Props): React.ReactElement => {
  const webcamRef: MutableRefObject<any> = useRef(null);
  const canvasRef: MutableRefObject<any> = useRef(null);
  const classifier: Classifier = useAppSelector(
    (state: RootState) => state.classifier
  );
  const classifierLabels: string[] = classifier.labels;
  const classifierKey = classifier.storageKey;
  let poseNetModel: any;
  let classifierModel: tf.LayersModel | undefined;
  let interval: any;

  useEffect(() => {
    async function init() {
      if (poseNetModel === undefined) poseNetModel = await initPoseNet();
      if (classifierModel === undefined)
        classifierModel = await initClassifier(classifierKey);
      speak('Position starting in 5, 4, 3, 2, 1');
      if (interval) await clearIntervalAsync(interval);
      interval = setIntervalAsync(
        async () =>
          await detect(
            poseNetModel,
            classifierModel,
            webcamRef,
            classifierLabels,
            canvasRef,
            poseName,
            setPoseOK
          ),
        300
      );
    }
    init();
    return () => {
      (async () => {
        await clearIntervalAsync(interval);
      })();
    };
  }, [poseName]);

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
