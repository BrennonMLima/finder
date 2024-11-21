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
  Pressable,
  Modal,
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
import { Group, getGroupGenres } from "@/services/groups";
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
  const [visitedPages, setVisitedPages] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const position = React.useRef(new Animated.ValueXY()).current;
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  const HelpIcon = () => (
    <Pressable onPress={() => setHelpModalVisible(true)}>
      <MaterialCommunityIcons name="help-circle-outline" size={24} color="gray" />
    </Pressable>
  );

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getUserGroups();
        if (response.data && response.data) {
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
    const fetchGenresAndMovies = async () => {
      setLoading(true);
      try {
        let genreIds = "";
        if (selectedGroup === "all") {
          const allGenreIds = userGroups.flatMap((group) =>
            group.genre ? group.genre.split(",").map(Number) : []
          );
          genreIds = allGenreIds.join(",");
          console.log("genreIds da linha 87: ",genreIds)
        } else {
          const genresResult = await getGroupGenres(selectedGroup);
          genreIds = genresResult.genres.map((genre) => genre.id).join("|");
          console.log("genreIds da linha 90: ",genreIds)
        }
        fetchMovies(genreIds);
      } catch (error) {
        console.error("Erro em fetchGenresAndMovies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, [selectedGroup, userGroups]);

const fetchMovies = async (genreIds = "") => {
  const maxPages = 100;
  let newPage;

  // Gera uma página aleatória que ainda não foi visitada
  do {
    newPage = Math.floor(Math.random() * maxPages) + 1;
  } while (visitedPages.includes(newPage));

  setVisitedPages([...visitedPages, newPage]);

  const genresParam = genreIds ? `&with_genres=${genreIds}` : "";
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=pt-BR${genresParam}&sort_by=popularity.desc&page=${newPage}`;

  try {
    setIsLoadingMovies(true);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao carregar filmes: ${response.status}`);
    }

    const data = await response.json();

    // Filtra os filmes com overview vazio
    const validMovies = data.results.filter((movie: { overview: string; }) => movie.overview && movie.overview.trim() !== "");


    setMovies(validMovies); // Atualiza o estado apenas com filmes válidos
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    setMovies([]); // Reseta os filmes em caso de erro
  } finally {
    setIsLoadingMovies(false); // Marca como não carregando
  }
};

  const fetchGenresForCurrentMovie = async (movieId: number) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const message = `Erro ao carregar gêneros do filme: ${response.status}`;
        console.error(message);
        throw new Error(message);
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
  let nextIndex = currentIndex + 1;

  // Verifica se chegou ao final da lista atual
  if (nextIndex >= movies.length) {
    await fetchMovies(selectedGroup === "all" 
      ? userGroups.flatMap(group => group.genre ? group.genre.split(",") : []).join("|") 
      : selectedGroup
    );
    nextIndex = 0; // Reinicia o índice após carregar novos filmes
  }

  // Atualiza o índice e reseta a posição do card
  setCurrentIndex(nextIndex);
  position.x.setValue(0);

  // Lógica adicional para salvar ou descartar filmes
  if (direction === "right" && currentMovie) {
    try {
      const isVoted = true;
      const genres = await fetchGenresForCurrentMovie(currentMovie.id);
      const genreIds = genres.map((genre: Genre) => genre.id);
      console.log("genreIds da linha 187: ",genreIds)
      await addFilm(currentMovie.id, currentMovie.title, currentMovie.overview, isVoted, genreIds);
    } catch (error) {
      console.error("Erro ao salvar filme:", error);
    }
  } else if (direction === "left" && currentMovie) {
    try {
      const isVoted = false;
      const genres = await fetchGenresForCurrentMovie(currentMovie.id);
      const genreIds = genres.map((genre: Genre) => genre.id);
      console.log("genreIds da linha 197: ",genreIds)
      await addFilm(currentMovie.id, currentMovie.title, currentMovie.overview, isVoted, genreIds);
    } catch (error) {
      console.error("Erro ao descartar filme:", error);
    }
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

  if (isLoadingMovies) {
    return (
      <Container>
        <Text>Carregando filmes...</Text>
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
          <Picker.Item label="Todos os grupos" value="all" />
          {userGroups.map((group) => (
            <Picker.Item key={group.id} label={group.name} value={group.id} />
          ))}
        </Picker>
        <HelpIcon />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={helpModalVisible}
        onRequestClose={() => {
          setHelpModalVisible(!helpModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Selecione um grupo para filtrar os filmes. Para ver filmes de todos os
            grupos, selecione "Todos os grupos". Você precisa estar em pelo menos um grupo
            para usar estes filtros.
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setHelpModalVisible(!helpModalVisible)}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </Pressable>
        </View>
      </Modal>

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
                <Description>{parseFloat(currentMovie.vote_average).toFixed(1)}</Description>
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
    width: "90%",
    alignSelf: "center",
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    flexDirection: "row", // Adiciona flexDirection para organizar o Picker e o ícone
    justifyContent: "space-between", // Distribui espaço entre os elementos
    alignItems: "center", // Alinha verticalmente
  },
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    backgroundColor: "white",
    flex: 1, // Permite que o picker ocupe o espaço disponível
    borderRadius: 10, // Bordas arredondadas
    color: "black",
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  // Estilos para o Modal
  modalView: {
    backgroundColor: "white",
    margin: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
