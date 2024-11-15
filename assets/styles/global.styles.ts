import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

interface StyledButtonProps {
  secondColor?: boolean;
}

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #262626;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

export const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.secondColor ? "#555" : "#007bff")};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  z-index: -1;
`;

export const StyledButtonShort = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: end;
`;

export const ButtonLabel = styled.Text<StyledButtonProps>`
  font-size: 18px;
  color: ${(props) => (props.secondColor ? "#bbb" : "#fff")};
  font-weight: bold;
`;

export const SettingsIconWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

export const SettingsIcon = styled.TouchableOpacity`
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
