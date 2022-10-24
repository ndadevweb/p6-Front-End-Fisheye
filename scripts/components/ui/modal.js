export class Modal {
    static observers = [];

    /**
     * Initialise la modal
     */
    constructor() {
        this.modalWrapper = document.querySelector('.modal');
        this.targetLaunchedModal = null;
        this.element = null;
    }

    /**
     * Observers a declencher a l'ouverture / fermeture de la modal
     *
     * @param  {Observer[]} observers
     */
    static setObserver(observer) {
        Modal.observers.push(observer);
    }

    /**
     * Element qui reprendra le focus apres fermeture de la modal
     *
     * @param {Element} targetLaunchedModal
     */
    setFocusElementAfterClosing(targetLaunchedModal) {
        this.targetLaunchedModal = targetLaunchedModal;
    }

    /**
     * Positionnement du focus sur l'element ayant declenche l'ouverture de la modal
     */
    focusOnTargetLaunchedModal() {
        if (this.targetLaunchedModal !== null) {
            this.targetLaunchedModal.focus();
        }
    }

    /**
     * Initialise les evenements
     */
    addEvents() {
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    /**
     * Gestion des evenement keyUp
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        switch (event.key) {
            case 'Escape':
                this.close();
                break;
        }
    }

    /**
     * Suppression des evenements
     */
    removeEvents() {
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    /**
     * Contenu de la modal
     *
     * @param {Element} element
     */
    setContent(element) {
        this.element = element;
    }

    /**
     * Affiche la modal
     */
    open() {
        Modal.observers.forEach((observer) => observer.notify({ type: 'modal', data: { active: false } }));
        document.body.classList.add('body-scroll--none');
        document.body.classList.add('modal-opened');
        this.modalWrapper.setAttribute('aria-hidden', false);
        this.modalWrapper.setAttribute('aria-modal', true);
        this.modalWrapper.classList.add('modal-open');
        this.modalWrapper.append(this.element);
        this.addEvents();
    }

    /**
     * Masque la modal et repositionne le focus sur l'element ayant ouvert la modal
     */
    close() {
        Modal.observers.forEach((observer) => observer.notify({ type: 'modal', data: { active: true } }));
        document.body.classList.remove('body-scroll--none');
        document.body.classList.remove('modal-opened');
        this.modalWrapper.setAttribute('aria-hidden', true);
        this.modalWrapper.setAttribute('aria-modal', false);
        this.modalWrapper.classList.remove('modal-open');
        this.modalWrapper.firstChild.remove();
        this.removeEvents();
        this.focusOnTargetLaunchedModal();
    }
}
