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
  background-color: ${(props) => (props.secondColor ? "#555" : "#0496ff")};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const ButtonLabel = styled.Text<StyledButtonProps>`
  font-size: 18px;
  color: ${(props) => (props.secondColor ? "#bbb" : "#fff")};
  font-weight: bold;
`;
