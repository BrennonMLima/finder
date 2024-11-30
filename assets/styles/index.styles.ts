import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

export const MovieCard = styled.View`
  height: 90%;
`;
export const Banner = styled.Image`
  width: 100%;
  height: 90%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
`;

export const ImageRating = styled.View`
  height: 70%;
  position: relative;
`;

export const TitleContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #333;
  padding: 10px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export const TitleMovieContaier = styled.View` 
  width: 82%;
`
export const MovieTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  color: #ddd;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

export const DescriptionWrapper = styled.View`
  background-color: #333;
  padding: 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100%;
  max-height: 30%;
  border-top-width: 1px;
  border-top-color: #888;
  border-top-style: solid;
`;

export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  color: #ddd;
  text-align: center;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 60%;
  margin-top: 30px;
`;

