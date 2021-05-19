export default function poseEvaluator(
  poseName: string,
  confidence: number[]
): { confidence: number; pose: string } {
  const result: { confidence: number; pose: string } = {
    confidence: confidence[0],
    pose: 'none',
  };

  if (result.confidence > 0.5) {
    result.pose = poseName;
  }

  return result;
}
