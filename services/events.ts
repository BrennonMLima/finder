import api from "./api";

export const getEventById = async (eventId: string): Promise<Event> => {
  try {
    const response = await api.get(`/event/${eventId}`);
    return response.data.event;
  } catch (error) {
    console.error(`Erro ao obter evento com ID ${eventId}:`, error);
    throw new Error(`Erro ao obter evento com ID ${eventId}`);
  }
};

export const createEvent = async (
  name: string,
  location: string,
  date: string,
  description: string,
  groupId: string
) => {
  try {
    const response = await api.post("/event", {
      name,
      location,
      date,
      description,
      groupId,
    });
    return response.data.event;
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    throw new Error("Erro ao criar evento.");
  }
};

export const updateEvent = async (
  eventId: string,
  eventData: Partial<Event>
) => {
  try {
    const response = await api.put(`/event/${eventId}`, eventData);
    return response.data.event;
  } catch (error) {
    console.error(`Erro ao atualizar evento com ID ${eventId}:`, error);
    throw new Error(`Erro ao atualizar evento com ID ${eventId}`);
  }
};

export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    await api.delete(`/event/${eventId}`);
  } catch (error) {
    console.error(`Erro ao deletar evento com ID ${eventId}:`, error);
    throw new Error(`Erro ao deletar evento com ID ${eventId}`);
  }
};

export const getEventsByGroup = async (groupId: string): Promise<Event[]> => {
  try {
    const response = await api.get(`event/group/${groupId}`);
    return response.data.events;
  } catch (error) {
    console.error(
      `Erro ao consultar eventos do grupo com ID ${groupId}:`,
      error
    );
    throw new Error(`Erro ao consultar eventos do grupo com ID ${groupId}`);
  }
};
