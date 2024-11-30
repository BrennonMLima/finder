import React, { useState } from "react";
import { ScrollView, Alert, Text, StyleSheet, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ButtonContainer, ImageContainer, ProfileImage, profileImages } from "@/assets/styles/profileImage";
import { Container, Title } from "@/assets/styles/global.styles";
import { updateProfileImage } from "@/services/users";

const ProfileImageScreen = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const router = useRouter();

  const handleSelectImage = (id: number) => {
    setSelectedImage(id);
  };

  const handleContinue = async () => {
    if (selectedImage === null) {
      Alert.alert("Seleção Obrigatória", "Por favor, escolha uma foto de perfil ou pule.");
      return;
    }
    try {
      await updateProfileImage(selectedImage);
      Alert.alert("Sucesso", "Usuário criado com sucesso!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível atualizar a foto de perfil. Tente novamente.");
    }
  };
  
  const handleSkip = () => {
    Alert.alert("Aviso", "Você usará a foto padrão.");
    router.replace("/login");
  };

  const groupedImages = profileImages.reduce((acc, image) => {
    if (!acc[image.genre]) {
      acc[image.genre] = [];
    }
    acc[image.genre].push(image);
    return acc;
  }, {} as Record<string, typeof profileImages>);

  return (
    <Container>
      <Title>Escolha sua Foto</Title>
      <ScrollView>
        {Object.entries(groupedImages).map(([genre, images]) => (
          <View key={genre}>
            <Text style={styles.genreTitle}>{genre}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images.map((image) => (
                <ImageContainer
                  key={image.id}
                  onPress={() => handleSelectImage(image.id)}
                  isSelected={selectedImage === image.id}
                >
                  <ProfileImage source={image.source} />
                </ImageContainer>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      <ButtonContainer>
        <Pressable style={[styles.button, { backgroundColor: "#6c757d" }]} onPress={handleSkip}>
          <Text style={styles.buttonText}>Pular</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar</Text>
        </Pressable>
      </ButtonContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  genreTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileImageScreen;
