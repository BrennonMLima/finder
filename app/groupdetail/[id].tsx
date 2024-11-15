import React, { useEffect, useState } from "react";
import { ScrollView, View, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getGroupById, getUsersInGroup, deleteGroup } from "@/services/groups";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  ButtonText,
  EventDate,
  EventDescription,
  EventInfo,
  EventLocation,
  EventName,
  Footer,
  GroupHeader,
  Members,
  NewEventButton,
  RankingBtn,
  Texto,
} from "@/assets/styles/groupdetail.styles";
import CreateEventModal from "../../components/createEventModal";
import { createEvent, getEventsByGroup } from "@/services/events";
import { Event } from "@/services/events";
import {
  MenuContainer,
  MenuItem,
  MenuItemText,
  Separator,
  SettingsIcon,
  StyledButtonShort,
} from "@/assets/styles/global.styles";
import ConfirmationModal from "../../components/confirmationModal";
import EditGroupModal from "@/components/editGroupModal";

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
  const [leaveGroupConfirmVisible, setLeaveGroupConfirmVisible] =
    useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (id) {
        try {
          const group = await getGroupById(id as string);
          setGroupName(group.name);
          setGroupDescription(group.description);

          const membersResponse = await getUsersInGroup(id as string);
          setMembers(membersResponse.data);

          const recentEvent = await getEventsByGroup(group.id);
          if (recentEvent) {
            setEvent(recentEvent);
          }
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
        Alert.alert("Evento Criado", "O evento foi criado com sucesso.");
      } catch (error) {
        setError("Erro ao criar evento.");
      }
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>

        <SettingsIcon onPress={toggleMenu}>
          <Ionicons name="ellipsis-vertical" size={28} color="#fff" />
        </SettingsIcon>
      </View>

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
            <EventName>{event.name}</EventName>
            <EventDescription>{event.description}</EventDescription>

            <EventLocation>
              <Feather name="map-pin" size={16} color="#fff" />
              <Texto>{event.location}</Texto>
            </EventLocation>

            <EventDate>
              <Feather name="calendar" size={16} color="#fff" />
              <Texto>{new Date(event.date).toLocaleDateString()}</Texto>
            </EventDate>
          </View>
        ) : (
          <Texto>Nenhum evento disponível</Texto>
        )}
      </EventInfo>

      <RankingBtn>
        <StyledButtonShort>
          <ButtonText>Ver Ranking de Filmes</ButtonText>
        </StyledButtonShort>
      </RankingBtn>

      <Footer>
        <Members>
          <Texto style={{ fontSize: 18 }}>Membros: {members.length}</Texto>
          <Texto>+ Convidar via link</Texto>
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
      initialGenres={[]}
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
    </ScrollView>
  );
}
