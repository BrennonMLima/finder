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
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setName(initialName);
    setLocation(initialLocation);
    setDate(initialDate);
    setDescription(initialDescription);
  }, [initialName, initialLocation, initialDate, initialDescription]);

  const handleEdit = () => {
    if (!name || !location || !date || !description) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    onEdit(eventId, name, location, date, description);
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
            onChangeText={setDate}
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
