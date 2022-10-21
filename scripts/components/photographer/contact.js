export class PhotographerFormContact {
    constructor(photographerName, callbackToClose) {
        this.photographerName = photographerName;
        this.containerForm = document.createElement('div');
        this.form = document.createElement('form');
        this.callbackToClose = callbackToClose;
    }

    /**
     * Traitement des donnees du formulaire
     */
    handleSubmit() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();

            document.querySelectorAll('input, textarea').forEach((element) => {
                console.log(element.name, ' : ', element.value);
            });

            event.target.reset();
        });
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

                break;
            case 'textarea':
                labelElement.textContent = labelName;
                labelElement.setAttribute('for', inputName);
                fieldElement = document.createElement('textarea');
                fieldElement.name = inputName;
                fieldElement.id = inputName;

                break;
            case 'submit':
                fieldElement = document.createElement('button');
                fieldElement.type = inputType;
                fieldElement.textContent = labelName;
                fieldElement.classList.add('btn');
                fieldElement.classList.add('contact_button');
                fieldElement.classList.add('focusable');

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
        this.handleSubmit();

        return this.form;
    }

    /**
     * Construit et retourne le composant
     *
     * @return {Element}
     */
    buildComponent() {
        const header = document.createElement('header');
        const title = document.createElement('h2');
        const spanTitle = document.createElement('span');
        const spanPhotographerName = document.createElement('span');
        const image = document.createElement('img');
        const form = this.buildForm();

        image.addEventListener('click', () => this.callbackToClose());
        image.src = './assets/icons/close.svg';
        spanTitle.textContent = 'Contactez-moi';
        spanPhotographerName.textContent = this.photographerName;

        title.append(spanTitle, spanPhotographerName);
        header.append(title, image);
        this.containerForm.append(header, form);
        this.containerForm.classList.add('contact-form');

        return this.containerForm;
    }

    render() {
        return this.buildComponent();
    }
}
