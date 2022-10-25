import Observer from './observer.js';

export default class LikesObserver extends Observer {
  /**
   * Notifie l'observer de mettre a jour les differents objets
   *
   * - { Integer } value ( chiffre positif ou negatif 0)
   *
   * @param {Object} value
   */
  notify(value) {
    this.observers.forEach((observer) => observer.update(value));
  }
}
