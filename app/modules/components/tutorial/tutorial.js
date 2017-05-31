import React, { Component } from 'react';
import './tutorial.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Tutorial extends Component {
  constructor() {
    super();
    this.state = {
      currentSlide: 0,
      isOpen: false,
    };
  }
  render() {
    return (
      <div className="tutorial">
        <div className="tutorial__skip">
          Skip Tutorial <i className="fa fa-arrow-right" />
        </div>

        <div className="tutorial__controls">
          <div className="button button--back">
            <i className="fa fa-arrow-circle-left" /> Back
          </div>
          <div className="button button--start">
            Start Game
          </div>
          <div className="button button--next">
            Next <i className="fa fa-arrow-circle-right" />
          </div>
        </div>
      </div>
    );
  }
}
