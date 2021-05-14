import { Classifier } from '../interfaces/ClassifierDTO';
import * as poseNet from '@tensorflow-models/posenet';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
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

export async function initClassifier(classifierKey: string): Promise<tf.LayersModel> {
    const classifierModel = await tf.loadLayersModel(
      `localstorage://${classifierKey}`
    );
    return classifierModel;
}