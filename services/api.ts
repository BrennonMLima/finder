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
      : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJlbm5vbiIsImVtYWlsIjoiYnJlbm5vbkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTI2VDAwOjMxOjE2Ljg3MVoiLCJpZCI6IjM4MTQ2MzY2LTQzOTgtNDcxNS1iOTViLTE1MjkxMTU2NjM5YSIsImlhdCI6MTczMDkzMzc0MywiZXhwIjoxNzMwOTQ0NTQzfQ.swSlUYZYPxMj30lD-QPYbS4QEkKVwSEgeprK_39raf8";
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
