import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">TO-DO LIST</h1>
          <p className="lead">Simple note for everyone</p>
          <div className="buttons">
            <Link to="/note" className="btn btn-primary">
              Take a note
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
