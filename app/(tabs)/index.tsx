import React from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Container, Title } from "@/assets/styles/global.styles";
import { Text } from "react-native";
import {
  Banner,
  Description,
  IconContainer,
  ImageRating,
  RatingContainer,
} from "../../assets/styles/index.styles";

export default function HomeScreen() {
  return (
    <Container>
      <Title>Urso do Pó Branco</Title>
      
      <ImageRating>

      <Banner
        source={{
          uri: "https://m.media-amazon.com/images/M/MV5BODIyNjM0MTgtNjAyNS00MjIxLTg1NzUtM2UyNjQ4ZTEyOWQ1XkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg",
        }}
        resizeMode="contain"
        />

      <RatingContainer>
        <FontAwesome name="imdb" size={24} color="white"/>
      <Description>3.2</Description>
      </RatingContainer>
      </ImageRating>

      <Description>
        Um grupo excêntrico de policiais, criminosos, turistas e adolescentes
        convergem para uma floresta da Geórgia, onde um enorme urso preto inicia
        um ataque assassino após involuntariamente ingerir cocaína
      </Description>

      <IconContainer>
        <MaterialCommunityIcons name="thumb-down" size={50} color="#ff3333" />
        <MaterialCommunityIcons name="popcorn" size={50} color="#0496ff" />
      </IconContainer>
    </Container>
  );
}
