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
