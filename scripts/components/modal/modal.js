export class Modal {
    /**
     * Initialise la modal
     */
    constructor() {
        this.modalWrapper = document.querySelector('.modal');
        this.element = null;
    }

    /**
     * Initialise les evenements
     */
    addEvents() {
        this.handleKeyUp = this.handleKeyUp.bind(this);
        document.body.addEventListener('keyup', this.handleKeyUp);
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
        document.body.removeEventListener('keyup', this.handleKeyUp);
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
        document.body.classList.add('body-scroll--none');
        this.modalWrapper.setAttribute('aria-hidden', true);
        this.modalWrapper.classList.add('modal-open');
        this.modalWrapper.append(this.element);
        this.addEvents();
    }

    /**
     * Masque la modal
     */
    close() {
        document.body.classList.remove('body-scroll--none');
        this.modalWrapper.setAttribute('aria-hidden', false);
        this.modalWrapper.classList.remove('modal-open');
        this.modalWrapper.firstChild.remove();
        this.removeEvents();
    }
}
