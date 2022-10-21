export class MediaSorter {
    /**
     * Initialisation des elements et des donnees
     *
     * @param {SortObserver} SortObserver
     */
    constructor(SortObserver) {
        this.sortObserver = SortObserver;
        this.listboxData = this.listboxData();
        this.initElements();
        this.bindMethods();
    }

    /**
     * Retourne les cles utilisees pour le tri des medias
     *
     * @returns {Array}
     */
    listboxData() {
        return [
            { label: 'Popularité', sortBy: 'likes' },
            { label: 'Date', sortBy: 'date' },
            { label: 'Titre', sortBy: 'title' },
        ];
    }

    /**
     * Initialise les elements
     */
    initElements() {
        this.mediaSorterContainer = document.createElement('div');
        this.listboxElement = document.createElement('div');
        this.labelElement = document.createElement('label');
        this.buttonElement = document.createElement('button');
        this.listElement = document.createElement('ul');
        this.arrowElement = document.createElement('span');
    }

    /**
     * Bind les methodes utilisees pour le traitement des evenements
     */
    bindMethods() {
        this.handleClickButtonListbox = this.handleClickButtonListbox.bind(this);
        this.handleClickListbox = this.handleClickListbox.bind(this);
        this.handleKeyUpListbox = this.handleKeyUpListbox.bind(this);
    }

    /**
     * Active les evenements sur les differements elements
     */
    addEvents() {
        this.buttonElement.addEventListener('click', this.handleClickButtonListbox);
        this.listElement.addEventListener('click', this.handleClickListbox);
        this.listElement.addEventListener('keyup', this.handleKeyUpListbox);
    }

    /**
     * Methode utilisee pour la gestion de l'ouverture / fermeture
     * de l'element listbox
     */
    handleClickButtonListbox() {
        this.arrowElement.classList.toggle('open');
        this.listElement.classList.toggle('open');

        const isOpen = this.listElement.classList.contains('open');

        // Active / desactive les tabindex
        const enableLiTabindex = isOpen === true ? 0 : -1;
        Array.from(this.listElement.querySelectorAll('li')).map((liElement) => liElement.setAttribute('tabindex', enableLiTabindex));

        // Active / desactive les valeurs des attributs aria
        if (isOpen === true) {
            this.listElement.setAttribute('aria-hidden', false);
            this.listElement.setAttribute('aria-expanded', true);
        } else {
            this.listElement.setAttribute('aria-hidden', true);
            this.listElement.setAttribute('aria-expanded', false);
        }
    }

    /**
     * Methode utilisee pour la gestion du clique
     * sur un element de la listbox
     *
     * @param {Event} event
     */
    handleClickListbox(event) {
        if (event.target.tagName === 'LI') {
            const liElement = event.target;

            // 1 - Recuperer le champs a trier
            const sortByKey = liElement.dataset.sortby;

            // 2 - Changement des informations de l'item selectionne remplace par les donnees du bouton
            const elementSelected = liElement.cloneNode(true);
            elementSelected.textContent = this.buttonElement.dataset.label;
            elementSelected.dataset.label = this.buttonElement.dataset.label;
            elementSelected.dataset.sortby = this.buttonElement.dataset.sortby;

            // 3 - Changement des informations du bouton remplace par les donnees de l'item selectionne
            this.buttonElement.textContent = liElement.dataset.label;
            this.buttonElement.dataset.label = liElement.dataset.label;
            this.buttonElement.dataset.sortby = liElement.dataset.sortby;

            // 4 - L'item selectionne est remplace
            liElement.replaceWith(elementSelected);

            // 5 - Tri des medias et fermeture du bouton listbox
            this.sortObserver.notify({ sortBy: sortByKey });
            this.buttonElement.click();
            this.buttonElement.focus();
            this.buttonElement.append(this.arrowElement);
        }
    }

    /**
     * Gestion des touches Enter et Escape
     * - Enter : valider son choix
     * - Escape : fermer la listbox
     *
     * @param {Event} event
     * @returns {null}
     */
    handleKeyUpListbox(event) {
        if (this.listElement.classList.contains('open') === false) {
            return null;
        }

        if (event.key === 'Escape') {
            this.buttonElement.click();
            this.buttonElement.focus();
        } else if (event.key === 'Enter') {
            event.target.click();
        }
    }

    buildLiElements() {
        const liElements = this.listboxData
            .filter((objectData) => objectData.sortBy !== this.buttonElement.dataset.sortby)
            .forEach((objectData) => {
                const listItemElement = document.createElement('li');

                listItemElement.textContent = objectData.label;
                listItemElement.setAttribute('tabindex', -1);
                listItemElement.dataset.label = objectData.label;
                listItemElement.dataset.sortby = objectData.sortBy;
                listItemElement.classList.add('focusable');

                this.listElement.append(listItemElement);
            });
    }

    /**
     * Construction du composant listbox
     *
     * @returns {Element}
     */
    buildComponent() {
        this.listboxElement.classList.add('listbox-container');
        this.listElement.classList.add('listbox');
        this.arrowElement.classList.add('arrow');

        this.buttonElement.textContent = this.listboxData[0]['label'];
        this.buttonElement.classList.add('btn-listbox');
        this.buttonElement.classList.add('focusable');
        this.buttonElement.dataset.label = this.listboxData[0]['label'];
        this.buttonElement.dataset.sortby = this.listboxData[0]['sortBy'];
        this.buttonElement.type = 'button';
        this.buttonElement.id = 'sort-by';
        this.buttonElement.append(this.arrowElement);

        this.buildLiElements();

        this.listElement.setAttribute('aria-hidden', true);
        this.listElement.setAttribute('aria-expanded', false);
        this.listboxElement.append(this.buttonElement, this.listElement);

        this.labelElement.textContent = 'Trier par';
        this.labelElement.setAttribute('for', 'sortBy');

        this.mediaSorterContainer.classList.add('media-sorter');
        this.mediaSorterContainer.append(this.labelElement, this.listboxElement);

        this.addEvents();

        return this.mediaSorterContainer;
    }

    /**
     *
     * @returns @see buildComponent()
     */
    render() {
        return this.buildComponent();
    }
}
