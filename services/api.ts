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
      : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUnVhbiIsImVtYWlsIjoicnVhbkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTE5VDExOjU0OjQ1LjEwN1oiLCJpZCI6ImIxZmUxZTY4LTc3Y2EtNDIwZS1iYzZkLTZlY2NlMjcyNTQ3OCIsImlhdCI6MTczMDg0NjI5MiwiZXhwIjoxNzMwODU3MDkyfQ.2XAxsSdMKDMstSW8fQNaL_q12toqE1EoTfLbQ3q_QlE";
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
