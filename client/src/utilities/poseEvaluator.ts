export default function poseEvaluator(
  posesArray: string[],
  modelData: Array<number[]>
): { confidence: number; pose: string } {
  const result: { confidence: number; pose: string } = {
    confidence: 0,
    pose: 'none',
  };
  const max = modelData[0].reduce(function (a, b) {
    return Math.max(a, b);
  });
  const idx = modelData[0].indexOf(max);
  result.confidence = max;
  result.pose = posesArray[idx];
  return result;
}
