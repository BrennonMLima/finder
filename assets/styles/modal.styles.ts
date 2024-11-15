import styled from "styled-components/native";

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.Pressable`
  width: 90%;
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 15px;
  padding-horizontal: 10px;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 15px;
  z-index: -1;
`;

export const Tag = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 8px 12px;
  border-radius: 20px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const TagText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

export const DataList = styled.FlatList`

`