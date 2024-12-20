import React, { useEffect, useState } from "react";
import { ScrollView, View, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getGroupById, getUsersInGroup, deleteGroup, GenreResponse, getGenresInGroup} from "@/services/groups";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  ButtonText,
  EventDate,
  EventDescription,
  EventHeader,
  EventInfo,
  EventLocation,
  EventName,
  Footer,
  GroupHeader,
  InviteContainer,
  Members,
  NewEventButton,
  RankingBtn,
  Texto,
} from "@/assets/styles/groupdetail.styles";
import CreateEventModal from "../../components/createEventModal";
import { createEvent, getEventsByGroup, updateEvent } from "@/services/events";
import { Event } from "@/services/events";
import {
  MenuContainer,
  MenuItem,
  MenuItemText,
  Separator,
  StyledButtonShort,
} from "@/assets/styles/global.styles";
import ConfirmationModal from "../../components/confirmationModal";
import EditGroupModal from "@/components/editGroupModal";
import EditEventModal from "@/components/editEventModal";
import GenerateCodeModal from "@/components/generateCodeModal";
import Header from "@/components/header";

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [groupName, setGroupName] = useState<string>("");
  const [groupDescription, setGroupDescription] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [generateCodeVisible, setGenerateCodeVisible] = useState(false);
  const [leaveGroupConfirmVisible, setLeaveGroupConfirmVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editEventModalVisible, setEditEventModalVisible] = useState<boolean>(false);
  const [groupGenres, setGroupGenres] = useState<GenreResponse[]>([]);
  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (id) {
        try {
          const group = await getGroupById(id as string);
          setGroupName(group.name);
          setGroupDescription(group.description);

          const membersResponse = await getUsersInGroup(id as string);
          setMembers(membersResponse.data);

          const Event = await getEventsByGroup(group.id);
          if (Event) {
            setEvent(Event);
          }

          const genresResponse = await getGenresInGroup(id as string);
          setGroupGenres(genresResponse.genres || []);  

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
        router.back();
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
        const Event = await getEventsByGroup(id as string);
        if (Event) {
          setEvent(Event);
        }
      } catch (error) {
        setError("Erro ao criar evento.");
      }
    }
  };
  
  const handleGroupUpdate = (updatedGroup: {
    name: string;
    description: string;
    genres: { id: number; name: string }[];
  }) => {
    setGroupName(updatedGroup.name);
    setGroupDescription(updatedGroup.description);
    setGroupGenres(updatedGroup.genres);
  };

  
  const handleEditEvent = async (
    eventId: string,
    name: string,
    location: string,
    date: string,
    description: string
  ) => {
    try {
      await updateEvent(eventId, { name, location, date, description });
  
      const Event = await getEventsByGroup(id as string);
      if (Event) {
        setEvent(Event);
      }
    } catch {
      Alert.alert("Erro", "Erro ao atualizar evento.");
    }
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const confirmLeaveGroup = () => {
    setLeaveGroupConfirmVisible(true);
  };

  const cancelLeaveGroup = () => {
    setLeaveGroupConfirmVisible(false);
  };

  const handleRankingPress = () =>{
    const groupId = id as string;
    console.log(groupId)
    router.push(`/filmranking/${groupId}`);
  }

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
      <Header
        onBackPress={() => router.back()}
        onSettingsPress={toggleMenu}
      />

      {menuVisible && (
        <MenuContainer>
          <MenuItem onPress={() => setEditModalVisible(true)}>
            <Feather name="edit" size={20} color="#fff" />
            <MenuItemText>Editar Grupo</MenuItemText>
          </MenuItem>
          <Separator />
          <MenuItem onPress={confirmLeaveGroup}>
            <FontAwesome name="sign-out" size={20} color="#fff" />
            <MenuItemText>Sair do Grupo</MenuItemText>
          </MenuItem>
        </MenuContainer>
      )}
      <GroupHeader>
        <Texto style={{ fontSize: 24, fontWeight: "bold" }}>{groupName}</Texto>
        <Texto>{groupDescription}</Texto>
      </GroupHeader>

      <RankingBtn>
        <NewEventButton onPress={() => setModalVisible(true)}>
          <ButtonText>+ Novo Evento</ButtonText>
        </NewEventButton>
      </RankingBtn>

      <EventInfo>
        {event ? (
          <View>
            <EventHeader>
              <EventName></EventName>
              <EventName>{event.name}</EventName>
              <Pressable onPress={() => setEditEventModalVisible(true)}>
              <Feather name="edit-3" size={20} color="#fff" />
            </Pressable>
            </EventHeader>
              <EventDescription>{event.description}</EventDescription>
            <EventLocation>
              <Feather name="map-pin" size={16} color="#fff" />
              <Texto>{event.location}</Texto>
            </EventLocation>

            <EventDate>
              <Feather name="calendar" size={16} color="#fff" />
              <Texto>{new Date(event.date).toLocaleDateString("pt-BR")}</Texto>
            </EventDate>
          </View>
        ) : (
          <Texto>Nenhum evento disponível</Texto>
        )}
      </EventInfo>
      
        <RankingBtn>
          <StyledButtonShort onPress={()=> handleRankingPress()}>
            <ButtonText>Ver Ranking de Filmes</ButtonText>
          </StyledButtonShort>
        </RankingBtn>

      <Footer>
        <Members>
          <Texto style={{ fontSize: 18 }}>Membros: {members.length}</Texto>
          <InviteContainer onPress={() => setGenerateCodeVisible(true)} >
            <Feather name="link" size={16} color="#007bff" />
            <Texto>Convidar via código</Texto>
          </InviteContainer >
          {members.map((member, index) => (
            <Texto key={index}>{member}</Texto>
          ))}
        </Members>
      </Footer>

      {/* Modal para criar evento */}
      <CreateEventModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreateEvent}
      />

    <EditGroupModal
      visible={editModalVisible}
      onClose={() => setEditModalVisible(false)}
      groupId={id as string}
      initialName={groupName}
      initialDescription={groupDescription}
      initialGenres={groupGenres}
      onGroupUpdate={handleGroupUpdate}
    />

      {/* Modal de confirmação para sair do grupo */}
      <ConfirmationModal
        visible={leaveGroupConfirmVisible}
        onConfirm={handleDeleteGroup}
        onCancel={cancelLeaveGroup}
        title="Tem certeza de que deseja sair do grupo?"
        confirmText="Sair"
        cancelText="Cancelar"
      />

      <EditEventModal
          visible={editEventModalVisible}
          onClose={() => setEditEventModalVisible(false)}
          onEdit={handleEditEvent}
          eventId={event?.id || ""}
          initialName={event?.name || ""}
          initialLocation={event?.location || ""}
          initialDate={event?.date || ""}
          initialDescription={event?.description || ""}
      />

      <GenerateCodeModal
          visible={generateCodeVisible}
          onClose={() => setGenerateCodeVisible(false)}
          groupId={id as string}
      />

    </ScrollView>
  );
}
