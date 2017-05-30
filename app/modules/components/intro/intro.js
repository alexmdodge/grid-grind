import Utils from '../../services/utilities';
import template from './intro.pug';
import './intro.scss';

/**
 * Application entry point. All resources, modules, and templates
 * branch from this point.
 */
export default class Intro {
  constructor(container = 'gg-app', data = {}) {
    Utils.appendTemplate('.intro', template(data));
  }
}
