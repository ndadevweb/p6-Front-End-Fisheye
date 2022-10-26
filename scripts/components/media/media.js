/**
 * Retourne un element image
 *
 * @param {Object} props
 * @returns {Element}
 */
export const MediaImage = (props) => {
  const { pathImage, title } = props;
  const imageElement = document.createElement('img');

  imageElement.addEventListener('load', (event) => {
    event.target.classList.add('focusable');
    event.target.classList.add('media-progressive-display');
    event.target.classList.add('media-ready');
  });
  imageElement.src = pathImage;
  imageElement.alt = title;
  imageElement.loading = 'lazy';
  imageElement.setAttribute('tabindex', 0);

  return imageElement;
};

/**
 * Retourne un element video
 *
 * @param {Object} props
 * @returns {Element}
 */
export const MediaVideo = (props) => {
  const { pathVideo } = props;
  const videoElement = document.createElement('video');
  const linkElement = document.createElement('a');
  const textNode = `
    Votre navigateur ne permet pas de lire les vidéos. Mais vous pouvez toujours
  `;

  linkElement.textContent = 'La télécharger';
  linkElement.href = pathVideo;

  videoElement.addEventListener('loadeddata', (event) => {
    event.target.classList.add('focusable');
    event.target.classList.add('media-progressive-display');
    event.target.classList.add('media-ready');
  });
  videoElement.src = pathVideo;
  videoElement.setAttribute('tabindex', 0);
  videoElement.append(textNode, linkElement);

  return videoElement;
};

/**
 * Retourne un element contenant un element MediaImage ou MediaVideo
 *
 * @param {Object} props
 * @returns {MediaImage | MediaVideo}
 */
export const MediaFactory = (props) => {
  const { hasImage } = props;
  const mediaSource = hasImage === true ? MediaImage(props) : MediaVideo(props);
  const mediaContainer = document.createElement('div');

  mediaSource.classList.add('media-item');
  mediaContainer.classList.add('media-container-source');
  mediaContainer.append(mediaSource);

  return mediaContainer;
};
