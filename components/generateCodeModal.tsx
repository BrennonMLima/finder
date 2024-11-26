import React, { useEffect, useState } from "react";
import { Modal, Pressable} from "react-native";
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
import { generateInviteCode } from "@/services/groups";
import * as Clipboard from 'expo-clipboard';

interface GenerateCodeModalProps {
  visible: boolean;
  onClose: () => void;
  groupId: string;
}

interface InviteCode {
  code: string;
  expiresAt: Date;
}

const GenerateCodeModal: React.FC<GenerateCodeModalProps> = ({
  visible,
  onClose,
  groupId
}) => {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [expired, setExpired] = useState<number>();

  const handleGenerateInviteCode = async () => {    
    try{
      const inviteCode = await generateInviteCode(groupId);
      setInviteCode(inviteCode);
      return inviteCode;
    } catch(error){
      console.error("Não foi possivel gerar o codigo de convite");
      throw error;
    }
  }

  const handleCopy = async () => {
    await Clipboard.setStringAsync(inviteCode);
  }

  useEffect(() =>{
    if(visible){
      handleGenerateInviteCode();
    }
  }, [visible])

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
              <Feather name="copy" size={20} color="black"/>
            </Pressable>
          </StyledInputContainer>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default GenerateCodeModal;
