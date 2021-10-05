// gera uma lista de filmes com o tamanho passado
export function getListMovies(size, movies) {
  let moviesList = [];

  for (let i = 0; i < size; i++) {
    moviesList.push(movies[i]);
  }

  return moviesList;
}

// gerar um número aleatório baseado no tamanho da lista passada
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}