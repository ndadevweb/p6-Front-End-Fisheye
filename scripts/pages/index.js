import { PhotographerEntity } from '../entities/photographer.js';
import { FetchPhotographers } from '../utils/fetchApi.js';
import { PhotographerCard } from '../components/photographer/photographerCard.js';

class IndexPage {
    async init() {
        this.photographersApi = new FetchPhotographers();
        this.photographers = await this.photographersApi.fetchAll();
        this.photographersEntities = this.photographers.map(
            (photographer) => new PhotographerEntity(photographer)
        );
    }

    async display() {
        const photographersSection = document.querySelector('.photographer_section');
        this.photographersEntities.forEach((photographer) =>
            photographersSection.append(PhotographerCard(photographer))
        );
    }
}

const page = new IndexPage();
await page.init();
await page.display();
