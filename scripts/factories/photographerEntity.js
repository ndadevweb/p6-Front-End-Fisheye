export default class PhotographerEntity {
  constructor(props) {
    this.name = props.name;
    this.id = props.id;
    this.city = props.city;
    this.country = props.country;
    this.tagline = props.tagline;
    this.price = props.price;
    this.portrait = props.portrait;
  }

  /**
   * Retourne la localisation
   *
   * @returns {String}
   */
  get location() {
    return `${this.city}, ${this.country}`;
  }

  /**
   * Retourne le chemin de l'image
   *
   * @returns {String}
   */
  get pathPortrait() {
    return `./assets/photographers/${this.portrait}`;
  }
}
