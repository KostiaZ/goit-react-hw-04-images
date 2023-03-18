const API_KEY = '33147966-e46ab7a6ff68dbc7e8ecb4430';
const BASE_URL = 'https://pixabay.com/api/?';

const fetchImages = (searchQuery, page) => {
  const fetchUrl = `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then(res => res.json());
};

export default fetchImages;
