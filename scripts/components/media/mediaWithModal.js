import { Modal } from '../modal/modal.js';
import { MediaSlide } from './mediaSlide.js';

export const MediaWithModal = (mediaClicked, mediaElements) => {
    const modal = new Modal();
    const callbackToClose = () => modal.close();
    const mediaSlide = new MediaSlide({
        mediaElementActive: mediaClicked,
        mediaElements: mediaElements,
        callbackToClose: callbackToClose,
    });

    modal.setContent(mediaSlide.render());

    return modal;
};
