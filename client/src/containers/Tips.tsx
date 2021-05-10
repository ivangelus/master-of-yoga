import './Tips.css';
import React from 'react';

const Tips: React.FC = () => {
  return (
    <div className="tips-container">
      <h4>Food for tought</h4>
      <div className="content-container">
        <p className="quote-content">
          Exercises are like prose, whereas yoga is the poetry of movements.
          Once you understand the grammar of yoga; you can write your poetry of
          movements.
        </p>
        <p className="quote-author">
          ― Amit Ray, Yoga and Vipassana: An Integrated Life Style
        </p>
      </div>
    </div>
  );
};

export default Tips;
