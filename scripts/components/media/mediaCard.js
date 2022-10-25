import { MediaSource } from './media.js';
import MediaLike from './mediaLike.js';
import { Title } from '../ui/index.js';

export default class MediaCard {
  /**
   *
   * @param {MediaEntity} MediaEntity
   * @param {LikeObserver} LikesObserver
   */
  constructor(MediaEntity, LikesObserver) {
    this.mediaEntity = MediaEntity;
    this.likesObserver = LikesObserver;
    this.initElements();
  }

  /**
   * Initialise les elements
   */
  initElements() {
    this.cardElement = document.createElement('article');
    this.mediaLikeElement = new MediaLike(this.mediaEntity);
    this.mediaElement = MediaSource(this.mediaEntity);
    this.titleElement = Title(this.mediaEntity, 'h2');
  }

  /**
   * Active / desactive les tabindex
   *
   * Si { active } = true : active les tabindex ( tabindex = 0 )
   * si { active } = false : desactive les tabindex ( tabindex = -1 )
   *
   * @param {Object}
   */
  toggleTabindex({ active }) {
    const value = active === false ? -1 : 0;

    this.cardElement.setAttribute('tabindex', value);
    this.mediaLikeElement.toggleTabindex({ active });
  }

  /**
   * Construction du composant
   *
   * @returns {Element}
   */
  buildComponent() {
    this.titleElement.classList.add('media-title');
    this.cardElement.classList.add('media-container');
    this.cardElement.classList.add('focusable');
    this.cardElement.setAttribute('tabindex', 0);
    this.cardElement.dataset.id = this.mediaEntity.id;
    this.cardElement.dataset.date = this.mediaEntity.date;
    this.cardElement.append(this.mediaElement, this.titleElement, this.mediaLikeElement.render());

    return this.cardElement;
  }

  /**
   * @see buildComponent()
   * @returns {Element}
   */
  render() {
    return this.buildComponent();
  }
}
