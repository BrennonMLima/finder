import React from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { Overlay, ModalWrapper } from "@/assets/styles/modal.styles";
import { StyledButton, ButtonLabel } from "@/assets/styles/global.styles";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  title = "Tem certeza?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Overlay onPress={onCancel}>
        <ModalWrapper>
          <Text style={{ fontSize: 18, marginBottom: 20, color: "#fff" }}>
            {title}
          </Text>
          <StyledButton onPress={onConfirm}>
            <ButtonLabel>{confirmText}</ButtonLabel>
          </StyledButton>
          <StyledButton onPress={onCancel} secondColor>
            <ButtonLabel secondColor>{cancelText}</ButtonLabel>
          </StyledButton>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default ConfirmationModal;
