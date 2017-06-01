import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Tutorial from './components/tutorial/tutorial';
import Intro from './components/intro/intro';
// import Utils from './services/utilities';
// import Footer from './components/footer/footer';

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
        <Intro startTutorial={() => this.setState({ tutorialOpen: true })} />
        <Tutorial
          isOpen={this.state.tutorialOpen}
          closeTutorial={() => this.setState({ tutorialOpen: false })}
          startGame={() => this.setState({ gameActive: true })}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('gg-app'));
