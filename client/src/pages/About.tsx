import './About.css';
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="meet-the-team">
      <h1>Meet the team behind Master of Yoga!</h1>
      <div className="meet-team-container">
        <div className="meet-team-card">
          <img src="https://avatars.githubusercontent.com/u/70608198?v=4" />
          <a href="https://github.com/ignaraph">Ignacio Raphael Conti</a>
        </div>
        <div className="meet-team-card">
          <img src="https://avatars.githubusercontent.com/u/47331294?v=4" />
          <a href="https://github.com/IvanGelo1">Ivan Gelo</a>
        </div>
        <div className="meet-team-card">
          <img src="https://avatars.githubusercontent.com/u/7317004?v=4" />
          <a href="https://github.com/mihaelsouza">Mihael Machado de Souza</a>
        </div>
        <div className="meet-team-card">
          <img src="https://avatars.githubusercontent.com/u/72149542?v=4" />
          <a href="https://github.com/stevo95">Stefan Sarmir</a>
        </div>
      </div>
    </div>
  );
};

export default About;
