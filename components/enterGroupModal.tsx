import React,{ useEffect, useState } from "react";
import { Alert, Modal } from "react-native";
import { StyledButton, ButtonLabel } from "@/assets/styles/global.styles";
import {
    Overlay,
    ModalWrapper,
    StyledInput
  } from "@/assets/styles/modal.styles";
  import {
    Title
  } from "@/assets/styles/global.styles";
import { addUserWithInviteCode, getGroupIdByInviteCode} from "@/services/groups";

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
  const [inviteCode, setInviteCode] = useState("");

  const handleEnterGroup = async () => {
    try{
      const groupId = await getGroupIdByInviteCode(inviteCode);
      await addUserWithInviteCode(groupId as string, inviteCode);

      Alert.alert("Sucesso", "Você entrou em um grupo");
      onEnterGroup();
      onClose();
    }catch(error){
      console.error(`Erro ao entrar no grupo`);
      Alert.alert("Error", "Código de convite inválido ou espirado");
    }
  };

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
            value={inviteCode}
            onChangeText={setInviteCode}
          />
          <StyledButton onPress={handleEnterGroup}>
            <ButtonLabel>Entrar</ButtonLabel>
          </StyledButton>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default EnterGroupModal;
