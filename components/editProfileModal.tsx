import React, { useState, useEffect } from "react";
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
import { getUserById2, changePassword } from "@/services/users";
import { profileImages } from "@/assets/styles/profileImage";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const editProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [showInputs, setShowInputs] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
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

  const handleChangePassword = async () => {
    try{
      await changePassword(currentPassword, confirmPassword);
      Alert.alert("Sucesso", "Senha alterada com sucesso");
      console.log("Senha alterada com sucesso")
    }catch(error){
      Alert.alert("Erro", "Erro ao alterar a senha");
      console.error(error);
    }
  }

  const handlePasswordChange = () => {
    setShowInputs(true);
  };

  const handleCancel = () => {
    setShowInputs(false);
    onClose();
  }

  useEffect(() => {
    fetchUser();
  }, []);
  
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
          <EditProfile>
            <Pressable>
                <ImageContainer>
                  {profileImage ? (
                    <EditableImage source={profileImage}/>
                  ) : (
                    <EditableImage source={require("@/assets/images/pantera.jpg")}/>
                  )}
                    <EditIconContainer>
                        <Feather name="edit" size={40} color="#fff"/>
                    </EditIconContainer>
                </ImageContainer>
            </Pressable>
          {user ? (
            <StyledInput
              placeholder={user.name}
            />
          ) : (
            <StyledInput
            placeholder="Carregando..."
            /> 
          )}
        </EditProfile>

        {!showInputs ? (
          <ButtonPassword onPress={handlePasswordChange}>
            <ButtonTextPassword>Alterar Senha</ButtonTextPassword>
          </ButtonPassword>
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
          </>
        )}

          <StyledButton>
            <ButtonLabel onPress={handleChangePassword}>Editar</ButtonLabel>
          </StyledButton>
          <StyledButton onPress={handleCancel} secondColor>
            <ButtonLabel secondColor>Cancelar</ButtonLabel>
          </StyledButton>
        </EditModalWrapper>
      </Overlay>
    </Modal>
  );
};

export default editProfileModal;

