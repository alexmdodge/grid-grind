import React from 'react';

const Slide1 = () => (
  <div>
    <h1 className="tutorial__title">
      Your Goal
    </h1>
    <p className="tutorial__body">
      So I hear you like puzzles? How about one that never ends? In
      Grid Grind you goal is to match color tiles with other colour
      tiles. Pretty simple eh? How far can you get?
    </p>
    <div className="tutorial__img">
      <img
        src="/assets/images/tutorial1.png"
        alt="Grid Grind Tutorial"
        className="tutorial__img-src"
      />
    </div>
  </div>
);

export default Slide1;
