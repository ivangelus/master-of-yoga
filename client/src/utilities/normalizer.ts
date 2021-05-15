export default function normalizeKeypoints(
  keyPoints: {
    position: {
      x: number;
      y: number;
    };
    part: string;
    score: number;
  }[],
  width: number,
  height: number
): number[] {
  const head = ['leftEye', 'rightEye', 'leftEar', 'rightEar'];
  const keyPointsList: number[] = [];
  for (let i = 0; i < keyPoints.length; i++) {
    let normalizedY = keyPoints[i].position.y / height;
    let normalizedX = keyPoints[i].position.x / width;

    if (normalizedX < 0) normalizedX = 0;
    if (normalizedX > 1) normalizedX = 1;
    if (normalizedY < 0) normalizedY = 0;
    if (normalizedY > 1) normalizedY = 1;

    if (head.includes(keyPoints[i].part)) {
      keyPointsList[0] = (keyPointsList[0] + normalizedY) / 2;
      keyPointsList[1] = (keyPointsList[1] + normalizedX) / 2;
      keyPointsList[2] = (keyPointsList[2] + keyPoints[i].score) / 2;
    } else {
      keyPointsList.push(normalizedY);
      keyPointsList.push(normalizedX);
      keyPointsList.push(keyPoints[i].score);
    }
  }
  return keyPointsList;
}
