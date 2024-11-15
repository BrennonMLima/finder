import api from "./api";
import unorm from "unorm";
export interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  userCount: number;
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

export const updateGroup = async (groupId: string, groupData: { name: string; description: string; genreId: number[] }) => {
    const response = await api.put(`/group/${groupId}/`, groupData);
    return response.data;
};

// Funções Adicionadas:
export const convertGenresToIds = (genresString: string): string => {
  const genres = genresString
    .toLowerCase()
    .split(",")
    .map((genre) => genre.trim())
    .filter((genre) => genre !== "");

  const genreMap: { [key: string]: number } = {
    acao: 28,
    aventura: 12,
    comedia: 35,
    animacao: 16,
    crime: 80,
    documentario: 99,
    drama: 18,
    familia: 10751,
    fantasia: 14,
    historia: 36,
    terror: 27,
    musica: 10402,
    misterio: 9648,
    romance: 10749,
    "ficção cientifica": 878,
    "cinema tv": 10770,
    thriller: 53,
    guerra: 10752,
    faroeste: 37,
  };

  const ids = [];

  for (const genre of genres) {
    const normalizedGenre = unorm
      .nfd(genre)
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(); // Normalização e lower case
    const id = genreMap[normalizedGenre];

    if (id !== undefined) {
      ids.push(String(id));
    } else {
      console.warn(`Gênero "${genre}" não encontrado no mapeamento.`);
      //  Opcional: Retornar uma string vazia se houver erros
    }
  }

  return ids.join(",");
};
