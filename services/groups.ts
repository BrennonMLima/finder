import api from "./api";
import unorm from "unorm";
export interface Group {
  id: string;
  name: string;
  description: string;
  genre: string;
  userCount: number;
}

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
  genre: string
) => {
  try {
    const response = await api.post("/group", {
      name,
      description,
      genre,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar grupo:", error);
    throw error;
  }
};

export const deleteGroup = async (groupId: string) => {
  try {
    await api.delete(`/group/${groupId}`);
  } catch (error) {
    console.error(`Erro ao deletar grupo com ID ${groupId}:`, error);
    throw error;
  }
};

export const getUsersInGroup = async (groupId: string) => {
  return await api.get(`/group/${groupId}/users`);
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
