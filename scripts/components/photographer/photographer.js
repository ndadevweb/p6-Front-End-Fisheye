/**
 * Retourne un element affichant la photo du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerImage = (props) => {
  const { name, pathPortrait } = props;

  const imageElement = document.createElement('img');
  const containerImageElement = document.createElement('div');

  containerImageElement.classList.add('container-image-photographer');
  containerImageElement.classList.add('container-image-photographer--loading');
  containerImageElement.append(imageElement);

  imageElement.classList.add('image-photographer');
  imageElement.setAttribute('alt', name);

  imageElement.addEventListener('load', (event) => {
    event.currentTarget.classList.add('image-photographer-opacity-progress');
    containerImageElement.classList.remove('container-image-photographer--loading');
  });

  imageElement.src = pathPortrait;

  return containerImageElement;
};

/**
 * Retourne un element contenant la localisation du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerLocation = (props) => {
  const { location } = props;
  const locationElement = document.createElement('p');

  locationElement.textContent = location;
  locationElement.classList.add('photographer-location');

  return locationElement;
};

/**
 * Retourne un element contenant le tagline du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerTagline = (props) => {
  const { tagline } = props;
  const taglineElement = document.createElement('p');

  taglineElement.textContent = tagline;
  taglineElement.classList.add('photographer-tagline');

  return taglineElement;
};

/**
 * Retourne un element contenant le tarif / prix du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerPrice = (props) => {
  const { price } = props;
  const priceElement = document.createElement('p');

  priceElement.textContent = `${price}€/jour`;
  priceElement.classList.add('photographer-price');

  return priceElement;
};
