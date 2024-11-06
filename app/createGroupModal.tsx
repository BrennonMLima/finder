import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
} from "@/assets/styles/moda.styles";
import {
  Title,
  StyledButton,
  ButtonLabel,
} from "@/assets/styles/global.styles";
import { createGroup } from "@/services/groups";

interface CreateGroupModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  visible,
  onClose,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupGenre, setGroupGenre] = useState("");

  const handleCreateGroup = async () => {
    if (!groupName || !groupDescription || !groupGenre) {
      Alert.alert("Erro", "Todos os campos sao obrigatorios!");
      return;
    }

    try {
      await createGroup(groupName, groupDescription, groupGenre);
      onClose();
      Alert.alert("Sucesso", "Grupo criado com sucesso!");
      setGroupName("");
      setGroupDescription("");
      setGroupGenre("");
    } catch (error) {
      console.error("Erro ao criar o grupo:", error);
      Alert.alert("Erro", "Nao foi possivel criar o grupo.");
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
            placeholder="Descricao"
            value={groupDescription}
            onChangeText={setGroupDescription}
          />
          <StyledInput
            placeholder="Genero"
            value={groupGenre}
            onChangeText={setGroupGenre}
          />
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
