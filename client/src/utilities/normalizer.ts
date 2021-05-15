export default function normalizeKeypoints(
  keyPoints: Array<{ position: { x: number; y: number } }>,
  width: number,
  height: number
): number[] {
  const keyPointsList = [];
  for (let i = 0; i < keyPoints.length; i++) {
    let normalizedX = keyPoints[i].position.x / width;
    let normalizedY = keyPoints[i].position.y / height;

    if (normalizedX < 0) normalizedX = 0;
    if (normalizedX > 1) normalizedX = 1;
    if (normalizedY < 0) normalizedY = 0;
    if (normalizedY > 1) normalizedY = 1;

    keyPointsList.push(normalizedX);
    keyPointsList.push(normalizedY);
  }
  return keyPointsList;
}
