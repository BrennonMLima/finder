import styled from "styled-components/native";

export interface ProfileImage {
    id: number;
    source: any;
    genre: string;
  }
  
  export const profileImages: ProfileImage[] = [
    { id: 0, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 2, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 3, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 4, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 5, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 6, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 7, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 8, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 9, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 10, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 11, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 12, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 13, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 14, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 15, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 16, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 17, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 18, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 19, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 20, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 21, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  
    { id: 22, source: require("@/assets/images/profile/profile1.jpg"), genre: "Comédia" },
    { id: 23, source: require("@/assets/images/profile/profile2.jpg"), genre: "Terror" },
    { id: 24, source: require("@/assets/images/profile/profile3.jpeg"), genre: "Animação" },
  ];
  

export const ImageContainer = styled.Pressable<{ isSelected: boolean }>`
  margin: 0 10px;
  border-width: 3px;
  max-width: 110px;
  max-height: 110px;
  border-color: ${({ isSelected }) => (isSelected ? "#0496ff" : "transparent")};
  border-radius: 50px;
`;

export const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

