import {
  PhotographerImage, PhotographerLocation, PhotographerTagline, PhotographerPrice,
} from './photographer.js';
import { Title } from '../ui/index.js';

/**
 * Retourne un PhotographerCard element contenant les informations
 * du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
const PhotographerCard = (props) => {
  const cardElement = document.createElement('article');
  const linkElement = document.createElement('a');
  const imageElement = PhotographerImage({
    name: '',
    pathPortrait: props.pathPortrait,
  });
  const fullnameElement = Title({ title: props.name }, 'h2');
  const complementaryElement = document.createElement('aside');
  const locationElement = PhotographerLocation(props);
  const taglineElement = PhotographerTagline(props);
  const priceElement = PhotographerPrice(props);

  linkElement.href = `photographer.html?id=${props.id}`;
  linkElement.setAttribute('aria-label', props.name);
  linkElement.classList.add('focusable');

  complementaryElement.classList.add('photographer-complementary');

  linkElement.append(imageElement, fullnameElement);
  complementaryElement.append(locationElement, taglineElement, priceElement);
  cardElement.append(linkElement, complementaryElement);

  return cardElement;
};

export default PhotographerCard;
