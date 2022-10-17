console.log(window.location.origin);
class FetchApi {
    constructor() {
        this.url = window.location.origin + '/data/photographers.json';
    }

    async fetchData() {
        return fetch(this.url).then((response) => response.json());
    }
}

export class FetchPhotographers extends FetchApi {
    constructor() {
        super();
    }

    async fetchAll() {
        return await this.fetchData().then(({ photographers }) => photographers);
    }

    async find(id) {
        const { photographers } = await super.fetchData();
        const photographer = photographers.find((photographer) => photographer.id === id);

        return photographer;
    }
}

export class FetchMedias extends FetchApi {
    constructor() {
        super();
    }

    async fetchAllByPhotographerId(photographerId) {
        const { media } = await super.fetchData();
        const medias = media.filter((media) => media.photographerId === photographerId);

        return medias;
    }
}
