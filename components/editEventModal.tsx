import React, { useEffect, useState } from "react";
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

interface EditEventModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: (
    eventId: string,
    name: string,
    location: string,
    date: string,
    description: string
  ) => void;
  eventId: string;
  initialName: string;
  initialLocation: string;
  initialDate: string;
  initialDescription: string;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  visible,
  onClose,
  onEdit,
  eventId,
  initialName,
  initialLocation,
  initialDate,
  initialDescription,
}) => {
  const formatToDDMMYYYY = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatToISO = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toISOString();
  };
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState(formatToDDMMYYYY(initialDate));
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setName(initialName);
    setLocation(initialLocation);
    setDate(formatToDDMMYYYY(initialDate));
    setDescription(initialDescription);
  }, [initialName, initialLocation, initialDate, initialDescription]);

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
  
  
  const handleEdit = () => {
    if (!name || !location || !date || !description) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }
    
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      Alert.alert("Erro", "Data inválida! Use o formato DD/MM/AAAA.");
      return;
    }
    const isoDate = formatToISO(date);
    onEdit(eventId, name, location, isoDate, description);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <Overlay onPress={onClose}>
        <ModalWrapper onPress={(e) => e.stopPropagation()}>
          <Title>Editar Evento</Title>

          <StyledInput placeholder="Nome" value={name} onChangeText={setName} />
          <StyledInput
            placeholder="Localização"
            value={location}
            onChangeText={setLocation}
          />
          <StyledInput
            placeholder="Data"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric"
          />
          <StyledInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
          />

          <StyledButton onPress={handleEdit}>
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

export default EditEventModal;
