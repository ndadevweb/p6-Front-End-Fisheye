import Observer from './observer.js';

export default class SortObserver extends Observer {
  /**
   * Notifie l'observer de mettre a jour les differents objets
   *
   * - { String } sortBy ( Nom du champs utilise pour le tri)
   *
   * @param {Object} props
   */
  notify(props) {
    this.observers.forEach((observer) => observer.update(props));
  }
}
