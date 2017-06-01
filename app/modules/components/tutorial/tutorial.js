import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TutorialContent from './tutorial-content';
import './tutorial.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Tutorial extends Component {
  constructor() {
    super();
    this.state = {
      slide: 0,
    };
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  prevSlide() {
    if (this.state.slide < 0) {
      this.setState({
        slide: 0,
      });
      this.props.closeTutorial();
    } else {
      this.setState({
        slide: this.state.slide - 1,
      });
    }
  }

  nextSlide() {
    if (this.slide > 4) {
      this.setState({
        slide: 0,
      });
      this.props.closeTutorial();
    } else {
      this.setState({
        slide: this.state.slide + 1,
      });
    }
  }

  renderBodyClass() {
    if (!this.props.isOpen) {
      return 'tutorial--closed';
    }
    return '';
  }

  renderStartClass() {
    if (this.state.slide === 4) {
      return 'button__start--hidden';
    }
    return '';
  }

  render() {
    return (
      <div className={`tutorial ${this.renderBodyClass()}`}>
        <button
          className="tutorial__skip"
          onClick={() => this.setState({ slide: 3 })}
        >
          Skip Tutorial <i className="fa fa-arrow-right" />
        </button>

        <TutorialContent slide={this.state.slide} />

        <div className="tutorial__controls">
          <button
            onClick={this.prevSlide}
            className="tut-button tut-button__back"
          >
            <i className="fa fa-arrow-circle-left" /> Back
          </button>
          <button
            onClick={this.nextSlide}
            className="tut-button tut-button__next"
          >
            Next <i className="fa fa-arrow-circle-right" />
          </button>
          <button
            onClick={this.props.startGame}
            className={`tut-button tut-button__start ${this.renderStartClass()}`}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }
}

Tutorial.propTypes = {
  startGame: PropTypes.func.isRequired,
  closeTutorial: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
