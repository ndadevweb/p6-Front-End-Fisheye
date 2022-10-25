import { Modal } from '../ui/index.js';
import MediaSlide from './mediaSlide.js';

/**
 *
 * @param {Element} mediaSelected
 * @param {Element} mediaElements
 * @returns {Modal}
 */
const MediaWithModal = (mediaSelected, mediaElements) => {
  const modal = new Modal();
  const callbackToClose = () => modal.close();
  const mediaSlide = new MediaSlide({
    mediaElementActive: mediaSelected,
    mediaElements,
    callbackToClose,
  });

  modal.setContent(mediaSlide.render());
  modal.setFocusElementAfterClosing(mediaSelected);

  return modal;
};

export default MediaWithModal;
