import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getGroupById, getUsersInGroup, deleteGroup } from "@/services/groups";
import { FontAwesome } from "@expo/vector-icons";
import {
  ButtonText,
  EventDate,
  EventHeader,
  EventInfo,
  Footer,
  LocalEvent,
  Members,
  NewEventButton,
  RankingBtn,
  StyledButton,
  Texto,
} from "@/assets/styles/groupdetail.styles";
import CreateEventModal from "../createEventModal";
import { createEvent } from "@/services/events";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
        setError("ID do grupo n�o fornecido.");
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

  const handleCreateEvent = async (
    name: string,
    location: string,
    date: string,
    description: string
  ) => {
    if (id) {
      try {
        await createEvent(name, location, date, description, id as string);
        Alert.alert("Evento Criado", "O evento foi criado com sucesso.");
      } catch (error) {
        setError("Erro ao criar evento.");
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
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#262626",
        flex: 1,
      }}
    >
      <EventHeader>
        <Texto style={{ fontSize: 24, fontWeight: "bold" }}>{groupName}</Texto>
        <Texto>{groupDescription}</Texto>
      </EventHeader>

      <RankingBtn>
        <NewEventButton onPress={() => setModalVisible(true)}>
          <ButtonText>+ Novo Evento</ButtonText>
        </NewEventButton>
      </RankingBtn>

      <EventInfo>
        <EventDate>
          <Texto>Pr�ximo evento:</Texto>
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

      <CreateEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateEvent}
      />
    </ScrollView>
  );
}
