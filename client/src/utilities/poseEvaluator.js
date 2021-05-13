/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
export default function poseEvaluator(posesArray, modelData) {
  const result = {};
  const testArr = [1,2,3,4,5,6,7,8,9];
  const max = modelData[0].reduce(function(a, b) {
    return Math.max(a, b);
  });
  const idx = modelData[0].indexOf(max)
  result.confidence = max,
  result.pose = posesArray[idx]
  return result;
}