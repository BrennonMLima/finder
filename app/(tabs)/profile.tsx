import {
  Content,
  ProfileImage,
  Nickname,
  Links,
  Container,
} from "@/assets/styles/profile.styles";
import React from "react";

export default function ProfileScreen() {
  return (
    <Container>
      <Content>
        <ProfileImage source={require("@/assets/images/profile.png")} />
        <Nickname>Denilce Veloso</Nickname>
        <Links>Seja Premium ⭐</Links>
        <Links>Avaliar Filmes</Links>
      </Content>
    </Container>
  );
}
