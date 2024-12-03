import styled from "styled-components/native";

export interface ProfileImage {
    id: number;
    source: any;
    genre: string;
  }
  
  export const profileImages: ProfileImage[] = [
    //Padrão
    { id: 0, source: require("@/assets/images/profile/0.jpeg"), genre: "Padrão" },
    // Gênero: Animação (ID 2 a 13)
    { id: 2, source: require("@/assets/images/profile/2.jpg"), genre: "Animação" },
    { id: 3, source: require("@/assets/images/profile/3.jpg"), genre: "Animação" },
    { id: 4, source: require("@/assets/images/profile/4.jpg"), genre: "Animação" },
    { id: 5, source: require("@/assets/images/profile/5.jpg"), genre: "Animação" },
    { id: 6, source: require("@/assets/images/profile/6.jpg"), genre: "Animação" },
    { id: 7, source: require("@/assets/images/profile/7.jpg"), genre: "Animação" },
    { id: 8, source: require("@/assets/images/profile/8.jpg"), genre: "Animação" },
    { id: 9, source: require("@/assets/images/profile/9.jpg"), genre: "Animação" },
    { id: 10, source: require("@/assets/images/profile/10.jpg"), genre: "Animação" },
    { id: 11, source: require("@/assets/images/profile/11.jpg"), genre: "Animação" },
    { id: 12, source: require("@/assets/images/profile/12.jpg"), genre: "Animação" },
    { id: 13, source: require("@/assets/images/profile/13.jpg"), genre: "Animação" },
  
    // Gênero: Comédia (ID 15 a 24)
    { id: 15, source: require("@/assets/images/profile/15.jpg"), genre: "Comédia" },
    { id: 16, source: require("@/assets/images/profile/16.jpg"), genre: "Comédia" },
    { id: 17, source: require("@/assets/images/profile/17.jpg"), genre: "Comédia" },
    { id: 18, source: require("@/assets/images/profile/18.jpg"), genre: "Comédia" },
    { id: 19, source: require("@/assets/images/profile/19.jpg"), genre: "Comédia" },
    { id: 20, source: require("@/assets/images/profile/20.jpg"), genre: "Comédia" },
    { id: 21, source: require("@/assets/images/profile/21.jpg"), genre: "Comédia" },
    { id: 22, source: require("@/assets/images/profile/22.jpg"), genre: "Comédia" },
    { id: 23, source: require("@/assets/images/profile/23.jpg"), genre: "Comédia" },
    { id: 24, source: require("@/assets/images/profile/24.jpg"), genre: "Comédia" },
  
    // Gênero: Terror (ID 26 a 33)
    { id: 26, source: require("@/assets/images/profile/26.jpg"), genre: "Terror" },
    { id: 27, source: require("@/assets/images/profile/27.jpg"), genre: "Terror" },
    { id: 28, source: require("@/assets/images/profile/28.jpg"), genre: "Terror" },
    { id: 29, source: require("@/assets/images/profile/29.jpg"), genre: "Terror" },
    { id: 30, source: require("@/assets/images/profile/30.jpg"), genre: "Terror" },
    { id: 31, source: require("@/assets/images/profile/31.jpg"), genre: "Terror" },
    { id: 32, source: require("@/assets/images/profile/32.jpg"), genre: "Terror" },
    { id: 33, source: require("@/assets/images/profile/33.jpg"), genre: "Terror" },
    { id: 34, source: require("@/assets/images/profile/34.jpg"), genre: "Terror" },
  
    // Gênero: Ação (ID 35 a 42)
    { id: 35, source: require("@/assets/images/profile/35.jpg"), genre: "Ação" },
    { id: 36, source: require("@/assets/images/profile/36.jpg"), genre: "Ação" },
    { id: 37, source: require("@/assets/images/profile/37.jpg"), genre: "Ação" },
    { id: 38, source: require("@/assets/images/profile/38.jpg"), genre: "Ação" },
    { id: 39, source: require("@/assets/images/profile/39.jpg"), genre: "Ação" },
    { id: 40, source: require("@/assets/images/profile/40.jpg"), genre: "Ação" },
    { id: 41, source: require("@/assets/images/profile/41.jpg"), genre: "Ação" },
    { id: 42, source: require("@/assets/images/profile/42.jpg"), genre: "Ação" },
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

