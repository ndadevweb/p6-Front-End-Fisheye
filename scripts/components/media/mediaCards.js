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
        this.mediaCardElements = [];
        this.mediasElement = document.createElement('section');
        this.defaultSortedByKey = 'likes';
    }

    /**
     * Methode pouvant etre utilisee par un observer
     *
     * @see sortBy()
     * @see toggleTabindex()
     *
     * @param {Object} { type, data }
     */
    update({ type, data }) {
        switch (type) {
            case 'sort':
                const compare = this.sortBy(data.sortByKey);
                const childrenSorted = Array.from(this.mediasElement.children).sort(compare);
                this.mediasElement.replaceChildren(...childrenSorted);
                break;
            case 'modal':
                this.toggleTabindex(data);
                break;
        }
    }

    /**
     * Gestion du tri des medias par cle
     *
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
                // Du plus populaire au moins populaire
                return (elementA, elementB) => {
                    const likes = (element) => parseInt(element.querySelector('.media-like-counter').textContent);
                    const [likesA, likesB] = [likes(elementA), likes(elementB)];

                    return likesA === likesB ? 0 : likesA > likesB ? -1 : 1;
                };

            case 'date':
                // Du plus recent au moins recent
                return (elementA, elementB) => {
                    const toTime = (element) => new Date(element.dataset.date).getTime();
                    const [timeA, timeB] = [toTime(elementA), toTime(elementB)];

                    return timeA === timeB ? 0 : timeA > timeB ? -1 : 1;
                };

            case 'title':
                // Par ordre alphabetique
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
     * Active desactive les tabindex
     *
     * Si { active } = true : active les tabindex ( tabindex = 0 )
     * si { active } = false : desactive les tabindex ( tabindex = -1 )
     *
     * @param {Object}
     */
    toggleTabindex({ active }) {
        this.mediaCardElements.forEach((MediaCard) => {
            MediaCard.toggleTabindex({ active });
        });
    }

    /**
     * Met a jour le compteur de like
     * notifie l'observer pour mettre a jour le compteur
     * total des likes du photographe
     *
     * @param {Element} target
     */
    updateLikeCounter(target) {
        const value = MediaLike.updateCounterElement(target);
        const mediaId = parseInt(target.closest('.media-container').dataset.id);
        const mediaEntityIndex = this.mediaEntities.findIndex((mediaEntity) => mediaEntity.id === mediaId);

        this.mediaEntities[mediaEntityIndex].updateLikes(value);
        this.likesObserver.notify(value);
    }

    /**
     * Ouvre la modal lightbox / mediaSlide
     *
     * @param {Element} target
     */
    openMediaModal(target) {
        const mediaSelected = target.closest('article');
        const mediaElements = this.mediasElement.querySelectorAll('.media-container');
        const mediaWithModal = MediaWithModal(mediaSelected, mediaElements);

        mediaWithModal.open();
    }

    /**
     * Bind les methodes utilisees pour le traitement des evenements
     */
    bindMethods() {
        this.updateLikeCounter = this.updateLikeCounter.bind(this);
        this.openMediaModal = this.openMediaModal.bind(this);
        this.handleClickMediasElement = this.handleClickMediasElement.bind(this);
        this.handleKeyUpMediasElement = this.handleKeyUpMediasElement.bind(this);
    }

    /**
     * Gere les evenements click de chaque element
     * - Gestion du like
     * - Ouverture de la modal lightbox / mediaSlide
     * - Un seul... pour les gouverner tous... o
     *
     * @param {Event} event
     */
    handleClickMediasElement(event) {
        if (event.target.closest('.media-like-btn') !== null) {
            this.updateLikeCounter(event.target);
        }

        if (['IMG', 'VIDEO'].includes(event.target.tagName) === true) {
            this.openMediaModal(event.target);
        }
    }

    /**
     * Gere les evenements clavier ( Enter )
     * - Ouverture de la modal lorsque l'element qui a le focus
     *   a la classe .media-container
     *
     * @param {Event} event
     * @returns
     */
    handleKeyUpMediasElement(event) {
        if (event.key !== 'Enter') {
            return null;
        }

        if (event.target.classList.contains('media-container')) {
            this.openMediaModal(event.target);
        }
    }

    /**
     * Initialise les evenements clavier / souris
     *
     * - Gestion des likes sur un media
     * - Gestion de la modal lightbox
     */
    addEvents() {
        this.bindMethods();
        this.mediasElement.addEventListener('click', this.handleClickMediasElement);
        this.mediasElement.addEventListener('keyup', this.handleKeyUpMediasElement);
    }

    /**
     * Construit le composant
     *
     * @returns {Element}
     */
    buildComponent() {
        this.mediasElement.classList.add('medias-container');
        this.mediasElement.setAttribute('aria-label', 'Medias');
        this.mediasElement.setAttribute('aria-shortcuts', 'alt+3');
        this.addEvents();

        this.mediaEntities.forEach((mediaEntity) => {
            const mediaCardElement = new MediaCard(mediaEntity, this.likesObserver);

            this.mediaCardElements.push(mediaCardElement);
            this.mediasElement.append(mediaCardElement.render());
        });

        this.update({ type: 'sort', data: { sortByKey: this.defaultSortedByKey } });

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
