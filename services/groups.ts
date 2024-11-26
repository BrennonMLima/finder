import api from "./api";
import unorm from "unorm";
export interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  userCount: number;
  nextEventDate: Date;
}

export const genresList = [
  { name: "acao", id: 28 },
  { name: "aventura", id: 12 },
  { name: "comedia", id: 35 },
  { name: "animacao", id: 16 },
  { name: "crime", id: 80 },
  { name: "documentario", id: 99 },
  { name: "drama", id: 18 },
  { name: "familia", id: 10751 },
  { name: "fantasia", id: 14 },
  { name: "historia", id: 36 },
  { name: "terror", id: 27 },
  { name: "musica", id: 10402 },
  { name: "misterio", id: 9648 },
  { name: "romance", id: 10749 },
  { name: "ficção cientifica", id: 878 },
  { name: "cinema tv", id: 10770 },
  { name: "thriller", id: 53 },
  { name: "guerra", id: 10752 },
  { name: "faroeste", id: 37 },
];


export const getAllGroups = async () => {
  return await api.get("/group");
};

export const getGroupById = async (groupId: string) => {
  try {
    const response = await api.get(`/group/${groupId}`);
    return response.data.groups;
  } catch (error) {
    console.error(`Erro ao obter grupo com ID ${groupId}:`, error);
    throw new Error(`Erro ao obter grupo com ID ${groupId}`);
  }
};

export const createGroup = async (
  name: string,
  description: string,
  genreIds: number[]
) => {
  try {
    const response = await api.post("/group", {
      name,
      description,
      genreIds,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    throw error;
  }
};

export const deleteGroup = async (groupId: string) => {
  try {
    await api.delete(`/group/${groupId}/leave`);
  } catch (error) {
    console.error(`Erro ao deletar grupo com ID ${groupId}:`, error);
    throw error;
  }
};

export const getUsersInGroup = async (groupId: string) => {
  return await api.get(`/group/${groupId}/users`);
};

export const getGenresInGroup = async (groupId: string) => {
  const response = await api.get(`/group/${groupId}/genres`);
  return response.data;
};


export const updateGroup = async (groupId: string, groupData: { name: string; description: string; genreIds: number[] }) => {
    const response = await api.put(`/group/${groupId}/`, groupData);
    return response.data;
};

export interface GenreResponse {
  id: number;
  name: string;
}

interface GroupGenresResponse {
  genres: GenreResponse[];
}

export const getGroupGenres = async (groupId: string): Promise<GroupGenresResponse> => {
  try {
    const response = await api.get(`/group/${groupId}/genres`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar gêneros do grupo ${groupId}:`, error);
    throw error;
  }
};

interface FilmRankingResponse{
  id: string,
  title: string,
  description: string,
  votes: number;
  genres: GenreResponse[]
}

export const generateFilmRanking = async (groupId: string): Promise<FilmRankingResponse[]> => {
  try{
    const response = await api.get(`/group/${groupId}/ranking`);
    return response.data.ranking;
  } catch(error) {
    console.error(`Erro ao gerar ranking de filmes para o groupo ${groupId}`);
    throw error;
  }
}

export const generateInviteCode = async (groupId: string) => {
  try{
    const response = await api.post(`/group/${groupId}/invite`);
    return response.data.inviteCode;
  } catch(error) {
    console.error(`Erro ao gerar um código de convite para o grupo: ${groupId}`);
    throw error;
  }
}

export const addUserWithInviteCode = async (groupId: string, inviteCode:string): Promise<void> => {
  try{
    const response = await api.post(`group/${groupId}/join`, {
      inviteCode
    });
    return response.data;
  }catch(error){
    console.error(`Erro ao entrar no grupo ${groupId} com o codigo ${inviteCode}`);
  }
}

export const getGroupIdByInviteCode = async (code: string): Promise<string|null> => {
  try{
    const response = await api.get(`group/groupId/${code}`);
    return response.data.groupId;
  } catch (error){
    console.error("Erro ao recuperar o id do grupo");
    throw error;
  }
}
