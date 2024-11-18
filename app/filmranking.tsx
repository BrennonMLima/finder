import React, { useEffect, useState } from "react";
import {
    Title,
    FilmCard,
    FilmTitle,
    Votes,
    ImageFilm,
    FilmInfo
} from "@/assets/styles/filmraking.styles";
import { Text, ScrollView, View, Image } from "react-native";
import { generateFilmRanking } from "@/services/groups";
import { useLocalSearchParams } from "expo-router";

interface Genre{
    id: number;
    name: string;
}
interface FilmRankingResponse{
    id: string,
    title: string,
    description: string,
    votes: number;
    genres: Genre[];
}

export default function FilmsRankingScreen(){
    const { groupId } = useLocalSearchParams();
    const [ranking, setRanking] = useState<FilmRankingResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    //const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchRanking = async () => {
            try{
                const rankingData = await generateFilmRanking(groupId as string);
                setRanking(rankingData);
            } catch(error){
                setError("Erro ao carregar o ranking de filmes");
                console.error(error);
            }
        };

        fetchRanking();
    }, [groupId]);

    if(error){
        return(
            <Text>{error}</Text>
        )
    }
    return(
        <ScrollView
            contentContainerStyle={{
                padding: 20,
                backgroundColor:"#262626",
                flexGrow:1
            }}
        >
            <View>
                <Title>Ranking de Filmes</Title>
            </View>
            {ranking.map((film, index) =>(
                <FilmCard key ={film.id}>
                    <ImageFilm source={require("@/assets/images/favicon.png")}></ImageFilm>
                    <FilmInfo>
                        <FilmTitle>{`${index + 1}º - ${film.title}`}</FilmTitle>
                        <Votes>{`${film.votes} votos`}</Votes>
                    </FilmInfo>
                </FilmCard>
            ))}

        </ScrollView>
    )
}