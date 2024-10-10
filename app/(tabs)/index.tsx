import React from 'react';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Title, Banner, Description, IconContainer } from './styles/index.';

export default function HomeScreen() {
  return (
    <Container>
      <Title>Urso do Pó Branco</Title>

      <Banner
        source={{ uri: 'https://m.media-amazon.com/images/M/MV5BODIyNjM0MTgtNjAyNS00MjIxLTg1NzUtM2UyNjQ4ZTEyOWQ1XkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg' }}
        resizeMode="cover"
      />

      <Description>
        Um grupo excêntrico de policiais, criminosos, turistas e adolescentes convergem para uma floresta da Geórgia, onde um enorme urso preto inicia um ataque assassino após involuntariamente ingerir cocaína
      </Description>

      <IconContainer>
        <MaterialCommunityIcons name="popcorn" size={50} color="#0496ff" />
        <MaterialCommunityIcons name="thumb-down" size={50} color="#ff3333" />
      </IconContainer>
    </Container>
  );
}
