export interface PoseNetOutputDTO {
  keypoints: pointValueDTO[];
  score: number;
}

export interface pointValueDTO {
  score: number;
  part: string;
  position: { x: number; y: number };
}
