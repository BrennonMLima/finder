import React, { useEffect, useState } from "react";
import {
  Content,
  ProfileImage,
  Nickname,
  Links,
  Container,
  LogoutButton,
  LogoutButtonText,
} from "@/assets/styles/profile.styles";
import { getUserFromToken, User } from "@/services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserFromToken();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      setError("Falha ao recuperar dados do usuÃ¡rio");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Armazenamento limpo");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <Container>
      <Content>
        <ProfileImage source={require("@/assets/images/profile.png")} />
        {user ? (
          <Nickname>{user.name}</Nickname>
        ) : (
          <Nickname>Carregando...</Nickname>
        )}
        <Links>Seja Premium ⭐</Links>
        <Links>Avaliar Filmes</Links>
      </Content>
      <LogoutButton onPress={handleLogout}>
        <LogoutButtonText>Sair</LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}
