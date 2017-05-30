import template from './intro.pug';
import './intro.scss';
import Utils from '../../services/utilities';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Intro {
  constructor() {
    Utils.appendTemplate('.js-gg-intro', template());
  }
}
