import React, { useEffect, useState } from "react";
import { Modal, Pressable, View, Text } from "react-native";
import {
  Overlay,
  ModalWrapper,
  TextInput,
  StyledInputContainer,
  TextContent,
} from "@/assets/styles/modal.styles";
import { Title } from "@/assets/styles/global.styles";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { generateInviteCode } from "@/services/groups";
import * as Clipboard from "expo-clipboard";

interface GenerateCodeModalProps {
  visible: boolean;
  onClose: () => void;
  groupId: string;
}

const GenerateCodeModal: React.FC<GenerateCodeModalProps> = ({
  visible,
  onClose,
  groupId,
}) => {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const handleGenerateInviteCode = async () => {
    try {
      const inviteCode = await generateInviteCode(groupId);
      setInviteCode(inviteCode);
    } catch (error) {
      console.error("Não foi possível gerar o código de convite");
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(inviteCode);
    setFeedbackVisible(true);
    setTimeout(() => setFeedbackVisible(false), 4000);
  };

  useEffect(() => {
    if (visible) {
      handleGenerateInviteCode();
    }
  }, [visible]);

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
              value={inviteCode}
              editable={false}
              selectTextOnFocus={true}
            />
            <Pressable onPress={handleCopy}>
              {feedbackVisible ? (
                <Feather name="check" size={24} color="green" />
              ) : (
                <Feather name="copy" size={20} color="black" />
              )}
            </Pressable>
          </StyledInputContainer>
          {feedbackVisible && (
            <TextContent style={{ color: "green", marginTop: 10 }}>
              Código copiado!
            </TextContent>
          )}
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default GenerateCodeModal;
