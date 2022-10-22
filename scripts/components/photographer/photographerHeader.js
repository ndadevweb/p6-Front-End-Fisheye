import { Title } from '../ui/title.js';
import { Button } from '../ui/button.js';
import { PhotographerLocation, PhotographerTagline, PhotographerImage } from './photographer.js';
import { ContactWithModal } from './contactWithModal.js';

export class PhotographerHeader {
    constructor(photographerEntity) {
        this.photographerEntity = photographerEntity;
        this.contactWithModal = ContactWithModal(this.photographerEntity);
        this.initElements();
    }

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
                this.toggleTabindex(data);
                break;
        }
    }

    /**
     * Active desactive les tabindex
     * Si { active } = true : active les tabindex ( tabindex = 0 )
     * si { active } = false : desactive les tabindex ( tabindex = -1 )
     *
     * @param {Object}
     */
    toggleTabindex({ active }) {
        const value = active === false ? -1 : 0;

        this.buttonModalElement.setAttribute('tabindex', value);
    }

    /**
     * Construction du composant
     *
     * @returns {Element}
     */
    buildComponent() {
        this.informationsElement.classList.add('photographer-complementary');
        this.informationsElement.append(this.nameElement, this.locationElement, this.taglineElement);
        this.headerElement.classList.add('photographer-header');
        this.headerElement.append(this.informationsElement, this.buttonModalElement, this.imageElement);

        return this.headerElement;
    }

    render() {
        return this.buildComponent();
    }
}
