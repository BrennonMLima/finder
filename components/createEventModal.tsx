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

  const handleDateChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, "");

    if (formattedText.length > 2) {
      formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    }
    if (formattedText.length > 5) {
      formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5, 9)}`;
    }

    setDate(formattedText.slice(0, 10));
  };

  const handleCreate = () => {
    if (!name || !location || !date || !description) {
      Alert.alert("Erro", "Todos os campos s�o obrigat�rios!");
      return;
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      Alert.alert("Erro", "Data inv�lida! Use o formato DD/MM/AAAA.");
      return;
    }

    onCreate(name, location, date, description);
    setName("");
    setLocation("");
    setDate("");
    setDescription("");
    onClose();
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
          <StyledInput
            placeholder="Data (DD/MM/AAAA)"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric"
            maxLength={10}
          />
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
