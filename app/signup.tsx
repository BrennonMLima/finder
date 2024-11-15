import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { createUser, getUserByEmail } from "../services/users"; // Importando o serviço

interface RegisterProps {
  onRegister?: (username: string, email: string, password: string) => void;
}

const RegisterScreen: React.FC<RegisterProps> = ({ onRegister }) => {
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
      setError("Por favor, insira um email válido.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await createUser(email, username, password);
      if (response.status === 201) {
        Alert.alert("Sucesso", "Usuário criado com sucesso!");
        router.replace("/login");
      } else {
        setError("Não foi possível criar o usuário.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao criar o usuário.");
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
            <Text style={styles.link}>
              Já tem uma conta? Clique aqui e faça Login
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
    backgroundColor: "#0496ff",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "#FFF",
    marginTop: 20,
    textDecorationLine: "none",
  },
});

export default RegisterScreen;
