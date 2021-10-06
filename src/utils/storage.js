import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);
  const moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}

export async function saveMovie(key, newMovie) {
  const moviesStored = await getMoviesSave(key);

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    alert("Esse filme já esta salvo na sua lista!");
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  
  alert("Filme salvo com sucesso!");
}

export async function deleteMovie(id) {
  const moviesStored = await getMoviesSave('my-movies');

  let myMovies = moviesStored.filter((item) => {
    return (item.id !== id);
  })

  await AsyncStorage.setItem('my-movies', JSON.stringify(myMovies));

  alert("Filme removido da sua lista de itens salvos!");

  return myMovies;
}

export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('my-movies');

  const hasMovie = moviesStored.find((item) => item.id === movie.id);

  if (hasMovie) return true;

  return false;
}