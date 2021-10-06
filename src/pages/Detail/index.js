import React, { useState, useEffect } from 'react';
import { ScrollView, Modal } from 'react-native';
import Stars from 'react-native-stars';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather, Ionicons } from '@expo/vector-icons';

import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';

import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from './styles';

import api, { key } from '../../services/api';

import { deleteMovie, hasMovie, saveMovie } from '../../utils/storage';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoriteMovie, setFavoriteMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    const getMovie = async () => {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR'
        }
      })
      .catch((err) => {
        console.log(err);
      });

      if (isActive) {
        const isFavorite = await hasMovie(response.data);
        
        setMovie(response.data);
        setFavoriteMovie(isFavorite);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    }
  }, [])

  const handleFavoriteMovie = async (movie) => {
    if (favoriteMovie) {
      await deleteMovie(movie.id);
      setFavoriteMovie(false);
    } else {
      saveMovie('my-movies', movie);
      setFavoriteMovie(true);
    }
  }

  return (
    <Container>
      <Header>
        <HeaderButton activeOpacity={.85} onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={28}
            color="#FFF"
          />
        </HeaderButton>

        <HeaderButton activeOpacity={.85} onPress={() => handleFavoriteMovie(movie)}>
          <Ionicons
            name={favoriteMovie ? "bookmark" : "bookmark-outline"}
            size={28}
            color="#FFF"
          />
        </HeaderButton>
      </Header>

      <Banner
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
        resizeMethod="resize"
      />

      <ButtonLink activeOpacity={.85} onPress={() => setOpenLink(true)}>
        <Feather
          name="link"
          size={24}
          color="#FFF"
        />
      </ButtonLink>

      <Title numberOfLines={2}>
        {movie.title}
      </Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
          emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74E" />}
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ (item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>

        <Description>
          {movie?.overview}
        </Description>
      </ScrollView>
    
      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}