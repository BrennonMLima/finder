import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

const EventDate = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const EventLocation = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const GroupHeader = styled.View`
  align-items: center;
  text-align: center;
  gap: 10px;
  margin: 30px 0;
`;

const EventInfo = styled.View`
  background-color: #37393b;
  border: 2px solid #007bff;
  margin: 15px 0;
  padding: 5px 20px;
  border-radius: 20px;
`;

const EventName = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;

const EventDescription = styled.Text`
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: #ddd;
  margin-top: 5px;
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
  EventLocation,
  GroupHeader,
  EventInfo,
  EventName,
  EventDescription,
  RankingBtn,
  Members,
  Footer,
  NewEventButton,
  ButtonText,
  Texto,
};
