import api, { getToken } from "./api";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export interface User {
  id: string;
  name: string;
  profileImageId: number | null;
}

export const login = async (email: string, password: string) => {
  return await api.post("/login", { email, password });
};


export const getUserById = async (userId: string) => {
  return await api.get("/user");
};

export const getUserById2 = async () => {
  const response = await api.get("/user");
  return response.data.user;
};

export const getUserByEmail = async (userEmail: string) => {
  return await api.get(`/user/${userEmail}`);
};

export const getUserGroups = async () => {
  return await api.get(`/group`);
};

export const createUser = async (
  email: string,
  name: string,
  password: string
) => {
  return await api.post("/user", { email, name, password });
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  return await api.put(`/user/changePassword`, {
    currentPassword,
    newPassword
  });
}

export const updateProfileImage = async (profileImageId: number) => {
  return await api.put(`/user/profile-image`, { profileImageId });
};


export const getUserFromToken = async () => {
  try {
    const token = await getToken();

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken && decodedToken.id) {
        const response = await getUserById(decodedToken.id);
        console.log("tadesacanagem",response)
        return response.data.users;
      }
    }
    return null;
  } catch (error) {
    console.error("Erro ao decodificar o token ou obter o usuário:", error);
    throw new Error("Falha ao obter usuário");
  }
};
