import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Header = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const HeaderText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: #fff;
  font-weight: bold;
  text-align: start;
`;

export const NewGroupButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 5px;
  border-radius: 8px;
  display: flex;
  align-self: flex-end;
  width: 50%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: ${RFValue(12)}px;
  font-weight: bold;
`;

export const GroupContainer = styled.View`
  background-color: #333;
  padding: 20px 15px;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const GroupTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const GroupDetails = styled.Text`
  font-size: ${RFValue(14)}px;
  color: #ccc;
`;
