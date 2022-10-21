import { ButtonLeft, ButtonRight, ButtonClose } from '../ui/index.js';

/**
 * Lightbox / slide
 *
 * Gere l'affichage, la navigation, l'interaction de chaque element media
 */
export class MediaSlide {
    /**
     * - Element qui active l'ouverture de la modal
     * - Liste des elements media
     * - Callback de fermeture de la modal
     *
     * @param {Object} {Element, Element[], Function}
     */
    constructor({ mediaElementActive, mediaElements, callbackToClose }) {
        this.mediaElements = Array.from(mediaElements);
        this.currentIndex = this.mediaElements.findIndex((element) => element === mediaElementActive);
        this.maxIndex = mediaElements.length - 1;
        this.callbackToClose = callbackToClose;
        this.initElements();
        this.bindMethods();
    }

    /**
     * Initialise les elements pour le slide / lightbox
     */
    initElements() {
        this.mediaElementActive = this.currentElement();
        this.mediaSlideElement = document.createElement('div');
        this.buttonLeftElement = ButtonLeft();
        this.buttonRightElement = ButtonRight();
        this.buttonCloseModal = ButtonClose({ className: 'btn-close--orange' });
        this.optionsMediaVideo();
    }

    /**
     * Bind les methodes utilisees pour le traitement des evenements
     */
    bindMethods() {
        this.handleEvent = this.handleEvent.bind(this);
        this.close = this.close.bind(this);
    }

    /**
     * Initialise les evenements pour interagir avec le contenu de la modale
     */
    addEvents() {
        this.mediaElementActive.addEventListener('click', this.handleEvent);
        this.buttonLeftElement.addEventListener('click', this.handleEvent);
        this.buttonRightElement.addEventListener('click', this.handleEvent);
        this.buttonCloseModal.addEventListener('click', this.close);
        document.body.addEventListener('keyup', this.handleEvent);
    }

    currentElement() {
        return this.mediaElements[this.currentIndex].cloneNode(true);
    }

    /**
     * Met a jour l'index pour recuperer l'element correspondant
     */
    previous() {
        this.currentIndex = this.currentIndex === 0 ? this.maxIndex : this.currentIndex - 1;
    }

    /**
     * Met a jour l'index pour recuperer l'element correspondant
     */
    next() {
        this.currentIndex = this.currentIndex === this.maxIndex ? 0 : this.currentIndex + 1;
    }

    /**
     * Met a jour le conteneur pour afficher le media
     */
    change() {
        const newElement = this.currentElement();
        newElement.querySelector('.media-like').remove();
        newElement.setAttribute('tabindex', 0);
        newElement.addEventListener('click', this.handleEvent);
        this.mediaElementActive.replaceWith(newElement);
        this.mediaElementActive = newElement;
        this.optionsMediaVideo();
    }

    /**
     * Gestion des interactions clic et clavier
     *
     * - Echap / clic croix pour fermer la modal
     * - Enter / clic pour mettre en pause / play un media video
     * - Fleche Gauche / Fleche Droite / clic fleche pour naviguer entre chaque media
     *
     * @param {Event} event
     */
    handleEvent(event) {
        const action = event.key || event.target.dataset.direction || event.target.tagName.toLowerCase();

        switch (action) {
            case 'Escape':
                this.close(event);
                break;
            case 'Enter':
            case 'video':
                this.optionsMediaVideo();
                break;
            case 'left':
            case 'ArrowLeft':
                this.previous();
                this.change();
                break;
            case 'right':
            case 'ArrowRight':
                this.next();
                this.change();
                break;
        }
    }

    /**
     * Gestion de la fermeture de la modal
     *
     * - Appel callback de la fonction de fermeture de l'objet Modal
     * - Suppression des evenements clavier utilises lorsque la modal media est active
     *
     * @param {Event} event
     */
    close(event) {
        document.body.removeEventListener('keyup', this.handleEvent);
        this.callbackToClose();
    }

    /**
     * Ajout des attributs sur le media video qui est affiche
     */
    optionsMediaVideo() {
        const elementVideo = this.mediaElementActive.querySelector('video');
        if (elementVideo !== null) {
            elementVideo.setAttribute('tabindex', 0);
            elementVideo.preload = 'none';
            elementVideo.loop = 'true';
            elementVideo.controls = 'true';
            elementVideo.autoplay = 'true';
        }
    }

    /**
     * Retourne le composant construit
     * Si le media est un element video celui-ci est automatiquement lance
     *
     * @returns {Element}
     */
    buildComponent() {
        this.mediaSlideElement.classList.add('media-slide-container');
        this.mediaElementActive.querySelector('.media-like').remove();
        this.mediaElementActive.setAttribute('tabindex', 0);
        this.addEvents();

        this.mediaSlideElement.append(this.buttonLeftElement, this.mediaElementActive, this.buttonCloseModal, this.buttonRightElement);

        return this.mediaSlideElement;
    }

    /**
     * @see buildComponent
     * @returns {Element}
     */
    render() {
        return this.buildComponent();
    }
}
