import {
  Content,
  ProfileImage,
  Nickname,
  Links,
  Container,
} from "@/assets/styles/profile.styles";
import { getUserById } from "@/services/users";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/services/api";
import { useLocalSearchParams } from "expo-router";

interface User{
  id: string,
  name:string
}



export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");


  return (
    <Container>
      <Content>
        <ProfileImage source={require("@/assets/images/profile.png")} />
        <Nickname>Denilse Veloso</Nickname>
        <Links>Seja Premium ⭐</Links>
        <Links>Avaliar Filmes</Links>
      </Content>
    </Container>
  );
}
