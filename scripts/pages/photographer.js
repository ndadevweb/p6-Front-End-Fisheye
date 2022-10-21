import { FetchPhotographers, FetchMedias } from '../utils/fetchApi.js';
import { PhotographerEntity, MediaEntity } from '../entities/index.js';
import { PhotographerHeader, PhotographerComplementary, ContactWithModal } from '../components/photographer/index.js';
import { MediaSorter, MediaCards } from '../components/media/index.js';
import { LikesObserver, SortObserver } from '../observers/index.js';

class PhotographerPage {
    async init() {
        const params = new URL(document.location).searchParams;

        this.photographerId = parseInt(params.get('id'));

        this.likesObserver = new LikesObserver();
        this.sortObserver = new SortObserver();

        this.photographersApi = new FetchPhotographers();
        this.mediasApi = new FetchMedias();

        this.photographer = await this.photographersApi.find(this.photographerId);
        this.photographerEntity = new PhotographerEntity(this.photographer);

        this.medias = await this.mediasApi.fetchAllByPhotographerId(this.photographerId);
        this.mediaEntities = this.medias.map((media) => new MediaEntity(media));

        const sumLikes = (acc, { likes }) => acc + likes;
        const totalMediaLikes = Object.values(this.mediaEntities).reduce(sumLikes, 0);

        this.photographerComplementary = new PhotographerComplementary({
            likes: totalMediaLikes,
            price: this.photographerEntity.price,
        });

        // Gere le tri des medias
        this.mediaSorter = new MediaSorter(this.sortObserver);

        // Affichage des medias
        this.mediaCards = new MediaCards(this.mediaEntities, this.likesObserver);

        // Met a jour le nombre total de likes a chaque like d'un media du photographe
        this.likesObserver.add(this.photographerComplementary);

        // Met a jour le l'ordre des medias affiches dans la galerie
        this.sortObserver.add(this.mediaCards);

        this.photographerHeader = PhotographerHeader({
            photographerEntity: this.photographerEntity,
            contactWithModal: ContactWithModal(this.photographerEntity),
        });
    }

    async displayHeader() {
        document.querySelector('.photographer-header').replaceWith(this.photographerHeader);
    }

    async displaySorter() {
        document.querySelector('.media-sorter').replaceWith(this.mediaSorter.render());
    }

    async displayMedias() {
        document.querySelector('.medias-container').replaceWith(this.mediaCards.render());
    }

    async displayComplementary() {
        document.querySelector('.complementary').replaceWith(this.photographerComplementary.render());
    }

    async display() {
        this.displayHeader();
        this.displaySorter();
        this.displayMedias();
        this.displayComplementary();
    }
}

const page = new PhotographerPage();
await page.init();
await page.display();
