import React, { useEffect, useState } from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import { getWatchedFilms, getUserFilmRating, rateFilm } from "@/services/films";
import { router, useLocalSearchParams } from "expo-router";
import {
  FilmCard,
  FilmBanner,
  FilmRating,
  FilmTitle,
} from "@/assets/styles/filmsrating.styles";
import { Container } from "@/assets/styles/global.styles";
import RateFilmModal from "@/components/rateFIlmModal";
import { Title } from "@/assets/styles/filmraking.styles";
import Header from "@/components/header";
import StarRating from "@/components/starRating";

interface Film {
  id: string;
  title: string;
  description: string;
  posterPath?: string;
  userRating?: number;
}

const API_KEY = "30feaffc6e5c122072bd41275477c810";
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function RateFilmsScreen() {
  const { groupId } = useLocalSearchParams();
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchedFilms = async () => {
      try {
        const watchedFilms = await getWatchedFilms();
        const filmsWithDetails = await Promise.all(
          watchedFilms.map(async (film: Film) => {
            const posterPath = await fetchPosterPath(film.id);
            const userRating = await getUserFilmRating(film.id);
            return { ...film, posterPath, userRating };
          })
        );
        setFilms(filmsWithDetails);
      } catch (error) {
        setError("Erro ao carregar filmes assistidos");
        console.error(error);
      }
    };

    fetchWatchedFilms();
  }, []);

  const fetchPosterPath = async (movieId: string): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.poster_path ? `${BASE_IMAGE_URL}${data.poster_path}` : undefined;
    } catch (error) {
      console.error("Erro ao buscar poster:", error);
      return undefined;
    }
  };

  const handleConfirmRating = async (filmId: string, rating: number) => {
    try {
      await rateFilm(filmId, rating);
      setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film.id === filmId ? { ...film, userRating: rating } : film
        )
      );
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao salvar avaliação:", error);
    }
  };

  if (error) {
    return <Text style={{ color: "#fff", padding: 20 }}>{error}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#262626",
        flexGrow: 1,
      }}
    >
      <Header onBackPress={() => router.back()} />

      <View>
        <Title>Avaliações</Title>
      </View>
      <Container>
        {films.length === 0 ? (
          <View style={{ marginTop: 30, gap: 10 }}>
            <Text style={{ color: "#fff", fontSize: 24, textAlign: "center" }}>
              Sem filmes para avaliar
            </Text>
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
              Os filmes marcados como assistidos aparecerão aqui.
            </Text>
          </View>
        ) : (
          films.map((film) => (
            <Pressable
              key={film.id}
              onPress={() => {
                setSelectedFilm(film);
                setModalVisible(true);
              }}
            >
              <FilmCard>
                <FilmTitle>{film.title}</FilmTitle>
                <FilmBanner
                  resizeMode="stretch"
                  source={
                    film.posterPath
                      ? { uri: film.posterPath }
                      : require("@/assets/images/favicon.png")
                  }
                />
                <FilmRating>
                  {film.userRating ? (
                    <StarRating rating={film.userRating} />
                  ) : (
                    "Avaliar"
                  )}
                </FilmRating>
              </FilmCard>
            </Pressable>
          ))
        )}
      </Container>

      {selectedFilm && (
        <RateFilmModal
          visible={modalVisible}
          film={selectedFilm}
          onClose={() => {
            setSelectedFilm(null);
            setModalVisible(false);
          }}
          onConfirm={handleConfirmRating}
        />
      )}
    </ScrollView>
  );
}
