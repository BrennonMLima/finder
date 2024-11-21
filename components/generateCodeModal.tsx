import React from "react";
import { Modal} from "react-native";
import {
    Overlay,
    ModalWrapper,
    TextInput,
    TextContent,
    Copy,
    StyledInputContainer,
  } from "@/assets/styles/modal.styles";
  import {
    Title
  } from "@/assets/styles/global.styles";
import { Feather } from "@expo/vector-icons";

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
          <StyledInputContainer>
          <TextInput
            value="Law24"
            editable={false}
            selectTextOnFocus={true}
            />
            <Feather name="copy" size={20} color="black"/>
          </StyledInputContainer>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default GenerateCodeModal;
