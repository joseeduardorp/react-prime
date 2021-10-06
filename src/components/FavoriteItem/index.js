import React from 'react';

import { Ionicons, Feather } from '@expo/vector-icons';

import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailsButton,
  DeleteButton
} from './styles';

export default function FavoriteItem({ data, deleteMovie, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data?.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailsButton activeOpacity={.85} onPress={() => navigatePage(data)}>
          <Title size={14}>Ver detalhes</Title>
        </DetailsButton>

        <DeleteButton activeOpacity={.85} onPress={() => deleteMovie(data.id)}>
          <Feather name="trash" size={24} color="#FFF" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}