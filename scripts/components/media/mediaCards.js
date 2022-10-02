import { MediaCard } from './mediaCard.js';

/**
 * Retourne un element contenant chaque MediaCard
 *
 * @param {MediaEntity[]} props - contient un tableau contenant plusieurs MediaEntity
 * @param {LikesObserver} LikesObserver
 * @returns
 */
export const MediaCards = (props, LikesObserver) => {
    const mediaEntities = [...props];
    const mediasElement = document.createElement('section');

    mediasElement.classList.add('medias-container');

    mediaEntities.forEach((mediaEntity) => {
        const mediaCardElement = MediaCard(mediaEntity, LikesObserver);
        mediasElement.append(mediaCardElement);
    });

    return mediasElement;
};
