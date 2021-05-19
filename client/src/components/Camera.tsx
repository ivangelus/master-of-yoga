import { initClassifier, initPoseNet } from '../utilities/initModels';
import { SetIntervalAsyncTimer } from 'set-interval-async/dynamic';
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import { PoseNet } from '@tensorflow-models/posenet';
import React, { useRef, useEffect } from 'react';
import { detect } from '../utilities/cameraHelpers';

import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './Camera.css';

interface Props {
  setPoseOK: React.Dispatch<React.SetStateAction<boolean>>;
  poseName: string;
  width: number;
  height: number;
}

const Camera: React.FC<Props> = ({
  poseName,
  setPoseOK,
  width,
  height,
}: Props): React.ReactElement => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let poseNetModel: PoseNet;
  let classifierModel: tf.LayersModel;
  let interval: SetIntervalAsyncTimer;

  useEffect(() => {
    async function init() {
      if (poseNetModel === undefined) poseNetModel = await initPoseNet();
      classifierModel = await initClassifier(poseName);
      if (interval) await clearIntervalAsync(interval);

      interval = setIntervalAsync(async () => {
        if (webcamRef.current && canvasRef.current) {
          await detect(
            poseNetModel,
            classifierModel,
            webcamRef.current,
            canvasRef.current,
            poseName,
            setPoseOK
          );
        }
      }, 300);
    }

    init();

    return () => {
      (async () => {
        await clearIntervalAsync(interval);
      })();
    };
  }, [poseName]);

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: 'user',
  };

  return (
    <div className="webcam__container">
      <Webcam
        audio={false}
        className="webcam__screen"
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <canvas ref={canvasRef} className="webcam__screen" />
    </div>
  );
};

export default Camera;
