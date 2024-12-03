import React, { useEffect, useState, useRef, useCallback } from "react";
import { MaterialCommunityIcons, FontAwesome, AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { Container } from "@/assets/styles/global.styles";
import { Picker } from "@react-native-picker/picker";
import {
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
  TitleMovieContaier,
} from "../../assets/styles/index.styles";
import { Group, getGroupGenres } from "@/services/groups";
import { getUserGroups } from "@/services/users";
import { addFilm } from "@/services/films";
import { useFocusEffect } from "expo-router";
import SkeletonLoader from "@/components/loadingAnimation";


const API_KEY = "30feaffc6e5c122072bd41275477c810";
interface Genre {
  id: number;
  name: string;
}


export default function HomeScreen() {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visitedPages, setVisitedPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const position = React.useRef(new Animated.ValueXY()).current;
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(true);

  const HelpIcon = () => (
    <Pressable onPress={() => setHelpModalVisible(true)}>
      <MaterialCommunityIcons name="help-circle-outline" size={24} color="gray" />
    </Pressable>
  );


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

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

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

    
    const validMovies = data.results.filter((movie: { overview: string; }) => movie.overview && movie.overview.trim() !== "");


    setMovies(validMovies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    setMovies([]);
  } finally {
    setIsLoadingMovies(false);
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

  if (nextIndex >= movies.length) {
    let genresToFetch: string;

    if (selectedGroup === "all") 
      genresToFetch = "";

    else {
      const genreResponse = await getGroupGenres(selectedGroup);
      genresToFetch = genreResponse.genres.map(genre => genre.id).join("|");
    }

    await fetchMovies(genresToFetch);

    nextIndex = 0;
}

  setCurrentIndex(nextIndex);
  position.x.setValue(0);

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

const interestOpacity = position.x.interpolate({
  inputRange: [0,10, 100],
  outputRange: [0,0.5, 1],
  extrapolate: "clamp",
});

const disinterestOpacity = position.x.interpolate({
  inputRange: [-100, 0],
  outputRange: [1, 0],
  extrapolate: "clamp",
});

const iconScale = position.x.interpolate({
  inputRange: [-300, -150, 0, 150, 300],
  outputRange: [3.5, 2.5, 1.5, 2.5, 3.5], 
  extrapolate: "clamp",
});



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
        <SkeletonLoader />
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
        <SkeletonLoader />
      </Container>
    );
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`;

  const rotate = position.x.interpolate({
    inputRange: [-300, -150, 0, 150, 300],
    outputRange: ["-10deg", "-5deg", "0deg", "5deg", "10deg"],
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
          <Picker.Item label="Todos os gêneros" value="all" />
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
           Escolha um grupo para filtrar os filmes com base nos gêneros associados a ele.
           Para visualizar filmes de todos os gêneros, selecione 'Todos os gêneros'.
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

      
      <Animated.View
        style={{
          position: "absolute",
          top: "30%",// para colocar ao lado top: "40%"
          right: "40%",// para colocar ao lado  right: -50, e tirar o texto
          zIndex: 100,
          alignItems: "center",
          transform: [{ scale: iconScale }, { rotate }],
          opacity: disinterestOpacity,
        }}
      >
        <FontAwesome name="close"  size={50} color="#ff3333" />
        <Animated.Text
          style={{
            fontSize: 16,
            color: "#ff3333",
            marginTop: 8,
            textAlign: "center",
            opacity: disinterestOpacity,
          }}
        >
          Desinteressado
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: "30%",// para colocar ao lado top: "40%"
          left: "40%",// para colocar ao lado  left: -50, e tirar o texto
          zIndex: 100,
          alignItems: "center",
          transform: [{ scale: iconScale }, { rotate }],
          opacity: interestOpacity,
        }}
      >
        <FontAwesome name="heart" size={50} color="#0496ff"/>
        <Animated.Text
          style={{
            fontSize: 16,
            color: "#0496ff",
            marginTop: 8,
            textAlign: "center",
            opacity: interestOpacity,
          }}
        >
          Interessado
        </Animated.Text>
      </Animated.View>

        <MovieCard>
          <ImageRating>
            <Banner source={{ uri: posterUrl }} resizeMode="stretch" />
            <TitleContainer>
              <TitleMovieContaier>
              <MovieTitle numberOfLines={2}>{currentMovie.title}</MovieTitle>
              </TitleMovieContaier>
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
    padding: 5,
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
    backgroundColor: "#262626",
    flex: 1, // Permite que o picker ocupe o espaço disponível
    borderRadius: 10, // Bordas arredondadas
    color: "white",
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  // Estilos para o Modal
  modalView: {
    backgroundColor: "#333",
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
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
    color: "white",
    textAlign: "center",
  },
});

