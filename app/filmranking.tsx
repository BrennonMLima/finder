import React, { useEffect, useState } from "react";
import {
    Title,
    FilmCard,
    FilmTitle,
    Votes,
    ImageFilm,
    FilmInfo,
    HighlightedFilmCard,
} from "@/assets/styles/filmraking.styles";
import { Text, ScrollView, View, Pressable } from "react-native";
import { generateFilmRanking } from "@/services/groups";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ConfirmationWatched from "@/components/confirmationWatched";
import { markAsWatched } from "@/services/films";
import { getUserFromToken } from "@/services/users";

const API_KEY = "30feaffc6e5c122072bd41275477c810";
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface Genre {
    id: number;
    name: string;
}

export interface FilmRankingResponse {
    id: string;
    title: string;
    description: string;
    votes: number;
    genres: Genre[];
    posterPath?: string;
}

export default function FilmsRankingScreen() {
    const { groupId } = useLocalSearchParams();
    const [ranking, setRanking] = useState<FilmRankingResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<FilmRankingResponse | null>(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const rankingData = await generateFilmRanking(groupId as string);

                const updatedRanking = await Promise.all(
                    rankingData.map(async (film) => {
                        const posterPath = await fetchPosterPath(film.id);
                        return { ...film, posterPath };
                    })
                );

                setRanking(updatedRanking);
            } catch (error) {
                setError("Erro ao carregar o ranking de filmes");
                console.error(error);
            }
        };

        fetchRanking();
    }, [groupId]);

    const fetchPosterPath = async (movieId: string): Promise<string | undefined> => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
            );
            const data = await response.json();
            return data.poster_path ? `${BASE_IMAGE_URL}${data.poster_path}` : undefined;
        } catch (error) {
            console.error("Erro ao buscar o poster do filme:", error);
            return undefined;
        }
    };

    if (error) {
        return <Text>{error}</Text>;
    }

    const handleMarkAsWatched = async (filmId: string, watched: boolean) => { // Adiciona 'watched'
        try {
            if (!groupId) {
                console.error("FilmRanking - groupId não definido");
                return;
            }
    
            const user = await getUserFromToken();
            if (!user) {
                console.error("FilmRanking - Usuário não encontrado no token");
                return;
            }
    
            if (watched) { // Chama markAsWatched apenas se o checkbox estiver marcado
              const response = await markAsWatched(user.id, filmId, groupId as string); // Usa nome diferente para evitar conflito
    
              if (!response || response.message !== "Filme marcado como assistido") {
                console.error("FilmRanking - Resposta inesperada do servidor:", response);
                // Trate o erro como preferir (ex: exibir mensagem no modal)
                return; // Impede a remoção do filme do ranking em caso de erro
              }
            }
    
            setRanking(ranking.filter(film => film.id !== filmId)); // Remove o filme do ranking
    
        } catch (error) {
            console.error("FilmRanking - Erro ao marcar como assistido:", error);
            // Trate o erro como preferir
        } finally {
          setModalVisible(false); // Fecha o modal independente do sucesso ou erro
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 20,
                backgroundColor: "#262626",
                flexGrow: 1,
            }}
        >
            <View>
                <Title>Ranking de Filmes</Title>
            </View>
            {ranking.map((film, index) => {
                const FilmCardComponent = index === 0 ? HighlightedFilmCard : FilmCard;
                return (
                <Pressable onPress={() => { setSelectedFilm(film); setModalVisible(true); }}>
                    <FilmCardComponent key={film.id}>
                        <ImageFilm
                            source={
                                film.posterPath
                                    ? { uri: film.posterPath }
                                    : require("@/assets/images/favicon.png")
                            }
                        />
                        <FilmInfo>
                            <FilmTitle>{`${index + 1}º - ${film.title}`}</FilmTitle>
                            <Votes>{`${film.votes} votos`}</Votes>
                        </FilmInfo>
                    <MaterialIcons name="chevron-right" size={24} color="#fff" />
                    </FilmCardComponent>
                </Pressable>
                );
            })}
            <ConfirmationWatched
            visible={modalVisible}
            film={selectedFilm}
            onClose={() => { setModalVisible(false); setSelectedFilm(null); }}
            onConfirm={handleMarkAsWatched}
          />
        </ScrollView>
    );
}