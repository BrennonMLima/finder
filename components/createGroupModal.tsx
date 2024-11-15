import React, { useState } from "react";
import { Modal, Alert, FlatList, Pressable, Text, View } from "react-native";
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
import { createGroup,genresList } from "@/services/groups";
import { Feather } from '@expo/vector-icons';

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
  const [selectedGenres, setSelectedGenres] = useState<{ id: number; name: string }[]>([]);
  const [filteredGenres, setFilteredGenres] = useState(genresList);

  const addGenre = (genre: { id: number; name: string }) => {
    if (!selectedGenres.some((g) => g.id === genre.id)) {
      const newSelectedGenres = [...selectedGenres, genre];
      setSelectedGenres(newSelectedGenres);
      setGroupGenre("");
      filterGenres("", newSelectedGenres.map((g) => g.name));
    }
  };

  const removeGenre = (genreId: number) => {
    const updatedGenres = selectedGenres.filter((g) => g.id !== genreId);
    setSelectedGenres(updatedGenres);
    filterGenres(groupGenre, updatedGenres.map((g) => g.name));
  };

  const filterGenres = (text: string, selectedNames: string[]) => {
    const filtered = genresList.filter(
      (genre) =>
        genre.name.toLowerCase().includes(text.toLowerCase()) &&
        !selectedNames.includes(genre.name)
    );
    setFilteredGenres(filtered);
  };

  const handleGenreChange = (text: string) => {
    setGroupGenre(text);
    filterGenres(text, selectedGenres.map((g) => g.name));
  };

  const handleCreateGroup = async () => {
    if (!groupName || !groupDescription || selectedGenres.length === 0) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    try {
      const genreIds = selectedGenres.map((genre) => genre.id);
      await createGroup(groupName, groupDescription, genreIds);
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
                  <Pressable onPress={() => addGenre(item)}>
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
                  </Pressable>
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
            {selectedGenres.map((genre) => (
              <Tag key={genre.id} onPress={() => removeGenre(genre.id)}>
                <TagText>{genre.name} x</TagText>
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

