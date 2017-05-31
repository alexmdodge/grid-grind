import React, { Component } from 'react';
import './intro.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Enter player name',
    };
  }

  render() {
    return (
      <div className="intro">
        <div className="intro__logo">
          <img
            src="/assets/images/gg-header-logo.png"
            alt="Grid Grind Logo Title"
            className="intro__logo-src"
          />
        </div>

        <div className="intro__name">
          <input
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            type="text"
            id="player__name"
            className="intro__input"
          />
        </div>

        <button className="intro__button">
          Play
        </button>
      </div>
    );
  }
}
