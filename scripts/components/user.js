/**
 * Retourne un element affichant la photo du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const UserImage = (props) => {
    const { name, pathPortrait } = props;

    const imageElement = document.createElement('img');
    const containerImageElement = document.createElement('div');

    containerImageElement.classList.add('container-image-photographer');
    containerImageElement.classList.add('container-image-photographer--loading');
    containerImageElement.append(imageElement);

    imageElement.classList.add('image-photographer');
    imageElement.setAttribute('alt', '');

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
export const UserLocation = (props) => {
    const { location } = props;
    const locationElement = document.createElement('span');

    locationElement.textContent = location;

    return locationElement;
};

/**
 * Retourne un element contenant le tagline du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const UserTagline = (props) => {
    const { tagline } = props;
    const taglineElement = document.createElement('span');

    taglineElement.textContent = tagline;

    return taglineElement;
};

/**
 * Retourne un element contenant le tarif / prix du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const UserPrice = (props) => {
    const { price } = props;
    const priceElement = document.createElement('span');

    priceElement.textContent = `${price}€/jour`;

    return priceElement;
};
