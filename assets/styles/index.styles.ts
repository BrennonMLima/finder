import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

export const Banner = styled.Image`
  width: 90%;
  height: 50%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #ddd;
  text-align: center;
  margin-bottom: 30px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
`;
