import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { getAllGroups, getUsersInGroup } from "@/services/groups";
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
import CreateGroupModal from "../createGroupModal";

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
  const [error, setError] = useState("");

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
              return { ...group, userCount: 0 };
            }
          })
        );
        setGroups(groupsWithUserCount);
      }
    } catch (error) {
      setError("Voce ainda nao esta em um grupo");
    }
  };

  useEffect(() => {
    fetchGroupsAndUsers();
  }, []);

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
          <Link key={group.id} href={`/groupdetail/${group.id}`}>
            <GroupContainer>
              <GroupTitle>{group.name}</GroupTitle>
              <GroupDetails>
                {group.userCount} participantes - Prox. evento: xx/xx/xx
              </GroupDetails>
            </GroupContainer>
          </Link>
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
