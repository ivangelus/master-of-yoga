import {
  drawKeypoints,
  drawSkeleton,
  setColor,
} from '../utilities/drawingUtilities';
import { PoseNetOutputDTO } from '../interfaces/PoseNetOutputDTO';
import poseEvaluator from '../utilities/poseEvaluator';
import { Classifier } from '../interfaces/ClassifierDTO';
import * as poseNet from '@tensorflow-models/posenet';
import React, { useRef, useEffect } from 'react';
import normalizer from '../utilities/normalizer';
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
  const classifierKey = classifier.storageKey;
  const classifierLabels: string[] = classifier.labels;

  const drawCanvas = (
    pose: PoseNetOutputDTO,
    video: { height: number; width: number },
    videoWidth: number,
    videoHeight: number,
    canvas: MutableRefObject<any>,
    evaluatedPose: { pose: string; confidence: number },
    poseName: string
  ) => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
      if (poseName === evaluatedPose.pose) setColor('green');
      else setColor('red');
      // console.log(pose);
      drawKeypoints(pose['keypoints'], 0.7, ctx);
      drawSkeleton(pose['keypoints'], 0.7, ctx);
    }
  };

  const detect = async (net: any, classifierModel: tf.LayersModel) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Make Detections
      const pose: any = await net.estimateSinglePose(video);
      let evaluatedPose: { pose: string; confidence: number };
      // const label = 'heroPose';
      // console.log(pose.keypoints);
      if (pose.score >= 0.5) {
        const resultArr: number[] = normalizer(
          pose.keypoints,
          window.innerWidth / 2,
          window.innerHeight
        );
        // savedData.push({'xs': resultArr, 'ys': label});
        // localStorage.setItem('heroPose', JSON.stringify(savedData))
        const predictionResult = classifierModel.predict(
          tf.tensor(resultArr, [1, 39])
        ) as tf.Tensor;
        const predictionResultArray: any = await predictionResult.array();
        evaluatedPose = poseEvaluator(classifierLabels, predictionResultArray);
      } else {
        evaluatedPose = { pose: 'none', confidence: 0 };
        // console.log('low confidence score');
      }
      drawCanvas(
        pose,
        video,
        videoWidth,
        videoHeight,
        canvasRef,
        evaluatedPose,
        poseName
      );
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    (async () => {
      const net = await poseNet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 250, height: 250 },
        quantBytes: 2,
      });
      const classifierModel = await tf.loadLayersModel(
        `localstorage://${classifierKey}`
      );
      interval = setInterval(() => {
        detect(net, classifierModel);
      }, 250);
    })();
    return () => clearInterval(interval);
  }, [poseName]);

  // const runPosnet = async () => {
  //   const net = await posenet.load({
  //     architecture: 'ResNet50',
  //     outputStride: 32,
  //     inputResolution: { width: 257, height: 200 },
  //     quantBytes: 4,
  //   });
  //   setInterval(() => {
  //     detect(net);
  //   }, 250);
  // };

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
          // mirrored={true}
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
