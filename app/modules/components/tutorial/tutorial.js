import template from './tutorial.pug';
import './tutorial.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Tutorial {
  constructor() {
    this.template = template();
  }

  getTemplate() {
    return this.template;
  }
}
