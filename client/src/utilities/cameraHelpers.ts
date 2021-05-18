import { setColor, drawKeypoints, drawSkeleton } from './drawingUtilities';
import { PoseNetOutputDTO } from '../interfaces/PoseNetOutputDTO';
import type { MutableRefObject } from 'react';
import * as tf from '@tensorflow/tfjs';

import normalizer from './normalizer';
import poseEvaluator from './poseEvaluator';
import speak from './speech';

let speakFreq = 0;

export function drawCanvas(
  pose: PoseNetOutputDTO,
  video: { height: number; width: number },
  videoWidth: number,
  videoHeight: number,
  canvas: MutableRefObject<any>,
  evaluatedPose: { pose: string; confidence: number },
  poseName: string,
  setPoseOK: any
): void {
  if (canvas.current) {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    if (poseName === evaluatedPose.pose) {
      speakFreq++;
      if (speakFreq === 1 || speakFreq % 100 === 0)
        speak('Hold current position');
      setColor('limegreen');
      setPoseOK(true);
    } else {
      setColor('red');
      setPoseOK(false);
    }
    drawKeypoints(pose['keypoints'], 0.7, ctx);
    drawSkeleton(pose['keypoints'], 0.7, ctx);
  }
}

export async function detect(
  net: any,
  classifierModel: tf.LayersModel | undefined,
  webcamRef: any,
  canvasRef: any,
  poseName: string,
  setPoseOK: any
): Promise<void> {
  if (
    typeof webcamRef.current !== 'undefined' &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    let pose: PoseNetOutputDTO;
    let evaluatedPose: { pose: string; confidence: number } = {
      pose: 'none',
      confidence: 0,
    };

    if (video !== undefined) {
      pose = await net.estimateSinglePose(video);
      if (pose.score >= 0.5) {
        const resultArr: number[] = normalizer(
          pose.keypoints,
          videoWidth,
          videoHeight
        );
        if (classifierModel !== undefined) {
          const predictionResult = classifierModel.predict(
            tf.tensor(resultArr, [1, 39])
          ) as tf.Tensor;
          const predictionResultArray: any = await predictionResult.array();
          evaluatedPose = poseEvaluator(poseName, predictionResultArray[0]);
        }
      }

      drawCanvas(
        pose,
        video,
        videoWidth,
        videoHeight,
        canvasRef,
        evaluatedPose,
        poseName,
        setPoseOK
      );
    }
  }
}
