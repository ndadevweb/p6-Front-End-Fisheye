import FetchApi from './fetchApi.js';

export default class FetchPhotographers extends FetchApi {
  /**
   * @async
   * @returns
   */
  async fetchAll() {
    const fetchData = await this.fetchData().then(({ photographers }) => photographers);

    return fetchData;
  }

  /**
   * @async
   * @returns {Object}
   */
  async find(id) {
    const { photographers } = await super.fetchData();
    const photographerFounded = photographers.find((photographer) => photographer.id === id);

    return photographerFounded;
  }
}
