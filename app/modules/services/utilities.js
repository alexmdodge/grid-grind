/**
 * A general class for managing dom utilities like push state
 * and appending or removing nodes from the DOM.
 */
export default class Utils {

  /**
   * Appends a dom node by first checking id then the
   * query selector. Allows appending by both.
   *
   * @static
   * @param {any} container
   * @param {any} node
   *
   * @memberof Utils
   */
  static appendTemplate(container, template) {
    let containerNode;

    if (container.indexOf('.') > -1) {
      containerNode = document.querySelector(container);
    } else {
      containerNode = document.getElementById(container);
    }
    containerNode.innerHTML += template;
  }
}
