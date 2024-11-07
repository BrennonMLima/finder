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
