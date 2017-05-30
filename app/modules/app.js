import template from './app.pug';
import Tutorial from './components/tutorial/tutorial';
import Intro from './components/intro/intro';
import Utils from './services/utilities';
import Footer from './components/footer/footer';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
class App {
  constructor() {
    // Initialize all top level components
    this.tutorial = new Tutorial();
    this.intro = new Intro();
    this.footer = new Footer();

    Utils.append('gg-app', template({
      tutorial: this.tutorial.getTemplate(),
      intro: this.intro.getTemplate(),
      footer: this.footer.getTemplate(),
    }));

  }
}

/* Initiate App */
const gridGrind = new App();
