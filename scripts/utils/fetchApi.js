export default class FetchApi {
  constructor() {
    this.url = './data/photographers.json';
  }

  /**
   * @async
   * @returns {Promise<Object>}
   */
  async fetchData() {
    return fetch(this.url).then((response) => response.json());
  }
}
