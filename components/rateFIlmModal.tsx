import React, { useState } from "react";
import { Modal, View, Text, Pressable, Image, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StyledButton, ButtonLabel } from "@/assets/styles/global.styles";
import { Overlay, ModalWrapper } from "@/assets/styles/modal.styles";

interface RateFilmProps {
  visible: boolean;
  film: {
    id: string;
    title: string;
    description: string;
    posterPath?: string;
  } | null;
  onClose: () => void;
  onConfirm: (filmId: string, rating: number) => Promise<void>;
}

const RateFilmModal: React.FC<RateFilmProps> = ({ visible, film, onClose, onConfirm }) => {
  const [rating, setRating] = useState<number>(0);

  const handleConfirm = async () => {
    if (film) {
      try {
        await onConfirm(film.id, rating);
      } catch (error) {
        console.error("Erro ao confirmar avaliação:", error);
      }
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <Pressable
          key={index}
          onPress={() => setRating(starValue)}
          style={{ marginHorizontal: 5 }}
        >
          <MaterialIcons
            name={rating >= starValue ? "star" : "star-border"}
            size={30}
            color={rating >= starValue ? "#FFD700" : "#888"}
          />
        </Pressable>
      );
    });
  };

  const posterUrl = film?.posterPath ? { uri: film.posterPath } : require("@/assets/images/favicon.png");

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <Overlay onPress={onClose}>
        <ModalWrapper onPress={(e) => e.stopPropagation()}>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Image
              source={posterUrl}
              style={{ width: 200, height: 300, borderRadius: 10, marginBottom: 20 }}
            />
            <Text style={styles.title}>{film?.title}</Text>
            <Text numberOfLines={5} style={styles.description}>
              {film?.description ? film.description : "Sem descrição."}
            </Text>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <View style={styles.buttonsContainer}>
              <StyledButton onPress={onClose} secondColor style={{ width: 100 }}>
                <ButtonLabel secondColor>Cancelar</ButtonLabel>
              </StyledButton>
              <StyledButton onPress={handleConfirm} style={{ width: 100 }} disabled={rating === 0}>
                <ButtonLabel>Confirmar</ButtonLabel>
              </StyledButton>
            </View>
          </ScrollView>
        </ModalWrapper>
      </Overlay>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "justify",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default RateFilmModal;
