export default class MediaSorter {
  /**
   * Initialisation des elements et des donnees
   *
   * @param {SortObserver} SortObserver
   */
  constructor(SortObserver) {
    this.sortObserver = SortObserver;
    this.initElements();
    this.bindMethods();
  }

  /**
   * Retourne les cles utilisees pour le tri des medias
   *
   * @static
   * @returns {Array}
   */
  static listboxData() {
    return [
      { label: 'Popularité', sortBy: 'likes', key: 'p' },
      { label: 'Date', sortBy: 'date', key: 'd' },
      { label: 'Titre', sortBy: 'title', key: 't' },
    ];
  }

  /**
   * Initialise les elements
   */
  initElements() {
    this.mediaSorterContainer = document.createElement('form');
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
    this.handleKeyDownButtonListbox = this.handleKeyDownButtonListbox.bind(this);
    this.handleKeyUpButtonListbox = this.handleKeyUpButtonListbox.bind(this);
    this.handleClickListbox = this.handleClickListbox.bind(this);
    this.handleKeyUpListbox = this.handleKeyUpListbox.bind(this);
    this.handleKeyDownListbox = this.handleKeyDownListbox.bind(this);
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
   * @throws A valid "type" must be specified
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
    this.mediaSorterContainer.setAttribute('aria-hidden', active === false);
    // Evite la navigation au clavier sur cet element
    // non visible en arriere plan
    this.buttonElement.setAttribute('tabindex', value);

    // Les elements sont accessibles au clavier seulement si la liste est active / ouverte
    if (this.buttonElement.getAttribute('aria-expanded') === true) {
      this.listElement.querySelector('li').forEach((liElement) => liElement.setAttribute('tabindex', value));
    }
  }

  /**
   * Active les evenements sur les differements elements
   */
  addEvents() {
    this.buttonElement.addEventListener('click', this.handleClickButtonListbox);
    this.buttonElement.addEventListener('keydown', this.handleKeyDownButtonListbox);
    this.buttonElement.addEventListener('keyup', this.handleKeyUpButtonListbox);
    this.listElement.addEventListener('click', this.handleClickListbox);
    this.listElement.addEventListener('keyup', this.handleKeyUpListbox);
    this.listElement.addEventListener('keydown', this.handleKeyDownListbox);
    this.listElement.addEventListener('focusin', (event) => this.listElement.setAttribute('aria-activedescendant', event.target.id));
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
      this.buttonElement.setAttribute('aria-expanded', true);
    } else {
      this.listElement.setAttribute('aria-hidden', true);
      this.listElement.setAttribute('aria-activedescendant', 'none');
      this.buttonElement.setAttribute('aria-expanded', false);
    }
  }

  /**
   * Gestion des touches flechees Haut et Bas
   *
   * @param {Event} event
   * @returns {null}
   */
  handleKeyDownButtonListbox(event) {
    if (['ArrowUp', 'ArrowDown'].includes(event.key) === false) {
      return null;
    }

    event.preventDefault();

    if (this.listElement.classList.contains('open') === false) {
      event.target.click();
    }

    if (event.key === 'ArrowUp') {
      this.listElement.lastChild.focus();
      this.listElement.setAttribute('aria-activedescendant', this.listElement.lastChild.id);
    } else if (event.key === 'ArrowDown') {
      this.listElement.firstChild.focus();
      this.listElement.setAttribute('aria-activedescendant', this.listElement.firstChild.id);
    }

    return null;
  }

  /**
   * Gestion de la touche clavier Echap pour ferme la listbox
   * si celle-ci est ouverte
   *
   * Gestion des touches clavier definies dans la methode listboxData()
   * pour selectionner une option lorsque que la listbox est ouverte
   *
   * @param {Event} event
   * @returns {null}
   */
  handleKeyUpButtonListbox(event) {
    // touches clavier pouvant etre utilisees pour selectionner une option
    const shortcutsAllowed = MediaSorter.listboxData().map((item) => item.key);

    if ([...shortcutsAllowed, 'Escape'].includes(event.key) === false) {
      return null;
    }

    const isOpen = this.listElement.classList.contains('open');

    if (isOpen === true && event.key === 'Escape') {
      event.target.click();
    } else if (shortcutsAllowed.includes(event.key) === true) {
      this.listboxElement.querySelector(`[data-shortcut-key="${event.key.toLowerCase()}"]`).click();
      event.target.click();
    }

    return null;
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
      elementSelected.dataset.shortcutKey = this.buttonElement.dataset.shortcutKey;

      // 3 - Changement des informations du bouton remplace par les donnees de l'item selectionne
      this.buttonElement.textContent = liElement.dataset.label;
      this.buttonElement.dataset.label = liElement.dataset.label;
      this.buttonElement.dataset.sortby = liElement.dataset.sortby;
      this.buttonElement.dataset.shortcutKey = liElement.dataset.shortcutKey;

      // 4 - L'item selectionne est remplace
      liElement.replaceWith(elementSelected);

      // 5 - Tri des medias et fermeture du bouton listbox
      this.sortObserver.notify({ type: 'sort', data: { sortByKey } });
      this.buttonElement.click();
      this.buttonElement.focus();
      this.buttonElement.append(this.arrowElement);
    }
  }

  /**
   * Gestion des touches Enter et Escape
   *
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

    return null;
  }

  /**
   * Gestion du deplacement a l'aide des touches flechees Haut / bas
   * sur les elements de la listbox
   *
   * @param {Event} event
   * @returns {null}
   */
  handleKeyDownListbox(event) {
    if (['ArrowUp', 'ArrowDown'].includes(event.key) === false) {
      return null;
    }

    event.preventDefault();

    if (event.key === 'ArrowUp') {
      const nextTarget = event.target === this.listElement.firstChild
        ? this.listElement.lastChild
        : event.target.previousSibling;
      nextTarget.focus();
    } else if (event.key === 'ArrowDown') {
      const nextTarget = event.target === this.listElement.lastChild
        ? this.listElement.firstChild
        : event.target.nextElementSibling;
      nextTarget.focus();
    }

    return null;
  }

  /**
   * Construction des elements li
   */
  buildLiElements() {
    let index = 1;
    MediaSorter.listboxData()
      .filter((objectData) => objectData.sortBy !== this.buttonElement.dataset.sortby)
      .forEach((objectData) => {
        const listItemElement = document.createElement('li');

        listItemElement.textContent = objectData.label;
        listItemElement.setAttribute('tabindex', -1);
        listItemElement.setAttribute('role', 'option');
        listItemElement.setAttribute('aria-keyshortcuts', objectData.key);
        listItemElement.dataset.label = objectData.label;
        listItemElement.dataset.sortby = objectData.sortBy;
        listItemElement.dataset.shortcutKey = objectData.key;
        listItemElement.classList.add('focusable');
        listItemElement.id = `listboxItem${index}`;

        index += 1;

        this.listElement.append(listItemElement);
      });
  }

  /**
   * Construction du composant listbox
   *
   * @returns {Element}
   */
  buildComponent() {
    const listboxData = MediaSorter.listboxData();

    this.listboxElement.classList.add('listbox-container');
    this.listElement.setAttribute('role', 'listbox');
    this.listElement.classList.add('listbox');
    this.listElement.id = 'listbox';

    this.labelElement.textContent = 'Trier par';
    this.labelElement.setAttribute('for', 'sort-by');

    this.arrowElement.classList.add('arrow');
    this.arrowElement.setAttribute('aria-hidden', true);

    this.buttonElement.textContent = listboxData[0].label;
    this.buttonElement.classList.add('btn-listbox');
    this.buttonElement.classList.add('focusable');
    this.buttonElement.dataset.label = listboxData[0].label;
    this.buttonElement.dataset.sortby = listboxData[0].sortBy;
    this.buttonElement.dataset.shortcutKey = listboxData[0].key;
    this.buttonElement.type = 'button';
    this.buttonElement.id = 'sort-by';
    this.buttonElement.setAttribute('aria-keyshortcuts', 'alt+2');
    this.buttonElement.setAttribute('aria-haspopup', 'listbox');
    this.buttonElement.setAttribute('aria-controls', 'listbox');
    this.buttonElement.setAttribute('aria-expanded', false);
    this.buttonElement.append(this.arrowElement);

    this.buildLiElements();

    this.listElement.setAttribute('aria-hidden', true);
    this.listElement.setAttribute('aria-activedescendant', 'none');
    this.listElement.setAttribute('aria-labelledby', 'sort-by');
    this.listboxElement.append(this.buttonElement, this.listElement);

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
