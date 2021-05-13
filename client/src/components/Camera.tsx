import {
  drawKeypoints,
  drawSkeleton,
  setColor,
} from '../utilities/drawingUtilities';
import poseEvaluator from '../utilities/poseEvaluator';
import * as posenet from '@tensorflow-models/posenet';
import React, { useRef, useEffect } from 'react';
import normalizer from '../utilities/normalizer';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import * as tf from '@tensorflow/tfjs';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';
import './Camera.css';

interface Props {
  poseName: string;
}

const Camera: React.FC<Props> = ({ poseName }: Props): React.ReactElement => {
  const webcamRef: any = useRef(null);
  const canvasRef = useRef(null);
  const classifier = useAppSelector((state: RootState) => state.classifier);
  const classifierKey = classifier.storageKey;
  const classifierLabels = classifier.labels;

  const drawCanvas = (
    pose: any,
    video: any,
    videoWidth: number,
    videoHeight: number,
    canvas: any,
    evaluatedPose: any,
    poseName: string
  ) => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
      if (poseName === evaluatedPose.pose) setColor('green');
      drawKeypoints(pose['keypoints'], 0.5, ctx);
      drawSkeleton(pose['keypoints'], 0.5, ctx);
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
      let evaluatedPose: any;
      // console.log(pose.keypoints);
      if (pose.score >= 0.5) {
        const resultArr: number[] = await normalizer(
          pose.keypoints,
          window.innerWidth / 2,
          window.innerHeight
        );
        const predictionResult = classifierModel.predict(
          tf.tensor(resultArr, [1, 34])
        ) as tf.Tensor;
        const predictionResultArray = await predictionResult.array();
        evaluatedPose = await poseEvaluator(
          classifierLabels,
          predictionResultArray
        );
        // console.log(evaluatedPose);
      } else {
        evaluatedPose = { pose: 'none' };
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
      const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 16,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 4,
      });
      const classifier = await tf.loadLayersModel(
        `localstorage://${classifierKey}`
      );
      interval = setInterval(() => {
        detect(net, classifier);
      }, 250);
    })();
    return () => clearInterval(interval);
  }, []);

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
