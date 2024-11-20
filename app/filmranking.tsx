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
import { Text, ScrollView, View } from "react-native";
import { generateFilmRanking } from "@/services/groups";
import { useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const API_KEY = "30feaffc6e5c122072bd41275477c810";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface Genre {
    id: number;
    name: string;
}

interface FilmRankingResponse {
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
                );
            })}
        </ScrollView>
    );
}
