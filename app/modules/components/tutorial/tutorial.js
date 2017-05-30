import template from './tutorial.pug';
import Utils from '../../services/utilities';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Tutorial {
  constructor() {
    Utils.appendTemplate('.js-gg-tutorial', template());
  }
}
