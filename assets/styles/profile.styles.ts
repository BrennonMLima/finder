import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Ionicons from '@expo/vector-icons/Ionicons';

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
  margin-top: 30px;
  z-index: 0;
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
  font-size: 18px;
  text-align: center;
`;
