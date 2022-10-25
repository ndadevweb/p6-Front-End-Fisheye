import MediaCard from './mediaCard.js';
import MediaLike from './mediaLike.js';
import MediaWithModal from './mediaWithModal.js';

export default class MediaCards {
  /**
   * Initialise les donnees necessaires a la construction du composant
   *
   * @param {MediaEntity[]} mediaEntities
   * @param {LikesObserver} LikesObserver
   */
  constructor(mediaEntities, LikesObserver) {
    this.mediaEntities = mediaEntities;
    this.likesObserver = LikesObserver;
    this.mediaCardElements = [];
    this.mediasElement = document.createElement('section');
    this.defaultSortedByKey = 'likes';
  }

  /**
   * Methode pouvant etre utilisee par un observer
   *
   * @see sortBy()
   * @see toggleTabindex()
   *
   * @param {Object} { type, data }
   * @throws {Error} A "type" must be specified
   */
  update({ type, data }) {
    let compare = null;
    let childrenSorted = null;

    switch (type) {
      case 'sort':
        compare = MediaCards.sortBy(data.sortByKey);
        childrenSorted = Array.from(this.mediasElement.children).sort(compare);
        this.mediasElement.replaceChildren(...childrenSorted);
        break;
      case 'modal':
        this.toggleTabindex(data);
        break;
      default:
        throw new Error('A valid "type" must be specified');
    }
  }

  /**
   * Gestion du tri des medias par cle
   *
   * - likes : Popularite
   * - date  : Date
   * - title : Titre
   *
   * @static
   * @param {String} key
   * @throws {Error} Nonexistent "key"
   * @returns {Function}
   */
  static sortBy(key) {
    switch (key) {
      case 'likes':
        return MediaCards.sortMorePopular();

      case 'date':
        return MediaCards.sortMoreRecent();

      case 'title':
        return MediaCards.sortAlphabeticalOrder();

      default:
        throw new Error('Nonexistent "key"');
    }
  }

  /**
   * Du plus populaire au moins populaire
   *
   * @static
   * @returns {Number}
   */
  static sortMorePopular() {
    return (elementA, elementB) => {
      const likes = (element) => parseInt(element.querySelector('.media-like-counter').textContent, 10);
      const [likesA, likesB] = [likes(elementA), likes(elementB)];

      let value = 0;

      if (likesA > likesB) {
        value = -1;
      } else {
        value = 1;
      }

      return value;
    };
  }

  /**
   * Du plus recent au moins recent
   *
   * @static
   * @returns {Number}
   */
  static sortMoreRecent() {
    return (elementA, elementB) => {
      const toTime = (element) => new Date(element.dataset.date).getTime();
      const [timeA, timeB] = [toTime(elementA), toTime(elementB)];

      let value = 0;

      if (timeA > timeB) {
        value = -1;
      } else {
        value = 1;
      }

      return value;
    };
  }

  /**
   * Titre par ordre alphabetique
   *
   * @static
   * @returns {Number}
   */
  static sortAlphabeticalOrder() {
    return (elementA, elementB) => {
      const title = (element) => element.querySelector('h3').textContent;
      const [titleA, titleB] = [title(elementA), title(elementB)];

      return titleA.localeCompare(titleB);
    };
  }

  /**
   * Active desactive les tabindex
   *
   * Si { active } = true : active les tabindex ( tabindex = 0 )
   * si { active } = false : desactive les tabindex ( tabindex = -1 )
   *
   * @param {Object}
   */
  toggleTabindex({ active }) {
    this.mediaCardElements.forEach((mediaCard) => {
      mediaCard.toggleTabindex({ active });
    });
  }

  /**
   * Met a jour le compteur de like
   * notifie l'observer pour mettre a jour le compteur
   * total des likes du photographe
   *
   * @param {Element} target
   */
  updateLikeCounter(target) {
    const value = MediaLike.updateCounterElement(target);
    const mediaId = parseInt(target.closest('.media-container').dataset.id, 10);
    const index = this.mediaEntities.findIndex((mediaEntity) => mediaEntity.id === mediaId);

    this.mediaEntities[index].updateLikes(value);
    this.likesObserver.notify(value);
  }

  /**
   * Ouvre la modal lightbox / mediaSlide
   *
   * @param {Element} target
   */
  openMediaModal(target) {
    const mediaSelected = target.closest('article');
    const mediaElements = this.mediasElement.querySelectorAll('.media-container');
    const mediaWithModal = MediaWithModal(mediaSelected, mediaElements);

    mediaWithModal.open();
  }

  /**
   * Bind les methodes utilisees pour le traitement des evenements
   */
  bindMethods() {
    this.updateLikeCounter = this.updateLikeCounter.bind(this);
    this.openMediaModal = this.openMediaModal.bind(this);
    this.handleClickMediasElement = this.handleClickMediasElement.bind(this);
    this.handleKeyUpMediasElement = this.handleKeyUpMediasElement.bind(this);
  }

  /**
   * Gere les evenements click de chaque element
   * - Gestion du like
   * - Ouverture de la modal lightbox / mediaSlide
   * - Un seul... pour les gouverner tous... o
   *
   * @param {Event} event
   */
  handleClickMediasElement(event) {
    if (event.target.closest('.media-like-btn') !== null) {
      this.updateLikeCounter(event.target);
    }

    if (['IMG', 'VIDEO'].includes(event.target.tagName) === true) {
      this.openMediaModal(event.target);
    }
  }

  /**
   * Gere les evenements clavier ( Enter )
   *
   * - Ouverture de la modal lorsque l'element qui a le focus
   *   a la classe .media-container
   *
   * @param {Event} event
   */
  handleKeyUpMediasElement(event) {
    if (event.key === 'Enter' && event.target.classList.contains('media-container') === true) {
      this.openMediaModal(event.target);
    }
  }

  /**
   * Initialise les evenements clavier / souris
   *
   * - Gestion des likes sur un media
   * - Gestion de la modal lightbox
   */
  addEvents() {
    this.bindMethods();
    this.mediasElement.addEventListener('click', this.handleClickMediasElement);
    this.mediasElement.addEventListener('keyup', this.handleKeyUpMediasElement);
  }

  /**
   * Construit le composant
   *
   * @returns {Element}
   */
  buildComponent() {
    this.mediasElement.classList.add('medias-container');
    this.mediasElement.setAttribute('aria-label', 'Medias');
    this.mediasElement.setAttribute('aria-shortcuts', 'alt+3');
    this.addEvents();

    this.mediaEntities.forEach((mediaEntity) => {
      const mediaCardElement = new MediaCard(mediaEntity, this.likesObserver);

      this.mediaCardElements.push(mediaCardElement);
      this.mediasElement.append(mediaCardElement.render());
    });

    this.update({ type: 'sort', data: { sortByKey: this.defaultSortedByKey } });

    return this.mediasElement;
  }

  /**
   * Retourne le composant construit pret a etre affiche
   *
   * @see buildComponent()
   * @returns {Element}
   */
  render() {
    return this.buildComponent();
  }
}
