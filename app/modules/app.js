/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
import appTemplate from 'App/modules/app.pug';

class App {
  constructor() {
    appNode = pug.renderFile(appTemplate);
  }
}