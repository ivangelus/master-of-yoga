import React, { ReactElement } from 'react';
import './LearnMorePage.css';
import learn_more_page_1 from '../assets/learn_more_page_1.jpg';
import learn_more_page_2 from '../assets/learn_more_page_2.jpg';

const LearnMorePage: React.FC = (): ReactElement => {
  return (
    <div className="learn-more-page-container">
      <div className="learn-more-content-up">
        <div className="learn-more-content-container">
          <div className="learn-more-content" style={{ marginLeft: '13%' }}>
            <h1>The Why</h1>
            <p className="content-up">
              Yoga is a group of physical, mental, and spiritual practices, or
              disciplines which originated in ancient India.
            </p>
            <p>
              The fundamental purpose of yoga is to foster harmony in the body,
              mind, and environment.
            </p>
          </div>
        </div>
        <div className="learn-more-image-container">
          <img
            src={learn_more_page_1}
            alt="woman doing yoga outdoors"
            style={{
              objectFit: 'contain',
              maxHeight: '70%',
              maxWidth: '70%',
              borderRadius: '10px',
              boxShadow: '0 0 4px grey',
              marginRight: '2%',
            }}
          />
        </div>
      </div>
      <div className="learn-more-content-down">
        <div className="learn-more-image-container">
          <img
            src={learn_more_page_2}
            alt="woman doing yoga outdoors"
            style={{
              objectFit: 'contain',
              maxHeight: '70%',
              maxWidth: '70%',
              borderRadius: '10px',
              boxShadow: '0 0 4px grey',
              marginLeft: '2%',
            }}
          />
        </div>
        <div className="learn-more-content-container">
          <div className="learn-more-content" style={{ marginLeft: '5%' }}>
            <h1>The How</h1>
            <p>Bringing the past into the future</p>
            <p>
              With the use of motion-tracking technologies, you’ll get real time
              feedback and detailed analytics based on your performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
