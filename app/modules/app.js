import React from 'react';
import ReactDOM from 'react-dom';

import Tutorial from './components/tutorial/tutorial';
import Intro from './components/intro/intro';
// import Utils from './services/utilities';
// import Footer from './components/footer/footer';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
const App = () => (
  <div>
    <Intro />
    <Tutorial />
  </div>
);

ReactDOM.render(<App />, document.getElementById('gg-app'));
