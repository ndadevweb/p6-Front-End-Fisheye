import { MediaSource } from './media.js';
import { MediaLike } from './mediaLike.js';
import { Title } from '../ui/title.js';

/**
 * Retourne un element contenant un media Image ou Video
 *
 * @param {Object} props
 * @returns {Element}
 */
export const MediaCard = (props, LikesObserver) => {
    const { id, date } = props;
    const cardElement = document.createElement('article');
    const mediaLikeElement = new MediaLike(props, LikesObserver).render();
    const mediaElement = MediaSource(props);
    const titleElement = Title(props, 'h3');

    cardElement.classList.add('media-container');
    cardElement.classList.add('focusable');
    cardElement.setAttribute('tabindex', '0');
    cardElement.dataset.id = id;
    cardElement.dataset.date = date;
    cardElement.append(mediaElement, titleElement, mediaLikeElement);

    return cardElement;
};
