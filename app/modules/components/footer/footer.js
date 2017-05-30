import Utils from '../../services/utilities';
import template from './footer.pug';
import './footer.scss';

export default class Footer {
  constructor() {
    Utils.appendTemplate('.footer', template);
  }
}
