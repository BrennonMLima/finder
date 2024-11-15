import React, { useEffect, useState, useRef } from "react";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Container } from "@/assets/styles/global.styles";
import { Picker } from "@react-native-picker/picker";
import {
  GestureResponderEvent,
  PanResponder,
  View,
  Text,
  Animated,
  StyleSheet,
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
import { convertGenresToIds, Group, getAllGroups } from "@/services/groups";
import { getUserGroups } from "@/services/users";
import { addFilm } from "@/services/films";

const API_KEY = "30feaffc6e5c122072bd41275477c810";
interface Genre {
  id: number;
  name: string;
}

export default function HomeScreen() {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all"); // null para "Todos"
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const position = React.useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        console.log("Buscando grupos...");
        const response = await getUserGroups();
        if (response.data && response.data) {
          console.log("Grupos encontrados:", response.data);
          setUserGroups(response.data);
        } else {
          console.error(
            "Resposta da API getAllGroups nÃ£o contÃ©m grupos:",
            response.data
          );
          setUserGroups([]);
        }
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
        setUserGroups([]);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    // Buscar filmes quando selectedGroup ou userGroups mudam
    const fetchGenresAndMovies = async () => {
      if (!userGroups || userGroups.length === 0) {
        console.log("userGroups ainda nÃ£o carregado ou estÃ¡ vazio.");
        return; // Sai da funÃ§Ã£o se userGroups ainda estiver vazio
      }
      let genreIds = "";
      console.log("selectedGroup no inÃ­cio do useEffect:", selectedGroup);
      if (selectedGroup === "all") {
        const allGenres = userGroups.flatMap((group) => group.genre).join(",");
        console.log("All genres selecionados:", allGenres);
        genreIds = convertGenresToIds(allGenres);
      } else {
        try {
          const group = userGroups.find((g) => g.id === selectedGroup);
          if (group) {
            genreIds = convertGenresToIds(group.genre.join(","));
          } else {
            console.warn("Grupo selecionado nÃ£o encontrado. Exibindo todos.");
            const allGenres = userGroups
              .flatMap((group) => group.genre)
              .join(",");
            genreIds = convertGenresToIds(allGenres);
          }
        } catch (error) {
          console.error("Erro ao buscar gÃªneros do grupo:", error);
          // Em caso de erro, usar todos os gÃªneros
          const allGenres = userGroups
            .flatMap((group) => group.genre)
            .join(",");
          genreIds = convertGenresToIds(allGenres);
        }
      }

      console.log("selectedGroup:", selectedGroup, "genreIds:", genreIds);
      setMovies([]);
      fetchMovies(1, genreIds);
    };

    if (userGroups.length > 0) {
      console.log("userGroups mudou, iniciando fetchGenresAndMovies");
      fetchGenresAndMovies();
    } else {
      console.log("userGroups ainda nÃ£o carregado ou estÃ¡ vazio.");
    }
  }, [selectedGroup, userGroups]);

  const fetchMovies = async (pageNumber = 1, genreIds = "") => {
    setLoading(true);
    try {
      const genresParam = genreIds ? `&with_genres=${genreIds}` : "";
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}${genresParam}&sort_by=popularity.desc&vote_count.gte=5000&page=${pageNumber}`;
      const response = await fetch(url);

      if (!response.ok) {
        const message = `Erro ao carregar filmes: ${response.status}`;
        console.error(message);
        throw new Error(message); // LanÃ§a o erro para ser capturado
      }
      const data = await response.json();

      if (data.results) {
        setMovies((prevMovies) => {
          if (data.results) return [...prevMovies, ...data.results];
          else {
            console.error("Resultado invÃ¡lido ao tentar pegar filmes");
            return [];
          }
        });
      }

      // setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenresForCurrentMovie = async (movieId: number) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            const message = `Erro ao carregar gêneros do filme: ${response.status}`;
            console.error(message);
            throw new Error(message); // Lança o erro para ser capturado
        }

        const data = await response.json();

        if (data.genres) {
            return data.genres;
        } else {
            console.error("Resultado inválido ao tentar pegar gêneros");
            return [];
        }
    } catch (error) {
        console.error("Erro ao buscar gêneros do filme:", error);
        return [];
    }
};



  const handleSwipe = async (direction: string) => {
    const nextIndex = currentIndex + 1;

    if(direction === "right" && currentMovie){
      try{
        const isVoted = true;
        const genres = await fetchGenresForCurrentMovie(currentMovie.id); 
        const genreIds = genres.map((genre: Genre) => genre.id).join(",");
        await addFilm(currentMovie.id, currentMovie.title, currentMovie.overview, isVoted, genreIds)
        console.log("Filme salvo com sucesso:", currentMovie.title, " ID: ", currentMovie.id);
        console.log("Generos do filme: ", genreIds);
      } catch (error) {
        console.error("Erro ao salvar filme:", error);
      }
    }

    if(direction === "left" && currentMovie){
      try{
        const isVoted = false;
        const genres = await fetchGenresForCurrentMovie(currentMovie.id); 
        const genreIds = genres.map((genre: Genre) => genre.id).join(",");
        await addFilm(currentMovie.id, currentMovie.title, currentMovie.overview, isVoted, genreIds)
        console.log("Filme salvo com sucesso:", currentMovie.title, " ID: ", currentMovie.id);
        console.log("Generos do filme: ", genreIds);
      } catch (error) {
        console.error("Erro ao salvar filme:", error);
      }
    }

    if (nextIndex >= movies.length - 5) {
      setPage((prevPage) => prevPage + 1);  
      fetchMovies(
        page + 1,
        convertGenresToIds(userGroups.flatMap((group) => group.genre).join(","))
      );
    }
    if (nextIndex < movies.length) {
      setCurrentIndex(nextIndex);
      position.x.setValue(0);
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

  if (!movies || movies.length === 0) {
    return (
      <Container>
        <Text>Carregando filmes...</Text>
      </Container>
    );
  }

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return (
      <Container>
        <Text>Nenhum filme encontrado.</Text>
      </Container>
    );
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

  const rotate = position.x.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: ["-5deg", "0deg", "5deg"],
    extrapolate: "clamp",
  });

  return (
    <Container>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedGroup}
          onValueChange={(itemValue) => setSelectedGroup(itemValue)}
          style={styles.picker}
          dropdownIconColor="gray"
        >
          <Picker.Item label="Todos" value="all" />
          {userGroups.map((group) => (
            <Picker.Item key={group.id} label={group.name} value={group.id} />
          ))}
        </Picker>
      </View>
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
              <MovieTitle numberOfLines={2}>{currentMovie.title}</MovieTitle>
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

const styles = StyleSheet.create({
  pickerContainer: {
    padding: 10,
    width: "90%", // Largura aumentada
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10, // Margem inferior (opcional)
  },
  picker: {
    backgroundColor: "#ddd", // Cinza claro
    color: "black", // Letra preta
    height: 40, // Altura levemente reduzida
    fontSize: 18,
  },
  pickerItem: {
    color: "black", // Letra preta nos itens
    fontSize: 16,
  },
  loadingText: {
    color: "black", // Letra preta no texto de carregamento
    fontSize: 16,
    textAlign: "center",
  },
});
