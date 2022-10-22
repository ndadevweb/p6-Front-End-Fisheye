import { Observer } from './observer.js';

export class AccessibilityObserver extends Observer {
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
