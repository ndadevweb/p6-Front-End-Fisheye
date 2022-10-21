import { UserImage, UserLocation, UserTagline, UserPrice } from './user.js';
import { Title } from './title.js';

/**
 * Retourne un UserCard element
 *
 * @param {Object} props
 * @returns {Element}
 */
export const UserCard = (props) => {
    const cardElement = document.createElement('article');
    const linkElement = document.createElement('a');
    const imageElement = UserImage(props);
    const fullnameElement = Title(props, 'h2');
    const complementaryElement = document.createElement('p');
    const locationElement = UserLocation(props);
    const taglineElement = UserTagline(props);
    const priceElement = UserPrice(props);

    linkElement.href = `photographer.html?id=${props.id}`;
    complementaryElement.classList.add('photograper-complementary');
    locationElement.classList.add('photographer-location');
    taglineElement.classList.add('photographer-tagline');
    priceElement.classList.add('photographer-price');

    linkElement.append(imageElement, fullnameElement);
    complementaryElement.append(location, taglineElement);
    cardElement.append(linkElement, complementaryElement);

    return cardElement;
};
