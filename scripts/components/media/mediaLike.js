import { Heart } from '../ui/index.js';

export default class MediaLike {
  /**
   *
   * @param {Object} props { likes }
   */
  constructor(props) {
    this.likes = parseInt(props.likes, 10);
    this.initElements();
  }

  /**
   * Initialise les elements ( aside, button )
   */
  initElements() {
    this.mediaLikeContainer = document.createElement('aside');
    this.buttonElement = document.createElement('button');
  }

  /**
   * Met a jour le compteur de like de l'element cible en argument
   * Retourne 1 si le media est like ou -1 si celui-ci est dislike
   *
   * @static
   * @param {Element} target
   * @returns {Integer} 1 | -1
   */
  static updateCounterElement(target) {
    const mediaLikeContainer = target.closest('.media-like');
    const mediaLikeCounterElement = mediaLikeContainer.querySelector('.media-like-counter');
    const counterLike = parseInt(mediaLikeCounterElement.textContent, 10);

    mediaLikeContainer.classList.toggle('liked');

    const value = mediaLikeContainer.classList.contains('liked') === true ? 1 : -1;

    mediaLikeCounterElement.textContent = counterLike + value;

    return value;
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
    const value = active === false ? -1 : 0;

    this.buttonElement.setAttribute('tabindex', value);
  }

  /**
   * Retourne un element contenant le nombre de like
   *
   * @returns {Element}
   */
  buildCounter() {
    const counterElement = document.createElement('span');

    counterElement.classList.add('media-like-counter');
    counterElement.textContent = this.likes;

    return counterElement;
  }

  /**
   * Retourne un element contenant le bouton pour like un media
   *
   * @returns {Element}
   */
  buildButton() {
    this.buttonElement.type = 'button';
    this.buttonElement.classList.add('media-like-btn');
    this.buttonElement.classList.add('focusable');
    this.buttonElement.setAttribute('aria-label', 'likes');
    this.buttonElement.innerHTML = Heart();

    return this.buttonElement;
  }

  /**
   * Construire et retourne le composant complet ( compteur + icone like )
   *
   * @returns {Element}
   */
  buildComponent() {
    this.mediaLikeContainer.classList.add('media-like');
    this.mediaLikeContainer.setAttribute('aria-label', 'likes');
    this.mediaLikeContainer.append(this.buildCounter(), this.buildButton());

    return this.mediaLikeContainer;
  }

  /**
   * Retourne le composant complet ( compteur + icone like )
   *
   * @returns {Element}
   */
  render() {
    return this.buildComponent();
  }
}
