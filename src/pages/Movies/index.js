import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';

import { Container, ListMovies } from './styles';

import { deleteMovie, getMoviesSave } from '../../utils/storage';

export default function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    let isActive = true;

    const getFavoriteMovies = async () => {
      const result = await getMoviesSave('my-movies');

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    }
  }, [isFocused]);

  const handleDelete = async (id) => {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  const handleDetailsPage = (item) => {
    navigation.navigate('Detail', { id: item.id });
  }

  return (
    <Container>
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={handleDetailsPage}
          />
        )}
      />
    </Container>
  );
}