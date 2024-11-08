import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { login } from "../services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "@/services/api";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleUsernameChange = (text: string) => setUsername(text);
  // const handlePasswordChange = (text: string) => setPassword(text);

  useEffect(() =>{
    const checkToken = async () => {
      const token = await getToken();
      if(token){
        router.replace("/(tabs)")
      }
    };

    checkToken();
  }, []);

  const validateForm = () => {
    if (!email || !password) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }
    setError("");
    return true;
  };
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await login(email, password);
      if (response.status === 200) {
        const { token } = response.data;
        await AsyncStorage.setItem("auth-token", token);
        router.replace("/(tabs)");
      } else {
        setError("Não foi possível efetuar o login");
      }
    } catch (error) {
      setError("Ocorreu um erro ao logar");
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Olá, bem-vindo(a) de volta!</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href={"./signup"}>
            <Text style={styles.link}>Não tem uma conta? Cadastre-se!</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 30,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#007bff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
