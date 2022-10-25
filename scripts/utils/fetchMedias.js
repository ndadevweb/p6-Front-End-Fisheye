import FetchApi from './fetchApi.js';

export default class FetchMedias extends FetchApi {
  /**
   * @async
   * @returns {Array}
   */
  async fetchAllByPhotographerId(photographerId) {
    const { media } = await super.fetchData();
    const filterMedias = (photographerMedia) => photographerMedia.photographerId === photographerId;

    return media.filter(filterMedias);
  }
}
