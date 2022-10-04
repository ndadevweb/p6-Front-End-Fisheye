import { Modal } from '../modal/modal.js';
import { PhotographerFormContact } from './contact.js';

/**
 * Retourne un objet modal contenant le formulaire de contact
 *
 * @param {PhotographerEntity} photographerEntity
 * @returns {Element}
 */
export const ContactWithModal = (photographerEntity) => {
    const { name } = photographerEntity;
    const modal = new Modal();
    const callbackToClose = () => modal.close();

    const photographerFormContact = new PhotographerFormContact(name, callbackToClose);
    modal.setContent(photographerFormContact.render());

    return modal;
};
