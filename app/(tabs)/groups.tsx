import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getUsersInGroup, Group } from "@/services/groups";
import { getEventsByGroup } from "@/services/events"; // Importando a função para obter eventos
import { Container } from "@/assets/styles/global.styles";
import {
  Header,
  NewGroupButton,
  ButtonText,
  GroupContainer,
  GroupTitle,
  GroupDetails,
  HeaderText,
  DateContainer,
} from "@/assets/styles/groups.styles";
import CreateGroupModal from "../../components/createGroupModal";
import { getUserGroups } from "@/services/users";
import { EventDate, Texto } from "@/assets/styles/groupdetail.styles";
import { Feather } from "@expo/vector-icons";

export default function GroupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchGroupsAndUsers = async () => {
    try {
      const response = await getUserGroups();
      console.log("resposta", response);
      const groups = response.data;

      const groupsWithDetails = await Promise.all(
        groups.map(async (group: Group) => {
          try {
            const usersResponse = await getUsersInGroup(group.id);
            const nextEvent = await getEventsByGroup(group.id);

            return {
              ...group,
              userCount: usersResponse.data.length,
              nextEventDate: nextEvent ? new Date(nextEvent.date) : null,
            };
          } catch (error) {
            return { ...group, userCount: 0, nextEventDate: null };
          }
        })
      );

      setGroups(groupsWithDetails);
    } catch (error) {
      setError("Você ainda não está em um grupo");
    }
  };

  useEffect(() => {
    fetchGroupsAndUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchGroupsAndUsers();
    }, [])
  );

  const handleGroupPress = (groupId: string) => {
    router.push(`/groupdetail/${groupId}`);
  };

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString("pt-BR") : "Sem evento";

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
          <Pressable
            key={group.id}
            onPress={() => handleGroupPress(group.id)}
            style={{ width: "100%" }}
          >
            <GroupContainer>
              <GroupTitle>{group.name}</GroupTitle>
              <GroupDetails>
                <Texto>{group.userCount} participantes</Texto>
                <DateContainer>
                  <Texto>prox.evento:</Texto>
                  <EventDate>
                    <Feather name="calendar" size={16} color="#fff" />
                    <Texto>{formatDate(group.nextEventDate)}</Texto>
                  </EventDate>
                </DateContainer>
              </GroupDetails>
            </GroupContainer>
          </Pressable>
        ))}
      </ScrollView>

      <CreateGroupModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onGroupCreated={fetchGroupsAndUsers}
      />
    </Container>
  );
}
