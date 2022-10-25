import { Heart } from '../ui/index.js';

export default class PhotographerComplementary {
  /**
   * likes : sommes total des likes de chaque media du photographe
   * price : Taux Journalier Moyen du photographe
   *
   * @param {Object} props { likes, price }
   */
  constructor({ likes, price }) {
    this.likes = likes;
    this.price = price;
    this.complementaryContainer = document.createElement('aside');
  }

  /**
   * Met a jour le nombre total de like des media du photographe
   *
   * @param {Integer} value
   */
  update(value) {
    this.likes += parseInt(value, 10);
    this.complementaryContainer.querySelector('.complementary-likes').textContent = this.likes;
  }

  /**
   * Retourne un element contenant la somme totale
   * des likes de chaque media du photographe
   *
   * @returns {Element}
   */
  buildLikes() {
    const containerElement = document.createElement('li');
    const likesElement = document.createElement('span');

    likesElement.textContent = this.likes;
    likesElement.classList.add('complementary-likes');

    containerElement.append(likesElement);
    containerElement.innerHTML = likesElement.outerHTML + Heart();

    return containerElement;
  }

  /**
   * Retourne un element contenant le taux Jour Moyen du photographe
   *
   * @returns {Element}
   */
  buildPrice() {
    const priceElement = document.createElement('li');
    priceElement.textContent = `${this.price}€ / jour`;

    return priceElement;
  }

  /**
   * Construction et retourne le composant complet
   *
   * @returns {Element}
   */
  buildComponent() {
    const listElement = document.createElement('ul');
    listElement.classList.add('complementary-list');
    listElement.append(this.buildLikes());
    listElement.append(this.buildPrice());

    this.complementaryContainer.classList.add('complementary');
    this.complementaryContainer.append(listElement);

    return this.complementaryContainer;
  }

  /**
   * Retourne le composant complet
   *
   * @returns {Element}
   */
  render() {
    return this.buildComponent();
  }
}
