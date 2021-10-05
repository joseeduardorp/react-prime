import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';

import { Feather } from '@expo/vector-icons';

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovies
} from './styles';

import api, { key } from '../../services/api';

import { getListMovies, randomBanner } from '../../utils/movie';

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerMovie, setBannerMovie] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    const getMovies = async () => {
      const apiSetting = {
        params: {
          api_key: key,
          language: 'pt-BR',
          page: 1
        }
      }

      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', apiSetting),
        api.get('/movie/popular', apiSetting),
        api.get('/movie/top_rated', apiSetting)
      ]);
      
      if (isActive) {
        const nowMovies = getListMovies(10, nowData.data.results);
        const popularMovies = getListMovies(10, popularData.data.results);
        const topMovies = getListMovies(10, topData.data.results);

        const randomMovie = randomBanner(nowData.data.results);
        setBannerMovie(nowData.data.results[randomMovie]);

        setNowMovies(nowMovies);
        setPopularMovies(popularMovies);
        setTopMovies(topMovies);

        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }
  }, [])

  const navigateDetailPage = (movie) => {
    navigation.navigate('Detail', { id: movie.id });
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="React Prime" />
      
      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#DDD"
        />

        <SearchButton>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton
          activeOpacity={.85}
          onPress={() => navigateDetailPage(bannerMovie)}
        >
          <Banner
            source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
            resizeMethod="resize"
          />
        </BannerButton>
        <SliderMovies
          horizontal={true}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={navigateDetailPage} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />

        <Title>Populares</Title>
        <SliderMovies
          horizontal={true}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={navigateDetailPage} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />

        <Title>Mais votados</Title>
        <SliderMovies
          horizontal={true}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={navigateDetailPage} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </Container>
  );
}