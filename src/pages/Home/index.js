import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';

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

import { getListMovies } from '../../utils/movie';

export default function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

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

      const nowMovies = getListMovies(10, nowData.data.results);
      const popularMovies = getListMovies(10, popularData.data.results);
      const topMovies = getListMovies(10, topData.data.results);

      setNowMovies(nowMovies);
      setPopularMovies(popularMovies);
      setTopMovies(topMovies);
    }

    getMovies();
  }, [])

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
          onPress={() => alert('teste')}
        >
          <Banner
            source={{ uri: 'https://source.unsplash.com/random' }}
            resizeMethod="resize"
          />
        </BannerButton>
        <SliderMovies
          horizontal={true}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />

        <Title>Populares</Title>
        <SliderMovies
          horizontal={true}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />

        <Title>Mais votados</Title>
        <SliderMovies
          horizontal={true}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </Container>
  );
}