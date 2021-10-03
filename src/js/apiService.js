const API_KEY = '23556027-7518a6338651e19ee58531f7f';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  fetchImages() {
    const url = `${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`

    return fetch(url)
      .then(response => response.json())
      .then(array => {
        this.incrementPage();
        return array.hits
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
