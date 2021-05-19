import { setColor, drawKeypoints, drawSkeleton } from './drawingUtilities';
import { PoseNetOutputDTO } from '../interfaces/PoseNetOutputDTO';
import { PoseNet } from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';

import normalizer from './normalizer';
import poseEvaluator from './poseEvaluator';
import speak from './speech';

import { getMetrics } from './generateMetrics';

let speakFreq = 0;

export function drawCanvas(
  pose: PoseNetOutputDTO,
  video: { height: number; width: number },
  videoWidth: number,
  videoHeight: number,
  canvas: HTMLCanvasElement,
  evaluatedPose: { pose: string; confidence: number },
  poseName: string,
  setPoseOK: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = videoWidth;
    canvas.height = videoHeight;

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
    if (ctx) drawKeypoints(pose['keypoints'], 0.7, ctx);
    if (ctx) drawSkeleton(pose['keypoints'], 0.7, ctx);
  }
}

export async function detect(
  net: PoseNet,
  classifierModel: tf.LayersModel | undefined,
  webcamRef: Webcam,
  canvasRef: HTMLCanvasElement,
  poseName: string,
  setPoseOK: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  if (webcamRef && webcamRef.video && webcamRef.video.readyState === 4) {
    const video = webcamRef.video;
    const videoWidth = webcamRef.video.videoWidth;
    const videoHeight = webcamRef.video.videoHeight;
    webcamRef.video.width = videoWidth;
    webcamRef.video.height = videoHeight;

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

        const metrics = getMetrics(resultArr);
        if (classifierModel !== undefined) {
          const predictionResult = classifierModel.predict(
            tf.tensor(metrics, [1, 32])
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
