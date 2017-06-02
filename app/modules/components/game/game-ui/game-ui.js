import React from 'react';
import './game-ui.scss';

const GameUI = () => (
  <div className="gg-user-interface">
    <h2 className="gg-moves-left">
      <span id="update-moves-left">3</span>
      <i className="fa fa-heart" />
      Moves Left
    </h2>

    <h2 className="gg-current-level">
      Lvl
      <i className="fa fa-star" />
      <span id="update-level">1</span>
    </h2>

    <h2 className="gg-total-points">
      Total Points
      <i className="fa fa-diamond" />
      <span id="update-points">0</span>
    </h2>

    <div className="gg-progress">
      <div className="gg-progress-bar">
        <h2 className="gg-progress-title">
          <span id="update-points-left">0</span>
          /
          <span id="update-points-total">4</span>
        </h2>
        <span id="progress-bar-done" />
      </div>
    </div>

    <div className="gg-block-order">
      <div className="gg-block-order-title">Block Order</div>
      <div className="help-block blue fa   fa-arrow-right" />
      <div className="help-block green fa  fa-arrow-right" />
      <div className="help-block red fa    fa-arrow-right" />
      <div className="help-block purple fa fa-arrow-right" />
      <div className="help-block orange fa fa-arrow-right" />
      <div className="help-block yellow fa fa-arrow-right" />
    </div>

    <div className="gg-help">
      <h1 className="gg-help-icon">
        <span>?</span>
      </h1>

      <div className="gg-help-menu">
        <h3 className="gg-help-title">How to Play</h3>
        <small className="gg-help-description">
          Click the blocks to change their color. If you connect at least 3 colors in a row you
          score points. Any combination other than diagonals connect. The longer the chain the more
          points you get.
        </small>
      </div>
    </div>
  </div>
);

export default GameUI;
