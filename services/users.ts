import api, { getToken } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export interface User {
  id: string;
  name: string;
}

export const login = async (email: string, password: string) => {
  return await api.post("/login", { email, password });
};

export const getAllUsers = async () => {
  return await api.get("/user");
};

export const getUserById = async (userId: string) => {
  return await api.get(`/user/${userId}`);
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

export const getUserFromToken = async () => {
  try {
    const token = await getToken();

    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      if (decodedToken && decodedToken.id) {
        const response = await getUserById(decodedToken.id);
        return response.data.users;
      }
    }
    return null;
  } catch (error) {
    console.error("Erro ao decodificar o token ou obter o usu�rio:", error);
    throw new Error("Falha ao obter usu�rio");
  }
};
