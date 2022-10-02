import { PhotographerImage, PhotographerLocation, PhotographerTagline, PhotographerPrice } from './photographer.js';
import { Title } from '../ui/title.js';

/**
 * Retourne un PhotographerCard element contenant les informations
 * du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerCard = (props) => {
    const cardElement = document.createElement('article');
    const linkElement = document.createElement('a');
    const imageElement = PhotographerImage(props);
    const fullnameElement = Title({ title: props.name }, 'h2');
    const complementaryElement = document.createElement('aside');
    const locationElement = PhotographerLocation(props);
    const taglineElement = PhotographerTagline(props);
    const priceElement = PhotographerPrice(props);

    linkElement.href = `photographer.html?id=${props.id}`;
    linkElement.classList.add('focusable');

    complementaryElement.classList.add('photographer-complementary');

    [imageElement, fullnameElement].forEach((element) => linkElement.append(element));
    [locationElement, taglineElement, priceElement].forEach((element) => complementaryElement.append(element));
    [linkElement, complementaryElement].forEach((element) => cardElement.append(element));

    return cardElement;
};
