export class LikesObserver {
    constructor() {
        this.observers = [];
    }

    /**
     * Ajoute un objet a mettre a jour
     *
     * @param {*} observer
     */
    add(observer) {
        this.observers.push(observer);
    }

    /**
     * Supprime un objet a surveiller
     *
     * @param {*} observer
     */
    remove(observer) {
        this.observers = this.observers.filter((currentObserver) => currentObserver !== observer);
    }

    /**
     * Notifie l'observer de mettre a jour les differents objets
     *
     * @param {*} value
     */
    notify(value) {
        this.observers.forEach((observer) => observer.update(value));
    }
}
