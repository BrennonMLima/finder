import React, { useState } from "react";
import { Modal, View, Text, Pressable, Image, ScrollView } from "react-native";
import { FilmRankingResponse } from "@/app/filmranking/[groupId]";
import {
  Overlay,
  ModalWrapper,
} from "@/assets/styles/modal.styles";
import { StyledButton, ButtonLabel } from "@/assets/styles/global.styles";
import Checkbox from "expo-checkbox";


interface ConfirmationWatchedProps {
  visible: boolean;
  film: FilmRankingResponse | null;
  onClose: () => void;
  onConfirm: (filmId: string, watched: boolean) => Promise<void>; // Adicionando 'watched'
}

const ConfirmationWatched: React.FC<ConfirmationWatchedProps> = ({
  visible,
  film,
  onClose,
  onConfirm,
}) => {
  const [isWatched, setIsWatched] = useState(false); // Estado do checkbox

  const handleConfirm = async () => {
    if (film) {
      try {
        await onConfirm(film.id, isWatched); // Passa 'isWatched' para onConfirm
        onClose();
      } catch (error) {
        console.error("Erro ao confirmar:", error);
        // Trate o erro como preferir (ex: exibir mensagem no modal)
      }
    }
  };

  const posterUrl = film?.posterPath ? { uri: film.posterPath } : require("@/assets/images/favicon.png");

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
        <Overlay onPress={onClose}>
            <ModalWrapper onPress={(e) => e.stopPropagation()}>
                <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}> 
                    <Image source={posterUrl} style={{ width: 200, height: 300, borderRadius: 10, marginBottom: 20 }} />
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 10, textAlign: "center" }}>
                        {film?.title}
                    </Text>
                    <Text numberOfLines={5} style={{ color: "#fff", marginBottom: 20, textAlign: "justify" }}>
                        {film?.description ? film.description : "Sem descrição."}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                        <Checkbox
                            style={{ marginRight: 8 }} // Adiciona margem
                            value={isWatched}
                            onValueChange={setIsWatched}
                            color={isWatched ? "#007bff" : undefined}
                        />
                        <Text style={{ color: "#fff" }}>Marcar como assistido</Text>
                    </View>
                    {/* Botões centralizados com largura fixa */}
                    <View style={{ flexDirection: "row", justifyContent:"space-around", width: "100%", paddingHorizontal: 20, marginTop: 20, marginBottom: 20}}>
                        <StyledButton onPress={onClose} secondColor style={{width: 100}}>
                            <ButtonLabel secondColor>Sair</ButtonLabel>
                        </StyledButton>

                        <StyledButton onPress={handleConfirm} style={{width: 100}}>
                            <ButtonLabel>Confirmar</ButtonLabel>
                        </StyledButton>
                    </View>
                </ScrollView>
            </ModalWrapper>
        </Overlay>
    </Modal>
  );
};

export default ConfirmationWatched;