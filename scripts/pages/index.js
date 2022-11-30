import { FetchPhotographers, GlobalShortcuts } from '../utils/index.js';
import { PhotographerEntity } from '../factories/index.js';
import { PhotographerCard } from '../components/photographer/index.js';

class IndexPage {
  async init() {
    this.photographersApi = new FetchPhotographers();
    this.photographers = await this.photographersApi.fetchAll();
    this.photographersEntities = this.photographers.map((photographer) => new PhotographerEntity(photographer));

    // Raccourcis clavier pour se positionner sur les elements importants de la page
    // via les raccourcis clavier definis
    const globalShortcuts = new GlobalShortcuts('homepage');
    globalShortcuts.init();
  }

  async display() {
    const photographersSection = document.querySelector('.photographer_section');
    this.photographersEntities.forEach((photographer) => photographersSection.append(PhotographerCard(photographer)));
  }
}

const page = new IndexPage();
await page.init();
await page.display();
