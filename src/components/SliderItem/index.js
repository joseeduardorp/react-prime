import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate
} from './styles';

export default function SliderItem({ data, navigatePage }) {
  return (
    <Container activeOpacity={.85} onPress={() => navigatePage(data)}>
      <BannerItem
        source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }}
        resizeMethod="resize"
      />

      <Title numberOfLines={1}>
        {data.title}
      </Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}