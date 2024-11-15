import React, { useState } from "react";
import { Modal, Alert, FlatList, TouchableOpacity, Text, View } from "react-native";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
  Tag,
  TagText,
  TagContainer,
} from "@/assets/styles/modal.styles";
import {
  Title,
  StyledButton,
  ButtonLabel,
} from "@/assets/styles/global.styles";
import { createGroup } from "@/services/groups";
import { Feather } from '@expo/vector-icons';

const genresList = [
  { name: "acao", id: 28 },
  { name: "aventura", id: 12 },
  { name: "comedia", id: 35 },
  { name: "animacao", id: 16 },
  { name: "crime", id: 80 },
  { name: "documentario", id: 99 },
  { name: "drama", id: 18 },
  { name: "familia", id: 10751 },
  { name: "fantasia", id: 14 },
  { name: "historia", id: 36 },
  { name: "terror", id: 27 },
  { name: "musica", id: 10402 },
  { name: "misterio", id: 9648 },
  { name: "romance", id: 10749 },
  { name: "ficção cientifica", id: 878 },
  { name: "cinema tv", id: 10770 },
  { name: "thriller", id: 53 },
  { name: "guerra", id: 10752 },
  { name: "faroeste", id: 37 },
];

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onGroupCreated: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  visible,
  onClose,
  onGroupCreated,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupGenre, setGroupGenre] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [filteredGenres, setFilteredGenres] = useState(genresList);

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      const newSelectedGenres = [...selectedGenres, genre];
      setSelectedGenres(newSelectedGenres);
      setGroupGenre("");
      filterGenres("", newSelectedGenres);
    }
  };

  const removeGenre = (genre: string) => {
    const updatedGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(updatedGenres);
    filterGenres(groupGenre, updatedGenres);
  };

  const filterGenres = (text: string, selected: string[]) => {
    const filtered = genresList.filter(
      (genre) =>
        genre.name.toLowerCase().includes(text.toLowerCase()) &&
        !selected.includes(genre.name)
    );
    setFilteredGenres(filtered);
  };

  const handleGenreChange = (text: string) => {
    setGroupGenre(text);
    filterGenres(text, selectedGenres);
  };

  const handleCreateGroup = async () => {
    if (!groupName || !groupDescription || selectedGenres.length === 0) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      await createGroup(groupName, groupDescription, selectedGenres.join(","));
      onClose();
      Alert.alert("Sucesso", "Grupo criado com sucesso!");
      onGroupCreated();
      setGroupName("");
      setGroupDescription("");
      setSelectedGenres([]);
    } catch (error) {
      console.error("Erro ao criar o grupo:", error);
      Alert.alert("Erro", "Não foi possível criar o grupo.");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <ModalWrapper onPress={() => {}}>
          <Title>Criar Novo Grupo</Title>
          <StyledInput
            placeholder="Nome"
            value={groupName}
            onChangeText={setGroupName}
          />
          <StyledInput
            placeholder="Descrição"
            value={groupDescription}
            onChangeText={setGroupDescription}
          />

          <View style={{ position: "relative", width: '100%' }}>
            <StyledInput
              placeholder="Gêneros (ex: comedia, acao)"
              value={groupGenre}
              onChangeText={handleGenreChange}
            />

            {groupGenre.length > 0 && filteredGenres.length > 0 && (
              <FlatList
                data={filteredGenres}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => addGenre(item.name)}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 8,
                        backgroundColor: "#fff",
                        zIndex: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ flex: 1 }}>{item.name}</Text>
                      <Feather name="arrow-up-right" size={18} color="#007bff" /> 
                    </View>
                  </TouchableOpacity>
                )}
                style={{
                  position: "absolute",
                  top: 50,
                  width: "100%",
                  maxHeight: 150,
                  backgroundColor: "#fff",
                  borderColor: "#ddd",
                  borderWidth: 1,
                  borderRadius: 5,
                  zIndex: 1000,
                }}
              />
            )}
          </View>

          <TagContainer>
            {selectedGenres.map((genre, index) => (
              <Tag key={index} onPress={() => removeGenre(genre)}>
                <TagText>{genre} x</TagText>
              </Tag>
            ))}
          </TagContainer>

          <StyledButton onPress={handleCreateGroup}>
            <ButtonLabel>Criar</ButtonLabel>
          </StyledButton>
          <StyledButton onPress={onClose} secondColor>
            <ButtonLabel secondColor>Cancelar</ButtonLabel>
          </StyledButton>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default CreateGroupModal;
