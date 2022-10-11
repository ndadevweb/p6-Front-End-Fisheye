import { MediaCard } from './mediaCard.js';
import { MediaLike } from './mediaLike.js';
import { MediaWithModal } from './mediaWithModal.js';

/**
 * Retourne un element contenant chaque MediaCard
 *
 * @param {MediaEntity[]} mediaEntities
 * @param {LikesObserver} LikesObserver
 * @returns {Element}
 */
export const MediaCards = (mediaEntities, LikesObserver) => {
    const mediasElement = document.createElement('section');

    mediasElement.classList.add('medias-container');
    mediasElement.addEventListener('keyup', (event) => {
        const target = event.target.querySelector('img, video');

        if (target !== null && event.key === 'Enter') {
            target.click();
        }
    });

    mediasElement.addEventListener('click', (event) => {
        if (event.target.closest('button') !== null) {
            const value = MediaLike.updateCounterElement(event.target);
            LikesObserver.notify(value);
        }

        if (['IMG', 'VIDEO'].includes(event.target.tagName) === true) {
            const mediaClicked = event.target.closest('article');
            const mediaElements = event.currentTarget.querySelectorAll('.media-container');
            MediaWithModal(mediaClicked, mediaElements).open();
        }
    });

    mediaEntities.forEach((mediaEntity) => {
        const mediaCardElement = MediaCard(mediaEntity, LikesObserver);
        mediasElement.append(mediaCardElement);
    });

    return mediasElement;
};
