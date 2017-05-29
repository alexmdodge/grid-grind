import appTemplate from './app.pug';
import Tutorial from './components//tutorialComponent/tutorial';
import Utils from './services/utilities';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
class App {
  constructor() {
    Utils.appendTemplate('gg-app', appTemplate());

    // Initialize all top level components
    this.tutorial = new Tutorial();
  }
}

/* Initiate App */
const gridGrind = new App();
