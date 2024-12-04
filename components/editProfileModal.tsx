import React, { useCallback, useEffect, useState } from "react";
import { Modal, Alert, FlatList, Pressable, Text, View } from "react-native";
import {
  Overlay,
  ModalWrapper,
  StyledInput,
  Tag,
  TagText,
  TagContainer,
  EditProfile,
  EditableImage,
  EditModalWrapper,
  ImageContainer,
  EditIconContainer,
  ButtonPassword,
  ButtonTextPassword
} from "@/assets/styles/modal.styles";
import {
  Title,
  StyledButton,
  ButtonLabel,
} from "@/assets/styles/global.styles";
import { createGroup,generateInviteCode,genresList } from "@/services/groups";
import { Feather } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { getUserById2, changePassword, updateUser } from "@/services/users";
import { profileImages } from "@/assets/styles/profileImage";
import {  useFocusEffect, useRouter } from "expo-router";
interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onEditUser: () => void;
}

interface User {
  id: string;
  name: string;
  email?: string;
  profileImageId?: string; // Opcional
}

const editProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  onEditUser
}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null)
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  
  const fetchUser = async () => {
    try{
      const userData = await getUserById2();
      console.log(userData);
      if(userData){
        setUser(userData);
        const image = profileImages.find(
          (img) => img.id === userData.profileImageId
        );
        setProfileImage(image ? image.source : null);
        console.log("imagem",profileImage)
      }
    }catch(error){
      setError("Falha ao recuperar dados do usuário");
      console.error(error);
    }
  }

  const handleChangeName = async () => {
    if(user?.name === username){
      setError("Seu nome continua o mesmo");
      return false
    }
    try{
      await updateUser(username);

      Alert.alert("Sucesso", "Nome alterado com sucesso");

      await fetchUser();
      clearInput();
      onEditUser();
      onClose();
    }catch(error){
      console.log(error);
    }
  }

  const handleEditImage = () => {
    router.push({
      pathname: "/profileimage",
      params: { mode: "edit" },
    });
    onClose();
  }

  const handleChangePassword = async () => {
    if(!comparePassword()) return;
    try{
        await changePassword(currentPassword, confirmPassword);
        Alert.alert("Sucesso", "Senha alterada com sucesso");
        console.log("Senha alterada com sucesso")
        handleCancel()
    }catch(error: any){
      if (error.response?.status === 400 && error.response?.data?.message === "Senha atual incorreta") {
        Alert.alert("Erro", "Senha atual incorreta");
        console.error("Senha atual incorreta");
      } else {
        Alert.alert("Erro", "Erro ao alterar a senha");
        console.error(error);
      }
    }
  }

  const comparePassword = () => {
    if(newPassword !== confirmPassword){
      setError("As senhas não são iguais");
      console.log("As senhas não são iguais");
      return false;
    }
    setError("");
    return true;
  }

  const handlePasswordChange = () => {
    setShowInputs(true);
  };

  const handleCancel = () => {
    setShowInputs(false);
    onClose();
    clearInput();
  }

  const clearInput = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    if (user?.name) {
      setUsername(user.name);
    }
    setError("");
    }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Overlay onPress={handleCancel}>
        <EditModalWrapper onPress={() => {}}>
          <Title>Editar Perfil</Title>


        {!showInputs ? (
          <>
                    <EditProfile>
            <Pressable>
                <ImageContainer>
                  {profileImage ? (
                    <EditableImage source={profileImage}/>
                  ) : (
                    <EditableImage source={require("@/assets/images/pantera.jpg")}/>
                  )}
                    <EditIconContainer onPress={handleEditImage}>
                        <Feather name="edit" size={40} color="#fff"/>
                    </EditIconContainer>
                </ImageContainer>
            </Pressable>
          {user ? (
            <StyledInput
              value={username}
              onChangeText={setUsername}
              editable={!showInputs}
            />
          ) : (
            <StyledInput
            placeholder="Carregando..."
            /> 
          )}
        </EditProfile>
            <ButtonPassword onPress={handlePasswordChange}>
              <ButtonTextPassword>Alterar Senha</ButtonTextPassword>
            </ButtonPassword>

            {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

            <StyledButton>
              <ButtonLabel onPress={handleChangeName}>Editar</ButtonLabel>
            </StyledButton>
            <StyledButton onPress={handleCancel} secondColor>
              <ButtonLabel secondColor>Cancelar</ButtonLabel>
            </StyledButton>
          </>
        ) : (
          <>
            <StyledInput
            placeholder="Senha atual"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            />
            <StyledInput
              placeholder="Nova senha"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <StyledInput
              placeholder="Confirmar nova senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
                        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
           <StyledButton>
              <ButtonLabel onPress={handleChangePassword}>Alterar Senha</ButtonLabel>
            </StyledButton>
            <StyledButton onPress={handleCancel} secondColor>
              <ButtonLabel secondColor>Cancelar</ButtonLabel>
            </StyledButton>
          </>
        )}
        </EditModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default editProfileModal;

