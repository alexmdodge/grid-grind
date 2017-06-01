import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './intro.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
            placeholder="Enter player name"
            type="text"
            id="player__name"
            className="intro__input"
          />
        </div>

        <button onClick={this.props.startTutorial} className="intro__button">
          Play
        </button>
      </div>
    );
  }
}

Intro.propTypes = {
  startTutorial: PropTypes.func.isRequired,
};
