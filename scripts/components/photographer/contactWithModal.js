import { Modal } from '../ui/index.js';
import PhotographerFormContact from './contact.js';

/**
 * Retourne un objet modal contenant le formulaire de contact
 *
 * @param {PhotographerEntity} photographerEntity
 * @returns {Modal}
 */
const ContactWithModal = (photographerEntity) => {
  const { name } = photographerEntity;
  const modal = new Modal();
  const callbackToClose = () => modal.close();

  const photographerFormContact = new PhotographerFormContact(name, callbackToClose);
  modal.setContent(photographerFormContact.render());
  modal.setElementToFocusAfterOpened('input#firstname');

  return modal;
};

export default ContactWithModal;
