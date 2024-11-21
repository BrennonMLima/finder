import React, { useState } from "react";
import { Modal, Alert, FlatList, Pressable, Text, View } from "react-native";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
  Tag,
  TagText,
  TagContainer,
  EditProfile,
  EditableImage,
  EditModalWrapper,
  ImageContainer,
  EditIconContainer
} from "@/assets/styles/modal.styles";
import {
  Title,
  StyledButton,
  ButtonLabel,
} from "@/assets/styles/global.styles";
import { createGroup,genresList } from "@/services/groups";
import { Feather } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const editProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <EditModalWrapper onPress={() => {}}>
          <Title>Editar Perfil</Title>
          <EditProfile>
            <Pressable>
                <ImageContainer>
                    <EditableImage source={require("@/assets/images/profile.png")}/>
                    <EditIconContainer>
                        <Feather name="edit" size={40} color="#fff"/>
                    </EditIconContainer>
                </ImageContainer>
            </Pressable>

          <StyledInput
            placeholder="Nome"
          />
        </EditProfile>
        <StyledInput
            placeholder="Senha atual"
          />
          <StyledInput
            placeholder="Nova senha"
          />
          <StyledInput
            placeholder="Confirmar nova senha"
          />
          <StyledButton>
            <ButtonLabel>Editar</ButtonLabel>
          </StyledButton>
          <StyledButton onPress={onClose} secondColor>
            <ButtonLabel secondColor>Cancelar</ButtonLabel>
          </StyledButton>
        </EditModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default editProfileModal;

