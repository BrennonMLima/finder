import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #262626;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const Content = styled.View`
  align-items: center;
  width: 100%;
`;

export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 20px;
`;

export const Nickname = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 50px;
`;

export const Links = styled.Text`
  font-size: 18px;
  color: #ddd;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 150px;
  height: 45px;
  border-radius: 15px;
  background-color: #e32b2b;
  align-items: center;
  justify-content: center;
`;

export const LogoutButtonText = styled.Text`
  color: #262626;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
`;

export const Modal = styled.View`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: white;
  padding: 20px;
  width: 300px;
  border-radius: 10px;
`;

export const ModalButton = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

export const ModalButtonText = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;
