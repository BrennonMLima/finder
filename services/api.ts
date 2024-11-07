import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("auth-token");
    return token
      ? `Bearer ${token}`
      : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdGUiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjQtMTEtMDdUMjI6MTQ6MTYuNTMyWiIsImlkIjoiMmVlOTNkMzAtMTg0MS00NDc2LTljNjAtMWFiZDc0MjZkMjQzIiwiaWF0IjoxNzMxMDE3Nzc1LCJleHAiOjE3MzEwMjg1NzV9.o6giPW-sb2N-HTw11jtLo7Jtd6w2pP3iFPczAibsAhY";
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
