import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Tutorial from './components/tutorial/tutorial';
import Intro from './components/intro/intro';
import GameContainer from './components/game/game';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      gameActive: false,
      tutorialOpen: false,
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({
      gameActive: true,
      tutorialOpen: false,
    });
  }

  render() {
    return (
      <div>
        <Intro
          introActive={!this.state.gameActive}
          startTutorial={() => this.setState({ tutorialOpen: true })}
        />
        <Tutorial
          isOpen={this.state.tutorialOpen}
          closeTutorial={() => this.setState({ tutorialOpen: false })}
          startGame={this.startGame}
        />
        <GameContainer
          gameActive={this.state.gameActive}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('gg-app'));
