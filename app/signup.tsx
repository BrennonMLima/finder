import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { createUser, login } from "../services/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (!username || !email || !password) {
      setError("Todos os campos são obrigatórios.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
  
    try {
      const registerResponse = await createUser(email, username, password);
  
      if (registerResponse.status === 201) {
        const loginResponse = await login(email, password);
  
        if (loginResponse.status === 200) {
          const { token } = loginResponse.data;
  
          await AsyncStorage.setItem("auth-token", token);
  
          Alert.alert("Sucesso", "Usuário criado e logado com sucesso!");
          router.push({
            pathname: "/profileimage",
            params: { token },
          });
        } else {
          setError("Não foi possível realizar o login.");
        }
      } else {
        setError("Não foi possível criar o usuário.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao criar o usuário ou realizar o login.");
      console.error(error);
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <Text style={styles.subtitle}>Seja bem-vindo(a) ao Finder!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Criar</Text>
        </Pressable>

        <Pressable>
          <Link href={"./login"}>
          <Text style={{ color: '#fff' }}>
            Já tem uma conta?{" "}
            <Text style={styles.link}>Faça Login!</Text>
          </Text>
          </Link>
        </Pressable>
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
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
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

export default RegisterScreen;
