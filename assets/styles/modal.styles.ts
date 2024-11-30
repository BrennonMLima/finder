import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';

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

export const Tag = styled.Pressable`
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

export const TextInput = styled.TextInput`
  width: 95%;
  height: 50px;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding-horizontal: 10px;
  font-size: 30px;
  text-align: center;
  font-width: bold;
`

export const DataList = styled.FlatList`

`

export const EditProfile = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
`

export const EditableImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const EditModalWrapper = styled.Pressable`
  width: 95%;
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  position: relative;
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
  background-color: #000;
  border-radius: 60px;
  overflow: hidden;
`;

export const EditIconContainer = styled.Pressable`
  width: 100%;
  height: 100%;
  position: absolute; 
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.Text`
    color: #b2b2b2;
    font-size: 22px;
    font-weight: bold;
    margin-left: 5px;
`;

export const Copy = styled.Text`
  flex-direction: row;
  gap: 20px;
`;

export const StyledInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #eee;
  border-radius: 10px;
  padding: 0 12px;
  width: 100%;
`;



