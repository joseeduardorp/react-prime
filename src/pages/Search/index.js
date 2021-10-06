import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import SearchItem from '../../components/SearchItem';

import { Container, Disclaimer, ListSearch } from './styles';

import api, { key } from '../../services/api';

export default function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const getSearchMovie = async () => {
      const response = await api.get('/search/movie', {
        params: {
          api_key: key,
          query: route?.params?.name,
          language: 'pt-BR',
          page: 1
        }
      })

      if (isActive) {
        setMovie(response.data.results);
        setLoading(false);
      }
    }

    if (isActive) {
      getSearchMovie();
    }

    return () => {
      isActive = false;
    }
  }, [])

  const navigateDetailsPage = (movie) => {
    navigation.navigate('Detail', { id: movie.id });
  }

  if (loading) {
    return (<Container></Container>);
  }

  return (
    <Container>
        <ListSearch
          data={movie}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <SearchItem data={item} navigatePage={navigateDetailsPage} />}
        />
    </Container>
  );
}