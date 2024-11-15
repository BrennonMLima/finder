import React, { useState, useEffect } from "react";
import { Modal, Alert, View, Text, Pressable, FlatList } from "react-native";
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
import { updateGroup, genresList } from "@/services/groups";
import { Feather } from "@expo/vector-icons";

interface EditGroupModalProps {
  visible: boolean;
  onClose: () => void;
  groupId: string;
  initialName: string;
  initialDescription: string;
  initialGenres: { id: number; name: string }[];
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({
  visible,
  onClose,
  groupId,
  initialName,
  initialDescription,
  initialGenres,
}) => {
  const [groupName, setGroupName] = useState(initialName);
  const [groupDescription, setGroupDescription] = useState(initialDescription);
  const [selectedGenres, setSelectedGenres] = useState(initialGenres);
  const [groupGenre, setGroupGenre] = useState("");
  const [filteredGenres, setFilteredGenres] = useState(genresList);

  useEffect(() => {
    setGroupName(initialName);
    setGroupDescription(initialDescription);
    setSelectedGenres(initialGenres);
  }, [initialName, initialDescription, initialGenres]);

  const handleUpdateGroup = async () => {
    if (!groupName || !groupDescription || selectedGenres.length === 0) {
      Alert.alert("Erro", "Todos os campos s�o obrigat�rios!");
      return;
    }
    try {
      const genreIds = selectedGenres.map((genre) => genre.id);
      await updateGroup(groupId, {
        name: groupName,
        description: groupDescription,
        genreId: genreIds,
      });
      onClose();
      Alert.alert("Sucesso", "Grupo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o grupo:", error);
      Alert.alert("Erro", "N�o foi poss�vel atualizar o grupo.");
    }
  };

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

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Overlay onPress={onClose}>
        <ModalWrapper onPress={() => {}}>
          <Title>Editar Grupo</Title>
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

          <View style={{ position: "relative", width: "100%" }}>
            <StyledInput
              placeholder="Gêneros"
              value={groupGenre}
              onChangeText={(text) => {
                setGroupGenre(text);
                filterGenres(text, selectedGenres.map((g) => g.name));
              }}
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

          <StyledButton onPress={handleUpdateGroup}>
            <ButtonLabel>Salvar</ButtonLabel>
          </StyledButton>
          <StyledButton onPress={onClose} secondColor>
            <ButtonLabel secondColor>Cancelar</ButtonLabel>
          </StyledButton>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default EditGroupModal;
