import template from './app.pug';
import Tutorial from './components/tutorial/tutorial';
import Intro from './components/intro/intro';
import Utils from './services/utilities';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
class App {
  constructor() {
    Utils.appendTemplate('gg-app', template());

    // Initialize all top level components
    this.tutorial = new Tutorial();
    this.intro = new Intro();
  }
}

/* Initiate App */
const gridGrind = new App();
