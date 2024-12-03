import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, View, Text } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getUsersInGroup, Group } from "@/services/groups";
import { getEventsByGroup } from "@/services/events"; // Importando a fun��o para obter eventos
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
  EnterGroupButton,
  ButtonTextEnter,
  HeaderGroup,
} from "@/assets/styles/groups.styles";
import CreateGroupModal from "../../components/createGroupModal";
import EnterGroupModal from "@/components/enterGroupModal";
import { getUserGroups } from "@/services/users";
import { EventDate, Texto } from "@/assets/styles/groupdetail.styles";
import { Feather } from "@expo/vector-icons";

export default function GroupScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [enterGroupVisible, setEnterGroupVisible] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchGroupsAndUsers = async () => {
    try {
      const response = await getUserGroups();
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
      setError("Voc� ainda n�o est� em um grupo");
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
        <HeaderGroup>
          <HeaderText>Seus Grupos</HeaderText>
          <EnterGroupButton onPress={() => setEnterGroupVisible(true)}>
            <ButtonTextEnter>Entrar em um Grupo</ButtonTextEnter>
          </EnterGroupButton>
        </HeaderGroup>
      </Header>
  
      {groups.length === 0 ? (
        <View style={{ marginTop: 80, gap: 10, alignItems: "center"}}>
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Você não faz parte de nenhum grupo ainda!
          </Text>
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center", marginTop: 20, }}>
            Crie ou entre em um grupo para escolher seus gêneros preferidos. Para votar, arraste para a direita para adicionar ao ranking ou para a
            esquerda para pular. Os mais votados serão escolhidos para assistir juntos!
          </Text>
        </View>

      ) : (
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
      )}

      <CreateGroupModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onGroupCreated={fetchGroupsAndUsers}
      />

      <EnterGroupModal
        visible={enterGroupVisible}
        onClose={() => setEnterGroupVisible(false)}
        onEnterGroup={fetchGroupsAndUsers}
      />
    </Container>
  );
}
