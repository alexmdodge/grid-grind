import React from 'react';

const Slide2 = () => (
  <div>
    <h1 className="tutorial__title">
      How to Play
    </h1>
    <p className="tutorial__body">
      The game is simple, click the blocks to change their color.
      Match up at least three in a group and you’ll score points.
      No diagonals!
    </p>
    <div className="tutorial__img">
      <img
        src="/assets/images/tutorial2.png"
        alt="Grid Grind Tutorial"
        className="tutorial__img-src"
      />
    </div>
  </div>
);

export default Slide2;
