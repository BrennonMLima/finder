import React, { useState } from "react";
import { Modal, Alert } from "react-native";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
} from "@/assets/styles/modal.styles";
import {
  Title,
  StyledButton,
  ButtonLabel,
} from "@/assets/styles/global.styles";

interface CreateEventModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (
    name: string,
    location: string,
    date: string,
    description: string
  ) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreate = () => {
    if (!name || !location || !date || !description) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    onCreate(name, location, date, description);
    setName("");
    setLocation("");
    setDate("");
    setDescription("");
    onClose();
    Alert.alert("Sucesso", "Evento criado com sucesso!");
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Overlay onPress={onClose}>
        <ModalWrapper onPress={(e) => e.stopPropagation()}>
          <Title>Criar Novo Evento</Title>

          <StyledInput placeholder="Nome" value={name} onChangeText={setName} />
          <StyledInput
            placeholder="Localização"
            value={location}
            onChangeText={setLocation}
          />
          <StyledInput placeholder="Data" value={date} onChangeText={setDate} />
          <StyledInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />

          <StyledButton onPress={handleCreate}>
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

export default CreateEventModal;
