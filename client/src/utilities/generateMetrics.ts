const euclidean_distance = (a: number[], b: number[]): number[] => {
  const x = b[1] - a[1];
  const y = b[0] - a[0];

  return [Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), (a[2] + b[2]) / 2];
};

const calculate_ratio = (
  numerator: number[],
  denominator: number[]
): number[] => {
  return numerator.map((value, index) => value / denominator[index]);
};

const radians_to_degree = (radian: number): number => {
  return (radian * 180) / Math.PI;
};

const find_angle = (a: number[], b: number[], c: number[]): number[] => {
  const AB = Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2));
  const AC = Math.sqrt(Math.pow(c[1] - a[1], 2) + Math.pow(c[0] - a[0], 2));
  const BC = Math.sqrt(Math.pow(b[1] - c[1], 2) + Math.pow(b[0] - c[0], 2));

  const angle = Math.acos(
    (Math.pow(BC, 2) + Math.pow(AB, 2) - Math.pow(AC, 2)) / (2 * BC * AB)
  );

  return [radians_to_degree(angle), (a[2] + b[2] + c[2]) / 3];
};

export const getMetrics = (keypointsArray: number[]): number[] => {
  const leftShoulder = keypointsArray.slice(3, 6);
  const rightShoulder = keypointsArray.slice(6, 9);
  const leftElbow = keypointsArray.slice(9, 12);
  const rightElbow = keypointsArray.slice(12, 15);
  const leftWrist = keypointsArray.slice(15, 18);
  const rightWrist = keypointsArray.slice(18, 21);
  const leftHip = keypointsArray.slice(21, 24);
  const rightHip = keypointsArray.slice(24, 27);
  const leftKnee = keypointsArray.slice(27, 30);
  const rightKnee = keypointsArray.slice(30, 33);
  const leftAnkle = keypointsArray.slice(33, 36);
  const rightAnkle = keypointsArray.slice(36);

  // Angle between different body parts
  const angles = [
    ...find_angle(leftShoulder, leftElbow, leftWrist),
    ...find_angle(rightShoulder, rightElbow, rightWrist),
    ...find_angle(leftHip, leftKnee, leftAnkle),
    ...find_angle(rightHip, rightKnee, rightAnkle),
    ...find_angle(leftHip, leftShoulder, leftWrist),
    ...find_angle(rightHip, rightShoulder, rightWrist),
    ...find_angle(leftShoulder, leftHip, leftKnee),
    ...find_angle(rightShoulder, rightHip, rightKnee),
  ];

  // Distance between body parts
  const distances = [
    ...euclidean_distance(rightAnkle, leftAnkle),
    ...euclidean_distance(rightWrist, leftWrist),
    ...euclidean_distance(leftHip, leftAnkle),
    ...euclidean_distance(rightHip, rightAnkle),
    ...euclidean_distance(rightShoulder, leftHip),
    ...euclidean_distance(leftShoulder, rightHip),
  ];

  // Special ratios
  const ratio_upper_lower_left = calculate_ratio(
    euclidean_distance(leftShoulder, leftHip),
    euclidean_distance(leftHip, leftAnkle)
  );
  const ratio_upper_lower_right = calculate_ratio(
    euclidean_distance(rightShoulder, rightHip),
    euclidean_distance(rightHip, rightAnkle)
  );

  return [
    ...angles,
    ...distances,
    ...ratio_upper_lower_left,
    ...ratio_upper_lower_right,
  ];
};
