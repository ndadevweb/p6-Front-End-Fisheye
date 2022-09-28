export class FetchPhotographers {
    constructor() {
        this.path = '../../data/photographers.json';
    }

    async fetchData() {
        return fetch(this.path).then((response) => response.json());
    }

    async fetchAll() {
        return await this.fetchData().then(({ photographers }) => photographers);
    }

    async find(photographerId) {
        const { photographers, media } = await this.fetchData();
        const photographer = photographers.find((photographer) => photographer.id === photographerId);
        const photographerMedia = media.filter((media) => media.photographerId === photographerId);

        return { photographer, photographerMedia };
    }
}
