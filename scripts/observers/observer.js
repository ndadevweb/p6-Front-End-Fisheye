export default class Observer {
  constructor() {
    this.observers = [];
  }

  /**
   * Ajoute un objet a mettre a jour
   *
   * @param {Object} observer
   */
  add(observer) {
    this.observers.push(observer);
  }

  /**
   * Supprime un objet a surveiller
   *
   * @param {Object} observer
   */
  remove(observer) {
    this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
  }
}
