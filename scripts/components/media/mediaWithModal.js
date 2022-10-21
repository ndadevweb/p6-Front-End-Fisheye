import { Modal } from '../modal/modal.js';
import { MediaSlide } from './mediaSlide.js';

/**
 *
 * @param {Element} mediaSelected
 * @param {Element} mediaElements
 * @returns
 */
export const MediaWithModal = (mediaSelected, mediaElements) => {
    const modal = new Modal();
    const callbackToClose = () => modal.close();
    const mediaSlide = new MediaSlide({
        mediaElementActive: mediaSelected,
        mediaElements: mediaElements,
        callbackToClose: callbackToClose,
    });

    modal.setContent(mediaSlide.render());

    return modal;
};
