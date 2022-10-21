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
    const { photographerEntity, contactWithModal } = props;
    const headerElement = document.createElement('header');
    const photographerInformationElement = document.createElement('aside');

    const nameElement = Title({ title: photographerEntity.name }, 'h1');
    const locationElement = PhotographerLocation(photographerEntity);
    const taglineElement = PhotographerTagline(photographerEntity);

    const buttonModalProps = {
        value: 'Contactez-moi',
        type: 'button',
        callback: () => contactWithModal.open(),
    };
    const buttonModalElement = Button(buttonModalProps);
    const imageElement = PhotographerImage(photographerEntity);

    photographerInformationElement.classList.add('photographer-complementary');
    headerElement.classList.add('photographer-header');

    photographerInformationElement.append(nameElement, locationElement, taglineElement);
    headerElement.append(photographerInformationElement, buttonModalElement, imageElement);

    return headerElement;
};
