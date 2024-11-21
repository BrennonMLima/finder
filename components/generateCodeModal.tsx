import React from "react";
import { Modal} from "react-native";
import {
    Overlay,
    ModalWrapper,
    TextInput,
    TextContent,
    Copy
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
          <TextInput
            value="Law24"
            editable={false}
            selectTextOnFocus={true}
          />
          <Copy>
            <Feather
              name="copy"
              color="#b2b2b2"
              size={20}
              />
              <TextContent>Copiar</TextContent>
            </Copy>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default GenerateCodeModal;
