import axios from 'axios';

const container = document.querySelector('.container') as HTMLElement;

interface Movies {
  boxOfficeMovie: [];
  movieNameAndRank: [];
}

let movies: Movies;
const isLoading = false;

const render = ({ boxOfficeMovie }: Movies) => {
  container.innerHTML = boxOfficeMovie
    .map(({ title, image }) => `<div>${title}</div> <img src="${image}"/>`)
    .join('');
};

const getMovies = async (date: string) => {
  try {
    const moviesData = await axios.get(`/movielist/${date}`);
    movies = moviesData.data;
    console.log(movies);
  } catch (e) {
    throw new Error('get moives failed');
  }
};

window.addEventListener('load', () => {
  const date = new Date();
  getMovies(
    `${date.getFullYear()}${
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    }${date.getDate() - 1}`
  );
});
