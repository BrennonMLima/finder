import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ButtonLabel,
  Container,
  StyledButton,
  Title,
} from "@/assets/styles/global.styles";
import {
  HeaderText,
  NewGroupButton,
  ButtonText,
  GroupContainer,
  GroupTitle,
  GroupDetails,
  Header,
} from "@/assets/styles/groups.styles";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
} from "@/assets/styles/moda.styles";

export default function GroupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setgroupDescription] = useState("");

  const handleCreateGroup = () => {
    console.log(`Nome: ${groupName}, Data: ${groupDescription}`);
    setModalVisible(false);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <Container>
      <Header>
        <NewGroupButton onPress={() => setModalVisible(true)}>
          <ButtonText>+ Novo Grupo</ButtonText>
        </NewGroupButton>
        <HeaderText>Seus grupos</HeaderText>
      </Header>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
      >
        <GroupContainer>
          <GroupTitle>Amigos e o Eduardo</GroupTitle>
          <GroupDetails>5 participantes - 20/10/2024</GroupDetails>
        </GroupContainer>
        <GroupContainer>
          <GroupTitle>Nome do Grupo</GroupTitle>
          <GroupDetails>12 participantes - 25/12/2024</GroupDetails>
        </GroupContainer>
      </ScrollView>

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <Overlay onPress={closeModal}>
          <ModalWrapper onPress={() => {}}>
            <Title>Criar Novo Grupo</Title>
            <StyledInput
              placeholder="Nome"
              value={groupName}
              onChangeText={setGroupName}
            />
            <StyledInput
              placeholder="Descrição"
              value={groupDescription}
              autoCapitalize="none"
              onChangeText={setgroupDescription}
            />
            <StyledInput
              placeholder="Genêros"
              value={groupDescription}
              onChangeText={setgroupDescription}
            />
            <StyledButton onPress={handleCreateGroup}>
              <ButtonLabel>Criar</ButtonLabel>
            </StyledButton>
            <StyledButton onPress={closeModal} secondColor>
              <ButtonLabel secondColor>Cancelar</ButtonLabel>
            </StyledButton>
          </ModalWrapper>
        </Overlay>
      </Modal>
    </Container>
  );
}
