import { PhotographerEntity } from '../entities/photographer.js';
import { FetchPhotographers } from '../utils/fetchPhotographer.js';
import { UserCard } from '../components/userCard.js';

async function getPhotographers() {
    const photographersFromAPI = await new FetchPhotographers().fetchAll();

    return photographersFromAPI;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');

    photographers.forEach((photographer) => photographersSection.append(UserCard(photographer)));
}

(async function init() {
    // Récupère les datas des photographes
    const photographersFromAPI = await getPhotographers();
    const photographers = photographersFromAPI.map((photographer) => new PhotographerEntity(photographer));

    displayData(photographers);
})();
