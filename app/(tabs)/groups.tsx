import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getUsersInGroup, Group } from "@/services/groups";
import { Container } from "@/assets/styles/global.styles";
import {
  Header,
  NewGroupButton,
  ButtonText,
  GroupContainer,
  GroupTitle,
  GroupDetails,
  HeaderText,
} from "@/assets/styles/groups.styles";
import CreateGroupModal from "../../components/createGroupModal";
import { getUserGroups } from "@/services/users";

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

      const groupsWithUserCount = await Promise.all(
        groups.map(async (group: Group) => {
          try {
            const usersResponse = await getUsersInGroup(group.id);
            return { ...group, userCount: usersResponse.data.length };
          } catch (error) {
            return { ...group, userCount: 0 };
          }
        })
      );
      setGroups(groupsWithUserCount);
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
                {group.userCount} participantes - Prox. evento: xx/xx/xx
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
