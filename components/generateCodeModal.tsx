import React from "react";
import { Modal} from "react-native";
import {
    Overlay,
    ModalWrapper,
    TextInput
  } from "@/assets/styles/modal.styles";
  import {
    Title
  } from "@/assets/styles/global.styles";

interface GenerateCodeModalProps {
  visible: boolean;
  onClose: () => void;
}

const GenerateCodeModal: React.FC<GenerateCodeModalProps> = ({
  visible,
  onClose,
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
          <Title>Código do convite:</Title>
          <TextInput
            value="Law24"
            editable={false}
            selectTextOnFocus={true}
          />
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default GenerateCodeModal;
