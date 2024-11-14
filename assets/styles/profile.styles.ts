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

export const SettingsIconWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

export const MenuContainer = styled.View`
  position: absolute;
  top: 55px;
  right: 10px;
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  z-index: 10;
  /* Sombreamento para iOS */
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  /* Sombreamento para Android */
  elevation: 8;
`;

export const MenuItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px 10px;
`;

export const MenuItemText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: #555;
  width: 100%;
  margin: 8px 0;
`;