import { Modal } from '../ui/index.js';
import { MediaSlide } from './mediaSlide.js';

/**
 *
 * @param {Element} mediaSelected
 * @param {Element} mediaElements
 * @returns {Modal}
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
    modal.setFocusElementAfterClosing(mediaSelected);

    return modal;
};
