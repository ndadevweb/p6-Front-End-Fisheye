import { Title } from '../ui/title.js';
import { Button } from '../ui/button.js';
import { PhotographerLocation, PhotographerTagline, PhotographerImage } from './photographer.js';

/**
 * Retourne un header element contenant les informations du photographe
 *
 * @param {Object} props
 * @returns {Element}
 */
export const PhotographerHeader = (props) => {
    const headerElement = document.createElement('header');
    const photographerInformationElement = document.createElement('aside');

    const nameElement = Title({ title: props.name }, 'h1');
    const locationElement = PhotographerLocation(props);
    const taglineElement = PhotographerTagline(props);

    const buttonModalProps = { value: 'Contactez-moi', type: 'button', callback: displayModal };
    const buttonModalElement = Button(buttonModalProps);

    const imageElement = PhotographerImage(props);

    photographerInformationElement.classList.add('photographer-complementary');
    headerElement.classList.add('photographer-header');

    [nameElement, locationElement, taglineElement].forEach((element) => {
        photographerInformationElement.append(element);
    });

    [photographerInformationElement, buttonModalElement, imageElement].forEach((element) => {
        headerElement.append(element);
    });

    return headerElement;
};
