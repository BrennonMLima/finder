import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.67.241:8000",
});

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("auth-token");
    return token ? `Bearer ${token}` : "";
  } catch (error) {
    console.error("Error retrieving token:", error);
    return "";
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
