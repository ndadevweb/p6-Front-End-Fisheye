import { MediaCard } from './mediaCard.js';
import { MediaLike } from './mediaLike.js';
import { MediaWithModal } from './mediaWithModal.js';

export class MediaCards {
    /**
     * Initialise les donnees necessaires a la construction du composant
     *
     * @param {MediaEntity[]} mediaEntities
     * @param {LikesObserver} LikesObserver
     */
    constructor(mediaEntities, LikesObserver) {
        this.mediaEntities = mediaEntities;
        this.likesObserver = LikesObserver;
        this.mediasElement = document.createElement('div');
    }

    /**
     * Methode pouvant etre utilisee par un observer
     *
     * - {String} sortBy
     *
     * @see sortBy()
     * @param {Object} props
     */
    update({ sortBy }) {
        const compare = this.sortBy(sortBy);
        const childrenSorted = Array.from(this.mediasElement.children).sort(compare);

        document.querySelector('.medias-container').replaceChildren(...childrenSorted);
    }

    /**
     * Gestion du tri des medias par cle
     * - likes : Popularite
     * - date  : Date
     * - title : Titre
     *
     * @param {String} key
     * @returns {Function}
     */
    sortBy(key) {
        switch (key) {
            case 'likes':
                return (elementA, elementB) => {
                    const likes = (element) => parseInt(element.querySelector('.media-like-counter').textContent);
                    const [likesA, likesB] = [likes(elementA), likes(elementB)];

                    return likesA === likesB ? 0 : likesA > likesB ? -1 : 1;
                };

            case 'date':
                return (elementA, elementB) => {
                    const toTime = (element) => new Date(element.dataset.date).getTime();
                    const [timeA, timeB] = [toTime(elementA), toTime(elementB)];

                    return timeA === timeB ? 0 : timeA > timeB ? -1 : 1;
                };

            case 'title':
                return (elementA, elementB) => {
                    const title = (element) => element.querySelector('h3').textContent;
                    const [titleA, titleB] = [title(elementA), title(elementB)];

                    return titleA.localeCompare(titleB);
                };

            default:
                return (elementA, elementB) => 0;
        }
    }

    /**
     * Initialise les evenements clavier / souris
     * - Gestion des likes sur un media
     * - Gestion de la modal lightbox
     */
    addEvents() {
        this.mediasElement.addEventListener('keyup', (event) => {
            const target = event.target.querySelector('img, video');

            if (target !== null && event.key === 'Enter') {
                target.click();
            }
        });

        this.mediasElement.addEventListener('click', (event) => {
            if (event.target.closest('button') !== null) {
                const value = MediaLike.updateCounterElement(event.target);
                const mediaId = parseInt(event.target.closest('.media-container').dataset.id);
                const mediaEntityIndex = this.mediaEntities.findIndex((mediaEntity) => mediaEntity.id === mediaId);

                this.mediaEntities[mediaEntityIndex].updateLikes(value);
                this.likesObserver.notify(value);
            }

            if (['IMG', 'VIDEO'].includes(event.target.tagName) === true) {
                const mediaSelected = event.target.closest('article');
                const mediaElements = event.currentTarget.querySelectorAll('.media-container');
                MediaWithModal(mediaSelected, mediaElements).open();
            }
        });
    }

    /**
     * Construit le composant
     *
     * @returns {Element}
     */
    buildComponent() {
        this.mediasElement.classList.add('medias-container');
        this.addEvents();

        this.mediaEntities.forEach((mediaEntity) => {
            const mediaCardElement = MediaCard(mediaEntity, this.likesObserver);
            this.mediasElement.append(mediaCardElement);
        });

        return this.mediasElement;
    }

    /**
     * Retourne le composant construit pret a etre affiche
     *
     * @see buildComponent()
     * @returns {Element}
     */
    render() {
        return this.buildComponent();
    }
}
