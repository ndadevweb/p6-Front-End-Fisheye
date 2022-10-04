export class Modal {
    /**
     * Initialise la modal
     */
    constructor() {
        this.modalWrapper = document.querySelector('.modal');
        this.element = null;
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
    }

    /**
     * Masque la modal
     */
    close() {
        document.body.classList.remove('body-scroll--none');
        this.modalWrapper.setAttribute('aria-hidden', false);
        this.modalWrapper.classList.remove('modal-open');
    }
}
