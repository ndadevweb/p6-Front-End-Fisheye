/**
 * Retourne un element image
 *
 * @param {Object} props
 * @returns {Element}
 */
const MediaImage = (props) => {
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

export default MediaImage;
