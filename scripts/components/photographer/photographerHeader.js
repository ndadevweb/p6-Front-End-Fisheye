import { Title, Button } from '../ui/index.js';
import { PhotographerLocation, PhotographerTagline, PhotographerImage } from './photographer.js';
import ContactWithModal from './contactWithModal.js';

export default class PhotographerHeader {
  constructor(photographerEntity) {
    this.photographerEntity = photographerEntity;
    this.contactWithModal = ContactWithModal(this.photographerEntity);
    this.initElements();
  }

  /**
   * Initialise les elements
   */
  initElements() {
    this.headerElement = document.createElement('header');
    this.informationsElement = document.createElement('aside');
    this.nameElement = Title({ title: this.photographerEntity.name }, 'h1');
    this.locationElement = PhotographerLocation(this.photographerEntity);
    this.taglineElement = PhotographerTagline(this.photographerEntity);
    this.imageElement = PhotographerImage(this.photographerEntity);
    this.buttonModalElement = Button({
      value: 'Contactez-moi',
      type: 'button',
      callback: () => this.contactWithModal.open(),
    });
    this.buttonModalElement.setAttribute('aria-label', 'Contact Me');
    this.buttonModalElement.setAttribute('aria-keyshortcuts', 'alt+1');
    this.contactWithModal.setFocusElementAfterClosing(this.buttonModalElement);
  }

  /**
   * Methode pouvant etre utilisee par un observer
   *
   * Met a jour les elements du composant
   * en activant / desactivant les tabindex
   *
   * - type : modal
   * - data : { active }
   *
   * @param {Object}
   */
  update({ type, data }) {
    switch (type) {
      case 'modal':
        this.toggleInteractivity(data);
        break;
      default:
        throw new Error('A valid "type" must be specified');
    }
  }

  /**
   * Active / Desactive l'interaction avec l'element
   * lorsque cette methode est utilisee
   *
   * - Le focus ne pourra pas etre place sur cet element
   * - Un lecteur d'ecran ne pourra pas voir cet element
   *
   * - active : { Boolean }
   *
   * @param {Object}
   */
  toggleInteractivity({ active }) {
    const value = active === false ? -1 : 0;

    // Empeche un lecteur d'ecran tel que NVDA de lire le contenu
    // non visible en arriere plan lorsque la modal est ouverte
    this.headerElement.setAttribute('aria-hidden', active === false);
    // Evite la navigation au clavier sur les elements
    // non visible en arriere plan
    this.buttonModalElement.setAttribute('tabindex', value);
  }

  /**
   * Construction du composant
   *
   * @returns {Element}
   */
  buildComponent() {
    this.headerElement.classList.add('photographer-header');

    if (this.photographerEntity.id !== undefined) {
      this.informationsElement.classList.add('photographer-complementary');
      this.informationsElement.append(this.nameElement, this.locationElement, this.taglineElement);
      this.headerElement.append(this.informationsElement, this.buttonModalElement, this.imageElement);
    } else {
      const props = { title: "Ce photographe n'existe pas." };
      const headerTitle = Title(props, 'h1');
      this.headerElement.append(headerTitle);
      this.headerElement.classList.add('photographer-header--content-center');
    }

    return this.headerElement;
  }

  /**
   *
   * @returns {Element}
   */
  render() {
    return this.buildComponent();
  }
}
