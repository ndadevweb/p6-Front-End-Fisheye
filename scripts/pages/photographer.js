import { FetchPhotographers, FetchMedias } from '../utils/fetchApi.js';
import { PhotographerHeader } from '../components/photographer/photographerHeader.js';
import { MediaCards } from '../components/media/mediaCards.js';
import { PhotographerComplementary } from '../components/photographer/photographerComplementary.js';
import { ContactWithModal } from '../components/photographer/contactWithModal.js';
import { PhotographerEntity } from '../entities/photographer.js';
import { MediaEntity } from '../entities/media.js';
import { LikesObserver } from '../observers/likes.js';

class PhotographerPage {
    async init() {
        const params = new URL(document.location).searchParams;

        this.photographerId = parseInt(params.get('id'));

        this.likesObserver = new LikesObserver();

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

        // Met a jour le nombre total de likes a chaque like d'un media du photographe
        this.likesObserver.add(this.photographerComplementary);

        this.photographerHeader = PhotographerHeader({
            photographerEntity: this.photographerEntity,
            contactWithModal: ContactWithModal(this.photographerEntity),
        });
    }

    async displayHeader() {
        document.querySelector('.photographer-header').replaceWith(this.photographerHeader);
    }

    async displayMedias() {
        document
            .querySelector('.medias-container')
            .replaceWith(MediaCards(this.mediaEntities, this.likesObserver));
    }

    async displayComplementary() {
        document
            .querySelector('.complementary')
            .replaceWith(this.photographerComplementary.render());
    }

    async display() {
        this.displayHeader();
        this.displayMedias();
        this.displayComplementary();
    }
}

const page = new PhotographerPage();
await page.init();
await page.display();
