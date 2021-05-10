import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';
import { drawKeypoints, drawSkeleton } from '../utilities/drawingUtilities';
import './Camera.css';

const Camera = () => {
  const webcamRef: any = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    (async () => {
      const net = await posenet.load({
        architecture: 'ResNet50',
        outputStride: 32,
        inputResolution: { width: 257, height: 200 },
        quantBytes: 4,
      });
      interval = setInterval(() => {
        detect(net);
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

  const detect = async (net: any) => {
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
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (
    pose: any,
    video: any,
    videoWidth: any,
    videoHeight: any,
    canvas: any
  ) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose['keypoints'], 0.5, ctx);
    drawSkeleton(pose['keypoints'], 0.5, ctx);
  };

  const videoConstraints = {
    width: 750,
    height: 900,
    facingMode: 'user',
  };
  return (
    <div>
      <Webcam
        className="webcam__screen"
        videoConstraints={videoConstraints}
        ref={webcamRef}
      />
      <canvas ref={canvasRef} className="webcam__screen" />
    </div>
  );
};

export default Camera;
