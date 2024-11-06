import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styled from "styled-components/native";
import { getGroupById, getUsersInGroup, deleteGroup } from "@/services/groups";
import { FontAwesome } from "@expo/vector-icons";
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

export const NewEventButton = styled.TouchableOpacity`
  background-color: #0496ff;
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

export const Texto = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #ddd;
`;

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState<string>('');
  const [groupDescription, setGroupDescription] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (id) {
        try {
          const group = await getGroupById(id as string);
          setGroupName(group.name);
          setGroupDescription(group.description);

          const membersResponse = await getUsersInGroup(id as string);
          setMembers(membersResponse.data);
        } catch (error) {
          setError("Erro ao carregar os detalhes do grupo.");
        }
      } else {
        setError("ID do grupo não fornecido.");
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleDeleteGroup = async () => {
    if (id) {
      try {
        await deleteGroup(id as string);
        Alert.alert("Grupo deletado", "O grupo foi deletado com sucesso.");
      } catch (error) {
        setError("Erro ao deletar o grupo.");
      }
    }
  };

  if (error) {
    return <Texto>{error}</Texto>;
  }

  if (!id) {
    return <Texto>Carregando...</Texto>;
  }

  return (

    <ScrollView contentContainerStyle={{ padding: 20,backgroundColor: "#262626", flex: 1 }}>
      <EventHeader>
        <Texto style={{ fontSize: 24, fontWeight: 'bold' }}>{groupName}</Texto>
        <Texto>{groupDescription}</Texto>
      </EventHeader>

      <RankingBtn>
        <NewEventButton>
          <ButtonText>+ Novo Evento</ButtonText>
        </NewEventButton>
      </RankingBtn>

      <EventInfo>
        <EventDate>
          <Texto>Próximo evento:</Texto>
          <Texto>xx/xx/xx</Texto>
          <Texto>19:30</Texto>
        </EventDate>
        <LocalEvent>
          <Texto style={{ fontSize: 18 }}>Local: Fatec Sorocaba</Texto>
        </LocalEvent>
      </EventInfo>

      <RankingBtn>
        <StyledButton>
          <ButtonText>Ver Ranking de Filmes</ButtonText>
        </StyledButton>
      </RankingBtn>

      <Footer>
        <Members>
          <Texto style={{ fontSize: 18 }}>Membros: {members.length}</Texto>
          <Texto>+ Convidar via link</Texto>
          {members.map((member, index) => (
            <Texto key={index}>{member}</Texto>
          ))}
        </Members>

        <TouchableOpacity onPress={handleDeleteGroup}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </Footer>
    </ScrollView>
  );
}
