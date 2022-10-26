import Observer from './observer.js';

/**
 * Permet de desactiver un ou plusieurs attributs des elements
 * enregistres dans le but d'empecher l'interaction au clavier
 * ou via lecteur d'ecran
 */
export default class AccessibilityObserver extends Observer {
  /**
   * type : ( sort | modal )
   * data : {Object} Voir la methode update du composant enregistre
   *
   * @param {Object}
   */
  notify({ type, data }) {
    this.observers.forEach((observer) => observer.update({ type, data }));
  }
}
