/**
 * Retourne un element video
 *
 * @param {Object} props
 * @returns {Element}
 */
const MediaVideo = (props) => {
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

export default MediaVideo;
