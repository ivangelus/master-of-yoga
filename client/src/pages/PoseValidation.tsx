import React, { ReactElement, useRef, useState, useEffect } from 'react';
import './PoseValidation.css';
// import * as tf from '@tensorflow/tfjs';
// import * as posenet from '@tensorflow-models/posenet';
// import Webcam from 'react-webcam';
import Camera from '../components/Camera';
import Timer from '../components/Timer';
// import { drawKeypoints, drawSkeleton } from '../utilities/drawingUtilities';

const PoseValidation: React.FC = (): ReactElement => {

  // const [webcam, setWebcam] = useState(false)

  // const toggleCamera = () => {
  //   setWebcam(!webcam)
  // }

  return (
  <div>
    <Camera/>
    <Timer/>
    {/* <Timer></Timer> */}
    <div className="btn__container">
    <button className="pose__validation__btn">Back</button>
    <button className="pose__validation__btn">Next</button>
    </div>
  </div>
  );
};

export default PoseValidation;
