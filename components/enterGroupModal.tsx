import React from "react";
import { Modal } from "react-native";
import { StyledButton, ButtonLabel } from "@/assets/styles/global.styles";
import {
    Overlay,
    ModalWrapper,
    StyledInput
  } from "@/assets/styles/modal.styles";
  import {
    Title
  } from "@/assets/styles/global.styles";

interface EnterGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onEnterGroup: () => void;
}

const EnterGroupModal: React.FC<EnterGroupModalProps> = ({
  visible,
  onClose,
  onEnterGroup,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Overlay onPress={onClose}>
        <ModalWrapper>
          <Title>Informe o código do grupo</Title>
          <StyledInput
            placeholder="Código do Grupo"
          />
          <StyledButton onPress={onClose}>
            <ButtonLabel>Entrar</ButtonLabel>
          </StyledButton>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default EnterGroupModal;
