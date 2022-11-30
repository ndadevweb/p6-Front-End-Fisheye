import MediaImage from '../components/media/mediaImage.js';
import MediaVideo from '../components/media/mediaVideo.js';

/**
 * Retourne un element contenant un element MediaImage ou MediaVideo
 *
 * @param {Object} props
 * @returns {MediaImage | MediaVideo}
 */
const MediaFactory = (props) => {
  const { hasImage } = props;
  const mediaSource = hasImage === true ? MediaImage(props) : MediaVideo(props);
  const mediaContainer = document.createElement('div');

  mediaSource.classList.add('media-item');
  mediaContainer.classList.add('media-container-source');
  mediaContainer.append(mediaSource);

  return mediaContainer;
};

export default MediaFactory;
