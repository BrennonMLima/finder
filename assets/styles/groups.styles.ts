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

export const NewGroupButton = styled.Pressable`
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

export const GroupDetails = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  font-size: ${RFValue(14)}px;
  color: #ccc;
`;

export const DateContainer = styled.View`
  display: flex;
  gap: 0;
`

export const EnterGroupButton = styled.Pressable`
  background-color: #262626;
  padding: 10px 5px;
  border-radius: 8px;
  display: flex;
  align-self: flex-start;
  width: 40%;
  border-width: 1px;
  borderColor: #007bff;
`;

export const ButtonTextEnter = styled.Text`
  color: #fff;
  text-align: center;
  font-size: ${RFValue(10)}px;
`;

export const HeaderGroup = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between; 
  align-items: center; 
  margin-top: 25px;
`;
