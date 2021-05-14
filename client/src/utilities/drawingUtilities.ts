/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posenet from '@tensorflow-models/posenet';
import { pointValueDTO } from '../interfaces/PoseNetOutputDTO';
import * as tf from '@tensorflow/tfjs';

let color = 'red';
const lineWidth = 3;

export function setColor(passedColor: string): void {
  color = passedColor;
}

export const tryResNetButtonName = 'tryResNetButton';
export const tryResNetButtonText = '[New] Try ResNet50';

function toTuple({ y, x }: { y: number; x: number }): number[] {
  return [y, x];
}

export function drawPoint(
  ctx: CanvasRenderingContext2D,
  y: number,
  x: number,
  r: number
): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment(
  [ay, ax]: number[],
  [by, bx]: number[],
  color: string,
  scale: number,
  ctx: CanvasRenderingContext2D
): void {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx - 1 * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(
  keypoints: Array<{
    score: number;
    position: { y: number; x: number };
    part: string;
  }>,
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale = 1
): void {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(
  keypoints: Array<{
    part: string;
    score: number;
    position: { y: number; x: number };
  }>,
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale = 1
): void {
  const noDrawParts = ['leftEye', 'rightEye', 'leftEar', 'rightEar', 'nose'];
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    if (!noDrawParts.includes(keypoint.part))
      drawPoint(ctx, y * scale, x * scale, 10);
  }
}
