import { Heart } from '../ui/heart.js';

export class MediaLike {
    /**
     *
     * @param {Object} props { likes }
     * @param {LikesObserver} LikesObserver
     */
    constructor(props, LikesObserver) {
        this.likes = parseInt(props.likes);
        this.mediaLikeContainer = document.createElement('aside');
        this.likesObserver = LikesObserver;
    }

    /**
     * Gere la mise a jour du compteur de like
     */
    handleUpdateLikes() {
        const mediaLikeContainer = this.mediaLikeContainer;
        const mediaLikeCounter = mediaLikeContainer.querySelector('.media-like-counter');

        mediaLikeContainer.classList.toggle('liked');
        const value = mediaLikeContainer.classList.contains('liked') === true ? 1 : -1;
        this.likes += value;
        mediaLikeCounter.textContent = this.likes;

        this.likesObserver.notify(value);
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
        buttonElement.addEventListener('click', () => this.handleUpdateLikes());
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
        this.mediaLikeContainer.append(this.buildCounter());
        this.mediaLikeContainer.append(this.buildButton());

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
