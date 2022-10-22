import { FetchPhotographers, FetchMedias } from '../utils/fetchApi.js';
import { PhotographerEntity, MediaEntity } from '../entities/index.js';
import { PhotographerHeader, PhotographerComplementary } from '../components/photographer/index.js';
import { MediaSorter, MediaCards } from '../components/media/index.js';
import { LikesObserver, SortObserver, AccessibilityObserver } from '../observers/index.js';
import { Modal } from '../components/modal/modal.js';

class PhotographerPage {
    async init() {
        const params = new URL(document.location).searchParams;

        this.photographerId = parseInt(params.get('id'));

        this.likesObserver = new LikesObserver();
        this.sortObserver = new SortObserver();
        this.accessibilityObserver = new AccessibilityObserver();

        this.photographersApi = new FetchPhotographers();
        this.mediasApi = new FetchMedias();

        this.photographer = await this.photographersApi.find(this.photographerId);
        this.photographerEntity = new PhotographerEntity(this.photographer);

        this.medias = await this.mediasApi.fetchAllByPhotographerId(this.photographerId);
        this.mediaEntities = this.medias.map((media) => new MediaEntity(media));

        // Observer a declencher lors de l'ouverture / fermetures de la modal
        Modal.setObserver(this.accessibilityObserver);

        this.photographerHeader = new PhotographerHeader(this.photographerEntity);

        // Gere le tri des medias
        this.mediaSorter = new MediaSorter(this.sortObserver);

        // Affichage des medias
        this.mediaCards = new MediaCards(this.mediaEntities, this.likesObserver);

        // Mise a jour du nombre total des likes dans le bloc complementaire
        const sumLikes = (acc, { likes }) => acc + likes;
        const totalMediaLikes = Object.values(this.mediaEntities).reduce(sumLikes, 0);

        this.photographerComplementary = new PhotographerComplementary({
            likes: totalMediaLikes,
            price: this.photographerEntity.price,
        });

        // Met a jour le nombre total de likes a chaque like d'un media du photographe
        this.likesObserver.add(this.photographerComplementary);

        // Met a jour le l'ordre des medias affiches dans la galerie
        this.sortObserver.add(this.mediaCards);

        // Active / desactive les tabindex lorsque la modal est ouverte / fermee
        const logoLinkHomepage = {
            update: ({ type, data }) => {
                const value = data.active === false ? -1 : 0;

                document.querySelector('#link-homepage').setAttribute('tabindex', value);
            },
        };
        this.accessibilityObserver.add(logoLinkHomepage);
        this.accessibilityObserver.add(this.photographerHeader);
        this.accessibilityObserver.add(this.mediaSorter);
        this.accessibilityObserver.add(this.mediaCards);
    }

    /**
     * Bloc header contenant les informations du photographe
     */
    async displayHeader() {
        document.querySelector('.photographer-header').replaceWith(this.photographerHeader.render());
    }

    /**
     * Bloc " Trier par " permettant le tri des medias
     */
    async displaySorter() {
        document.querySelector('.media-sorter').replaceWith(this.mediaSorter.render());
    }

    /**
     * Bloc contenant les differents medias
     */
    async displayMedias() {
        document.querySelector('.medias-container').replaceWith(this.mediaCards.render());
    }

    /**
     * Bloc contenant le nombre total de like de chaque media et le prix TJM du photographe
     */
    async displayComplementary() {
        document.querySelector('.complementary').replaceWith(this.photographerComplementary.render());
    }

    /**
     * Affiche les elements constituant la page complete
     */
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
