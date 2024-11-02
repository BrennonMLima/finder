import React, { useState } from "react";
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
import { useRouter } from "expo-router";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const LoginScreen: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleUsernameChange = (text: string) => setUsername(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const handleLogin = () => {
    router.replace("/(tabs)");
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Olá, bem-vindo(a) de volta!</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Não tem uma conta? Cadastre-se!</Text>
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
    backgroundColor: "#0496ff",
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
    color: "#0496ff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
