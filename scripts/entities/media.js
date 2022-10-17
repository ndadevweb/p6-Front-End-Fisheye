export class MediaEntity {
    /**
     * @param {Object} props { id, photographerId, title, image, likes, date, price }
     */
    constructor(props) {
        this.id = props.id;
        this.photographerId = props.photographerId;
        this.title = props.title;
        this.image = props.image;
        this.video = props.video;
        this.likes = props.likes;
        this.date = props.date;
        this.price = props.price;
    }

    /**
     * @returns {Boolean}
     */
    get hasImage() {
        return this.image !== undefined;
    }

    /**
     * @returns {Boolean}
     */
    get hasVideo() {
        return this.video !== undefined;
    }
    /**
     * Retourne le chemin complet de l'image
     *
     * @returns {String}
     */
    get pathImage() {
        return `./assets/medias/${this.photographerId}/${this.image}`;
    }

    /**
     * Retourne le chemin complet de la video
     *
     * @returns {String}
     */
    get pathVideo() {
        return `./assets/medias/${this.photographerId}/${this.video}`;
    }

    /**
     * Met a jour le compteur de like
     * Valeur positive ou negative
     *
     * @param {Integer} value
     */
    updateLikes(value) {
        this.likes += parseInt(value);
    }
}
