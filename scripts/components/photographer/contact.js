import { ButtonClose } from '../ui/button.js';

export class PhotographerFormContact {
    constructor(photographerName, callbackToClose) {
        this.photographerName = photographerName;
        this.callbackToClose = callbackToClose;
        this.initElements();
    }

    initElements() {
        this.containerForm = document.createElement('div');
        this.form = document.createElement('form');
        this.header = document.createElement('header');
        this.title = document.createElement('h2');
        this.spanTitle = document.createElement('span');
        this.spanPhotographerName = document.createElement('span');
        this.form = this.buildForm();
    }

    /**
     * Bind les methodes utilisees pour le traitement des evenements
     */
    bindMethods() {
        this.close = this.close.bind(this);
        this.handleKeyUpButtonClose = this.handleKeyUpButtonClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fuck(event) {}

    addEvents() {
        this.bindMethods();
        this.buttonClose.addEventListener('click', this.close);
        this.buttonClose.addEventListener('keyup', this.handleKeyUpButtonClose);
        this.form.addEventListener('submit', this.handleSubmit);
    }

    /**
     * Traitement des donnees du formulaire
     *
     * @param {Event}
     */
    handleSubmit(event) {
        event.preventDefault();

        document.querySelectorAll('input, textarea').forEach((element) => {
            console.log(element.name, ' : ', element.value);
        });

        event.target.reset();
    }

    /**
     * Evenemens clavier pour fermer la modal
     *
     * @param {Event} event
     */
    handleKeyUpButtonClose(event) {
        if (['Enter', ' '].includes(event.key) === true) {
            this.close();
        }
    }

    /**
     * Gestion de la fermeture de la modal
     *
     * - Appel callback de la fonction de fermeture de l'objet Modal
     *
     * @param {Event} event
     */
    close(event) {
        this.callbackToClose();
    }

    /**
     * Construit les elements du formulaire
     *
     * @param {Array} props { labelName, inputName, inputType }
     * @returns {Element}
     */
    buildField(props) {
        const [labelName, inputType, inputName] = props;

        const containerElement = document.createElement('div');
        const labelElement = document.createElement('label');
        let fieldElement = '';

        switch (inputType) {
            case 'text':
            case 'email':
                labelElement.textContent = labelName;
                labelElement.setAttribute('for', inputName);
                fieldElement = document.createElement('input');
                fieldElement.type = inputType;
                fieldElement.name = inputName;
                fieldElement.id = inputName;
                fieldElement.setAttribute('aria-labelledby', inputName);
                fieldElement.setAttribute('required', true);

                break;
            case 'textarea':
                labelElement.textContent = labelName;
                labelElement.setAttribute('for', inputName);
                fieldElement = document.createElement('textarea');
                fieldElement.name = inputName;
                fieldElement.id = inputName;
                fieldElement.setAttribute('aria-labelledby', inputName);
                fieldElement.setAttribute('required', true);

                break;
            case 'submit':
                fieldElement = document.createElement('button');
                fieldElement.type = inputType;
                fieldElement.textContent = labelName;
                fieldElement.classList.add('btn-contact');
                fieldElement.classList.add('focusable');
                fieldElement.setAttribute('required', true);

                break;
        }

        if (inputType !== 'submit') {
            containerElement.append(labelElement);
        }

        fieldElement.classList.add('focusable');
        containerElement.append(fieldElement);

        return containerElement;
    }

    /**
     * Construit et retourne le formulaire de contact
     *
     * @returns {Element}
     */
    buildForm() {
        const firstname = this.buildField(['Prénom', 'text', 'firstname']);
        const lastname = this.buildField(['Nom', 'text', 'lastname']);
        const email = this.buildField(['Email', 'email', 'email']);
        const message = this.buildField(['Votre message', 'textarea', 'message']);
        const button = this.buildField(['Envoyer', 'submit', '']);

        this.form.append(firstname, lastname, email, message, button);

        return this.form;
    }

    /**
     * Construit et retourne le composant
     *
     * @return {Element}
     */
    buildComponent() {
        this.buttonClose = ButtonClose({ className: 'btn-close--white' });
        this.buttonClose.setAttribute('aria-label', 'Close dialog');
        this.buttonClose.setAttribute('aria-keyshortcuts', 'Escape');
        this.spanTitle.textContent = 'Contactez-moi';
        this.spanPhotographerName.textContent = this.photographerName;

        this.title.append(this.spanTitle, this.spanPhotographerName);
        this.header.append(this.title, this.buttonClose);
        this.containerForm.append(this.header, this.form);
        this.containerForm.classList.add('contact-form');
        this.addEvents();

        return this.containerForm;
    }

    render() {
        return this.buildComponent();
    }
}
