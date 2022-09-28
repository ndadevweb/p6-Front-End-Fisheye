export class PhotographerEntity {
    constructor(props) {
        this.name = props.name;
        this.id = props.id;
        this.city = props.city;
        this.country = props.country;
        this.tagline = props.tagline;
        this.price = props.price;
        this.portrait = props.portrait;
    }

    get location() {
        return this.city + ', ' + this.country;
    }

    get pathPortrait() {
        return `./assets/photographers/${this.portrait}`;
    }
}
