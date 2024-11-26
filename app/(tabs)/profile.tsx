import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Container,
  Content,
  ProfileImage,
  Nickname,
  Links,
} from "@/assets/styles/profile.styles";
import { getUserFromToken, User } from "@/services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  StyledButton,
  ButtonLabel,
  MenuContainer,
  MenuItem,
  MenuItemText,
  Separator,
  SettingsIconWrapper,
} from "@/assets/styles/global.styles";
import ConfirmationModal from "../../components/confirmationModal";
import EditProfileModal from "@/components/editProfileModal";

export default function ProfileScreen() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const fetchUser = async () => {
    try {
      const userData = await getUserFromToken();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      setError("Falha ao recuperar dados do usuário");
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEditProfile = () => {
    setMenuVisible(false);
    setEditProfileVisible(true);
  };

  const confirmLogout = () => {
    setLogoutConfirmVisible(true);
  };

  const cancelLogout = () => {
    setLogoutConfirmVisible(false);
  };

  const navigateToRateFilms = () => {
    router.push("/ratefilms"); // Redireciona para a tela de avaliar filmes
  };

  return (
    <Container>
      <SettingsIconWrapper onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
      </SettingsIconWrapper>
      {menuVisible && (
        <MenuContainer>
          <MenuItem onPress={handleEditProfile}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={20}
              color="#fff"
            />
            <MenuItemText>Editar Perfil</MenuItemText>
          </MenuItem>
          <Separator />
          <MenuItem onPress={confirmLogout}>
            <Feather name="log-out" size={20} color="#fff" />
            <MenuItemText>Sair</MenuItemText>
          </MenuItem>
        </MenuContainer>
      )}
      <Content>
        <ProfileImage source={require("@/assets/images/pantera.jpg")} />
        {user ? (
          <Nickname>{user.name}</Nickname>
        ) : (
          <Nickname>Carregando...</Nickname>
        )}
        <Links>Seja Premium *</Links>
        <Links onPress={navigateToRateFilms}>Avaliar Filmes</Links>
      </Content>

      {/* Modal de confirmação de logout usando o componente reutilizável */}
      <ConfirmationModal
        visible={logoutConfirmVisible}
        onConfirm={handleLogout}
        onCancel={cancelLogout}
        title="Tem certeza de que deseja sair?"
        confirmText="Sair"
        cancelText="Cancelar"
      />

      <EditProfileModal
        visible={editProfileVisible}
        onClose={() => setEditProfileVisible(false)}
      />
    </Container>
  );
}
