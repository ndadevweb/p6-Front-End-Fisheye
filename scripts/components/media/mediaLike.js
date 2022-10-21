import { Heart } from '../ui/heart.js';

export class MediaLike {
    /**
     *
     * @param {Object} props { likes }
     */
    constructor(props) {
        this.likes = parseInt(props.likes);
        this.mediaLikeContainer = document.createElement('aside');
    }

    /**
     * Met a jour le compteur de like de l'element cible en argument
     * Retourne 1 si le media est like ou -1 si celui-ci est dislike
     *
     * @param {Element} target
     * @returns {Integer} 1 | -1
     */
    static updateCounterElement(target) {
        const mediaLikeContainer = target.closest('.media-like');
        const mediaLikeCounterElement = mediaLikeContainer.querySelector('.media-like-counter');
        const counterLike = parseInt(mediaLikeCounterElement.textContent);

        mediaLikeContainer.classList.toggle('liked');

        const value = mediaLikeContainer.classList.contains('liked') === true ? 1 : -1;

        mediaLikeCounterElement.textContent = counterLike + value;

        return value;
    }

    /**
     * Retourne un element contenant le nombre de like
     *
     * @returns {Element}
     */
    buildCounter() {
        const counterElement = document.createElement('span');

        counterElement.classList.add('media-like-counter');
        counterElement.textContent = this.likes;

        return counterElement;
    }

    /**
     * Retourne un element contenant le bouton pour like un media
     *
     * @returns {Element}
     */
    buildButton() {
        const buttonElement = document.createElement('button');

        buttonElement.type = 'button';
        buttonElement.classList.add('media-like-btn');
        buttonElement.classList.add('focusable');
        buttonElement.innerHTML = Heart();

        return buttonElement;
    }

    /**
     * Construire et retourne le composant complet ( compteur + icone like )
     *
     * @returns {Element}
     */
    buildComponent() {
        this.mediaLikeContainer.classList.add('media-like');
        this.mediaLikeContainer.setAttribute('aria-label', 'likes');
        this.mediaLikeContainer.append(this.buildCounter(), this.buildButton());

        return this.mediaLikeContainer;
    }

    /**
     * Retourne le composant complet ( compteur + icone like )
     *
     * @returns {Element}
     */
    render() {
        return this.buildComponent();
    }
}
