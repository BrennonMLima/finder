import React, { useEffect, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { Link } from "expo-router";
import { getAllGroups, getUsersInGroup } from "@/services/groups";
import {
  Container,
  StyledButton,
  ButtonLabel,
  Title,
} from "@/assets/styles/global.styles";
import {
  Header,
  NewGroupButton,
  ButtonText,
  GroupContainer,
  GroupTitle,
  GroupDetails,
  HeaderText,
} from "@/assets/styles/groups.styles";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
} from "@/assets/styles/moda.styles";

interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  userCount: number;
}

export default function GroupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGroupsAndUsers = async () => {
      try {
        const response = await getAllGroups();
        if (response.data.groups) {
          const groupsWithUserCount = await Promise.all(
            response.data.groups.map(async (group: Group) => {
              try {
                const usersResponse = await getUsersInGroup(group.id);
                return { ...group, userCount: usersResponse.data.length };
              } catch (error) {
                console.error(
                  `Erro ao buscar usuários do grupo ${group.id}`,
                  error
                );
                return { ...group, userCount: 0 };
              }
            })
          );
          setGroups(groupsWithUserCount);
        }
      } catch (error) {
        setError("Você ainda não esta em um grupo")
      }
    };

    fetchGroupsAndUsers();
  }, []);

  const handleCreateGroup = () => {
    console.log(`Nome: ${groupName}, Descrição: ${groupDescription}`);
    setModalVisible(false);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <Container>
      <Header>
        <NewGroupButton onPress={() => setModalVisible(true)}>
          <ButtonText>+ Novo Grupo</ButtonText>
        </NewGroupButton>
        <HeaderText>Seus Grupos</HeaderText>
      </Header>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
      >
        {groups.map((group) => (
          <Link key={group.id} href={`/groupdetail/${group.id}`} >
          <GroupContainer key={group.id}>
            <GroupTitle>{group.name}</GroupTitle>
            <GroupDetails>
              {group.userCount} participantes - Próx. evento: xx/xx/xx
            </GroupDetails>
          </GroupContainer>
          </Link>
        ))}
      </ScrollView>

      {/* Modal para criar novo grupo */}
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
              onChangeText={setGroupDescription}
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
