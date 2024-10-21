import { Container, Title } from "@/assets/styles/global.styles";
import {
  HeaderText,
  NewGroupButton,
  ButtonText,
  GroupContainer,
  GroupTitle,
  GroupDetails,
  Header,
} from "@/assets/styles/groups.styles";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function GroupScreen() {
  return (
    <Container>
      <Header>
        <NewGroupButton>
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
    </Container>
  );
}
