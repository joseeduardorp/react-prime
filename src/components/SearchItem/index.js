import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  Banner,
  Title,
  RateContainer,
  Rate
} from './styles';

export default function SearchItem({ data, navigatePage }) {
  const movieDetail = () => {
    if (data.relese_date === '') {
      alert('Filme não encontrado');
      return;
    }
    
    navigatePage(data);
  }
  
  return (
    <Container activeOpacity={.85} onPress={movieDetail}>
      {data?.poster_path ? (
        <Banner
          source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }}
          resizeMethod="resize"
        />
      ) : (
        <Banner
          source={require('../../assets/semfoto.png')}
          resizeMethod="resize"
        />
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}