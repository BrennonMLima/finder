import {
  Content,
  ProfileImage,
  Nickname,
  Links,
  Container,
  LogoutButton,
  LogoutButtonText
} from "@/assets/styles/profile.styles";
import { getUserById } from "@/services/users";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { Text } from "react-native";
import { useRouter, Link } from "expo-router";


interface User{
  id: string,
  name:string
}

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const token = await getToken();

      if (token) {
        const decodedToken = jwtDecode<{ id: string }>(token);

        if(decodedToken && decodedToken.id){
          const userId = decodedToken.id;
          const response = await getUserById(userId);
          console.log(response.data);
          setUser(response.data.users);
        }
      }
    } catch (error) {
      setError("Falha ao recuperar dados do usuário");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // const handleLogout = async () => {
  //   try{
  //     const token = await getToken();
  //     console.log("Token antse do logout: ", token);

  //     await AsyncStorage.removeItem("token");
  //     console.log("Token Removido");

  //     router.replace('/login');
  //   }catch(error){
  //     console.error("Erro ao fazer logout: ", error);
  //   }
  // }
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Limpa todo o AsyncStorage
      console.log("Armazenamento limpo"); // Confirmação de limpeza
  
      router.replace('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  return (
    <Container>
      <Content>
        <ProfileImage source={require("@/assets/images/profile.png")} />
          {user? (
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
