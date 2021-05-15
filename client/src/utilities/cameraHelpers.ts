import { setColor, drawKeypoints, drawSkeleton } from './drawingUtilities';
import { PoseNetOutputDTO } from '../interfaces/PoseNetOutputDTO';
import type { MutableRefObject } from 'react';
import * as tf from '@tensorflow/tfjs';
import normalizer from './normalizer';
import poseEvaluator from './poseEvaluator';

export function drawCanvas(
  pose: PoseNetOutputDTO,
  video: { height: number; width: number },
  videoWidth: number,
  videoHeight: number,
  canvas: MutableRefObject<any>,
  evaluatedPose: { pose: string; confidence: number },
  poseName: string
): void {
  if (canvas.current) {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    if (poseName === evaluatedPose.pose) setColor('green');
    else setColor('red');
    drawKeypoints(pose['keypoints'], 0.7, ctx);
    drawSkeleton(pose['keypoints'], 0.7, ctx);
  }
}

export async function detect(
  net: any,
  classifierModel: tf.LayersModel | undefined,
  webcamRef: any,
  classifierLabels: string[],
  canvasRef: any,
  poseName: string
): Promise<void> {
  console.log(poseName);
  if (
    typeof webcamRef.current !== 'undefined' &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4
  ) {
    // console.log(poseName);
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
        const resultArr: number[] = await normalizer(
          pose.keypoints,
          window.innerWidth / 2,
          window.innerHeight
        );
        if (classifierModel !== undefined) {
          const predictionResult = (await classifierModel.predict(
            tf.tensor(resultArr, [1, 34])
          )) as tf.Tensor;
          const predictionResultArray: any = await predictionResult.array();
          evaluatedPose = await poseEvaluator(
            classifierLabels,
            predictionResultArray
          );
        }
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
  }
}
