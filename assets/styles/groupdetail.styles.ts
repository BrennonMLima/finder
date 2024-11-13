import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

const EventDate = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const LocalEvent = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

const EventHeader = styled.View`
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const EventInfo = styled.View`
  background-color: #37393b;
  border: 2px solid #007bff;
  margin: 15px 0;
  padding: 5px 20px;
  border-radius: 20px;
`;

const RankingBtn = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;

const Members = styled.View`
  margin-top: 55px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: end;
`;

const NewEventButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 10px 5px;
  border-radius: 8px;
  display: flex;
  align-self: flex-end;
  width: 50%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
const Texto = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #ddd;
`;

export {
  EventDate,
  LocalEvent,
  EventHeader,
  EventInfo,
  RankingBtn,
  Members,
  Footer,
  StyledButton,
  NewEventButton,
  ButtonText,
  Texto,
};