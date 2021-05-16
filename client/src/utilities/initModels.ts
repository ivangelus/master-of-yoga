import * as poseNet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

export async function initPoseNet(): Promise<any> {
  const poseNetModel = await poseNet.load({
    architecture: 'ResNet50',
    outputStride: 32,
    inputResolution: { width: 256, height: 256 },
    quantBytes: 2,
  });
  return poseNetModel;
}

export async function initClassifier(
  classifierKey: string
): Promise<tf.LayersModel> {
  const classifierModel = await tf.loadLayersModel(
    `../../tfjs/${classifierKey}/model.json`
  );
  return classifierModel;
}
