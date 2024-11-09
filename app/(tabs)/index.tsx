import React, { useEffect, useState, useRef } from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Container } from "@/assets/styles/global.styles";
import {
  GestureResponderEvent,
  PanResponder,
  View,
  Text,
  Animated,
} from "react-native";
import {
  Banner,
  Description,
  ImageRating,
  MovieTitle,
  RatingContainer,
  TitleContainer,
  DescriptionWrapper,
  MovieCard,
} from "../../assets/styles/index.styles";

const GENRE_ID_COMEDY = 35;

export default function HomeScreen() {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Animação para o movimento do card
  const position = React.useRef(new Animated.ValueXY()).current;

  async function fetchMovies(pageNumber = 1) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=30feaffc6e5c122072bd41275477c810&with_genres=${GENRE_ID_COMEDY}&sort_by=popularity.desc&vote_count.gte=10000&page=${pageNumber}`
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSwipe = (direction: string) => {
    const nextIndex = currentIndex + 1;

    if (nextIndex >= movies.length - 5) {
      // Carregar mais filmes antes de acabar a lista
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
        fetchMovies(page + 1);
      }
    }

    if (nextIndex < movies.length) {
      setCurrentIndex(nextIndex);
      position.x.setValue(0); // Resetar a posição após o swipe
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      position.x.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      const threshold = 100;
      if (gestureState.dx > threshold) {
        Animated.timing(position, {
          toValue: 500,
          duration: 200,
          useNativeDriver: false,
        }).start(() => handleSwipe("right"));
      } else if (gestureState.dx < -threshold) {
        Animated.timing(position, {
          toValue: -500,
          duration: 200,
          useNativeDriver: false,
        }).start(() => handleSwipe("left"));
      } else {
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    fetchMovies(page);
  }, []);

  if (movies.length === 0) {
    return (
      <Container>
        <Text>Carregando filmes...</Text>
      </Container>
    );
  }

  const currentMovie = movies[currentIndex];
  const posterUrl = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

  // Cálculo da rotação baseado na posição do card
  const rotate = position.x.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: ["-5deg", "0deg", "5deg"],
    extrapolate: "clamp",
  });

  return (
    <Container>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX: position.x }, { rotate }],
          width: "100%",
          height: "90%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MovieCard>
          <ImageRating>
            <Banner source={{ uri: posterUrl }} resizeMode="stretch" />
            <TitleContainer>
              <MovieTitle>{currentMovie.title}</MovieTitle>
              <RatingContainer>
                <FontAwesome name="imdb" size={24} color="white" />
                <Description>{currentMovie.vote_average}</Description>
              </RatingContainer>
            </TitleContainer>
          </ImageRating>
          <DescriptionWrapper>
            <Description numberOfLines={6}>{currentMovie.overview}</Description>
          </DescriptionWrapper>
        </MovieCard>
      </Animated.View>
    </Container>
  );
}
